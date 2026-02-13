# AI Usage Notes

## What AI Was Used For

This project was built with significant assistance from Claude (Anthropic's AI assistant). Here's a breakdown of how AI was used:

### 1. **Architecture Planning** (AI-Generated)
- Overall system design (Frontend + Backend separation)
- Technology stack selection (React, FastAPI, SQLite, Groq)
- API endpoint design
- Database schema

### 2. **Code Generation** (AI-Generated)
- Backend FastAPI application (`main.py`)
- All React components (Home, Documents, Ask, Status pages)
- API client utility (`api.js`)
- Configuration files (Vite, Tailwind, package.json)

### 3. **Documentation** (AI-Generated)
- README with setup instructions
- Code comments and docstrings
- This AI_NOTES.md file

## What Was Checked/Verified Manually

### ✅ Architecture Decisions
- **Verified**: FastAPI + React is appropriate for this use case
- **Verified**: SQLite is sufficient for a single-user demo app
- **Verified**: Sentence-transformers for local embeddings is cost-effective
- **Verified**: Groq API choice (free tier, fast inference)

### ✅ Backend Code (`main.py`)
- **Verified**: Database schema with proper foreign keys
- **Verified**: Text chunking logic with overlap (500 words, 50 overlap)
- **Verified**: Cosine similarity calculation for semantic search
- **Verified**: Error handling for missing API keys
- **Verified**: CORS configuration for local development
- **Verified**: Health check implementation covers all components

### ✅ Frontend Code
- **Verified**: React Router setup and navigation
- **Verified**: API integration with proper error handling
- **Verified**: Responsive Tailwind CSS styling
- **Verified**: Loading states and user feedback
- **Verified**: File upload validation (only .txt files)
- **Verified**: Drag-and-drop functionality

### ✅ Key Technical Decisions
1. **Vector Embeddings**: Using `all-MiniLM-L6-v2` model
   - Reasoning: Fast, lightweight, runs locally without API costs
   - Trade-off: Less accurate than larger models, but sufficient for demo
   
2. **Text Chunking**: 500 words with 50-word overlap
   - Reasoning: Balances context preservation with search precision
   - Trade-off: May split some concepts awkwardly
   
3. **Top-3 Retrieval**: Returns 3 most relevant chunks
   - Reasoning: Provides enough context without overwhelming the LLM
   - Trade-off: May miss relevant information if more than 3 chunks are needed

4. **Groq API**: Using `llama-3.1-70b-versatile` model
   - Reasoning: Free tier, very fast inference, good quality
   - Trade-off: API dependency, rate limits on free tier

## LLM Provider Choice: Groq

**Why Groq?**
- **Free Tier**: No cost for development and demo
- **Speed**: Extremely fast inference (important for user experience)
- **Quality**: Llama 3.1 70B provides good answers
- **Ease of Use**: OpenAI-compatible API

**Alternatives Considered:**
- OpenAI GPT-4: More expensive, requires payment
- Anthropic Claude: Also requires payment, no free tier
- Local models (Ollama): Slower, resource-intensive

## Testing Performed

### Manual Testing Done:
- ✅ Document upload with various .txt files
- ✅ Document deletion functionality
- ✅ Q&A with different question types
- ✅ Source attribution accuracy
- ✅ Error handling (no documents, empty questions)
- ✅ Health status page
- ✅ Responsive design on different screen sizes

### Testing Not Done:
- ❌ Automated unit tests
- ❌ Integration tests
- ❌ Load testing
- ❌ Security testing
- ❌ Cross-browser compatibility

## Known Limitations

1. **No Authentication**: Anyone with the URL can access
2. **Single User**: No multi-user support or data isolation
3. **Text Only**: Only supports .txt files
4. **No Persistence**: Data lost if SQLite file is deleted
5. **Rate Limits**: Free Groq tier has usage limits
6. **Context Window**: Limited to top-3 chunks (may miss relevant info)

## Areas Requiring Human Review

If using this in production, review:
1. **Security**: Add authentication, input validation, rate limiting
2. **Scalability**: Replace SQLite with PostgreSQL, add caching
3. **Error Handling**: More robust error messages and logging
4. **Testing**: Add comprehensive test suite
5. **Monitoring**: Add proper logging and alerting
6. **API Keys**: Use secrets management service (not .env files)

## Confidence Level

- **High Confidence** (90%+): Basic functionality, UI/UX, document management
- **Medium Confidence** (70-90%): Vector search accuracy, LLM response quality
- **Low Confidence** (50-70%): Production-readiness, security, scalability

This app is suitable for a demo/prototype but would need significant hardening for production use.
