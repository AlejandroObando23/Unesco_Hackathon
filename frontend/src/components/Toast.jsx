import { useState, useEffect } from 'react'
import './Toast.css'

/**
 * Toast Component - Micro-feedback notification
 * 
 * Props:
 *   - message: Toast message text
 *   - duration: Time in ms before auto-dismiss (default: 2500)
 *   - onDismiss: Callback when toast disappears
 */
export default function Toast({ message, duration = 2500, onDismiss }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onDismiss?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  if (!isVisible) return null

  return (
    <div className="toast toast-show" role="status" aria-live="polite">
      <div className="toast-inner">
        <span className="toast-icon">ℹ️</span>
        <span className="toast-message">{message}</span>
      </div>
    </div>
  )
}
