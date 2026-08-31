import { useCallback, useRef, useState } from 'react'
import { images } from '../../data/site'

export default function BeforeAfter() {
  const [pos, setPos] = useState(52)
  const frame = useRef(null)
  const dragging = useRef(false)

  const update = useCallback((clientX) => {
    const el = frame.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(96, Math.max(4, next)))
  }, [])

  const onPointerDown = (event) => {
    dragging.current = true
    event.currentTarget.setPointerCapture?.(event.pointerId)
    update(event.clientX)
  }

  const onPointerMove = (event) => {
    if (!dragging.current) return
    update(event.clientX)
  }

  const endDrag = () => {
    dragging.current = false
  }

  return (
    <div
      ref={frame}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-none overflow-hidden bg-fog select-none md:aspect-[5/4]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      role="slider"
      aria-label="Before and after comparison"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(pos)}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') setPos((v) => Math.max(4, v - 4))
        if (event.key === 'ArrowRight') setPos((v) => Math.min(96, v + 4))
      }}
    >
      <img src={images.afterCat} alt="After — leaner cat" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={images.beforeCat} alt="Before — heavier cat" className="h-full w-full object-cover" />
      </div>
      <div
        className="absolute inset-y-0 z-10 w-1 bg-white shadow-[0_0_0_1px_rgb(17_17_17_/_0.15)]"
        style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
      >
        <span className="absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lg transition-transform duration-300 hover:scale-110">
          <svg viewBox="0 0 24 24" className="h-5 w-5 animate-nudge" aria-hidden="true">
            <path d="M8 6L3 12l5 6M16 6l5 6-5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      <span className="absolute bottom-4 left-4 bg-ink/80 px-3 py-1 font-heading text-xs uppercase tracking-[0.16em] text-white">
        Before
      </span>
      <span className="absolute right-4 bottom-4 bg-brand/90 px-3 py-1 font-heading text-xs uppercase tracking-[0.16em] text-white">
        After
      </span>
    </div>
  )
}
