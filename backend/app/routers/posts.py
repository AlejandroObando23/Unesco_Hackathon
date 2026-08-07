"""Posts router — GET /api/posts/ (no auth required)."""

import os
from fastapi import APIRouter
from app.schemas.post import PublicationPublic
import httpx

router = APIRouter(prefix="/api/posts", tags=["Posts"])

DATABASE_URL = os.getenv("DATABASE_API_URL", "http://localhost:8001")

@router.get("/", response_model=list[PublicationPublic])
async def get_posts() -> list[PublicationPublic]:
    """
    Returns all publications for the game feed.
    No auth required — open endpoint.

    SECURITY: PublicationPublic deliberately excludes `is_real` and `mil_tip`.
    """
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{DATABASE_URL}/api/publications")
        resp.raise_for_status()
        publications = resp.json()
    
    return [PublicationPublic.model_validate(pub) for pub in publications]
