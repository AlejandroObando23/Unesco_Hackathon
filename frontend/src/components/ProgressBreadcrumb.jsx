import './ProgressBreadcrumb.css'

/**
 * ProgressBreadcrumb Component
 * 
 * Displays a visual navigation breadcrumb indicating:
 * - Inicio (Start)
 * - Slide 1 (Game In Progress)
 * - Slide 2 / Resultados (Game Complete)
 * 
 * Props:
 *   - step: 'start', 'game', or 'results'
 *   - currentIndex: Current post index (for game step)
 *   - totalPosts: Total number of posts (for game step)
 */
export default function ProgressBreadcrumb({ step = 'start', currentIndex = 0, totalPosts = 15 }) {
  const steps = [
    { id: 'start', label: 'Inicio', icon: '🏠' },
    { id: 'game', label: 'Simulación', icon: '🎮' },
    { id: 'results', label: 'Resultados', icon: '📊' },
  ]

  const getCurrentStep = () => {
    if (step === 'start') return 0
    if (step === 'game') return 1
    if (step === 'results') return 2
    return 0
  }

  const currentStep = getCurrentStep()

  return (
    <nav className="progress-breadcrumb" aria-label="Progreso del juego">
      <div className="breadcrumb-container">
        {steps.map((s, index) => (
          <div key={s.id} className="breadcrumb-item-wrapper">
            {/* Breadcrumb item */}
            <div
              className={`breadcrumb-item ${
                index === currentStep ? 'breadcrumb-item--active' : ''
              } ${index < currentStep ? 'breadcrumb-item--completed' : 'breadcrumb-item--future'}`}
              aria-current={index === currentStep ? 'step' : undefined}
            >
              <span className="breadcrumb-icon">{s.icon}</span>
              <span className="breadcrumb-label">{s.label}</span>
            </div>

            {/* Connecting line (not on last step) */}
            {index < steps.length - 1 && (
              <div
                className={`breadcrumb-line ${
                  index < currentStep ? 'breadcrumb-line--completed' : 'breadcrumb-line--pending'
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>

      {/* Optional: Micro progress for game step */}
      {step === 'game' && (
        <div className="breadcrumb-micro-progress">
          <span className="micro-progress-text">
            Publicación {currentIndex + 1} de {totalPosts}
          </span>
          <div className="micro-progress-bar">
            <div
              className="micro-progress-fill"
              style={{
                width: `${((currentIndex + 1) / totalPosts) * 100}%`,
              }}
              aria-valuenow={currentIndex + 1}
              aria-valuemin="1"
              aria-valuemax={totalPosts}
              role="progressbar"
            />
          </div>
        </div>
      )}
    </nav>
  )
}
