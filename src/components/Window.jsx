// A single draggable window. Dragging is initiated only from the title bar
// (via dragControls), constrained to the desktop area. Clicking anywhere on the
// window focuses it; the focused window is fully opaque with a thin amber top
// accent, while unfocused windows dim slightly.
import { motion, useMotionValue, useDragControls } from 'framer-motion'

export default function Window({ app, spawn, focused, zIndex, constraintsRef, onFocus, onClose }) {
  const controls = useDragControls()
  // Persist position across re-renders/focus changes via motion values.
  const x = useMotionValue(spawn.x)
  const y = useMotionValue(spawn.y)

  const { title, width, Content } = app

  return (
    <motion.div
      className="absolute left-0 top-0 select-none rounded-xl bg-white ring-1 ring-black/5"
      style={{
        x,
        y,
        width,
        zIndex,
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
        className="flex h-9 cursor-default items-center rounded-t-xl border-b border-zinc-100 bg-zinc-50/80 px-3"
        onPointerDown={(e) => controls.start(e)}
      >
        {/* Custom window controls (neutral, not Apple's colors) */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Close window"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={onClose}
            className="h-3 w-3 rounded-full bg-zinc-300 transition-colors hover:bg-zinc-400"
          />
          <span className="h-3 w-3 rounded-full bg-zinc-300" />
          <span className="h-3 w-3 rounded-full bg-zinc-300" />
        </div>

        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[13px] font-medium text-zinc-500">
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <Content />
      </div>
    </motion.div>
  )
}
