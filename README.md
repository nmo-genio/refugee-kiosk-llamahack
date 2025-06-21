# Refugee Kiosk – LlamaHack Seattle 2025

**AI-powered, multilingual digital kiosk for refugees and disaster survivors.**  
Built for the Llama 4 Hackathon, Refugee Kiosk provides instant document/photo translation, step-by-step form assistance, and optional form-filling—all with privacy and accessibility at its core.

---

## 🚀 Overview

**Refugee Kiosk** uses Meta’s Llama 4 model to bridge information, language, and connection gaps for people affected by war or disaster.

**Features:**
- **Document & photo translation:** Upload forms, flyers, or notes and get instant translation and step-by-step instructions.
- **Form-filling assistant:** Optionally, the kiosk will ask for your info field-by-field and fill out the form for you, returning a completed PDF.
- **Facility navigation (future):** Find food, water, medical tents, hygiene, supplies, and communication centers on a simple map.
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

## Prerequisites

- Node.js (v16 or later)
- Python (v3.8 or later)
- npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Set up environment variables (create a `.env` file based on `.env.example`)
4. Run the backend server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Backend
PORT=5000
DATABASE_URL=your_database_connection_string
SECRET_KEY=your_secret_key

# Frontend
REACT_APP_API_URL=http://localhost:5000
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

#🌐 License
This work is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).
See the LICENSE file for full terms.

You may use, remix, and share this project for non-commercial purposes with attribution. For commercial use, contact the author.

Credits & Contact
Project by Nicoleta Mocanu & Karunya Penumalla
Contact: nicoleta.mocanu@gmail.com, karunya.penumalla@gmail.com

💡 About
Refugee Kiosk is open-source and welcomes contributors, feedback, and support from the global humanitarian tech community.

Built for the Llama 4 Seattle Hackathon 2025
Thanks to Meta, Cerebral Valley, and all participants.
