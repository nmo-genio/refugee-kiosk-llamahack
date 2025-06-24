# Refugee Kiosk Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [Backend](#backend)
  - [Key Modules](#key-modules)
  - [API Endpoints](#api-endpoints)
  - [Environment Variables](#environment-variables)
- [Frontend](#frontend)
  - [Key Components](#key-components)
  - [Environment Variables](#frontend-environment-variables)
- [Development & Testing](#development--testing)
- [References](#references)

---

## Project Overview
Refugee Kiosk is an AI-powered, multilingual digital kiosk for refugees and disaster survivors, providing instant translation, form assistance, and privacy-focused help. Built with FastAPI (backend) and React (frontend), it leverages Meta’s Llama 4 model for language and document understanding.

---

## Architecture
```
+-------------+         +----------------+         +-------------------+
|   Frontend  | <-----> |    Backend     | <-----> |  Llama 4 API,     |
|  (React)    |  REST   |  (FastAPI)     | 3rd-pty |  OCR, PDF, etc.   |
+-------------+         +----------------+         +-------------------+
```
- **Frontend**: React app for kiosk UI, language selection, chat, SOS, etc.
- **Backend**: FastAPI server for chat, translation, directions, session & file handling.
- **Integrations**: Meta Llama 4, OCR (pytesseract), PDF/DOCX parsing, semantic search.

---

## Backend

### Key Modules
- `app.py`: FastAPI app, defines all API endpoints and session logic.
- `llama_api.py`: Handles Llama 4 API integration, image/document parsing, translation, and semantic search.
- `requirements.txt`: Lists all Python dependencies.

### API Endpoints (examples)
- `POST /api/chat` — Chat with AI assistant
- `POST /api/upload` — Upload images or documents for translation/processing
- `GET /api/directions` — Get directions to facilities
- `POST /api/sos` — Send SOS/emergency alert
- `POST /api/session/end` — End user session and erase data

### Environment Variables
Add to `backend/.env`:
```
LLAMA_API_KEY=your_llama_api_key
DATABASE_URL=your_database_url (if used)
SECRET_KEY=your_secret_key
PORT=8000
```

---

## Frontend

### Key Components
- `MainMenu.jsx`: Main UI for language selection and feature navigation
- `ChatWithAI.jsx`: Chat interface with AI (supports text and image uploads)
- `DirectionsModal.jsx`: Directions/map modal
- `SOSButton.jsx` (or similar): Triggers emergency alert
- `App.js` / `App.jsx`: App entry point and router

### Frontend Environment Variables
Add to `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:8000
```

---

## Development & Testing
- **Backend**: Run with `uvicorn app:app --reload` (auto-reloads on code changes)
- **Frontend**: Run with `npm start` (auto-reloads on code changes)
- **Testing**: Add tests as appropriate for backend (e.g., pytest) and frontend (e.g., Jest/React Testing Library)
- **Linting**: Follow Python and JavaScript/React best practices

---

## References
- [Creative Commons Attribution-NonCommercial 4.0 International](http://creativecommons.org/licenses/by-nc/4.0/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [Meta Llama 4](https://ai.meta.com/llama/)
- [pytesseract OCR](https://github.com/madmaze/pytesseract)
- [pdfplumber](https://github.com/jsvine/pdfplumber)

---
For further questions, see the README or contact the maintainers.
