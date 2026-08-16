import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from prisma import Prisma
from dotenv import load_dotenv

load_dotenv()

db_client: Prisma | None = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global db_client
    db_client = Prisma()
    await db_client.connect()
    yield
    if db_client and db_client.is_connected():
        await db_client.disconnect()

app = FastAPI(
    title="Database API",
    description="Microservicio de persistencia de datos para TruthScroll usando Prisma.",
    version="1.0.0",
    lifespan=lifespan,
    # /docs is enabled by default in FastAPI
)

# --- SCHEMAS ---

class PublicationPublic(BaseModel):
    id: int
    text_content: str
    text_content_en: str
    media_url: Optional[str] = None
    category: Optional[str] = None
    author_name: Optional[str] = None
    author_handle: Optional[str] = None
    likes_count: int
    created_at: str

    @classmethod
    def from_prisma(cls, pub):
        return cls(
            id=pub.id,
            text_content=pub.text_content,
            text_content_en=pub.text_content_en,
            media_url=pub.media_url,
            category=pub.category,
            author_name=pub.author_name,
            author_handle=pub.author_handle,
            likes_count=pub.likes_count,
            created_at=pub.created_at.isoformat()
        )

class PublicationInternal(PublicationPublic):
    is_real: bool
    mil_tip: str
    mil_tip_en: str
    
    @classmethod
    def from_prisma(cls, pub):
        return cls(
            id=pub.id,
            text_content=pub.text_content,
            text_content_en=pub.text_content_en,
            media_url=pub.media_url,
            category=pub.category,
            author_name=pub.author_name,
            author_handle=pub.author_handle,
            likes_count=pub.likes_count,
            created_at=pub.created_at.isoformat(),
            is_real=pub.is_real,
            mil_tip=pub.mil_tip,
            mil_tip_en=pub.mil_tip_en
        )

class BatchRequest(BaseModel):
    post_ids: List[int]

class LeaderboardCreate(BaseModel):
    player_name: str
    score: int
    correct: int
    wrong: int
    omitted: int
    accuracy_pct: float
    duration_s: int

# --- ENDPOINTS ---

@app.get("/api/publications", response_model=List[PublicationPublic])
async def get_all_publications():
    """Returns all publications for the game feed (excluding answers)."""
    pubs = await db_client.publication.find_many(order={"id": "asc"})
    return [PublicationPublic.from_prisma(p) for p in pubs]

@app.post("/api/publications/batch", response_model=List[PublicationInternal])
async def get_publications_batch(req: BatchRequest):
    """Returns full details of publications (including answers) by IDs."""
    pubs = await db_client.publication.find_many(where={"id": {"in": req.post_ids}})
    return [PublicationInternal.from_prisma(p) for p in pubs]

@app.get("/api/publications/count", response_model=int)
async def get_publications_count():
    """Returns total count of publications."""
    return await db_client.publication.count()

@app.post("/api/leaderboard")
async def create_leaderboard_entry(entry: LeaderboardCreate):
    """Create a new leaderboard entry."""
    new_entry = await db_client.leaderboardentry.create(data={
        "player_name": entry.player_name,
        "score": entry.score,
        "correct": entry.correct,
        "wrong": entry.wrong,
        "omitted": entry.omitted,
        "accuracy_pct": entry.accuracy_pct,
        "duration_s": entry.duration_s,
    })
    return {"status": "success", "id": new_entry.id}

@app.get("/api/leaderboard")
async def get_leaderboard(limit: int = 20):
    """Returns the top N leaderboard entries sorted by score descending."""
    entries = await db_client.leaderboardentry.find_many(
        order={"score": "desc"},
        take=limit,
    )
    return [
        {
            "id": e.id,
            "player_name": e.player_name,
            "score": e.score,
            "correct": e.correct,
            "wrong": e.wrong,
            "omitted": e.omitted,
            "accuracy_pct": e.accuracy_pct,
            "duration_s": e.duration_s,
            "created_at": e.created_at.isoformat()
        } for e in entries
    ]

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "Database API"}
