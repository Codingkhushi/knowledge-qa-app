# Project Structure

```
knowledge-qa-app/
│
├── README.md                      # Main documentation
├── GETTING_STARTED.md            # Complete setup guide
├── QUICKSTART.md                 # Fast setup (10 min)
├── DEPLOYMENT.md                 # Deployment instructions
├── SUBMISSION_CHECKLIST.md       # Before you submit
├── AI_NOTES.md                   # AI usage documentation
├── ABOUTME.md                    # Your info (FILL THIS OUT!)
├── PROMPTS_USED.md              # Prompts used for development
├── .gitignore                    # Git ignore rules
├── docker-compose.yml            # Docker orchestration
├── sample_document.txt           # Test document
│
├── backend/                      # Python FastAPI Backend
│   ├── main.py                   # Main application (500+ lines)
│   │   ├── Document upload endpoint
│   │   ├── Q&A with RAG
│   │   ├── Health checks
│   │   └── SQLite integration
│   ├── requirements.txt          # Python dependencies
│   ├── .env.example             # Environment template
│   └── Dockerfile               # Backend container
│
└── frontend/                     # React Frontend
    ├── package.json             # Node dependencies
    ├── vite.config.js           # Vite configuration
    ├── tailwind.config.js       # Tailwind CSS config
    ├── postcss.config.js        # PostCSS config
    ├── index.html               # HTML entry point
    ├── nginx.conf               # Nginx config for production
    ├── .env.example             # Environment template
    ├── Dockerfile               # Frontend container
    │
    └── src/
        ├── main.jsx             # React entry point
        ├── App.jsx              # Main app component
        ├── index.css            # Global styles
        ├── api.js               # Backend API client
        │
        └── pages/
            ├── Home.jsx         # Landing page with instructions
            ├── Documents.jsx    # Upload & manage documents
            ├── Ask.jsx          # Q&A interface
            └── Status.jsx       # System health status
```

## Key Files Explained

### Documentation Files

| File | Purpose | Must Edit? |
|------|---------|------------|
| README.md | Setup and usage instructions | Maybe (update URLs) |
| GETTING_STARTED.md | Complete walkthrough | No |
| QUICKSTART.md | 10-minute setup | No |
| DEPLOYMENT.md | Hosting instructions | No |
| AI_NOTES.md | AI usage transparency | No |
| **ABOUTME.md** | **Your resume/info** | **YES - REQUIRED!** |
| PROMPTS_USED.md | Development prompts | Maybe (add yours) |
| SUBMISSION_CHECKLIST.md | Pre-submission checklist | No |

### Backend Files

| File | Purpose | Lines |
|------|---------|-------|
| main.py | FastAPI application | 400+ |
| requirements.txt | Python packages | 10 |
| .env.example | Config template | 2 |
| Dockerfile | Container setup | 15 |

### Frontend Files

| File | Purpose | Lines |
|------|---------|-------|
| pages/Home.jsx | Landing page | 90 |
| pages/Documents.jsx | Document management | 180 |
| pages/Ask.jsx | Q&A interface | 150 |
| pages/Status.jsx | Health monitoring | 130 |
| App.jsx | Router setup | 20 |
| api.js | API client | 45 |
| main.jsx | React entry | 10 |

## Technology Stack

### Frontend
- **React 18**: UI library
- **Vite**: Build tool (fast!)
- **React Router**: Navigation
- **Tailwind CSS**: Styling
- **Axios**: HTTP client

### Backend
- **FastAPI**: Python web framework
- **SQLite**: Database
- **Sentence-Transformers**: Local embeddings
- **Groq API**: LLM (Llama 3.1 70B)
- **NumPy**: Vector operations

### Infrastructure
- **Docker**: Containerization
- **Nginx**: Frontend serving
- **Uvicorn**: ASGI server

## Data Flow

```
User uploads document.txt
        ↓
Frontend (React) → POST /upload → Backend (FastAPI)
        ↓
Text is chunked (500 words)
        ↓
Each chunk gets embedding (Sentence-Transformers)
        ↓
Stored in SQLite (documents + chunks tables)
```

```
User asks "What is AI?"
        ↓
Frontend → POST /ask → Backend
        ↓
Question gets embedding
        ↓
Compare with all chunk embeddings (cosine similarity)
        ↓
Get top 3 most relevant chunks
        ↓
Send chunks + question to Groq API
        ↓
Return answer + sources to user
```

## Database Schema

```sql
documents
├── id (INTEGER PRIMARY KEY)
├── filename (TEXT)
├── content (TEXT)
└── upload_date (TEXT)

chunks
├── id (INTEGER PRIMARY KEY)
├── document_id (FOREIGN KEY → documents.id)
├── chunk_text (TEXT)
├── chunk_index (INTEGER)
└── embedding (TEXT - JSON array)
```

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | / | Root - API info |
| GET | /health | System status |
| POST | /upload | Upload document |
| GET | /documents | List documents |
| DELETE | /documents/{id} | Delete document |
| POST | /ask | Ask question |

## Environment Variables

### Backend (.env)
```
GROQ_API_KEY=your_key_here
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## File Sizes

Total project: ~3MB (without node_modules/venv)
- Backend code: ~12KB
- Frontend code: ~25KB
- Dependencies: ~2.8MB when installed

## Important Notes

1. **.gitignore** prevents committing:
   - .env files (secrets)
   - node_modules/ (huge)
   - venv/ (Python packages)
   - Database files
   - Build outputs

2. **No secrets in code**: API keys only in .env files

3. **Docker support**: Full containerization included

4. **Mobile responsive**: All pages work on phones

5. **Error handling**: User-friendly error messages throughout

## Next Steps

1. **Setup**: Follow GETTING_STARTED.md
2. **Test locally**: Use sample_document.txt
3. **Deploy**: Follow DEPLOYMENT.md
4. **Document**: Fill out ABOUTME.md
5. **Submit**: Use SUBMISSION_CHECKLIST.md
