"""
Unified Vercel FastAPI Entrypoint
Merges the previous database_api and backend_api.
"""

import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv

# We must import Prisma inside the function or globally but initialize it correctly
from prisma import Prisma

load_dotenv()

db_client = Prisma()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Connect to database
    await db_client.connect()
    yield
    # Disconnect when shutting down
    if db_client.is_connected():
        await db_client.disconnect()

app = FastAPI(
    title="TruthScroll Unified API",
    description="Backend and Database API for TruthScroll (Vercel Serverless)",
    version="3.0.0",
    lifespan=lifespan,
)

FRONTEND_ORIGIN = os.getenv("FRONTEND_ORIGIN", "http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_ORIGIN, "http://localhost:5173", "http://localhost:3000", "https://truthscroll-unesco.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach db_client to app state so routers can access it
app.state.db_client = db_client

# -- Import routers (they will use the db_client from app.state or we pass it explicitly)
from api.routers import posts, game

app.include_router(posts.router)
app.include_router(game.router)

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "service": "TruthScroll Unified API (Vercel)"}
