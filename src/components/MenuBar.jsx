// Thin frosted menu bar pinned to the top. Left: brand wordmark + the focused
// app's name. Right: battery, a control dot, and a live-updating clock.
import { useEffect, useState } from 'react'
import { useWindowManager } from '../windowManager.jsx'
import { APPS_BY_ID } from '../data/apps.jsx'
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
  const clock = useClock()
  const activeTitle = focusedId ? APPS_BY_ID[focusedId]?.title : null

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-7 items-center justify-between border-b border-black/5 bg-white/55 px-4 text-[13px] backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" />
          <span className="font-semibold text-zinc-800">DavidOS</span>
        </div>
        {activeTitle && <span className="text-zinc-500">{activeTitle}</span>}
      </div>

      <div className="flex items-center gap-3 text-zinc-600">
        <BatteryIcon />
        <ControlIcon />
        <span className="tabular-nums text-zinc-700">{clock}</span>
      </div>
    </div>
  )
}
