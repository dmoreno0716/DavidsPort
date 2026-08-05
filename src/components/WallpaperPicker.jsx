// Wallpaper picker — a small personalization control parked in the bottom-right
// corner of the desktop, mirroring the dock in the bottom-center.
//
// Collapsed it's a single frosted icon button. Clicking it slides out three
// rounded swatches to its left (the gradient, then the two photos); the active
// one carries an amber ring. It closes on Escape, on a click outside, and after
// a choice is made. Hidden entirely on phones, which are pinned to the gradient.
//
// Like the dock, the fixed wrapper is pointer-events-none so it can't swallow
// clicks on window content that happens to sit in the same corner.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWallpaper } from '../wallpaper.jsx'
import { WallpaperIcon } from './icons.jsx'

export default function WallpaperPicker() {
  const { wallpapers, activeId, isDark, canChange, select, preload } = useWallpaper()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  // Preload the photos as soon as the picker is opened, so the first switch
  // crossfades instead of flashing an unpainted layer.
  useEffect(() => {
    if (open) preload()
  }, [open, preload])

  useEffect(() => {
    if (!open) return

    // Capture phase + stopPropagation so Escape closes the picker *instead of*
    // the focused window (Desktop.jsx listens for Escape on the bubble phase).
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.stopPropagation()
        setOpen(false)
      }
    }
    function onPointerDown(e) {
      if (!rootRef.current?.contains(e.target)) setOpen(false)
    }

    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  if (!canChange) return null

  const shell = isDark
    ? 'border-white/15 bg-zinc-900/35 text-white/85 hover:bg-zinc-900/50 hover:text-white'
    : 'border-white/60 bg-white/55 text-zinc-600 hover:bg-white/80 hover:text-zinc-900'

  // Thumbnails alone aren't enough to tell the options apart: shrunk to a couple
  // of dozen pixels the Forest photo is mostly dark sky and treeline, so it just
  // reads as "a dark square". Names under each swatch make the choice explicit,
  // the way a real OS personalization pane does.
  const labelIdle = isDark ? 'text-white/65' : 'text-zinc-500'
  const labelActive = isDark ? 'text-white' : 'text-zinc-900'

  return (
    // ref covers the toggle button too, so clicking it counts as "inside" and
    // the outside-click handler doesn't fight the toggle.
    <div
      ref={rootRef}
      className="pointer-events-none fixed bottom-4 right-4 z-40 flex items-center justify-end gap-2"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            className={`pointer-events-auto flex items-center gap-2 rounded-2xl border p-2 shadow-[0_16px_40px_-16px_rgba(24,24,27,0.35)] backdrop-blur-xl ${shell}`}
            role="group"
            aria-label="Wallpaper"
          >
            {wallpapers.map((w) => {
              const isActive = w.id === activeId
              return (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => {
                    select(w.id)
                    setOpen(false)
                  }}
                  aria-label={`${w.label} wallpaper`}
                  aria-pressed={isActive}
                  className="group/swatch flex shrink-0 flex-col items-center gap-1.5 rounded-lg focus-visible:outline-none"
                >
                  <span
                    className={`h-11 w-[68px] rounded-lg bg-cover bg-center ring-1 ring-black/10 transition-transform duration-150 group-hover/swatch:scale-105 group-focus-visible/swatch:outline group-focus-visible/swatch:outline-2 group-focus-visible/swatch:outline-offset-2 group-focus-visible/swatch:outline-amber-500 ${
                      isActive ? 'outline outline-2 outline-offset-2 outline-amber-500' : ''
                    }`}
                    style={
                      w.type === 'image'
                        ? { backgroundImage: `url(${w.src})` }
                        : { backgroundImage: w.backgroundImage }
                    }
                  />
                  <span
                    className={`text-[10px] leading-none ${
                      isActive ? `font-semibold ${labelActive}` : labelIdle
                    }`}
                  >
                    {w.label}
                  </span>
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change wallpaper"
        aria-expanded={open}
        className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-xl border shadow-[0_16px_40px_-16px_rgba(24,24,27,0.35)] backdrop-blur-xl transition-colors duration-150 ${shell}`}
      >
        <WallpaperIcon />
      </button>
    </div>
  )
}
