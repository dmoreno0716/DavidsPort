// Thin frosted menu bar pinned to the top. Left: brand wordmark + the focused
// app's name. Right: battery, a control dot, and a live-updating clock.
// On phones (below md) it simplifies to just the wordmark and clock — the app
// title and status icons are hidden.
import { useEffect, useState } from 'react'
import { useWindowManager } from '../windowManager.jsx'
import { useWallpaper } from '../wallpaper.jsx'
import { WINDOWS_BY_ID } from '../data/apps.jsx'
import { BatteryIcon, ControlIcon } from './icons.jsx'

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const weekday = now.toLocaleDateString(undefined, { weekday: 'short' })
  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  return `${weekday} ${time}`
}

export default function MenuBar() {
  const { focusedId } = useWindowManager()
  const { isDark } = useWallpaper()
  const clock = useClock()
  const activeTitle = focusedId ? WINDOWS_BY_ID[focusedId]?.title : null

  // Over a photo wallpaper the bar goes light-on-dark: a deeper frosted panel
  // plus white text. Paired with the scrim behind it (Desktop.jsx) this keeps
  // the wordmark and clock readable over both bright sky and dark treeline.
  const bar = isDark
    ? 'border-white/10 bg-zinc-900/35 text-white'
    : 'border-black/5 bg-white/55 text-zinc-800'
  const brand = isDark ? 'text-white' : 'text-zinc-800'
  const secondary = isDark ? 'text-white/70' : 'text-zinc-500'
  const status = isDark ? 'text-white/75' : 'text-zinc-600'
  const clockColor = isDark ? 'text-white/95' : 'text-zinc-700'

  return (
    <div
      className={`fixed inset-x-0 top-0 z-50 flex h-7 items-center justify-between border-b px-4 text-[13px] backdrop-blur-md transition-colors duration-300 ${bar}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" />
          <span className={`font-semibold ${brand}`}>DavidOS</span>
        </div>
        {activeTitle && (
          <span className={`hidden md:inline ${secondary}`}>{activeTitle}</span>
        )}
      </div>

      <div className={`flex items-center gap-3 ${status}`}>
        <span className="hidden items-center gap-3 md:flex">
          <BatteryIcon />
          <ControlIcon />
        </span>
        <span className={`tabular-nums ${clockColor}`}>{clock}</span>
      </div>
    </div>
  )
}
