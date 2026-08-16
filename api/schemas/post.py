"""Pydantic schemas for Publication endpoints."""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class PublicationPublic(BaseModel):
    """
    Safe response schema — deliberately omits is_real and mil_tip
    to prevent client-side cheating (Anti-Trampa strategy).
    """
    id: int
    text_content: str
    text_content_en: str
    media_url: Optional[str] = None
    category: Optional[str] = None
    author_name: Optional[str] = None
    author_handle: Optional[str] = None
    likes_count: int = 0
    created_at: datetime

    class Config:
        from_attributes = True


class PublicationFull(PublicationPublic):
    """
    Internal-only schema used by the evaluation engine.
    Never returned directly to the client.
    """
    is_real: bool
    mil_tip: str
    mil_tip_en: str
