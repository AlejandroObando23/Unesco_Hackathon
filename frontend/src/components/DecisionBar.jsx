import './DecisionBar.css'

const DECISIONS = [
  {
    id: 'trust',
    value: 'Trust',
    icon: '✅',
    label: 'Confío',
    sublabel: 'Es real',
    className: 'btn-trust',
  },
  {
    id: 'fake',
    value: 'Fake',
    icon: '❌',
    label: 'Falso',
    sublabel: 'Es fake',
    className: 'btn-fake',
  },
  {
    id: 'report',
    value: 'Report',
    icon: '🚩',
    label: 'Reportar',
    sublabel: 'Sospechoso',
    className: 'btn-report',
  },
]

export default function DecisionBar({ onDecision, disabled }) {
  return (
    <div className="decision-bar" role="group" aria-label="Opciones de decisión">
      {DECISIONS.map(({ id, value, icon, label, sublabel, className }) => (
        <button
          key={id}
          id={`decision-btn-${id}`}
          className={`decision-btn ${className}`}
          onClick={() => onDecision(value)}
          disabled={disabled}
          aria-label={`${label}: ${sublabel}`}
        >
          <span className="decision-icon">{icon}</span>
          <span className="decision-label">{label}</span>
          <span className="decision-sublabel">{sublabel}</span>
        </button>
      ))}
    </div>
  )
}
