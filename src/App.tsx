import { useEffect, useState } from 'react'
import Village from './components/Village'
import RoomModal from './components/RoomModal'
import { SITE } from './config/site'
import { ROOMS, type Room } from './config/world'
import './App.css'
import PortfolioView from './components/PortfolioView'
import CvActions from './components/CvActions'
import StickyPortfolioNav from './components/StickyPortfolioNav'


type Screen = 'title' | 'hub' | 'quick'

function initialScreen(): Screen {
  const view = new URLSearchParams(window.location.search).get('view')
  return view === 'portfolio' ? 'quick' : view === 'village' ? 'hub' : 'title'
}

function load(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    const value = raw ? JSON.parse(raw) : []
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string' && ROOMS.some((room) => room.id === id)) : []
  } catch {
    return []
  }
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(initialScreen)

  const navigate = (next: Screen) => {
    const url = new URL(window.location.href)
    if (next === 'title') url.searchParams.delete('view')
    else url.searchParams.set('view', next === 'quick' ? 'portfolio' : 'village')
    url.hash = ''
    window.history.pushState(null, '', url)
    setOpenRoom(null)
    setScreen(next)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const onBack = () => { setOpenRoom(null); setScreen(initialScreen()) }
    window.addEventListener('popstate', onBack)
    return () => window.removeEventListener('popstate', onBack)
  }, [])
  const [visited, setVisited] = useState<string[]>(() => load('quest-visited'))
  const [openRoom, setOpenRoom] = useState<Room | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem('quest-visited', JSON.stringify(visited))
    } catch {
      // Continue without persisted progress if browser storage is unavailable.
    }
  }, [visited])


  useEffect(() => {
    if (screen !== 'title') return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target?.closest('button, a, input, textarea, select')) return
      if (e.key === 'Enter' && !e.repeat) {
        const url = new URL(window.location.href)
        url.searchParams.set('view', 'village')
        url.hash = ''
        window.history.pushState(null, '', url)
        setScreen('hub')
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [screen])

  useEffect(() => {
    if (!openRoom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenRoom(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openRoom])

  const enterRoom = (room: Room) => {
    setOpenRoom(room)
    setVisited((prev) => (prev.includes(room.id) ? prev : [...prev, room.id]))
  }


  const stars = visited.length
  const totalStars = ROOMS.length

  if (screen === 'title') {
    return (
      <main className="screen">
        <div className="stars" />
        <h1 className="title">{SITE.name}</h1>
        <p className="subtitle">{SITE.tagline}</p>
        <div className="avatar-wrap">
          <img
            className="hero-art"
            src={`${import.meta.env.BASE_URL}avatar/ahmed.png`}
            alt="Pixel art of Ahmed, a Data Mage in an orange hoodie holding a glowing laptop"
          />
        </div>
        <p className="hero-class">
          {SITE.hero} · {SITE.heroClass} · Lv 1
        </p>
        <div className="entry-actions">
          <button
            className="start-btn"
            onClick={() => navigate('quick')}
          >
            View portfolio
          </button>

          <button
            className="explore-btn"
            onClick={() => navigate('hub')}
          >
            Play the village
          </button>
        </div>

        <nav
          className="professional-links"
          aria-label="Professional profiles"
        >
          <a
            href="https://www.linkedin.com/in/ahmedmnaouer/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn ↗
          </a>

          <a
            href="https://github.com/ahmed-mnaouer"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        </nav>

        <CvActions />

        <p className="entry-note">
          Browse my work directly, or explore it through the village.
        </p>
      </main>
    )
  }

  return (
    <>
      <header className="hud">
        <span className="hud-title">{SITE.name}</span>
        {screen === 'hub' && (
          <span
            className="hud-stars"
            title="Number of different portfolio rooms you have opened"
          >
            Explored {stars}/{totalStars}
          </span>
        )}
        {screen === 'quick' && <StickyPortfolioNav />}
        <div className="hud-actions">
          <button onClick={() => navigate(screen === 'quick' ? 'hub' : 'quick')}>
            {screen === 'quick' ? 'Play village' : 'View portfolio'}
          </button>
          <button onClick={() => navigate('title')}>Title</button>
        </div>
      </header>

      {screen === 'hub' && (
        <Village
          paused={openRoom !== null}
          onEnterRoom={enterRoom}
        />
      )}

      {screen === 'quick' && (
        <PortfolioView onPlay={() => navigate('hub')} />
      )}

      {openRoom && <RoomModal room={openRoom} onClose={() => setOpenRoom(null)} />}
    </>
  )
}