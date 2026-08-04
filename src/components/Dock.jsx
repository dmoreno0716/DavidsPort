// Frosted, centered dock. Each app is a rounded-square button with a hover
// tooltip; open apps show a small amber dot beneath their icon. Clicking opens
// the window (or focuses it if already open — no duplicates).
//
// Keyboard: each tile is a real <button>, so Tab moves along the dock and
// Enter/Space opens. The tooltip surfaces on focus as well as hover, and the
// focused tile gets an amber ring.
import { useWindowManager } from '../windowManager.jsx'
import { APPS } from '../data/apps.jsx'

export default function Dock() {
  const { open, isOpen } = useWindowManager()

  return (
    <nav
      aria-label="Dock"
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center"
    >
      <ul className="flex items-end gap-1.5 rounded-2xl border border-white/60 bg-white/55 p-2 shadow-[0_16px_40px_-16px_rgba(24,24,27,0.35)] backdrop-blur-xl">
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
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70 text-zinc-600 ring-1 ring-black/5 transition-all duration-150 group-hover:bg-white group-hover:text-zinc-900 group-active:scale-95 group-focus-visible:bg-white group-focus-visible:text-zinc-900 group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-amber-500">
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
