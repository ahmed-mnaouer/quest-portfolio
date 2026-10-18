import { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'
import { ROOMS, type Room } from '../config/world'
import './Village.css'

interface Props {
  paused: boolean
  onEnterRoom: (room: Room) => void
}

type Direction = 'up' | 'left' | 'down' | 'right'
interface Door {
  room: Room
  area: Phaser.Geom.Rectangle
}

const GAME_WIDTH = 960
const GAME_HEIGHT = 640
const CHARACTER_COLUMNS = 56
const SPEED = 120

const STANDING_FRAMES: Record<Direction, number> = {
  right: 0, up: 1, left: 2, down: 3,
}
const DIRECTION_OFFSETS: Record<Direction, number> = {
  right: 0, up: 6, left: 12, down: 18,
}

const GUIDE_ORDER = ['war', 'throne', 'hall', 'armory', 'gate', 'tavern']
const ROOM_LOCATIONS: Record<string, string> = {
  war: 'Top left',
  throne: 'Top centre',
  hall: 'Top right',
  armory: 'Bottom left',
  gate: 'Lower centre · Signpost',
  tavern: 'Bottom right',
}

export default function Village({ paused, onEnterRoom }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)
  const held = useRef(new Set<Direction>())
  const interact = useRef(false)
  const live = useRef({ paused, onEnterRoom })
  const [status, setStatus] = useState('Loading the village…')
  const [nearId, setNearId] = useState<string | null>(null)

  useEffect(() => {
    live.current = { paused, onEnterRoom }
    if (paused) {
      held.current.clear()
      interact.current = false
    }
  }, [paused, onEnterRoom])

  useEffect(() => {
    const keyDirections: Record<string, Direction> = {
      arrowup: 'up', w: 'up', arrowleft: 'left', a: 'left',
      arrowdown: 'down', s: 'down', arrowright: 'right', d: 'right',
    }
    const clear = () => {
      held.current.clear()
      interact.current = false
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (live.current.paused || event.ctrlKey || event.metaKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target?.closest('input, textarea, select, button, a, summary, [contenteditable="true"], [role="dialog"]')) return
      const key = event.key.toLowerCase()
      const direction = keyDirections[key]
      if (direction) {
        event.preventDefault()
        held.current.add(direction)
      }
      if ((key === 'enter' || key === 'e') && !event.repeat && !target?.closest('button, a, summary')) {
        event.preventDefault()
        interact.current = true
      }
    }
    const onKeyUp = (event: KeyboardEvent) => {
      const direction = keyDirections[event.key.toLowerCase()]
      if (direction) held.current.delete(direction)
    }
    const onVisibility = () => {
      if (document.hidden) clear()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', clear)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', clear)
      document.removeEventListener('visibilitychange', onVisibility)
      clear()
    }
  }, [])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let game: Phaser.Game | undefined
    let disposed = false

    class VillageScene extends Phaser.Scene {
      private hero?: Phaser.GameObjects.Sprite
      private shadow?: Phaser.GameObjects.Ellipse
      private blockers: Phaser.Geom.Rectangle[] = []
      private doors: Door[] = []
      private facing: Direction = 'down'
      private worldWidth = GAME_WIDTH
      private worldHeight = GAME_HEIGHT
      private lastNearId: string | null = null
      private failed = false

      constructor() {
        super('Village')
      }

      preload() {
        this.load.on('loaderror', (file: { key: string }) => {
          this.failed = true
          if (!disposed) setStatus(`Could not load "${file.key}". Check its file path and the browser console.`)
        })
        const base = import.meta.env.BASE_URL
        this.load.tilemapTiledJSON('village', `${base}assets/maps/village.json`)
        this.load.image('village-tiles', `${base}assets/tiles/serene-village-32.png`)
        this.load.spritesheet('ahmed', `${base}assets/characters/ahmed-modern.png`, {
          frameWidth: 32, frameHeight: 64, margin: 0, spacing: 0,
        })
      }

      create() {
        if (this.failed) return
        const map = this.make.tilemap({ key: 'village' })
        this.worldWidth = map.widthInPixels
        this.worldHeight = map.heightInPixels
        const tileset = map.addTilesetImage('serene-village-32', 'village-tiles')
        if (!tileset) {
          setStatus('The tileset name does not match the map.')
          return
        }
        for (const [index, name] of ['Ground', 'Buildings', 'Decor'].entries()) {
          const layer = map.createLayer(name, tileset, 0, 0)
          if (!layer) {
            setStatus(`Missing map layer: ${name}`)
            return
          }
          layer.setDepth(index)
        }

        // Overhead artwork is rendered above the character.
        // Numbered layers allow additional canopy groups later.
        for (const layerData of map.layers) {
          const isForeground =
            layerData.name === 'Foreground' ||
            layerData.name.startsWith('Foreground_')

          if (!isForeground) continue

          const foreground = map.createLayer(
            layerData.name,
            tileset,
            0,
            0,
          )

          foreground?.setDepth(20)
        }

        const collisions = map.getObjectLayer('Collisions')
        const interactions = map.getObjectLayer('Interactions')
        if (!collisions || !interactions) {
          setStatus('The Collisions or Interactions object layer is missing.')
          return
        }
        this.blockers = collisions.objects
          .filter((object) => (object.width ?? 0) > 0 && (object.height ?? 0) > 0)
          .map((object) => new Phaser.Geom.Rectangle(
            object.x ?? 0, object.y ?? 0, object.width ?? 0, object.height ?? 0,
          ))
        const spawn = interactions.objects.find((object) => object.name === 'spawn')
        if (!spawn) {
          setStatus('The map needs an interaction point named spawn.')
          return
        }
        for (const object of interactions.objects) {
          const room = ROOMS.find((entry) => entry.id === object.name)
          if (!room) continue
          this.doors.push({
            room,
            area: new Phaser.Geom.Rectangle(
              object.x ?? 0, object.y ?? 0, object.width || 24, object.height || 29,
            ),
          })
        }
        for (const direction of ['up', 'left', 'down', 'right'] as Direction[]) {
          const offset = DIRECTION_OFFSETS[direction]
          this.anims.create({
            key: `idle-${direction}`,
            frames: this.anims.generateFrameNumbers('ahmed', {
              start: CHARACTER_COLUMNS + offset,
              end: CHARACTER_COLUMNS + offset + 5,
            }),
            frameRate: 6, repeat: -1,
          })
          this.anims.create({
            key: `walk-${direction}`,
            frames: this.anims.generateFrameNumbers('ahmed', {
              start: CHARACTER_COLUMNS * 2 + offset,
              end: CHARACTER_COLUMNS * 2 + offset + 5,
            }),
            frameRate: 10, repeat: -1,
          })
        }
        const x = spawn.x ?? 47
        const y = spawn.y ?? 297.5
        this.shadow = this.add.ellipse(x, y - 2, 22, 8, 0x000000, 0.22).setDepth(9)
        this.hero = this.add.sprite(x, y, 'ahmed', STANDING_FRAMES.down)
          .setOrigin(0.5, 1).setDepth(10)
        this.hero.play('idle-down')
        this.configureCamera()
        this.scale.on(Phaser.Scale.Events.RESIZE, this.configureCamera, this)
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
          this.scale.off(Phaser.Scale.Events.RESIZE, this.configureCamera, this)
        })
        if (!disposed) setStatus('')
      }

      private configureCamera() {
        const hero = this.hero
        if (!hero) return
        const camera = this.cameras.main
        camera.stopFollow()
        camera.removeBounds()
        camera.setViewport(0, 0, GAME_WIDTH, GAME_HEIGHT)
        camera.setRoundPixels(true)
        if (!host) return
        const compact =
          host.clientWidth < 700 ||
          window.matchMedia(
            '(max-height: 500px) and (pointer: coarse)',
          ).matches
        if (compact) {
          camera.setZoom(2)
          camera.setBounds(0, 0, this.worldWidth, this.worldHeight)
          camera.centerOn(hero.x, hero.y)
          camera.startFollow(hero, true, 1, 1)
        } else {
          camera.setZoom(Math.min(
            GAME_WIDTH / this.worldWidth,
            GAME_HEIGHT / this.worldHeight,
          ))
          camera.centerOn(this.worldWidth / 2, this.worldHeight / 2)
        }
      }

      private canStand(x: number, y: number) {
        const feet = new Phaser.Geom.Rectangle(x - 9, y - 9, 18, 10)
        if (feet.left < 0 || feet.right > this.worldWidth || feet.top < 0 || feet.bottom > this.worldHeight) return false
        return !this.blockers.some((blocker) => Phaser.Geom.Intersects.RectangleToRectangle(feet, blocker))
      }

      update(_time: number, delta: number) {
        const hero = this.hero
        if (!hero) return
        if (live.current.paused) {
          hero.anims.stop()
          hero.setFrame(STANDING_FRAMES[this.facing])
          interact.current = false
          return
        }
        const directions = Array.from(held.current)
        const direction = directions[directions.length - 1]
        if (direction) {
          this.facing = direction
          const distance = SPEED * Math.min(delta, 50) / 1000
          const dx = direction === 'left' ? -distance : direction === 'right' ? distance : 0
          const dy = direction === 'up' ? -distance : direction === 'down' ? distance : 0
          const steps = Math.max(1, Math.ceil(distance / 2))
          let moved = false
          for (let step = 0; step < steps; step++) {
            const x = hero.x + dx / steps
            const y = hero.y + dy / steps
            if (!this.canStand(x, y)) break
            hero.setPosition(x, y)
            moved = true
          }
          hero.play(`${moved ? 'walk' : 'idle'}-${direction}`, true)
        } else {
          hero.play(`idle-${this.facing}`, true)
        }
        this.shadow?.setPosition(hero.x, hero.y - 2)
        let nearest: Door | undefined
        let bestDistance = 25
        for (const door of this.doors) {
          const x = Phaser.Math.Clamp(hero.x, door.area.left, door.area.right)
          const y = Phaser.Math.Clamp(hero.y, door.area.top, door.area.bottom)
          const distance = Phaser.Math.Distance.Between(hero.x, hero.y, x, y)
          if (distance < bestDistance) {
            bestDistance = distance
            nearest = door
          }
        }
        const nextId = nearest?.room.id ?? null
        if (nextId !== this.lastNearId) {
          this.lastNearId = nextId
          if (!disposed) setNearId(nextId)
        }
        if (interact.current) {
          interact.current = false
          if (nearest) {
            held.current.clear()
            live.current.onEnterRoom(nearest.room)
          }
        }
      }
    }

    const timer = window.setTimeout(() => {
      if (disposed) return
      game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: host,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundColor: '#0b1026',
        pixelArt: true,
        roundPixels: true,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        input: { keyboard: false },
        scene: VillageScene,
      })
    }, 0)
    return () => {
      disposed = true
      window.clearTimeout(timer)
      game?.destroy(true)
    }
  }, [])

  const nearRoom = ROOMS.find((room) => room.id === nearId)
  const guideRooms = GUIDE_ORDER
    .map((id) => ROOMS.find((room) => room.id === id))
    .filter((room): room is Room => room !== undefined)

  const movementButton = (direction: Direction, label: string) => (
    <button
      type="button"
      className={`village-direction direction-${direction}`}
      aria-label={`Walk ${direction}`}
      disabled={paused}
      onPointerDown={(event) => {
        event.preventDefault()
        event.currentTarget.setPointerCapture(event.pointerId)
        held.current.add(direction)
      }}
      onPointerUp={() => held.current.delete(direction)}
      onPointerCancel={() => held.current.delete(direction)}
      onLostPointerCapture={() => held.current.delete(direction)}
    >
      {label}
    </button>
  )

  return (
    <main className="village-shell">
      <div className="village-stage">
        <div ref={hostRef} className="village-canvas" role="img"
          aria-label="Ahmed's explorable portfolio village" />
        {status && <p className="village-status" role="status">{status}</p>}
      </div>

      <div className="village-controls">
        <div className="village-dpad">
          {movementButton('up', '↑')}
          {movementButton('left', '←')}
          {movementButton('down', '↓')}
          {movementButton('right', '→')}
        </div>
        <div className="village-instructions">
          <p>Arrow keys / WASD to walk</p>
          <p className="village-door-message" aria-live="polite">
            {nearRoom ? (
              <>
                <strong>{nearRoom.name}</strong>
                <span>{nearRoom.subtitle}</span>
                <span>Enter / E or Open</span>
              </>
            ) : 'Approach a door, or use the village guide below.'}
          </p>
        </div>
        <button type="button" className="village-open" disabled={paused || !nearRoom}
          onClick={() => { interact.current = true }}>
          Open
        </button>
      </div>

      <details className="village-guide">
        <summary>Village guide · Where to find everything</summary>
        <p>Positions refer to the full village map. Walk to a destination, or open its room directly.</p>
        <ul>
          {guideRooms.map((room) => (
            <li key={room.id}>
              <button type="button" disabled={paused} onClick={() => {
                held.current.clear()
                interact.current = false
                live.current.onEnterRoom(room)
              }}>
                <span className="village-guide-location">{ROOM_LOCATIONS[room.id]}</span>
                <span className="village-guide-name">{room.name}</span>
                <span className="village-guide-purpose">{room.subtitle}</span>
              </button>
            </li>
          ))}
        </ul>
      </details>
    </main>
  )
}