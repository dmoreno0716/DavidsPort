// Frosted, centered dock. Each app is a rounded-square button with a hover
// tooltip; open apps show a small amber dot beneath their icon. Clicking opens
// the window (or focuses it if already open — no duplicates).
//
// Keyboard: each tile is a real <button>, so Tab moves along the dock and
// Enter/Space opens. The tooltip surfaces on focus as well as hover, and the
// focused tile gets an amber ring.
import { useWindowManager } from '../windowManager.jsx'
import { useWallpaper } from '../wallpaper.jsx'
import { APPS } from '../data/apps.jsx'

export default function Dock() {
  const { open, isOpen } = useWindowManager()
  const { isDark } = useWallpaper()

  // Over a photo wallpaper the dock inverts to a dark frosted panel with light
  // icons, so it reads as part of the OS rather than a white slab on a sunset.
  const panel = isDark
    ? 'border-white/15 bg-zinc-900/30'
    : 'border-white/60 bg-white/55'
  const tile = isDark
    ? 'bg-white/15 text-white/85 ring-white/10 group-hover:bg-white/25 group-hover:text-white group-focus-visible:bg-white/25 group-focus-visible:text-white'
    : 'bg-white/70 text-zinc-600 ring-black/5 group-hover:bg-white group-hover:text-zinc-900 group-focus-visible:bg-white group-focus-visible:text-zinc-900'

  return (
    // The positioning wrapper spans the full viewport width so the dock can be
    // centered, but it is *invisible* — without pointer-events-none it would sit
    // at z-40 across the whole bottom of the screen and swallow clicks on any
    // window content underneath it (which is exactly what killed the project
    // Live/GitHub links). Only the visible panel below takes pointer events.
    <nav
      aria-label="Dock"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center"
    >
      <ul
        className={`pointer-events-auto flex items-end gap-1.5 rounded-2xl border p-2 shadow-[0_16px_40px_-16px_rgba(24,24,27,0.35)] backdrop-blur-xl transition-colors duration-300 ${panel}`}
      >
        {APPS.map((app) => {
          const Icon = app.icon
          const active = isOpen(app.id)
          return (
            <li key={app.id}>
              <button
                type="button"
                onClick={() => open(app.id)}
                aria-label={`${app.label}${active ? ' (open)' : ''}`}
                aria-pressed={active}
                className="group relative flex flex-col items-center rounded-xl focus-visible:outline-none"
              >
                {/* Tooltip — visible on hover *and* keyboard focus */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md bg-zinc-800 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  {app.label}
                </span>

                {/* Icon tile */}
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 transition-all duration-150 group-active:scale-95 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-amber-500 ${tile}`}
                >
                  <Icon />
                </span>

                {/* Open indicator */}
                <span
                  aria-hidden="true"
                  className="mt-1 h-1 w-1 rounded-full bg-amber-500 transition-opacity"
                  style={{ opacity: active ? 1 : 0 }}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
