import { useState } from 'react'
import Toast from './Toast'
import { useTranslation } from 'react-i18next'
import './PostCard.css'

const categoryLabels = {
  real_news: { label: 'Noticia Verificada', color: '#4ecdc4' },
  text_fake: { label: 'Texto Sospechoso', color: '#ff6b6b' },
  image_ai: { label: 'Contenido Visual', color: '#a78bfa' },
  real_image: { label: 'Imagen Real', color: '#4ecdc4' },
}

export default function PostCard({ post, index, total }) {
  const { t, i18n } = useTranslation()
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post?.likes_count || 0)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  if (!post) return null

  const catLabel = categoryLabels[post.category]?.label || 'Publicación'
  const categoryInfo = { 
    label: t(`results.${post.category}`, catLabel), 
    color: categoryLabels[post.category]?.color || '#94a3b8' 
  }
  const handle = post.author_handle || '@usuario'
  const name = post.author_name || 'Usuario'
  const initials = name.slice(0, 2).toUpperCase()

  const isEn = i18n.language === 'en'
  const textContent = isEn && post.text_content_en ? post.text_content_en : post.text_content

  const handleLikeClick = () => {
    if (!isLiked) {
      setIsLiked(true)
      setLikeCount(likeCount + 1)
    } else {
      setIsLiked(false)
      setLikeCount(likeCount - 1)
    }
  }

  const handleDisabledClick = (actionName) => {
    setToastMessage(`La acción "${actionName}" no es requerida para este desafío.`)
    setShowToast(true)
  }


  return (
    <article className="post-card">
      {/* Toast Notification for disabled actions */}
      {showToast && (
        <Toast
          message={toastMessage}
          duration={2500}
          onDismiss={() => setShowToast(false)}
        />
      )}
      {/* Header */}
      <div className="post-header">
        <div className="post-avatar" aria-label={`Avatar de ${name}`}>
          {initials}
        </div>
        <div className="post-author-info">
          <span className="post-author-name">{name}</span>
          <span className="post-author-handle">{handle}</span>
        </div>
        <span
          className="post-category-badge"
          style={{ borderColor: categoryInfo.color, color: categoryInfo.color }}
        >
          {categoryInfo.label}
        </span>
        {/* TODO: Replace with actual menu icon image when available
            Location: frontend/src/assets/icons/menu-dots.svg or .png
            Currently showing as three dots emoji */}
        <button className="post-menu-btn" title="Más opciones">
          ⋯
        </button>
      </div>

      {/* Content */}
      <div className="post-body">
        <p className="post-text">{textContent}</p>

        {post.media_url && (
          <div className="post-media-wrapper">
            <img
              src={post.media_url}
              alt="Contenido multimedia del post"
              className="post-media"
              loading="lazy"
            />
            <div className="post-media-overlay">
              <span className="post-media-label">⚠ Analiza esta imagen</span>
            </div>
          </div>
        )}
      </div>

      {/* Social Interaction Bar (Instagram-style) */}
      <div className="post-social-actions">
        {/* Like button */}
        <button
          className={`social-action-btn like-btn ${isLiked ? 'liked' : ''}`}
          onClick={handleLikeClick}
          aria-pressed={isLiked}
          title={isLiked ? 'No me gusta' : 'Me gusta'}
        >
          {/* TODO: Replace with actual like icon images when available
              Location: frontend/src/assets/icons/like-empty.svg (for unlike state)
                        frontend/src/assets/icons/like-filled.svg (for liked state)
              Current state: Using emoji ❤️ / 🤍 as placeholder */}
          <span className="icon">{isLiked ? '❤️' : '🤍'}</span>
        </button>

        {/* Comment button (disabled - no action required) */}
        <button
          className="social-action-btn comment-btn"
          disabled
          onClick={() => handleDisabledClick('Comentar')}
          title="Comentar (no requerido para este desafío)"
        >
          {/* TODO: Replace with actual comment icon image when available
              Location: frontend/src/assets/icons/comment.svg or .png
              Current state: Using emoji 💬 as placeholder */}
          <span className="icon">💬</span>
        </button>

        {/* Share button (disabled - no action required) */}
        <button
          className="social-action-btn share-btn"
          disabled
          onClick={() => handleDisabledClick('Compartir')}
          title="Compartir (no requerido para este desafío)"
        >
          {/* TODO: Replace with actual share icon image when available
              Location: frontend/src/assets/icons/share.svg or .png
              Current state: Using emoji 📤 as placeholder */}
          <span className="icon">📤</span>
        </button>

        {/* Send/Report button - opens modal */}
        <button
          className="social-action-btn send-btn"
          title="Reportar publicación sospechosa"
          onClick={() => {
            // TODO: Trigger report modal here
            // For now, this will be handled by parent component or separate logic
            console.log('Report button clicked for post:', post.id)
          }}
        >
          {/* TODO: Replace with actual send icon image when available
              Location: frontend/src/assets/icons/send.svg or .png
              Current state: Using emoji 📬 as placeholder */}
          <span className="icon">📬</span>
        </button>

        {/* Save button (disabled - no action required) */}
        <button
          className="social-action-btn save-btn"
          disabled
          onClick={() => handleDisabledClick('Guardar')}
          title="Guardar (no requerido para este desafío)"
        >
          {/* TODO: Replace with actual bookmark icon image when available
              Location: frontend/src/assets/icons/bookmark.svg or .png
              Current state: Using emoji 🔖 as placeholder */}
          <span className="icon">🔖</span>
        </button>
      </div>

      {/* Engagement stats and CTA */}
      <div className="post-footer">
        <div className="post-engagement">
          <span className="post-likes">{likeCount.toLocaleString()} likes</span>
          <span className="post-counter">{index + 1} / {total}</span>
        </div>
        <p className="post-cta">{t('post.cta', '¿Confías en esta publicación?')}</p>
      </div>
    </article>
  )
}

