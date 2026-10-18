export interface Room {
  id: string
  name: string
  subtitle: string
  x: number
  color: string
}

export interface Collectible {
  id: string
  x: number
}

export const WORLD_WIDTH = 2920
export const START_X = 140

export const ROOMS: Room[] = [
  { id: 'throne', name: 'Throne Room', subtitle: 'About Ahmed', x: 360, color: '#f5c451' },
  { id: 'war', name: 'War Room', subtitle: 'Projects', x: 800, color: '#ff8a3d' },
  { id: 'hall', name: 'Guild Hall', subtitle: 'Experience and leadership', x: 1240, color: '#4fd1c5' },
  { id: 'armory', name: 'Armory', subtitle: 'Tools and tech', x: 1680, color: '#9aa5ff' },
  { id: 'tavern', name: 'Tavern', subtitle: 'Languages and hobbies', x: 2120, color: '#ff7aa8' },
  { id: 'gate', name: 'The Gate', subtitle: 'Contact and hire', x: 2560, color: '#f5c451' },
]

export const COLLECTIBLES: Collectible[] = [
  { id: 's1', x: 580 },
  { id: 's2', x: 1020 },
  { id: 's3', x: 1460 },
  { id: 's4', x: 1900 },
  { id: 's5', x: 2340 },
]