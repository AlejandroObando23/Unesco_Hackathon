import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameState } from '../hooks/useGameState'
import PostCard from '../components/PostCard'
import DecisionBar from '../components/DecisionBar'
import Timer from '../components/Timer'
import Scoreboard from '../components/Scoreboard'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import './GamePage.css'

export default function GamePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Read player name from session storage (set on LandingPage)
  const playerName = sessionStorage.getItem('ts_player_name') || 'Jugador'

  // Redirect to landing if no name stored
  useEffect(() => {
    if (!sessionStorage.getItem('ts_player_name')) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const {
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
    totalPosts,
    progressPct,
  } = useGameState(playerName)

  // Redirect to results once we have result
  useEffect(() => {
    if (isGameOver && sessionResult) {
      navigate('/results', { state: { result: sessionResult, playerName } })
    }
  }, [isGameOver, sessionResult, navigate, playerName])

  if (loading) {
    return (
      <div className="game-loading">
        <div className="game-loading-spinner" />
        <p>{t('game.loading')}</p>
      </div>
    )
  }

  if (error && !isGameOver) {
    return (
      <div className="game-error">
        <span>⚠️</span>
        <p>{error}</p>
        <button onClick={() => navigate('/')} className="game-retry-btn">
          {t('game.errorRetry')}
        </button>
      </div>
    )
  }

  if (isGameOver && submitting) {
    return (
      <div className="game-loading">
        <div className="game-loading-spinner" />
        <p dangerouslySetInnerHTML={{ __html: t('game.evaluating', { name: playerName }) }}></p>
      </div>
    )
  }

  return (
    <div className="game-page">
      <LanguageSwitcher />
      <header className="game-header">
        <div className="game-header-inner">
          <div className="game-brand">
            <span className="game-brand-icon">🔍</span>
            <span className="game-brand-name">TruthScroll</span>
          </div>
          <span className="game-player-name">👤 {playerName}</span>
          <button
            id="game-end-btn"
            className="game-end-btn"
            onClick={endGame}
            aria-label="Terminar partida anticipadamente"
          >
            {t('game.endBtn')}
          </button>
        </div>
      </header>

      <Timer timeLeft={timeLeft} />

      <Scoreboard
        currentIndex={currentIndex}
        totalPosts={totalPosts}
        decisionsCount={decisions.length}
        progressPct={progressPct}
      />

      <main className="game-feed" role="main">
        <div className="game-feed-inner">
          {posts[currentIndex] ? (
            <PostCard
              key={posts[currentIndex].id}
              post={posts[currentIndex]}
              index={currentIndex}
              total={totalPosts}
            />
          ) : (
            <div className="game-feed-done">
              <span>🎉</span>
              <p>{t('game.done')}</p>
              <button id="game-submit-btn" className="game-submit-btn" onClick={endGame}>
                {t('game.resultsBtn')}
              </button>
            </div>
          )}
        </div>
      </main>

      <DecisionBar
        onDecision={makeDecision}
        disabled={isGameOver || !posts[currentIndex]}
      />
    </div>
  )
}
