# Quick Start Guide

Get the Knowledge Q&A app running in 10 minutes!

## Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed  
- Groq API key (get free at https://console.groq.com/)

## Fast Setup (3 Steps)

### Step 1: Setup Backend (2 minutes)
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
python main.py
```
✅ Backend running at http://localhost:8000

### Step 2: Setup Frontend (2 minutes)
Open a NEW terminal:
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running at http://localhost:3000

### Step 3: Test It! (1 minute)
1. Open http://localhost:3000
2. Click "Manage Documents"
3. Upload a .txt file (create one if needed)
4. Click "Ask Questions"
5. Type a question about your document
6. See the answer with sources!

## Sample Test Document

Create `test.txt` with this content:
```
Artificial Intelligence (AI) is transforming technology. Machine learning is a subset of AI that enables computers to learn from data without explicit programming. Deep learning uses neural networks with multiple layers to process information.

Python is the most popular language for AI development. Libraries like TensorFlow and PyTorch make it easier to build AI models. Many companies are investing heavily in AI research.
```

**Sample Questions:**
- What is machine learning?
- What language is popular for AI?
- Tell me about deep learning

## Next Steps

✅ Working locally? → Read [DEPLOYMENT.md](DEPLOYMENT.md) to deploy
✅ Want to customize? → Check out the code in `backend/main.py` and `frontend/src/`
✅ Need help? → Review [README.md](README.md) for full documentation

## Troubleshooting

**"Module not found" errors:**
```bash
pip install -r requirements.txt --break-system-packages
```

**Port already in use:**
- Backend: Edit `main.py` and change port 8000 to 8001
- Frontend: Edit `vite.config.js` and change port 3000 to 3001

**CORS errors:**
- Make sure backend is running first
- Check VITE_API_URL in frontend/.env points to backend

## Project Structure
```
backend/          # FastAPI Python server
  main.py         # Main application file
  requirements.txt # Python dependencies
  
frontend/         # React web app
  src/
    pages/        # Home, Documents, Ask, Status pages
    api.js        # Backend API calls
  package.json    # Node dependencies
```

That's it! You're ready to build and deploy. 🚀
