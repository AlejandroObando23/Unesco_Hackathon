import './Timer.css'

const TOTAL_MS = 5 * 60 * 1000

function formatTime(ms) {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function getTimerState(ms) {
  const pct = ms / TOTAL_MS
  if (pct > 0.5) return { color: '#4ecdc4', label: 'En tiempo', urgency: 'safe' }
  if (pct > 0.2) return { color: '#fbbf24', label: 'Apresúrate', urgency: 'warning' }
  return { color: '#ff6b6b', label: '¡Último minuto!', urgency: 'danger' }
}

export default function Timer({ timeLeft }) {
  const progressPct = (timeLeft / TOTAL_MS) * 100
  const { color, label, urgency } = getTimerState(timeLeft)

  return (
    <div className={`timer-container timer--${urgency}`} role="timer" aria-live="polite">
      <div className="timer-header">
        <span className="timer-icon">⏱</span>
        <span className="timer-display" style={{ color }} aria-label={`Tiempo restante: ${formatTime(timeLeft)}`}>
          {formatTime(timeLeft)}
        </span>
        <span className="timer-label" style={{ color }}>{label}</span>
      </div>
      <div className="timer-bar-track" aria-hidden="true">
        <div
          className="timer-bar-fill"
          style={{
            width: `${progressPct}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}
