import './DecisionBar.css'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
  return (
    <div className="decision-bar" role="group" aria-label="Opciones de decisión">
      {DECISIONS.map(({ id, value, icon, label, sublabel, className }) => (
        <button
          key={id}
          id={`decision-btn-${id}`}
          className={`decision-btn ${className}`}
          onClick={() => onDecision(value)}
          disabled={disabled}
          aria-label={`${t(`decision.${id}`, label)}: ${t(`decision.${id}_sub`, sublabel)}`}
        >
          <span className="decision-icon">{icon}</span>
          <span className="decision-label">{t(`decision.${id}`, label)}</span>
          <span className="decision-sublabel">{t(`decision.${id}_sub`, sublabel)}</span>
        </button>
      ))}
    </div>
  )
}
