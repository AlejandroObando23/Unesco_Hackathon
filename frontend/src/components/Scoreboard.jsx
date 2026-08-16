import './Scoreboard.css'
import { useTranslation } from 'react-i18next'

export default function Scoreboard({ currentIndex, totalPosts, decisionsCount, progressPct }) {
  const { t } = useTranslation()
  return (
    <div className="scoreboard" aria-label="Progreso del juego">
      <div className="scoreboard-stat">
        <span className="scoreboard-value">{currentIndex}</span>
        <span className="scoreboard-key">{t('score.seen', 'Visto')}</span>
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
        <span className="scoreboard-key">{t('score.judged', 'Juzgados')}</span>
      </div>
    </div>
  )
}
