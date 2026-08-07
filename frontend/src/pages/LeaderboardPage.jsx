import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLeaderboard } from '../services/api'
import './LeaderboardPage.css'

const MEDALS = ['🥇', '🥈', '🥉']

function formatDuration(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60) return 'hace un momento'
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`
  return `hace ${Math.floor(diff / 86400)} días`
}

export default function LeaderboardPage() {
  const navigate = useNavigate()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Current player's name from session (to highlight their row)
  const currentPlayer = sessionStorage.getItem('ts_player_name')

  useEffect(() => {
    getLeaderboard(50)
      .then(setEntries)
      .catch(() => setError('No se pudo cargar el leaderboard.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="lb-page">
      {/* Background */}
      <div className="lb-bg">
        <div className="lb-orb lb-orb-1" />
        <div className="lb-orb lb-orb-2" />
        <div className="lb-grid" aria-hidden="true" />
      </div>

      <div className="lb-content">
        {/* Header */}
        <header className="lb-header">
          <button
            id="lb-back-btn"
            className="lb-back-btn"
            onClick={() => navigate('/')}
            aria-label="Volver al inicio"
          >
            ← Volver
          </button>
          <div className="lb-title-group">
            <h1 className="lb-title">🏆 Tabla de Líderes</h1>
            <p className="lb-subtitle">TruthScroll — Sifting the Digital Chaos</p>
          </div>
          <button
            id="lb-play-btn"
            className="lb-play-btn"
            onClick={() => {
              sessionStorage.removeItem('ts_player_name')
              navigate('/')
            }}
          >
            Jugar
          </button>
        </header>

        {/* Top 3 podium */}
        {!loading && entries.length >= 3 && (
          <section className="lb-podium" aria-label="Top 3 jugadores">
            {/* Reorder for podium: 2nd, 1st, 3rd */}
            {[entries[1], entries[0], entries[2]].map((entry, podiumIdx) => {
              if (!entry) return null
              const rank = podiumIdx === 1 ? 1 : podiumIdx === 0 ? 2 : 3
              const heights = ['80px', '110px', '65px']
              return (
                <div
                  key={entry.id}
                  className={`podium-item podium-rank-${rank}`}
                  style={{ '--podium-h': heights[podiumIdx] }}
                >
                  <span className="podium-medal">{MEDALS[rank - 1]}</span>
                  <span className="podium-name">{entry.player_name}</span>
                  <span className="podium-score">{entry.score} pts</span>
                  <div className="podium-bar" />
                  <span className="podium-rank-num">#{rank}</span>
                </div>
              )
            })}
          </section>
        )}

        {/* Full table */}
        <section className="lb-table-section" aria-label="Tabla completa de puntajes">
          {loading ? (
            <div className="lb-loading">
              <div className="lb-spinner" />
              <p>Cargando clasificación...</p>
            </div>
          ) : error ? (
            <div className="lb-error">
              <p>⚠ {error}</p>
              <button onClick={() => window.location.reload()} className="lb-retry-btn">
                Reintentar
              </button>
            </div>
          ) : entries.length === 0 ? (
            <div className="lb-empty">
              <span>🎮</span>
              <p>¡Sé el primero en jugar y aparecer aquí!</p>
              <button
                id="lb-first-play-btn"
                className="lb-cta-btn"
                onClick={() => { sessionStorage.removeItem('ts_player_name'); navigate('/') }}
              >
                Jugar ahora
              </button>
            </div>
          ) : (
            <div className="lb-table-wrapper">
              <table className="lb-table" role="table" aria-label="Tabla de puntajes">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Jugador</th>
                    <th scope="col">Puntos</th>
                    <th scope="col">Precisión</th>
                    <th scope="col">Correctos</th>
                    <th scope="col">Tiempo</th>
                    <th scope="col">Cuando</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, i) => {
                    const isCurrentPlayer = entry.player_name === currentPlayer
                    return (
                      <tr
                        key={entry.id}
                        className={`lb-row ${isCurrentPlayer ? 'lb-row--highlight' : ''}`}
                      >
                        <td className="lb-cell-rank">
                          {i < 3
                            ? <span className="lb-medal">{MEDALS[i]}</span>
                            : <span className="lb-rank-num">{i + 1}</span>
                          }
                        </td>
                        <td className="lb-cell-name">
                          {entry.player_name}
                          {isCurrentPlayer && <span className="lb-you-badge">tú</span>}
                        </td>
                        <td className="lb-cell-score">{entry.score}</td>
                        <td className="lb-cell-accuracy">
                          <span
                            className="lb-accuracy-pill"
                            style={{
                              color: entry.accuracy_pct >= 70 ? '#4ecdc4'
                                   : entry.accuracy_pct >= 50 ? '#fbbf24'
                                   : '#ff6b6b'
                            }}
                          >
                            {entry.accuracy_pct}%
                          </span>
                        </td>
                        <td className="lb-cell-correct">{entry.correct}</td>
                        <td className="lb-cell-time">{formatDuration(entry.duration_s)}</td>
                        <td className="lb-cell-when">{timeAgo(entry.created_at)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* CTA */}
        {!loading && entries.length > 0 && (
          <div className="lb-actions">
            <button
              id="lb-play-again-btn"
              className="lb-cta-btn"
              onClick={() => { sessionStorage.removeItem('ts_player_name'); navigate('/') }}
            >
              🚀 Jugar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
