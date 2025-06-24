# Refugee Kiosk – LlamaHack Seattle 2025

**AI-powered, multilingual digital kiosk for refugees and disaster survivors.**  
Built for the Llama 4 Hackathon, Refugee Kiosk provides instant document/photo translation, step-by-step form assistance, and privacy-focused, accessible help for those in need.

**🔗 [Live Demo](https://youtu.be/WmEEAMDMiJo)**
---

## 🚀 Overview

**Refugee Kiosk** leverages Meta’s Llama 4 model to bridge information, language, and connection gaps for people affected by war or disaster.

**Features:**
- **Document & photo translation:** Upload forms, flyers, or notes and get instant translation and step-by-step instructions.
- **SOS/Emergency Alert:** Instantly send an emergency alert to request urgent help.
- **Map/Facility navigation:** Find food, water, medical tents, hygiene, supplies, and communication centers on a simple map.
- **Accessibility:** Multilingual support, text-to-speech, and a simple, icon-based interface for all literacy levels.
- **Privacy:** No registration. All user data is erased after each session.

---

## Project Structure

```
.
├── backend/           # Backend server code
├── frontend/          # Frontend application
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## 🖥️ Backend

**Tech Stack:** Python, FastAPI, Llama 4 API, OCR, PDF/DOCX parsing, semantic search
***Key Features***
- REST API for chat, image upload, directions, and session management
- Image/document processing: Extracts and translates text from images/PDFs using OCR and Llama 4
- Form understanding: Extracts structured data from forms
- Semantic search: Finds relevant information from a humanitarian knowledge base
- Session management: User data is isolated and erased after session ends 

***Setup***
```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Set up .env with LLAMA_API_KEY and other variables
fastapi dev
```
The backend runs on http://localhost:8000 by default.

## 📱 Frontend

**Tech Stack:** React, TypeScript, Tailwind CSS
***Key Features***
- Language selection: Multilingual UI with easy switching
- Photo upload & chat: Users can upload documents or photos and chat with the AI assistant
- Directions & SOS: Request directions to facilities or send emergency alerts
- Text-to-speech: All responses can be read aloud in the selected language
- Session privacy: All data is erased after session ends

***Setup***
```
cd frontend
npm install
npm start
```
The frontend runs on http://localhost:3000 (proxy to backend as needed).

**⚙️ Environment Variables**
*Backend*
Create a 
.env
 file in 
backend/
 with at least:
```
LLAMA_API_KEY=your_llama_api_key
```
*Frontend*
Create a 
.env
 file in 
frontend/
 with:
```
REACT_APP_API_URL=http://localhost:8000
```

**🤝 Contributing**
1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

**🌐 License**
This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).
See the LICENSE file for full terms.

You may use, remix, and share this project for non-commercial purposes with attribution. For commercial use, contact the author.

**Credits & Contact**
Project by Nicoleta Mocanu & Karunya Penumalla
Contact: nicoleta.mocanu@gmail.com, karunya.penumalla@gmail.com

**💡 About**
Refugee Kiosk is open-source and welcomes contributors, feedback, and support from the global humanitarian tech community.

Built for the Llama 4 Seattle Hackathon 2025
Thanks to Meta, Cerebral Valley, and all participants.
