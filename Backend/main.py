import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client
from dotenv import load_dotenv
import openai

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
OPENAI_KEY = os.getenv("OPENAI_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
openai.api_key = OPENAI_KEY

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  #Add vercel domain here later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    user_id: str
    message: str

@app.get("/")
def home():
    return {"message": "Mentora Backend is running✅"}

@app.post("/chat")
async def chat(request: ChatRequest):
    """Handles chat with OpenAI + stores chat history in Supabase"""
    
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": "You are a personal tech tutor skilled in Python, JavaScript, Docker, Git, CLI and software deployment. Explain clearly and give examples"}
            {"role": "user", "content": request.message},
        ]
    )
    
    reply = response["choices"][0]["message"]["content"]
    
    #Store in Supabase(PostgreSQL)
    supabase.table("chat_history").insert({
        "user_id": request.user_id,
        message: 
    })