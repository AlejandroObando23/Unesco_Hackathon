"""Pydantic schemas for Game and Leaderboard endpoints."""

from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Literal, Optional
from enum import Enum


class DecisionType(str, Enum):
    TRUST = "Trust"
    FAKE = "Fake"
    REPORT = "Report"


class DecisionItem(BaseModel):
    post_id: int
    decision: DecisionType


class GameSubmitRequest(BaseModel):
    """
    Request body for POST /api/game/submit.
    No auth required — player identifies by name only.
    """
    player_name: str
    decisions: list[DecisionItem]
    session_start_iso: str

    @field_validator("player_name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("player_name cannot be empty")
        return v[:30]  # Cap at 30 chars

    @field_validator("decisions")
    @classmethod
    def decisions_not_empty(cls, v: list) -> list:
        if not v:
            raise ValueError("decisions list cannot be empty")
        return v


class MilTipItem(BaseModel):
    post_id: int
    user_decision: DecisionType
    correct_answer: Literal["Real", "Fake"]
    tip: str
    tip_en: Optional[str] = None
    category: Optional[str] = None


class GameResult(BaseModel):
    score: int
    correct: int
    wrong: int
    omitted: int
    total_posts: int
    accuracy_pct: float
    duration_s: int
    mil_tips: list[MilTipItem]
    message: str


class LeaderboardEntryPublic(BaseModel):
    """A single leaderboard entry returned to the client."""
    id: int
    player_name: str
    score: int
    correct: int
    accuracy_pct: float
    duration_s: int
    created_at: datetime

    class Config:
        from_attributes = True
