from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import sqlite3
import json
from datetime import datetime
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity as sklearn_cosine_similarity
import httpx
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Knowledge Q&A API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
DB_PATH = "knowledge_qa.db"
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

# Initialize TF-IDF vectorizer (lightweight, no heavy models)
vectorizer = TfidfVectorizer(max_features=1000)

# Database initialization
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS documents (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            content TEXT NOT NULL,
            upload_date TEXT NOT NULL
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS chunks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            document_id INTEGER NOT NULL,
            chunk_text TEXT NOT NULL,
            chunk_index INTEGER NOT NULL,
            embedding TEXT NOT NULL,
            FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Models
class QuestionRequest(BaseModel):
    question: str

class AnswerResponse(BaseModel):
    answer: str
    sources: List[dict]

class DocumentResponse(BaseModel):
    id: int
    filename: str
    upload_date: str

# Helper functions
def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> List[str]:
    """Split text into overlapping chunks"""
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        if chunk:
            chunks.append(chunk)
    return chunks

def get_embedding(text: str, all_texts: List[str] = None) -> List[float]:
    """Get TF-IDF embedding vector for text"""
    global vectorizer
    if all_texts:
        # Fit vectorizer on all texts if provided
        vectorizer.fit(all_texts)
    # Transform the text
    vector = vectorizer.transform([text]).toarray()[0]
    return vector.tolist()

def cosine_similarity(a: List[float], b: List[float]) -> float:
    """Calculate cosine similarity between two vectors"""
    a_np = np.array(a)
    b_np = np.array(b)
    return np.dot(a_np, b_np) / (np.linalg.norm(a_np) * np.linalg.norm(b_np))

async def query_groq(prompt: str, context: str) -> str:
    """Query Groq LLM API"""
    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not configured")
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            response = await client.post(
                GROQ_API_URL,
                headers={
                    "Authorization": f"Bearer {GROQ_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "llama-3.3-70b-versatile",
                    "messages": [
                        {
                            "role": "system",
                            "content": "You are a helpful assistant that answers questions based on the provided context. If the context doesn't contain enough information to answer the question, say so."
                        },
                        {
                            "role": "user",
                            "content": f"Context:\n{context}\n\nQuestion: {prompt}\n\nAnswer based on the context above:"
                        }
                    ],
                    "temperature": 0.5,
                    "max_tokens": 500
                }
            )
            response.raise_for_status()
            result = response.json()
            return result["choices"][0]["message"]["content"]
        except httpx.HTTPStatusError as e:
            error_detail = f"Groq API error: {e.response.status_code} - {e.response.text}"
            raise HTTPException(status_code=500, detail=error_detail)
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"Groq API error: {str(e)}")

# API Endpoints
@app.get("/")
async def root():
    return {"message": "Knowledge Q&A API", "status": "running"}

@app.get("/health")
async def health_check():
    """Check health of all components"""
    health_status = {
        "backend": "healthy",
        "database": "unknown",
        "llm": "unknown"
    }
    
    # Check database
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.execute("SELECT 1")
        conn.close()
        health_status["database"] = "healthy"
    except Exception as e:
        health_status["database"] = f"unhealthy: {str(e)}"
    
    # Check LLM API
    if not GROQ_API_KEY:
        health_status["llm"] = "unhealthy: API key not configured"
    else:
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                response = await client.post(
                    GROQ_API_URL,
                    headers={
                        "Authorization": f"Bearer {GROQ_API_KEY}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "llama-3.1-70b-versatile",
                        "messages": [{"role": "user", "content": "test"}],
                        "max_tokens": 5
                    }
                )
                if response.status_code == 200:
                    health_status["llm"] = "healthy"
                else:
                    health_status["llm"] = f"unhealthy: status {response.status_code}"
        except Exception as e:
            health_status["llm"] = f"unhealthy: {str(e)}"
    
    overall_healthy = all(status == "healthy" for status in health_status.values())
    
    return {
        "status": "healthy" if overall_healthy else "degraded",
        "components": health_status,
        "timestamp": datetime.now().isoformat()
    }

