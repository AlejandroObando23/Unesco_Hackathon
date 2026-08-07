"""
MIL Evaluation Engine — TruthScroll core business logic.
No auth required — players identified by name only.
"""

import os
from datetime import datetime, timezone
import httpx
from app.schemas.game import (
    DecisionItem,
    DecisionType,
    GameResult,
    MilTipItem,
)

MAX_SESSION_DURATION_S = 300
GRACE_PERIOD_S = 15
SCORE_CORRECT = 10
SCORE_WRONG = -3
SCORE_REPORT_REAL = -5

DATABASE_URL = os.getenv("DATABASE_API_URL", "http://localhost:8001")


async def evaluate_session(
    decisions: list[DecisionItem],
    session_start_iso: str,
) -> GameResult:
    # ── 1. Validate session duration (anti-cheat) ────────────────────────────
    try:
        started_at = datetime.fromisoformat(session_start_iso.replace("Z", "+00:00"))
    except ValueError:
        started_at = datetime.now(timezone.utc)

    now = datetime.now(timezone.utc)
    duration_s = int((now - started_at).total_seconds())
    if duration_s > MAX_SESSION_DURATION_S + GRACE_PERIOD_S:
        duration_s = MAX_SESSION_DURATION_S

    # ── 2. Fetch ground truth ────────────────────────────────────────────────
    post_ids = [d.post_id for d in decisions]
    
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{DATABASE_URL}/api/publications/batch", json={"post_ids": post_ids})
        resp.raise_for_status()
        publications = resp.json()
        
        count_resp = await client.get(f"{DATABASE_URL}/api/publications/count")
        count_resp.raise_for_status()
        total_posts_in_feed = count_resp.json()

    # Convert to objects we can access with dot notation or dict keys
    # JSON decodes to dict, so we use dict access
    pub_map = {p["id"]: p for p in publications}

    # ── 3. Score and collect MIL tips ────────────────────────────────────────
    correct = 0
    wrong = 0
    score = 0
    mil_tips: list[MilTipItem] = []

    for decision in decisions:
        pub = pub_map.get(decision.post_id)
        if not pub:
            continue

        is_real = pub["is_real"]
        is_correct = _is_decision_correct(decision.decision, is_real)

        if is_correct:
            correct += 1
            score += SCORE_CORRECT
        else:
            wrong += 1
            if decision.decision == DecisionType.REPORT and is_real:
                score += SCORE_REPORT_REAL
            else:
                score += SCORE_WRONG

            mil_tips.append(MilTipItem(
                post_id=pub["id"],
                user_decision=decision.decision,
                correct_answer="Real" if is_real else "Fake",
                tip=pub["mil_tip"],
                category=pub["category"],
            ))

    omitted = total_posts_in_feed - len(decisions)
    score = max(0, score)
    accuracy_pct = round((correct / len(decisions) * 100) if decisions else 0.0, 1)
    message = _generate_feedback_message(accuracy_pct)

    return GameResult(
        score=score,
        correct=correct,
        wrong=wrong,
        omitted=omitted,
        total_posts=total_posts_in_feed,
        accuracy_pct=accuracy_pct,
        duration_s=duration_s,
        mil_tips=mil_tips,
        message=message,
    )


def _is_decision_correct(decision: DecisionType, is_real: bool) -> bool:
    if decision == DecisionType.TRUST and is_real:
        return True
    if decision == DecisionType.FAKE and not is_real:
        return True
    if decision == DecisionType.REPORT and not is_real:
        return True
    return False


def _generate_feedback_message(accuracy: float) -> str:
    if accuracy >= 90:
        return "¡Excelente! Eres un experto en detectar desinformación. El mundo digital necesita personas como tú."
    elif accuracy >= 70:
        return "¡Bien hecho! Tienes buenas habilidades de alfabetización mediática. Revisa los consejos para mejorar aún más."
    elif accuracy >= 50:
        return "Vas por buen camino, pero la desinformación puede ser engañosa. Estudia los consejos MIL para fortalecer tu criterio."
    else:
        return "El caos digital es un desafío. No te desanimes — la alfabetización mediática es una habilidad que se entrena. ¡Inténtalo de nuevo!"
