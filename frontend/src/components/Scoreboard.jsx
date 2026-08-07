import './Scoreboard.css'

export default function Scoreboard({ currentIndex, totalPosts, decisionsCount, progressPct }) {
  return (
    <div className="scoreboard" aria-label="Progreso del juego">
      <div className="scoreboard-stat">
        <span className="scoreboard-value">{currentIndex}</span>
        <span className="scoreboard-key">Visto</span>
      </div>
      <div className="scoreboard-progress-wrapper">
        <div className="scoreboard-progress-track" aria-hidden="true">
          <div
            className="scoreboard-progress-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <span className="scoreboard-post-label">
          {currentIndex} / {totalPosts} posts
        </span>
      </div>
      <div className="scoreboard-stat">
        <span className="scoreboard-value">{decisionsCount}</span>
        <span className="scoreboard-key">Juzgados</span>
      </div>
    </div>
  )
}