@app.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    """Upload and process a document"""
    if not file.filename.endswith('.txt'):
        raise HTTPException(status_code=400, detail="Only .txt files are supported")
    
    try:
        # Read file content
        content = await file.read()
        text = content.decode('utf-8')
        
        # Save to database
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute(
            "INSERT INTO documents (filename, content, upload_date) VALUES (?, ?, ?)",
            (file.filename, text, datetime.now().isoformat())
        )
        doc_id = c.lastrowid
        
        # Chunk and embed the text
        chunks = chunk_text(text)
        
        # Fit vectorizer on all chunks
        get_embedding(chunks[0], all_texts=chunks)
        
        for idx, chunk in enumerate(chunks):
            embedding = get_embedding(chunk)
            c.execute(
                "INSERT INTO chunks (document_id, chunk_text, chunk_index, embedding) VALUES (?, ?, ?, ?)",
                (doc_id, chunk, idx, json.dumps(embedding))
            )
        
        conn.commit()
        conn.close()
        
        return {
            "message": "Document uploaded successfully",
            "document_id": doc_id,
            "filename": file.filename,
            "chunks_created": len(chunks)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing document: {str(e)}")

@app.get("/documents", response_model=List[DocumentResponse])
async def list_documents():
    """List all uploaded documents"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT id, filename, upload_date FROM documents ORDER BY upload_date DESC")
    documents = [
        DocumentResponse(id=row[0], filename=row[1], upload_date=row[2])
        for row in c.fetchall()
    ]
    conn.close()
    return documents

@app.delete("/documents/{document_id}")
async def delete_document(document_id: int):
    """Delete a document and its chunks"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("DELETE FROM chunks WHERE document_id = ?", (document_id,))
    c.execute("DELETE FROM documents WHERE id = ?", (document_id,))
    if c.rowcount == 0:
        conn.close()
        raise HTTPException(status_code=404, detail="Document not found")
    conn.commit()
    conn.close()
    return {"message": "Document deleted successfully"}

@app.post("/ask", response_model=AnswerResponse)
async def ask_question(request: QuestionRequest):
    """Answer a question based on uploaded documents"""
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")
    
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    # Check if there are any documents
    c.execute("SELECT COUNT(*) FROM documents")
    if c.fetchone()[0] == 0:
        conn.close()
        raise HTTPException(status_code=400, detail="No documents uploaded yet")
    
    # Get question embedding
    question_embedding = get_embedding(request.question)
    
    # Retrieve all chunks with their embeddings
    c.execute("""
        SELECT c.chunk_text, c.embedding, d.filename, c.chunk_index
        FROM chunks c
        JOIN documents d ON c.document_id = d.id
    """)
    
    # Calculate similarity scores
    chunks_with_scores = []
    for row in c.fetchall():
        chunk_text, embedding_json, filename, chunk_index = row
        chunk_embedding = json.loads(embedding_json)
        similarity = cosine_similarity(question_embedding, chunk_embedding)
        chunks_with_scores.append({
            "text": chunk_text,
            "filename": filename,
            "chunk_index": chunk_index,
            "similarity": similarity
        })
    
    conn.close()
    
    # Sort by similarity and get top 3 chunks
    chunks_with_scores.sort(key=lambda x: x["similarity"], reverse=True)
    top_chunks = chunks_with_scores[:3]
    
    # Build context from top chunks
    context = "\n\n".join([
        f"[From {chunk['filename']}, section {chunk['chunk_index']}]:\n{chunk['text']}"
        for chunk in top_chunks
    ])
    
    # Query LLM
    answer = await query_groq(request.question, context)
    
    # Format sources
    sources = [
        {
            "filename": chunk["filename"],
            "chunk_index": chunk["chunk_index"],
            "text": chunk["text"][:200] + "..." if len(chunk["text"]) > 200 else chunk["text"],
            "relevance": round(chunk["similarity"], 3)
        }
        for chunk in top_chunks
    ]
    
    return AnswerResponse(answer=answer, sources=sources)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)