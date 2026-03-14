import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import MediaCard from './MediaCard'

const ITEMS_PER_PAGE = 25
const SORT_OPTIONS = [
  { value: 'title', label: 'Title' },
  { value: 'rating', label: 'Rating' },
  { value: 'year', label: 'Release Year' },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'dropped', label: 'Dropped' },
]

export default function MediaList({ items, type, showStatusFilter, initialPage }) {
  const [sortBy, setSortBy] = useState('rating')
  const [sortDir, setSortDir] = useState('desc')
  const [statusFilter, setStatusFilter] = useState('all')
  const [page, setPage] = useState(initialPage || 1)
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    let result = [...items]
    if (showStatusFilter && statusFilter !== 'all') {
      result = result.filter((item) => item.status === statusFilter)
    }
    return result
  }, [items, showStatusFilter, statusFilter])

  const sorted = useMemo(() => {
    const result = [...filtered]
    result.sort((a, b) => {
      let cmp = 0
      if (sortBy === 'title') cmp = a.title.localeCompare(b.title)
      else if (sortBy === 'rating') cmp = a.rating - b.rating
      else if (sortBy === 'year') cmp = a.year - b.year
      return sortDir === 'asc' ? cmp : -cmp
    })
    return result
  }, [filtered, sortBy, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / ITEMS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paginated = sorted.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const handleSortChange = (newSort) => {
    if (newSort === sortBy) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(newSort)
      setSortDir(newSort === 'title' ? 'asc' : 'desc')
    }
    setPage(1)
  }

  const handleStatusChange = (status) => {
    setStatusFilter(status)
    setPage(1)
  }

  return (
    <div className="media-list">
      <div className="controls">
        <div className="sort-controls">
          <span className="controls-label">Sort by:</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              className={`sort-btn ${sortBy === opt.value ? 'sort-btn--active' : ''}`}
              onClick={() => handleSortChange(opt.value)}
            >
              {opt.label}
              {sortBy === opt.value && (
                <span className="sort-arrow">{sortDir === 'asc' ? ' \u2191' : ' \u2193'}</span>
              )}
            </button>
          ))}
        </div>

        {showStatusFilter && (
          <div className="status-controls">
            <span className="controls-divider" />
            <span className="controls-label">Status:</span>
            {STATUS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`status-btn ${statusFilter === opt.value ? 'status-btn--active' : ''}`}
                onClick={() => handleStatusChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="card-grid">
        {paginated.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            onClick={() => navigate(`/${type}/${item.id}`, { state: { tab: type, page: currentPage } })}
            showStatus={showStatusFilter}
          />
        ))}
      </div>

      {sorted.length === 0 && (
        <p className="empty-msg">No entries match the current filter.</p>
      )}

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`page-btn ${num === currentPage ? 'page-btn--active' : ''}`}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="page-btn"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
