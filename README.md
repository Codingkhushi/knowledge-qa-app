# Knowledge Q&A App

A web application that allows users to upload documents and ask questions about them using AI. The app uses RAG (Retrieval-Augmented Generation) to provide accurate answers with source attribution.

## Features

- 📄 **Document Upload**: Upload text files (.txt) with drag-and-drop support
- 📚 **Document Management**: View and delete uploaded documents
- 💬 **Q&A Interface**: Ask questions in natural language
- 🔍 **Source Attribution**: See exactly where answers come from
- 🏥 **Health Monitoring**: Status page showing backend, database, and LLM health

## Tech Stack

**Frontend:**
- React 18 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls

**Backend:**
- FastAPI (Python)
- SQLite database
- Sentence-Transformers for embeddings (runs locally)
- Groq API for LLM (Llama 3.1 70B)

## Prerequisites

- Python 3.8+
- Node.js 16+
- Groq API key (free tier available at https://console.groq.com/)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd knowledge-qa-app
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file (optional for local development)
cp .env.example .env
```

### 4. Running the Application

**Start Backend (in backend directory):**
```bash
python main.py
# Backend will run on http://localhost:8000
```

**Start Frontend (in frontend directory):**
```bash
npm run dev
# Frontend will run on http://localhost:3000
```

### 5. Using Docker (Alternative)

```bash
# From project root
docker-compose up --build
```

## Usage

1. **Upload Documents**: Navigate to "Manage Documents" and upload .txt files
2. **Ask Questions**: Go to "Ask Questions" and type your query
3. **View Sources**: See which document sections were used for the answer
4. **Check Status**: Visit the Status page to ensure all systems are healthy

## Project Structure

```
knowledge-qa-app/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variables template
├── frontend/
│   ├── src/
│   │   ├── pages/          # React page components
│   │   ├── api.js          # API client
│   │   └── App.jsx         # Main app component
│   ├── package.json        # Node dependencies
│   └── .env.example        # Frontend environment variables
├── README.md
├── AI_NOTES.md
├── ABOUTME.md
└── PROMPTS_USED.md
```

## What's Done

✅ Document upload with validation
✅ Document listing and deletion
✅ Vector-based semantic search
✅ Q&A with source attribution
✅ Status/health monitoring page
✅ Responsive UI with Tailwind CSS
✅ Error handling and loading states
✅ Drag-and-drop file upload

## What's Not Done (Potential Improvements)

- Authentication/user accounts
- Support for more file formats (PDF, DOCX)
- Advanced document preprocessing
- Conversation history
- Export answers/reports
- Fine-tuning embedding model
- Rate limiting

## API Endpoints

- `GET /` - Root endpoint
- `GET /health` - Health check for all components
- `POST /upload` - Upload document
- `GET /documents` - List all documents
- `DELETE /documents/{id}` - Delete document
- `POST /ask` - Ask question

## Environment Variables

**Backend (.env):**
- `GROQ_API_KEY` - Your Groq API key

**Frontend (.env):**
- `VITE_API_URL` - Backend API URL (default: http://localhost:8000)

## Troubleshooting

**Backend won't start:**
- Ensure Python 3.8+ is installed
- Check if all dependencies are installed
- Verify GROQ_API_KEY is set in .env

**Frontend won't start:**
- Ensure Node.js 16+ is installed
- Run `npm install` to install dependencies
- Check if port 3000 is available

**Can't upload documents:**
- Ensure backend is running
- Check if file is .txt format
- Verify backend URL in frontend .env

**Questions not working:**
- Ensure you have uploaded documents first
- Check GROQ_API_KEY is valid
- Verify LLM status on Status page

## License

MIT
