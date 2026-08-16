import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getLeaderboard } from '../services/api'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import './ResultsPage.css'


export default function ResultsPage() {
  const { t, i18n } = useTranslation()
  const { state } = useLocation()
  const navigate = useNavigate()
  const result = state?.result
  const playerName = state?.playerName || sessionStorage.getItem('ts_player_name') || t('results.player')

  const [saved, setSaved] = useState(false)

  // Score was already saved when the game submitted — we just show confirmation
  // The backend saves to leaderboard automatically on submit
  const handleViewLeaderboard = () => navigate('/leaderboard')

  const handlePlayAgain = () => {
    sessionStorage.removeItem('ts_player_name')
    navigate('/')
  }

  if (!result) {
    return (
      <div className="results-empty">
        <p>{t('results.noResults', 'No hay resultados disponibles.')}</p>
        <button onClick={() => navigate('/')} className="results-btn-primary" style={{ border: 'none', cursor: 'pointer' }}>
          {t('lead.homeBtn')}
        </button>
      </div>
    )
  }

  const {
    score, correct, wrong, omitted, total_posts,
    accuracy_pct, duration_s, mil_tips, message
  } = result

  const minutes = Math.floor(duration_s / 60)
  const seconds = duration_s % 60
  const durationLabel = `${minutes}m ${seconds}s`
  const accuracyColor = accuracy_pct >= 70 ? '#4ecdc4' : accuracy_pct >= 50 ? '#fbbf24' : '#ff6b6b'

  return (
    <div className="results-page">
      <LanguageSwitcher />
      <div className="results-bg">
        <div className="results-orb results-orb-1" />
        <div className="results-orb results-orb-2" />
      </div>

      <div className="results-content">
        {/* Header */}
        <header className="results-header">
          <span className="results-header-icon">🔍</span>
          <h1 className="results-title">{t('results.title')}</h1>
          <p className="results-subtitle">{t('results.report')} — {playerName}</p>
        </header>

        {/* Score hero */}
        <section className="results-hero" aria-label="Puntuación final">
          <div className="results-score-ring" style={{ '--accent': accuracyColor }}>
            <span className="results-score-value">{score}</span>
            <span className="results-score-label">{t('results.pts', 'puntos')}</span>
          </div>
          <p className="results-message">{t(message, message)}</p>
        </section>

        {/* Leaderboard saved banner */}
        <div className="results-saved-banner">
          <span>🏆</span>
          <p dangerouslySetInnerHTML={{ __html: t('results.saved') + ` <strong>${playerName}</strong>` }}></p>
        </div>

        {/* Stats grid */}
        <section className="results-stats" aria-label="Estadísticas de la partida">
          <div className="stat-card stat-correct">
            <span className="stat-icon">✅</span>
            <span className="stat-value">{correct}</span>
            <span className="stat-label">{t('results.correct')}</span>
          </div>
          <div className="stat-card stat-wrong">
            <span className="stat-icon">❌</span>
            <span className="stat-value">{wrong}</span>
            <span className="stat-label">{t('results.errors')}</span>
          </div>
          <div className="stat-card stat-omitted">
            <span className="stat-icon">⏭</span>
            <span className="stat-value">{omitted}</span>
            <span className="stat-label">{t('results.omitted')}</span>
          </div>
          <div className="stat-card stat-accuracy">
            <span className="stat-icon">🎯</span>
            <span className="stat-value" style={{ color: accuracyColor }}>{accuracy_pct}%</span>
            <span className="stat-label">{t('results.accuracy')}</span>
          </div>
          <div className="stat-card stat-time">
            <span className="stat-icon">⏱</span>
            <span className="stat-value">{durationLabel}</span>
            <span className="stat-label">{t('results.time')}</span>
          </div>
          <div className="stat-card stat-total">
            <span className="stat-icon">📋</span>
            <span className="stat-value">{total_posts}</span>
            <span className="stat-label">{t('results.totalPosts', 'Total posts')}</span>
          </div>
        </section>

        {/* MIL Tips */}
        {mil_tips?.length > 0 ? (
          <section className="results-mil-section" aria-label="Consejos de alfabetización mediática">
            <h2 className="results-mil-title">
              {t('results.milTitle')}
              <span className="results-mil-count">{mil_tips.length}</span>
            </h2>
            <p className="results-mil-intro">
              {t('results.milIntro')}
            </p>
            <ul className="mil-tips-list">
              {mil_tips.map((tip, i) => {
                const isEn = i18n.language === 'en';
                const tipText = isEn && tip.tip_en ? tip.tip_en : tip.tip;
                return (
                  <li key={tip.post_id} className="mil-tip-card">
                    <div className="mil-tip-header">
                      <span className="mil-tip-num">#{i + 1}</span>
                      <div className="mil-tip-meta">
                        <span className="mil-tip-category">
                          {t(`results.${tip.category}`)}
                        </span>
                        <span className="mil-tip-decision">
                          {t('results.youDecided')}: <strong>{t(`decision.${tip.user_decision.toLowerCase()}`, tip.user_decision)}</strong> →
                          {t('results.correctAnswer')}: <strong style={{ color: '#4ecdc4' }}>{t(`decision.${tip.correct_answer.toLowerCase()}`, tip.correct_answer)}</strong>
                        </span>
                      </div>
                    </div>
                    <p className="mil-tip-text">💡 {tipText}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <section className="results-perfect">
            <span>🏆</span>
            <p>{t('results.perfect')}</p>
          </section>
        )}

        {/* Actions */}
        <div className="results-actions">
          <button
            id="results-leaderboard-btn"
            className="results-btn-primary"
            onClick={handleViewLeaderboard}
          >
            🏆 {t('results.leaderboardBtn')}
          </button>
          <button
            id="results-play-again-btn"
            className="results-btn-secondary"
            onClick={handlePlayAgain}
          >
            🔄 {t('results.playAgain')}
          </button>
        </div>
      </div>
    </div>
  )
}
