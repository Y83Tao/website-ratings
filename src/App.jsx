import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'
import movies from './data/movies'
import shows from './data/shows'
import games from './data/games'
import { resolveImage } from './components/MediaCard'

const ITEMS_PER_PAGE = 25

function preloadImages(items) {
  items.slice(0, ITEMS_PER_PAGE).forEach((item) => {
    const src = resolveImage(item.image)
    if (src) {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    }
  })
}

export default function App() {
  const bgRef = useRef(null)

  useEffect(() => {
    preloadImages(movies)
    preloadImages(shows)
    preloadImages(games)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * -0.08}px)`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div className="parallax-bg" ref={bgRef} />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:type/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </>
  )
}
