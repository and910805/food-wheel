import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'

type Props = {
  items: string[]
  showLabels?: boolean
  onSelect?: (item: string, index: number) => void
  className?: string
}

export type FoodWheelHandle = { spin: () => void }

const TAU = 360
const DUR_MS = 4000

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p0 = polar(cx, cy, r, a0)
  const p1 = polar(cx, cy, r, a1)
  const large = a1 - a0 <= 180 ? 0 : 1
  return `M ${cx} ${cy} L ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y} Z`
}

export const FoodWheel = forwardRef<FoodWheelHandle, Props>(function FoodWheel(
  { items, showLabels = true, onSelect, className }, ref
) {
  const n = Math.max(1, items.length)
  const [rot, setRot] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const lockedIndex = useRef<number | null>(null)
  const slice = TAU / n

  const colors = useMemo(() => {
    const base = ['#fde68a','#fca5a5','#a7f3d0','#bfdbfe','#fbcfe8','#ddd6fe']
    return Array.from({ length: n }, (_, i) => base[i % base.length])
  }, [n])

  useImperativeHandle(ref, () => ({ spin }))

  function spin() {
    if (spinning || n === 0) return
    setSpinning(true)

    const idx = Math.floor(Math.random() * n)
    lockedIndex.current = idx

    const theta = idx * slice + slice / 2
    const mod = ((rot % TAU) + TAU) % TAU
    let delta = (TAU - theta) - mod
    if (delta < 0) delta += TAU

    const spins = 5 + Math.floor(Math.random() * 4)
    const next = rot + spins * TAU + delta
    setRot(next)

    window.setTimeout(handleEnd, DUR_MS + 100)
  }

  function handleEnd() {
    if (!spinning) return
    setSpinning(false)
    const idx = lockedIndex.current ?? 0
    onSelect?.(items[idx], idx)
  }

  const size = 500
  const r = 220
  const cx = size / 2
  const cy = size / 2

  return (
    <div className={className}>
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <div className="absolute left-1/2 -translate-x-1/2 -top-2 z-20">
          <svg width="24" height="28" viewBox="0 0 24 28">
            <path d="M12 0 L24 28 L0 28 Z" className="fill-pink-500 drop-shadow" />
          </svg>
        </div>

        <svg
          width={size}
          height={size}
          className="rounded-full shadow-xl bg-white/70 dark:bg-slate-900/70 backdrop-blur"
        >
          <g
            style={{
              transform: `rotate(${rot}deg)`,
              transformOrigin: `${cx}px ${cy}px`,
              transition: `transform ${DUR_MS}ms cubic-bezier(.13,.71,.25,1)`
            }}
            onTransitionEnd={handleEnd}
          >
            {Array.from({ length: n }, (_, i) => {
              const a0 = i * slice
              const a1 = (i + 1) * slice
              return (
                <g key={i}>
                  <path d={arcPath(cx, cy, r, a0, a1)} fill={colors[i]} stroke="#00000010" />
                  {showLabels && (
                    <text
                      x={cx}
                      y={cy}
                      transform={`rotate(${a0 + slice / 2} ${cx} ${cy}) translate(0 -${r - 40})`}
                      textAnchor="middle"
                      className="fill-slate-900 dark:fill-slate-100 font-semibold select-none"
                    >
                      {items[i]}
                    </text>
                  )}
                </g>
              )
            })}

            <circle cx={cx} cy={cy} r={36} className="fill-white dark:fill-slate-800 stroke-black/10" />
          </g>
        </svg>
      </div>
    </div>
  )
})