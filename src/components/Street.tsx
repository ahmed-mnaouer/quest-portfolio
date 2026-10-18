import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { COLLECTIBLES, ROOMS, START_X, WORLD_WIDTH, type Room } from '../config/world'
import './Street.css'

const SPEED = 280
const EDGE = 60

interface Props {
  paused: boolean
  visited: string[]
  collected: string[]
  onEnterRoom: (room: Room) => void
  onCollect: (id: string) => void
}

interface Motion {
  x: number
  facing: 1 | -1
  walking: boolean
  nearId: string | null
  target: number | null
  enterId: string | null
  left: boolean
  right: boolean
}

export default function Street({ paused, visited, collected, onEnterRoom, onCollect }: Props) {
  const viewRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const skylineRef = useRef<HTMLDivElement>(null)
  const starsRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)
  const m = useRef<Motion>({
    x: START_X,
    facing: 1,
    walking: false,
    nearId: null,
    target: null,
    enterId: null,
    left: false,
    right: false,
  })
  const [facing, setFacing] = useState<1 | -1>(1)
  const [walking, setWalking] = useState(false)
  const [nearId, setNearId] = useState<string | null>(null)

  const live = useRef({ paused, collected, onEnterRoom, onCollect })
  useEffect(() => {
    live.current = { paused, collected, onEnterRoom, onCollect }
  })

  useEffect(() => {
    const motion = m.current

    const onKeyDown = (e: KeyboardEvent) => {
      if (live.current.paused) return
      const k = e.key.toLowerCase()
      if (k === 'arrowleft' || k === 'a') {
        motion.left = true
        motion.target = null
        e.preventDefault()
      } else if (k === 'arrowright' || k === 'd') {
        motion.right = true
        motion.target = null
        e.preventDefault()
      } else if ((k === 'enter' || k === 'e') && !e.repeat) {
        if ((e.target as HTMLElement).tagName === 'BUTTON') return
        const room = ROOMS.find((r) => r.id === motion.nearId)
        if (room) {
          e.preventDefault()
          live.current.onEnterRoom(room)
        }
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase()
      if (k === 'arrowleft' || k === 'a') motion.left = false
      if (k === 'arrowright' || k === 'd') motion.right = false
    }

    const onBlur = () => {
      motion.left = false
      motion.right = false
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      let dir = 0

      if (live.current.paused) {
        motion.target = null
      } else {
        if (motion.left) dir -= 1
        if (motion.right) dir += 1
        if (dir === 0 && motion.target !== null) {
          const diff = motion.target - motion.x
          if (Math.abs(diff) <= 8) {
            motion.target = null
            const room = ROOMS.find((r) => r.id === motion.enterId)
            motion.enterId = null
            if (room) live.current.onEnterRoom(room)
          } else {
            dir = diff > 0 ? 1 : -1
          }
        }
      }

      if (dir !== 0) {
        motion.x = Math.min(Math.max(motion.x + dir * SPEED * dt, EDGE), WORLD_WIDTH - EDGE)
        if (motion.facing !== dir) {
          motion.facing = dir as 1 | -1
          setFacing(motion.facing)
        }
      }

      const isWalking = dir !== 0
      if (isWalking !== motion.walking) {
        motion.walking = isWalking
        setWalking(isWalking)
      }

      const viewW = viewRef.current ? viewRef.current.clientWidth : window.innerWidth
      const cam = Math.min(Math.max(motion.x - viewW / 2, 0), Math.max(WORLD_WIDTH - viewW, 0))
      if (worldRef.current) worldRef.current.style.transform = `translate3d(${-cam}px,0,0)`
      if (skylineRef.current) skylineRef.current.style.backgroundPositionX = `${-cam * 0.3}px`
      if (starsRef.current) starsRef.current.style.backgroundPositionX = `${-cam * 0.1}px`
      if (playerRef.current) playerRef.current.style.transform = `translate3d(${motion.x}px,0,0)`

      const near = ROOMS.find((r) => Math.abs(r.x - motion.x) < 70)
      const id = near ? near.id : null
      if (id !== motion.nearId) {
        motion.nearId = id
        setNearId(id)
      }

      for (const c of COLLECTIBLES) {
        if (!live.current.collected.includes(c.id) && Math.abs(c.x - motion.x) < 45) {
          live.current.onCollect(c.id)
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  const hold = (dir: 'left' | 'right', down: boolean) => {
    m.current[dir] = down
    if (down) m.current.target = null
  }

  const nearRoom = ROOMS.find((r) => r.id === nearId)

  return (
    <div className="street" ref={viewRef}>
      <div className="street-stars" ref={starsRef} />
      <div className="street-skyline" ref={skylineRef} />

      <div className="street-world" ref={worldRef} style={{ width: WORLD_WIDTH }}>
        <div className="street-ground" />

        {ROOMS.map((room) => (
          <button
            key={room.id}
            className={`building${nearId === room.id ? ' near' : ''}${visited.includes(room.id) ? ' visited' : ''}`}
            style={{ left: room.x, '--accent': room.color } as CSSProperties}
            onClick={() => {
              m.current.target = room.x
              m.current.enterId = room.id
            }}
            aria-label={`Visit ${room.name}`}
          >
            <span className="building-sign">{room.name}</span>
            <span className="building-roof" />
            <span className="building-body">
              <span className="building-door" />
            </span>
          </button>
        ))}

        {COLLECTIBLES.filter((c) => !collected.includes(c.id)).map((c) => (
          <span key={c.id} className="star-pickup" style={{ left: c.x }}>
            ★
          </span>
        ))}

        <div className="player" ref={playerRef}>
          <div className="player-shadow" />
          <div className="player-flip" style={{ transform: `scaleX(${facing})` }}>
            <img
              className={`player-img${walking ? ' walking' : ''}`}
              src={`${import.meta.env.BASE_URL}avatar/ahmed.png`}
              alt="Ahmed"
              draggable={false}
            />
          </div>
        </div>
      </div>

      {nearRoom && !paused && (
        <div className="prompt">Press Enter to open: {nearRoom.name}</div>
      )}

      <div className="touch-controls">
        <button
          aria-label="Walk left"
          onPointerDown={() => hold('left', true)}
          onPointerUp={() => hold('left', false)}
          onPointerLeave={() => hold('left', false)}
          onPointerCancel={() => hold('left', false)}
        >
          ◀
        </button>
        <button
          aria-label="Walk right"
          onPointerDown={() => hold('right', true)}
          onPointerUp={() => hold('right', false)}
          onPointerLeave={() => hold('right', false)}
          onPointerCancel={() => hold('right', false)}
        >
          ▶
        </button>
      </div>
    </div>
  )
}