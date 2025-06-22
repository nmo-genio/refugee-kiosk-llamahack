from fastapi import FastAPI, UploadFile, Form, HTTPException, Header
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Optional
import os
import json
from pydantic import BaseModel
import shutil

from llama_api import (
    chatWithLLAMA,
    translateText,
    getFormDetails,
    getHandWrittenTextFromImage,
    classfyImage,
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    prompt: str
    language: str


# In-memory session storage
sessions: Dict[str, Dict] = {}

# Ensure temp folder exists
os.makedirs("temp", exist_ok=True)


@app.get("/")
async def root():
    return {"message": "Welcome to Refugee Kiosk API"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/api/upload-image")
async def upload_image(
    file: UploadFile,
    language: str = Form(...),
    session_id: Optional[str] = Header(None, alias="Session-ID"),
):
    if not session_id:
        raise HTTPException(status_code=400, detail="Session-ID header is required")

    session_dir = f"temp/{session_id}"
    os.makedirs(session_dir, exist_ok=True)

    # Sanitize filename
    original_filename = file.filename
    safe_filename = "".join(
        c for c in original_filename if c.isalnum() or c in (".", "_")
    ).rstrip()
    file_path = os.path.join(session_dir, safe_filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    ImageType = classfyImage(file_path)

    reply_text = ""
    initial_prompt = ""

    if ImageType.get("isForm"):
        form_details = getFormDetails(file_path)
        initial_prompt = f"The form details are as follows: {form_details} explain this to me, a refugee in greece"
    elif (
        ImageType.get("isNote")
        or ImageType.get("isOtherText")
        or ImageType.get("isDirections")
    ):
        hand_written_text = getHandWrittenTextFromImage(file_path, language=language)
        initial_prompt = f"I was handed a note with the following text: {hand_written_text} explain this to me, a refugee in greece"
    else:
        return {
            "reply": translateText(
                "The uploaded image is not relevant for refugee assistance.",
                target_language=language,
            )
        }

    result = chatWithLLAMA(
        initial_prompt,
        ImagePath=file_path,
        session_id=session_id,
    )

    if isinstance(result, tuple):
        response_text, totalChat = result
    else:
        response_text, totalChat = result, None

    translated_text = translateText(response_text, target_language=language)
    reply_text = translated_text

    chat_json_path = f"{session_dir}/chat.json"
    if totalChat:
        with open(chat_json_path, "w") as chat_file:
            json.dump(totalChat, chat_file)

    return {"reply": reply_text}


@app.post("/api/chat")
async def chat_with_ai(
    chat_message: ChatMessage,
    session_id: Optional[str] = Header(None, alias="Session-ID"),
):
    if not session_id:
        raise HTTPException(status_code=400, detail="Session-ID header is required")

    session_dir = f"temp/{session_id}"
    chat_json_path = f"{session_dir}/chat.json"

    if not os.path.exists(session_dir):
        os.makedirs(session_dir)

    previous_messages = []
    if os.path.exists(chat_json_path):
        with open(chat_json_path, "r") as chat_file:
            try:
                previous_messages = json.load(chat_file)
            except json.JSONDecodeError:
                previous_messages = []

    result = chatWithLLAMA(
        chat_message.prompt, session_id=session_id, PreviousMessages=previous_messages
    )
    if isinstance(result, tuple):
        response_text, totalChat = result
    else:
        response_text, totalChat = result, None

    if totalChat:
        with open(chat_json_path, "w") as chat_file:
            json.dump(totalChat, chat_file)

    translated_text = translateText(
        response_text, target_language=chat_message.language
    )

    return {"reply": translated_text}


@app.get("/images/{image_name}")
async def serve_image(image_name: str):
    file_path = f"temp/{image_name}"
    if os.path.exists(file_path):
        return FileResponse(file_path)
    else:
        raise HTTPException(status_code=404, detail="Image not found")


@app.post("/close-session")
async def close_session(session_id: str):
    session_dir = f"temp/{session_id}"
    if os.path.exists(session_dir):
        shutil.rmtree(session_dir)
        return {"message": "Session closed successfully"}
    else:
        raise HTTPException(status_code=404, detail="Session not found")
