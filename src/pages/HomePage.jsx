import { useState } from 'react'
import MediaList from '../components/MediaList'
import movies from '../data/movies'
import shows from '../data/shows'
import games from '../data/games'

const TABS = [
  { key: 'movies', label: 'Movies' },
  { key: 'shows', label: 'TV Shows' },
  { key: 'games', label: 'Games' },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('movies')

  const dataMap = { movies, shows, games }

  return (
    <div className="home">
      <header className="header">
        <h1>Yun's Reviews</h1>
      </header>

      <nav className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? 'tab--active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <MediaList
        key={activeTab}
        items={dataMap[activeTab]}
        type={activeTab}
      />
    </div>
  )
}
