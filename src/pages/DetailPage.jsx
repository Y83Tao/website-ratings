import { useParams, useNavigate } from 'react-router-dom'
import movies from '../data/movies'
import shows from '../data/shows'
import games from '../data/games'
import RatingBadge from '../components/RatingBadge'

const STATUS_COLORS = {
  completed: '#8b7d3c',
  ongoing: '#4a6b8a',
  dropped: '#8b4040',
}

const TYPE_LABELS = {
  movies: 'Movie',
  shows: 'TV Show',
  games: 'Game',
}

function resolveImage(path) {
  if (!path) return null
  if (path.startsWith('http')) return path
  const base = import.meta.env.BASE_URL
  return path.startsWith('/') ? base + path.slice(1) : base + path
}

export default function DetailPage() {
  const { type, id } = useParams()
  const navigate = useNavigate()

  const dataMap = { movies, shows, games }
  const item = dataMap[type]?.find((entry) => entry.id === id)

  if (!item) {
    return (
      <div className="detail detail--not-found">
        <h2>Not Found</h2>
        <p>This entry doesn't exist.</p>
        <button className="back-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="detail">
      <button className="back-btn" onClick={() => navigate('/')}>
        &larr; Back
      </button>

      <div className="detail__content">
        <div className="detail__poster">
          <img
            src={resolveImage(item.image) || `https://placehold.co/400x600/1a1a2e/e0e0e0?text=${encodeURIComponent(item.title)}`}
            alt={item.title}
            onError={(e) => {
              e.target.src = `https://placehold.co/400x600/1a1a2e/e0e0e0?text=${encodeURIComponent(item.title)}`
            }}
          />
        </div>

        <div className="detail__info">
          <span className="detail__type">{TYPE_LABELS[type]}</span>
          <h1 className="detail__title">{item.title}</h1>
          <p className="detail__year">{item.year}</p>

          <div className="detail__rating-row">
            <RatingBadge rating={item.rating} large />
            <span className="detail__rating-label">{item.rating.toFixed(1)} / 10</span>
          </div>

          <div className="detail__review">
            <h2>My Review</h2>
            <p>{item.review}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
