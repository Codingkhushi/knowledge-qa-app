# Prompts Used for Development

This file documents the prompts used with AI assistants during the development of this project.

## Initial Planning

**Prompt 1:**
```
I need to build a Knowledge Q&A web app for a job application. Requirements:
- Upload text documents
- Ask questions about them
- Show sources for answers
- Built with React and Python
- Use Groq's free tier LLM API
- Need it deployed and on GitHub within 48 hours

Can you help me plan and build this?
```

**Purpose**: Get overall architecture and tech stack recommendations

---

## Backend Development

**Prompt 2:**
```
Create a FastAPI backend with:
- Document upload endpoint (only .txt files)
- Store documents in SQLite
- Chunk documents and create embeddings
- Q&A endpoint that uses RAG
- Health check endpoint
- Use sentence-transformers for embeddings
- Use Groq API for LLM responses
```

**Purpose**: Generate backend API structure

**Prompt 3:**
```
Add proper error handling for:
- Missing API keys
- Database connection failures
- Invalid file types
- Empty questions
- No documents uploaded
```

**Purpose**: Improve error handling

---

## Frontend Development

**Prompt 4:**
```
Create a React app with Vite and Tailwind CSS with these pages:
- Home page with clear instructions
- Documents page with upload and list
- Ask page with Q&A interface
- Status page showing backend/db/LLM health
```

**Purpose**: Generate frontend structure

**Prompt 5:**
```
Add drag-and-drop file upload to the Documents page
```

**Purpose**: Improve UX

**Prompt 6:**
```
Make the UI more polished with:
- Better colors and spacing
- Loading states
- Success/error messages
- Responsive design
```

**Purpose**: Polish UI/UX

---

## Documentation

**Prompt 7:**
```
Create a comprehensive README with:
- Setup instructions
- How to run locally
- Tech stack explanation
- API endpoints
- Troubleshooting guide
```

**Purpose**: Generate user documentation

**Prompt 8:**
```
Create AI_NOTES.md documenting:
- What AI was used for
- What was verified manually
- Why we chose specific technologies
- Testing performed
- Known limitations
```

**Purpose**: Document AI usage and technical decisions

---

## Deployment

**Prompt 9:**
```
Create Docker and docker-compose files for easy deployment
```

**Purpose**: Containerization for deployment

**Prompt 10:**
```
What's the best free hosting option for:
- React frontend (static site)
- Python FastAPI backend
- SQLite database
```

**Purpose**: Plan deployment strategy

---

## Debugging and Refinement

**Prompt 11:**
```
The CORS is blocking my frontend requests. How do I fix this?
```

**Purpose**: Fix CORS issues

**Prompt 12:**
```
How can I improve the relevance of search results?
```

**Purpose**: Optimize RAG retrieval

**Prompt 13:**
```
Add better visual feedback when:
- Uploading documents
- Asking questions
- Waiting for responses
```

**Purpose**: Improve loading states

---

## Testing Prompts

**Prompt 14:**
```
What edge cases should I test for this app?
```

**Purpose**: Identify testing scenarios

**Prompt 15:**
```
Review my code and suggest improvements for:
- Code quality
- Error handling
- Performance
- Security
```

**Purpose**: Code review and improvements

---

## Notes

- All prompts were used with Claude (Anthropic) via claude.ai
- Some prompts were iterative (asking follow-up questions)
- Code was reviewed and tested manually after generation
- Modifications were made based on testing results
- No sensitive information (API keys, passwords) was included in prompts
