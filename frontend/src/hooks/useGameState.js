import { useState, useEffect, useCallback, useRef } from 'react'
import { getPosts, submitGame } from '../services/api'
import { useTranslation } from 'react-i18next'

const GAME_DURATION_MS = 5 * 60 * 1000 // 5 minutes

export function useGameState(playerName) {
  const { t } = useTranslation()
  const [posts, setPosts] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [decisions, setDecisions] = useState([])
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION_MS)
  const [isGameOver, setIsGameOver] = useState(false)
  const [sessionResult, setSessionResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const sessionStartRef = useRef(new Date().toISOString())
  const timerRef = useRef(null)
  const hasSubmittedRef = useRef(false)
  // Keep a stable ref to current decisions to avoid stale closure in endGame
  const decisionsRef = useRef([])

  // Load posts on mount
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPosts()
        setPosts(data.slice(0, 15))
        sessionStartRef.current = new Date().toISOString()
      } catch {
        setError(t('game.errorLoadFeed', 'No se pudo cargar el feed. Verifica tu conexión.'))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  // Keep decisionsRef in sync
  useEffect(() => {
    decisionsRef.current = decisions
  }, [decisions])

  // Timer countdown
  useEffect(() => {
    if (loading || isGameOver) return

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 100) {
          clearInterval(timerRef.current)
          endGame()
          return 0
        }
        return prev - 100
      })
    }, 100)

    return () => clearInterval(timerRef.current)
  }, [loading, isGameOver]) // eslint-disable-line

  const makeDecision = useCallback((decision) => {
    const post = posts[currentIndex]
    if (!post || isGameOver) return

    const newDecision = { post_id: post.id, decision }

    setDecisions((prev) => {
      if (prev.find((d) => d.post_id === post.id)) return prev
      const updated = [...prev, newDecision]
      decisionsRef.current = updated
      return updated
    })

    if (currentIndex < posts.length - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      endGame()
    }
  }, [posts, currentIndex, isGameOver]) // eslint-disable-line

  const endGame = useCallback(async () => {
    if (hasSubmittedRef.current) return
    hasSubmittedRef.current = true

    clearInterval(timerRef.current)
    setIsGameOver(true)
    setSubmitting(true)

    try {
      const result = await submitGame(
        playerName,
        decisionsRef.current,
        sessionStartRef.current,
      )
      setSessionResult(result)
    } catch {
      setError(t('game.errorSubmit', 'Error al enviar resultados. Intenta de nuevo.'))
    } finally {
      setSubmitting(false)
    }
  }, [playerName])

  const restartGame = useCallback(() => {
    hasSubmittedRef.current = false
    decisionsRef.current = []
    sessionStartRef.current = new Date().toISOString()
    setCurrentIndex(0)
    setDecisions([])
    setTimeLeft(GAME_DURATION_MS)
    setIsGameOver(false)
    setSessionResult(null)
    setSubmitting(false)
    setError(null)
    // Reload posts
    setLoading(true)
    getPosts()
      .then((data) => setPosts(data.slice(0, 15)))
      .catch(() => setError(t('game.errorLoadFeed', 'No se pudo cargar el feed.')))
      .finally(() => setLoading(false))
  }, [])

  return {
    posts,
    currentIndex,
    decisions,
    timeLeft,
    isGameOver,
    sessionResult,
    loading,
    submitting,
    error,
    makeDecision,
    endGame,
    restartGame,
    totalPosts: posts.length,
    progressPct: posts.length ? (currentIndex / posts.length) * 100 : 0,
  }
}
