import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const handleStart = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Ingresa tu nombre o alias para continuar.')
      return
    }
    if (trimmed.length > 30) {
      setError('Máximo 30 caracteres.')
      return
    }
    // Store in sessionStorage so GamePage can access it
    sessionStorage.setItem('ts_player_name', trimmed)
    navigate('/game')
  }

  return (
    <div className="landing-page">
      {/* Animated background */}
      <div className="landing-bg">
        <div className="landing-orb landing-orb-1" />
        <div className="landing-orb landing-orb-2" />
        <div className="landing-orb landing-orb-3" />
        <div className="landing-grid" aria-hidden="true" />
      </div>

      <div className="landing-content">
        {/* Hero */}
        <header className="landing-hero">
          <div className="landing-badge">🌐 UNESCO Hackathon 2026</div>
          <h1 className="landing-title">
            Truth<span className="landing-title-accent">Scroll</span>
          </h1>
          <p className="landing-subtitle">Sifting the Digital Chaos</p>
          <p className="landing-desc">
            Tienes <strong>5 minutos</strong> para navegar un feed social y decidir
            qué es real, qué es falso y qué debes reportar.
            ¿Puedes vencer al caos digital?
          </p>
        </header>

        {/* Stats pills */}
        <div className="landing-pills">
          <div className="pill">⏱ 5 min de juego</div>
          <div className="pill">📰 15 publicaciones</div>
          <div className="pill">📚 Tips MIL personalizados</div>
        </div>

        {/* Name form */}
        <form id="landing-form" onSubmit={handleStart} className="landing-form" noValidate>
          <div className="landing-input-group">
            <label htmlFor="player-name-input" className="landing-label">
              Tu nombre o alias
            </label>
            <input
              id="player-name-input"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError('') }}
              placeholder="ej: Ana, MediaDet3ct0r, Periodista..."
              maxLength={30}
              autoComplete="off"
              autoFocus
              className={`landing-input ${error ? 'landing-input--error' : ''}`}
            />
            {error && <span className="landing-input-error">{error}</span>}
            <span className="landing-char-count">{name.length}/30</span>
          </div>

          <button id="landing-start-btn" type="submit" className="landing-btn">
            <span>🚀 Iniciar Simulación</span>
          </button>
        </form>

        {/* Leaderboard link */}
        <button
          id="landing-leaderboard-btn"
          className="landing-leaderboard-link"
          onClick={() => navigate('/leaderboard')}
        >
          🏆 Ver tabla de líderes
        </button>

        {/* How to play */}
        <section className="landing-howto">
          <h2 className="landing-howto-title">¿Cómo funciona?</h2>
          <ol className="landing-steps">
            <li className="landing-step">
              <span className="step-icon">👁</span>
              <div>
                <strong>Lee</strong> cada publicación del feed social
              </div>
            </li>
            <li className="landing-step">
              <span className="step-icon">🧠</span>
              <div>
                <strong>Decide</strong> si confías, la marcas como falsa o la reportas
              </div>
            </li>
            <li className="landing-step">
              <span className="step-icon">📊</span>
              <div>
                <strong>Recibe</strong> tu reporte MIL con consejos pedagógicos personalizados
              </div>
            </li>
            <li className="landing-step">
              <span className="step-icon">🏆</span>
              <div>
                <strong>Sube</strong> al leaderboard y compite con otros participantes
              </div>
            </li>
          </ol>
        </section>
      </div>
    </div>
  )
}
