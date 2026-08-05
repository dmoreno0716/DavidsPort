// A single draggable, resizable window. Dragging is initiated only from the
// title bar (via dragControls); resizing only from the corner grip. Clicking
// anywhere on the window focuses it; the focused window is fully opaque with a
// thin amber top accent, while unfocused windows dim slightly.
//
// Keyboard: the window is a labelled, focusable non-modal dialog. It takes
// focus when it opens, so Tab continues into its content rather than jumping
// back to the dock; tabbing into a background window raises it (onFocusCapture).
// Esc closes the focused window — handled globally in Desktop.jsx so it works
// no matter which element inside has focus.
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useDragControls } from 'framer-motion'
import { useWallpaper } from '../wallpaper.jsx'

// Vertical space the chrome reserves: the menu bar above the window layer, and
// the floating dock at the bottom. A window is capped so it can never render
// content into the band the dock covers — content there looks fine but is
// physically unclickable, since the dock floats above the window layer.
const MENU_BAR_PX = 28 // .top-7 on the window layer
const DOCK_ZONE_PX = 96 // dock panel (~70px) + its bottom-4 offset + breathing room
const EDGE_MARGIN_PX = 16 // keep a sliver of desktop to the right of a window

// Floors used when an app doesn't declare its own (see data/apps.jsx).
const FALLBACK_MIN_W = 300
const FALLBACK_MIN_H = 200

const clamp = (v, min, max) => Math.min(Math.max(v, min), Math.max(min, max))

export default function Window({
  app,
  spawn,
  size,
  focused,
  zIndex,
  constraintsRef,
  onFocus,
  onClose,
  onResize,
}) {
  const controls = useDragControls()
  const { isDark } = useWallpaper()
  // Persist position across re-renders/focus changes via motion values.
  const x = useMotionValue(spawn.x)
  const y = useMotionValue(spawn.y)
  const ref = useRef(null)
  const [resizing, setResizing] = useState(false)

  // The window itself is unchanged on every wallpaper — only the shadow deepens,
  // so a white panel still separates from a dark photo instead of floating flat.
  const shadow = focused
    ? isDark
      ? '0 28px 70px -14px rgba(0,0,0,0.62), 0 10px 22px -10px rgba(0,0,0,0.45)'
      : '0 18px 50px -12px rgba(24,24,27,0.28), 0 6px 16px -8px rgba(24,24,27,0.20)'
    : isDark
      ? '0 20px 52px -16px rgba(0,0,0,0.52), 0 6px 16px -10px rgba(0,0,0,0.38)'
      : '0 12px 34px -14px rgba(24,24,27,0.20)'

  const { title, width, minWidth, minHeight, Content } = app

  // Move focus into the window when it opens. preventScroll keeps the desktop
  // from jumping if the window spawns near an edge.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])

  const startResize = useCallback(
    (e) => {
      // Never let a resize turn into a title-bar drag or a text selection, and
      // raise the window the way clicking it would.
      e.preventDefault()
      e.stopPropagation()
      onFocus()

      const rect = ref.current.getBoundingClientRect()
      const startX = e.clientX
      const startY = e.clientY
      const startW = rect.width
      const startH = rect.height

      // Maximums come from the window's live on-screen position, so a window
      // that has been dragged can't be resized past the viewport or under the
      // dock. Recomputed per gesture rather than per frame — the window doesn't
      // move while it's being resized.
      const maxW = window.innerWidth - rect.left - EDGE_MARGIN_PX
      const maxH = window.innerHeight - rect.top - DOCK_ZONE_PX
      const minW = minWidth ?? FALLBACK_MIN_W
      const minH = minHeight ?? FALLBACK_MIN_H

      setResizing(true)

      const onMove = (ev) => {
        onResize({
          w: Math.round(clamp(startW + (ev.clientX - startX), minW, maxW)),
          h: Math.round(clamp(startH + (ev.clientY - startY), minH, maxH)),
        })
      }
      const onUp = () => {
        window.removeEventListener('pointermove', onMove)
        window.removeEventListener('pointerup', onUp)
        window.removeEventListener('pointercancel', onUp)
        setResizing(false)
      }

      window.addEventListener('pointermove', onMove)
      window.addEventListener('pointerup', onUp)
      window.addEventListener('pointercancel', onUp)
    },
    [minWidth, minHeight, onFocus, onResize],
  )

  const hasExplicitSize = size?.w != null && size?.h != null

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-label={title}
      tabIndex={-1}
      data-window
      className="group/window absolute left-0 top-0 flex select-none flex-col rounded-xl bg-white ring-1 ring-black/5"
      style={{
        x,
        y,
        zIndex,
        width: size?.w ?? width,
        // Height stays content-driven until the window is resized. Once it has
        // an explicit height the cap is redundant — startResize already clamped
        // against the same bottom edge — and would fight the chosen size.
        height: hasExplicitSize ? size.h : undefined,
        maxHeight: hasExplicitSize
          ? undefined
          : `calc(100vh - ${MENU_BAR_PX + spawn.y + DOCK_ZONE_PX}px)`,
        boxShadow: shadow,
      }}
      drag
      dragListener={false}
      dragControls={controls}
      dragConstraints={constraintsRef}
      dragMomentum={false}
      dragElastic={0}
      onPointerDown={onFocus}
      onFocusCapture={onFocus}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: focused ? 1 : 0.9, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Focus accent: thin amber line along the top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-xl bg-amber-500 transition-opacity duration-200"
        style={{ opacity: focused ? 1 : 0 }}
      />

      {/* Title bar — drag handle */}
      <div
        className="flex h-9 shrink-0 cursor-default items-center rounded-t-xl border-b border-zinc-100 bg-zinc-50/80 px-3"
        onPointerDown={(e) => controls.start(e)}
      >
        {/* Custom window controls (neutral, not Apple's colors) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Close ${title}`}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-zinc-300 transition-colors hover:bg-zinc-400"
          />
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-zinc-300" />
          <span aria-hidden="true" className="h-3 w-3 rounded-full bg-zinc-300" />
        </div>

        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-zinc-500">
          {title}
        </span>
      </div>

      {/* Body — scrolls if the content is taller than the window, so nothing
          ends up stranded underneath the dock. */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
        <Content />
      </div>

      {/* Resize grip: an invisible ~16px hotzone in the bottom-right corner with
          the OS resize cursor, plus a faint diagonal that only shows on hover. */}
      <div
        onPointerDown={startResize}
        role="presentation"
        className="absolute bottom-0 right-0 z-10 h-4 w-4 cursor-nwse-resize touch-none"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-full w-full text-zinc-400 opacity-0 transition-opacity duration-150 group-hover/window:opacity-100"
        >
          <path
            d="M13 6.5L6.5 13M13 10.5L10.5 13"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* While resizing, a full-screen transparent shield swallows pointer
          events so the Resume PDF <object> and the Spotify <iframe> can't eat
          the drag (which makes the resize stick or stutter). It also keeps the
          resize cursor steady and blocks text selection across the whole page. */}
      {resizing && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-[60] cursor-nwse-resize select-none"
          style={{ background: 'transparent' }}
        />
      )}
    </motion.div>
  )
}
