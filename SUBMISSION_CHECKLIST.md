# Submission Checklist

Before you submit, make sure you've completed everything:

## ✅ Code & Files

- [ ] All code files are present
  - [ ] Backend: `backend/main.py`, `requirements.txt`
  - [ ] Frontend: `frontend/src/` with all components
  - [ ] Configuration files: `package.json`, `vite.config.js`, etc.

- [ ] Documentation files are complete
  - [ ] README.md (with setup instructions)
  - [ ] AI_NOTES.md (what AI did and what you verified)
  - [ ] ABOUTME.md (**YOU NEED TO FILL THIS OUT WITH YOUR INFO**)
  - [ ] PROMPTS_USED.md (prompts you used)

- [ ] Environment files
  - [ ] `.env.example` files are present
  - [ ] NO actual `.env` files with real API keys in repo
  - [ ] `.gitignore` includes `.env`

## ✅ GitHub Repository

- [ ] Repository is created on GitHub
- [ ] All code is pushed to GitHub
- [ ] Repository is PUBLIC or accessible to reviewer
- [ ] README has deployment instructions
- [ ] No API keys or secrets in code

## ✅ Application Testing

Before deploying, test locally:
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can upload a document
- [ ] Can see document in list
- [ ] Can delete document
- [ ] Can ask a question
- [ ] Get answer with sources
- [ ] Status page shows all healthy

## ✅ Deployment

- [ ] Frontend is deployed and accessible
- [ ] Backend is deployed and accessible
- [ ] Both services can communicate
- [ ] Test the live version thoroughly
- [ ] Live link will stay up during review period

## ✅ Email Submission

Send email with:
- [ ] Subject mentions "Problem A" (Knowledge Q&A)
- [ ] Live link to deployed app
- [ ] GitHub repository link
- [ ] Brief note about the project

### Example Email Template:

```
Subject: Build Task Submission - Problem A

Hi,

I've completed the build task for Problem A (Private Knowledge Q&A).

Project: Problem A - Knowledge Q&A App
Live Link: [YOUR-FRONTEND-URL]
GitHub: [YOUR-GITHUB-REPO-URL]

The app allows users to upload text documents and ask questions with AI-powered answers that cite their sources. Built with React + FastAPI + Groq.

Tech stack:
- Frontend: React 18, Vite, Tailwind CSS
- Backend: FastAPI, Python
- LLM: Groq API (Llama 3.1 70B)
- Database: SQLite

All required files are in the repository including README, AI_NOTES, ABOUTME, and PROMPTS_USED.

Best regards,
[Your Name]
```

## ⚠️ BEFORE YOU SUBMIT

### Critical - Update These Files:

1. **ABOUTME.md** - ADD YOUR INFORMATION
   - Your name
   - Your contact info
   - Your resume/experience
   - Your skills

2. **README.md** - Update these if needed:
   - GitHub clone URL
   - Live deployment URLs

3. **Test Live Deployment**:
   - Visit your live link
   - Upload a test document
   - Ask a question
   - Verify everything works

## 🎯 Success Criteria

Your submission should demonstrate:
- ✅ Working application (deployed and accessible)
- ✅ Clean code with proper structure
- ✅ Good documentation
- ✅ Sensible use of AI (not blind copy-paste)
- ✅ Basic error handling
- ✅ Professional presentation

## 📋 Post-Submission

After sending the email:
- [ ] Keep the app running (don't shut down hosting)
- [ ] Monitor your email for any questions
- [ ] Be ready to explain your technical choices
- [ ] Don't make breaking changes to the repo

---

Good luck! 🚀
