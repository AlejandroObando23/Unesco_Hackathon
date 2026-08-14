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

      <div className="landing-content landing-content-split">
        {/* Left Column: Form */}
        <div className="landing-column landing-column-left">
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
        </div>

        {/* Right Column: Visual Art (Conceptual) */}
        <div className="landing-column landing-column-right">
          <div className="landing-art-container">
            {/* Placeholder for conceptual art / welcome message */}
            <div className="landing-art-placeholder">
              {/* TODO: Replace with actual image asset 
                  Location: frontend/src/assets/login-welcome-art.svg (or .png)
                  Add: <img src={loginArt} alt="Bienvenida a TruthScroll" /> */}
              <svg
                viewBox="0 0 300 400"
                className="landing-art-svg"
                aria-label="Arte conceptual de bienvenida"
              >
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#e94560" />
                  </linearGradient>
                </defs>
                {/* Animated gradient circles */}
                <circle cx="150" cy="100" r="50" fill="url(#grad1)" opacity="0.3" />
                <circle cx="100" cy="200" r="40" fill="#4ecdc4" opacity="0.2" />
                <circle cx="200" cy="250" r="35" fill="#a78bfa" opacity="0.2" />
                {/* Decorative grid */}
                <g stroke="rgba(102,126,234,0.1)" strokeWidth="1">
                  <line x1="0" y1="50" x2="300" y2="50" />
                  <line x1="0" y1="100" x2="300" y2="100" />
                  <line x1="0" y1="150" x2="300" y2="150" />
                  <line x1="0" y1="200" x2="300" y2="200" />
                  <line x1="0" y1="250" x2="300" y2="250" />
                  <line x1="0" y1="300" x2="300" y2="300" />
                  <line x1="0" y1="350" x2="300" y2="350" />
                  <line x1="50" y1="0" x2="50" y2="400" />
                  <line x1="100" y1="0" x2="100" y2="400" />
                  <line x1="150" y1="0" x2="150" y2="400" />
                  <line x1="200" y1="0" x2="200" y2="400" />
                  <line x1="250" y1="0" x2="250" y2="400" />
                </g>
                {/* Welcome text */}
                <text
                  x="150"
                  y="180"
                  textAnchor="middle"
                  fontSize="18"
                  fill="#e2e8f0"
                  opacity="0.7"
                >
                  Bienvenido a
                </text>
                <text
                  x="150"
                  y="210"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="bold"
                  fill="#667eea"
                >
                  TruthScroll
                </text>
                <text
                  x="150"
                  y="250"
                  textAnchor="middle"
                  fontSize="14"
                  fill="#94a3b8"
                  opacity="0.6"
                >
                  Aprende a detectar
                </text>
                <text
                  x="150"
                  y="270"
                  textAnchor="middle"
                  fontSize="14"
                  fill="#94a3b8"
                  opacity="0.6"
                >
                  desinformación
                </text>
              </svg>
            </div>
            {/* Hero and descriptive text */}
            <header className="landing-hero-right">
              <h1 className="landing-title-right">
                Truth<span className="landing-title-accent">Scroll</span>
              </h1>
              <p className="landing-subtitle-right">Sifting the Digital Chaos</p>
              <p className="landing-desc-right">
                Tienes <strong>5 minutos</strong> para navegar un feed social y decidir
                qué es real, qué es falso y qué debes reportar.
                <br />¿Puedes vencer al caos digital?
              </p>
            </header>

            {/* Stats pills */}
            <div className="landing-pills-right">
              <div className="pill">⏱ 5 min de juego</div>
              <div className="pill">📰 15 publicaciones</div>
              <div className="pill">📚 Tips MIL personalizados</div>
            </div>
          </div>
        </div>
      </div>

      {/* How to play (full width) */}
      <section className="landing-howto-section">
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
    )
  )
}
