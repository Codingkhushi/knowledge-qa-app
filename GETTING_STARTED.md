# 🚀 Getting Started - Complete Guide

This is your complete guide to building, testing, and deploying the Knowledge Q&A app for your job application.

## 📋 Timeline Overview (48 hours total)

**Hours 0-2**: Setup and local testing
**Hours 2-4**: Deployment
**Hours 4-6**: Testing and documentation
**Hours 6+**: Buffer time

## Part 1: Local Setup (1-2 hours)

### Step 1: Get Groq API Key (5 minutes)
1. Go to https://console.groq.com/
2. Sign up (it's free)
3. Create an API key
4. Save it somewhere safe

### Step 2: Setup Backend (20 minutes)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate it
# On Mac/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies (this takes ~5-10 minutes)
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Groq API key
# Use nano, vim, or any text editor:
nano .env
# Add: GROQ_API_KEY=your_actual_key_here
# Save and exit

# Start the backend
python main.py
```

✅ Backend should be running at http://localhost:8000
✅ Visit http://localhost:8000/health to verify

### Step 3: Setup Frontend (15 minutes)

Open a NEW terminal (keep backend running):

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (takes ~3-5 minutes)
npm install

# Start development server
npm run dev
```

✅ Frontend should be running at http://localhost:3000
✅ Open http://localhost:3000 in your browser

### Step 4: Test Locally (10 minutes)

1. **Upload Document**:
   - Go to http://localhost:3000
   - Click "Manage Documents"
   - Upload `sample_document.txt` from the project root
   - Verify it appears in the list

2. **Ask Questions**:
   - Click "Ask Questions"
   - Try these questions:
     - "What is machine learning?"
     - "What programming language is popular for AI?"
     - "Tell me about deep learning"
   - Verify you get answers with sources

3. **Check Status**:
   - Visit the Status page
   - Verify all components show "Healthy"

✅ If everything works, you're ready to deploy!

## Part 2: Create GitHub Repository (15 minutes)

### Step 1: Initialize Git

```bash
# From project root
git init
git add .
git commit -m "Initial commit: Knowledge Q&A app"
```

### Step 2: Create GitHub Repo

1. Go to https://github.com/new
2. Create a new repository (name: `knowledge-qa-app`)
3. Make it PUBLIC
4. Don't initialize with README (we already have one)

### Step 3: Push Code

```bash
# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR-USERNAME/knowledge-qa-app.git

# Push code
git branch -M main
git push -u origin main
```

✅ Visit your GitHub repo and verify all files are there
✅ Make sure .env files are NOT in the repo (check .gitignore worked)

## Part 3: Deploy (1-2 hours)

**Recommended**: Use Railway (easiest, everything in one place)

### Railway Deployment

1. **Sign up**: Go to https://railway.app and sign up with GitHub

2. **Deploy Backend**:
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `knowledge-qa-app` repository
   - Click "Add variables" and add:
     - `GROQ_API_KEY` = your Groq key
   - Click on Settings:
     - Root Directory: `backend`
     - Custom Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - Click "Deploy"
   - Wait for deployment (5-10 minutes)
   - Copy the URL (e.g., `https://backend-production-xxxx.up.railway.app`)

3. **Deploy Frontend**:
   - In same Railway project, click "New Service"
   - Select your repository again
   - Click "Add variables" and add:
     - `VITE_API_URL` = your backend URL from step 2
   - Click on Settings:
     - Root Directory: `frontend`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm run preview -- --host 0.0.0.0 --port $PORT`
   - Click "Deploy"
   - Wait for deployment
   - Copy the frontend URL

4. **Test Deployment**:
   - Visit your frontend URL
   - Upload a document
   - Ask a question
   - Verify everything works

✅ If deployment works, you're 90% done!

### Alternative: Render + Vercel

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on other hosting options.

## Part 4: Final Documentation (30 minutes)

### Update ABOUTME.md

**CRITICAL**: You must fill this out with YOUR information:

```markdown
# About Me

## [Your Full Name]

**Email**: your.email@example.com
**Phone**: +1-XXX-XXX-XXXX
**LinkedIn**: linkedin.com/in/yourprofile
**GitHub**: github.com/yourusername

## Summary
[Brief 2-3 sentence bio about you]

## Skills
- Frontend: React, JavaScript, TypeScript, HTML, CSS
- Backend: Python, FastAPI, Node.js
- [Add your other skills]

## Experience
[Your work experience]

## Education
[Your education]
```

### Update README.md (if needed)

Update the clone URL:
```markdown
git clone https://github.com/YOUR-USERNAME/knowledge-qa-app.git
```

### Review All Files

Make sure these files are complete:
- ✅ README.md (setup instructions)
- ✅ AI_NOTES.md (what AI did)
- ✅ ABOUTME.md (YOUR INFO - don't skip!)
- ✅ PROMPTS_USED.md (prompts you used)
- ✅ .env.example files (no real keys)
- ✅ .gitignore (includes .env)

## Part 5: Submit (5 minutes)

### Email Template

```
Subject: Build Task Submission - Problem A

Hi,

I've completed the build task for Problem A (Private Knowledge Q&A).

Project: Knowledge Q&A App
Live Link: [YOUR FRONTEND URL]
GitHub: [YOUR GITHUB REPO URL]

The application allows users to upload text documents and ask questions about them. The system uses RAG (Retrieval-Augmented Generation) to provide accurate answers with source citations.

Technology Stack:
- Frontend: React 18 + Vite + Tailwind CSS
- Backend: FastAPI (Python)
- Database: SQLite
- Embeddings: Sentence-Transformers (local)
- LLM: Groq API (Llama 3.1 70B)

Key Features:
- Document upload with drag-and-drop
- Semantic search using vector embeddings
- AI-powered Q&A with source attribution
- Health monitoring page
- Responsive UI design

All required documentation is included in the repository (README, AI_NOTES, ABOUTME, PROMPTS_USED).

The application is deployed and will remain live during the review period.

Best regards,
[Your Name]
```

### Before Sending

- [ ] Test live deployment one more time
- [ ] Verify GitHub repo is public
- [ ] ABOUTME.md has YOUR information
- [ ] Links in email are correct

## 🎯 Success Checklist

Your submission should have:
- ✅ Working live app (can upload, ask, get answers)
- ✅ Public GitHub repo with all code
- ✅ Complete documentation
- ✅ Your personal info in ABOUTME.md
- ✅ Clean code structure
- ✅ No API keys in repo

## 🆘 Troubleshooting

**Backend won't start:**
```bash
pip install --upgrade pip
pip install -r requirements.txt --break-system-packages
```

**Frontend build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Deployment fails:**
- Check logs in Railway/Render dashboard
- Verify environment variables are set
- Ensure ports are correct ($PORT for Railway)

**Can't connect to backend:**
- Check VITE_API_URL is set correctly
- Verify backend is actually running
- Check CORS settings

## 📞 Need Help?

If you get stuck:
1. Check the error messages carefully
2. Review the specific file mentioned (README, DEPLOYMENT, etc.)
3. Search the error on Google/Stack Overflow
4. Check Railway/Render documentation

## ⏰ Time Management Tips

- Don't spend more than 30 minutes on any single issue
- If deployment option A fails, try option B
- Basic working app > perfect but incomplete app
- Test frequently as you go
- Save time by using the provided sample document

---

You've got this! The code is ready, now just deploy and submit. 🚀
