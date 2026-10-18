import './Avatar.css'

const PALETTE: Record<string, string> = {
  K: '#14141c',
  S: '#e8c3a0',
  H: '#ff8a3d',
  D: '#1b2347',
  G: '#f5c451',
  P: '#2a3566',
  W: '#e8ecf8',
}

const SPRITE = [
  '................',
  '....KKKKKKKK....',
  '...KKKKKKKKKK...',
  '..KKKKKKKKKKKK..',
  '..KKKKKKKKKKKK..',
  '..KKKKSSSSKKKK..',
  '..KKSSSSSSSSKK..',
  '..KKSSSSSSSSKK..',
  '...KSSSSSSSSK...',
  '...HHSSSSSSHH...',
  '..HHHHHHHHHHHH..',
  '.HHHHHGHHGHHHHH.',
  'SHHHDDDDDDDDHHHS',
  'SHHHDDDGGDDDHHHS',
  'SHHHDDDDDDDDHHHS',
  '.HHDDDDDDDDDDHH.',
  '....PPPP..PPPP..',
  '....PPPP..PPPP..',
  '....PPPP..PPPP..',
  '...WWWWW..WWWWW.',
]

export default function Avatar({ size = 10 }: { size?: number }) {
  const rows = SPRITE.length
  const cols = SPRITE[0].length
  const pixels = []

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const color = PALETTE[SPRITE[y][x]]
      if (color) {
        pixels.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />)
      }
    }
  }

  return (
    <svg
      className="avatar"
      width={cols * size}
      height={rows * size}
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel avatar of Ahmed in an orange hoodie holding a laptop"
    >
      {pixels}
      <rect className="avatar-eye" x={5} y={7.3} width={1} height={0.7} fill="#0b1026" />
      <rect className="avatar-eye" x={10} y={7.3} width={1} height={0.7} fill="#0b1026" />
    </svg>
  )
}