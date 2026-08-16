"""Posts router — GET /api/posts/ (no auth required)."""

import os
from fastapi import APIRouter, Request
from api.schemas.post import PublicationPublic

router = APIRouter(prefix="/api/posts", tags=["Posts"])

@router.get("/", response_model=list[PublicationPublic])
async def get_posts(request: Request) -> list[PublicationPublic]:
    """
    Returns all publications for the game feed.
    No auth required — open endpoint.

    SECURITY: PublicationPublic deliberately excludes `is_real` and `mil_tip`.
    """
    db_client = request.app.state.db_client
    pubs = await db_client.publication.find_many(order={"id": "asc"})
    
    # We must format to PublicationPublic. The schema model_validate works with dicts or objects.
    # But since db_client returns Prisma objects, we can just use them.
    return [PublicationPublic.model_validate(pub, from_attributes=True) for pub in pubs]
