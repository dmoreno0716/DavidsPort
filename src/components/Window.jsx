// A single draggable window. Dragging is initiated only from the title bar
// (via dragControls), constrained to the desktop area. Clicking anywhere on the
// window focuses it; the focused window is fully opaque with a thin amber top
// accent, while unfocused windows dim slightly.
//
// Keyboard: the window is a labelled, focusable non-modal dialog. It takes
// focus when it opens, so Tab continues into its content rather than jumping
// back to the dock; tabbing into a background window raises it (onFocusCapture).
// Esc closes the focused window — handled globally in Desktop.jsx so it works
// no matter which element inside has focus.
import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useDragControls } from 'framer-motion'

// Vertical space the chrome reserves: the menu bar above the window layer, and
// the floating dock at the bottom. A window is capped so it can never render
// content into the band the dock covers — content there looks fine but is
// physically unclickable, since the dock floats above the window layer.
const MENU_BAR_PX = 28 // .top-7 on the window layer
const DOCK_ZONE_PX = 96 // dock panel (~70px) + its bottom-4 offset + breathing room

export default function Window({ app, spawn, focused, zIndex, constraintsRef, onFocus, onClose }) {
  const controls = useDragControls()
  // Persist position across re-renders/focus changes via motion values.
  const x = useMotionValue(spawn.x)
  const y = useMotionValue(spawn.y)
  const ref = useRef(null)

  const { title, width, Content } = app

  // Move focus into the window when it opens. preventScroll keeps the desktop
  // from jumping if the window spawns near an edge.
  useEffect(() => {
    ref.current?.focus({ preventScroll: true })
  }, [])

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="false"
      aria-label={title}
      tabIndex={-1}
      data-window
      className="absolute left-0 top-0 flex select-none flex-col rounded-xl bg-white ring-1 ring-black/5"
      style={{
        x,
        y,
        width,
        zIndex,
        maxHeight: `calc(100vh - ${MENU_BAR_PX + spawn.y + DOCK_ZONE_PX}px)`,
        boxShadow: focused
          ? '0 18px 50px -12px rgba(24,24,27,0.28), 0 6px 16px -8px rgba(24,24,27,0.20)'
          : '0 12px 34px -14px rgba(24,24,27,0.20)',
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

      {/* Body — scrolls if the content is taller than the capped window, so
          nothing ends up stranded underneath the dock. */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
        <Content />
      </div>
    </motion.div>
  )
}
