"""
Game + Leaderboard router.

POST /api/game/submit   — evaluate session and save to leaderboard
GET  /api/leaderboard   — return top N entries sorted by score
"""

import os
from fastapi import APIRouter, Request
from api.schemas.game import (
    GameSubmitRequest,
    GameResult,
    LeaderboardEntryPublic,
)
from api.services.evaluation import evaluate_session

router = APIRouter(tags=["Game"])

@router.post("/api/game/submit", response_model=GameResult)
async def submit_game(
    payload: GameSubmitRequest,
    request: Request
) -> GameResult:
    """
    Evaluate the player's decisions, persist the leaderboard entry,
    and return the MIL report. No authentication required.
    """
    result = await evaluate_session(
        decisions=payload.decisions,
        session_start_iso=payload.session_start_iso,
        db_client=request.app.state.db_client
    )

    # Persist to leaderboard
    await request.app.state.db_client.leaderboardentry.create(data={
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
    request: Request,
    limit: int = 20,
) -> list[LeaderboardEntryPublic]:
    """
    Returns the top N leaderboard entries sorted by score descending.
    """
    entries = await request.app.state.db_client.leaderboardentry.find_many(
        order={"score": "desc"},
        take=limit,
    )

    return [LeaderboardEntryPublic.model_validate(e, from_attributes=True) for e in entries]
