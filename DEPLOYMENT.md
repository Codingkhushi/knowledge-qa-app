# Deployment Guide

This guide covers deploying the Knowledge Q&A app to free hosting services.

## Recommended Deployment Setup

**Frontend**: Vercel or Netlify (free tier)
**Backend**: Railway or Render (free tier)

## Option 1: Railway (Recommended - Easiest)

Railway can host both frontend and backend on their free tier.

### Backend on Railway

1. Sign up at https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will detect the backend folder
5. Add environment variable:
   - Key: `GROQ_API_KEY`
   - Value: Your Groq API key
6. Set root directory to `backend`
7. Deploy!
8. Copy the generated URL (e.g., `https://your-app.railway.app`)

### Frontend on Railway

1. Create another service in the same project
2. Select your repository again
3. Set root directory to `frontend`
4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: Your backend URL from step 8 above
5. Deploy!

## Option 2: Render

### Backend on Render

1. Sign up at https://render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: `knowledge-qa-backend`
   - Root Directory: `backend`
   - Environment: `Python 3`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variable:
   - Key: `GROQ_API_KEY`
   - Value: Your Groq API key
6. Click "Create Web Service"
7. Copy the URL (e.g., `https://knowledge-qa-backend.onrender.com`)

### Frontend on Render

1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - Name: `knowledge-qa-frontend`
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`
4. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: Your backend URL from step 7 above
5. Click "Create Static Site"

## Option 3: Vercel (Frontend) + Render (Backend)

### Backend on Render (same as Option 2)

### Frontend on Vercel

1. Sign up at https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variable:
   - Key: `VITE_API_URL`
   - Value: Your backend URL
6. Click "Deploy"

## Option 4: Docker Deployment (Your Own Server)

If you have access to a server or VPS:

```bash
# Clone your repository
git clone <your-repo-url>
cd knowledge-qa-app

# Create .env file in root
echo "GROQ_API_KEY=your_key_here" > .env

# Build and run with Docker Compose
docker-compose up -d

# Access the app
# Frontend: http://your-server-ip:3000
# Backend: http://your-server-ip:8000
```

## Post-Deployment Checklist

- [ ] Backend is accessible and returns health status
- [ ] Frontend loads and shows the home page
- [ ] Can upload documents
- [ ] Can ask questions and get answers
- [ ] Status page shows all systems healthy
- [ ] GitHub repository is public (or accessible to reviewer)
- [ ] README has correct live URL

## Troubleshooting

**Frontend can't connect to backend:**
- Check VITE_API_URL is set correctly
- Ensure backend URL includes https:// or http://
- Verify CORS is enabled in backend

**Backend health check fails:**
- Check GROQ_API_KEY is set
- Verify API key is valid
- Check backend logs for errors

**Database errors:**
- Railway/Render provide persistent storage by default
- Ensure uploads directory is created

**Build fails:**
- Check all dependencies are in requirements.txt / package.json
- Review build logs for specific errors
- Ensure Python 3.8+ and Node 16+ are being used

## Important Notes

- Free tiers have limitations (may sleep after inactivity)
- Railway free tier: 500 hours/month
- Render free tier: May have cold starts
- Keep the app active to prevent sleeping

## Monitoring

After deployment, bookmark these URLs:
- Frontend: `https://your-frontend-url`
- Backend health: `https://your-backend-url/health`
- Status page: `https://your-frontend-url/status`

Check these regularly to ensure the app stays running.
