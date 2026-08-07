import './PostCard.css'

const categoryLabels = {
  real_news: { label: 'Noticia Verificada', color: '#4ecdc4' },
  text_fake: { label: 'Texto Sospechoso', color: '#ff6b6b' },
  image_ai: { label: 'Contenido Visual', color: '#a78bfa' },
  real_image: { label: 'Imagen Real', color: '#4ecdc4' },
}

export default function PostCard({ post, index, total }) {
  if (!post) return null

  const categoryInfo = categoryLabels[post.category] || { label: 'Publicación', color: '#94a3b8' }
  const handle = post.author_handle || '@usuario'
  const name = post.author_name || 'Usuario'
  const initials = name.slice(0, 2).toUpperCase()

  return (
    <article className="post-card">
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
      </div>

      {/* Content */}
      <div className="post-body">
        <p className="post-text">{post.text_content}</p>

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

      {/* Footer */}
      <div className="post-footer">
        <div className="post-engagement">
          <span className="post-likes">❤️ {post.likes_count?.toLocaleString() || 0}</span>
          <span className="post-counter">{index + 1} / {total}</span>
        </div>
        <p className="post-cta">¿Confías en esta publicación?</p>
      </div>
    </article>
  )
}
