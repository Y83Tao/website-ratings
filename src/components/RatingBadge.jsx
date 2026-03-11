export default function RatingBadge({ rating, large }) {
  const isTop = rating >= 9.5
  const getColor = (r) => {
    if (r >= 9.5) return 'linear-gradient(135deg, #0d6b2e, #2ecc71, #0d6b2e)'
    if (r >= 8) return '#15803d'
    if (r >= 7) return '#a16207'
    return '#b91c1c'
  }

  const style = isTop
    ? { background: getColor(rating) }
    : { backgroundColor: getColor(rating) }

  return (
    <div
      className={`rating-badge ${large ? 'rating-badge--large' : ''} ${isTop ? 'rating-badge--shiny' : ''}`}
      style={style}
    >
      {rating.toFixed(1)}
      {isTop && <span className="rating-badge__shine" />}
    </div>
  )
}
