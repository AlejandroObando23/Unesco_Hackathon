"""
Game + Leaderboard router.

POST /api/game/submit   — evaluate session and save to leaderboard
GET  /api/leaderboard   — return top N entries sorted by score
"""

import os
from fastapi import APIRouter
from app.schemas.game import (
    GameSubmitRequest,
    GameResult,
    LeaderboardEntryPublic,
)
from app.services.evaluation import evaluate_session
import httpx

router = APIRouter(tags=["Game"])

DATABASE_URL = os.getenv("DATABASE_API_URL", "http://localhost:8001")


@router.post("/api/game/submit", response_model=GameResult)
async def submit_game(
    payload: GameSubmitRequest,
) -> GameResult:
    """
    Evaluate the player's decisions, persist the leaderboard entry,
    and return the MIL report. No authentication required.
    """
    result = await evaluate_session(
        decisions=payload.decisions,
        session_start_iso=payload.session_start_iso,
    )

    # Persist to leaderboard
    async with httpx.AsyncClient() as client:
        await client.post(f"{DATABASE_URL}/api/leaderboard", json={
            "player_name": payload.player_name,
            "score": result.score,
            "correct": result.correct,
            "wrong": result.wrong,
            "omitted": result.omitted,
            "accuracy_pct": result.accuracy_pct,
            "duration_s": result.duration_s,
        })

    return result


@router.get("/api/leaderboard", response_model=list[LeaderboardEntryPublic])
async def get_leaderboard(
    limit: int = 20,
) -> list[LeaderboardEntryPublic]:
    """
    Returns the top N leaderboard entries sorted by score descending.
    """
    async with httpx.AsyncClient() as client:
        resp = await client.get(f"{DATABASE_URL}/api/leaderboard", params={"limit": limit})
        resp.raise_for_status()
        entries = resp.json()

    return [LeaderboardEntryPublic.model_validate(e) for e in entries]
