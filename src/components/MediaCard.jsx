import RatingBadge from './RatingBadge'

const STATUS_COLORS = {
  completed: '#8b7d3c',
  ongoing: '#4a6b8a',
  dropped: '#8b4040',
}

function resolveImage(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('/') ? base + path.slice(1) : base + path
}

export default function MediaCard({ item, onClick, showStatus }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card__image-wrapper">
        <img
          className="card__image"
          src={resolveImage(item.image) || `https://placehold.co/300x450/1a1a2e/e0e0e0?text=${encodeURIComponent(item.title)}`}
          alt={item.title}
          loading="lazy"
          onError={(e) => {
            e.target.src = `https://placehold.co/300x450/1a1a2e/e0e0e0?text=${encodeURIComponent(item.title)}`
          }}
        />
        <RatingBadge rating={item.rating} />
        {showStatus && item.status && (
          <span
            className="card__status"
            style={{ backgroundColor: STATUS_COLORS[item.status] }}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </span>
        )}
      </div>
      <div className="card__info">
        <h3 className="card__title">{item.title}</h3>
        <span className="card__year">{item.year}</span>
      </div>
    </div>
  )
}
