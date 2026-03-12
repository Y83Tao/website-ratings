import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailPage from './pages/DetailPage'

export default function App() {
  const bgRef = useRef(null)

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
