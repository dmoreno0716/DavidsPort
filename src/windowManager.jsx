// Central window-manager state: which windows are open, their spawn positions,
// and the z-order stack. Exposed via context so any component (Dock, MenuBar,
// Window) can read/act on it through the `useWindowManager` hook.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

const WindowManagerContext = createContext(null)

// Each newly-opened window is nudged down-right so they don't stack exactly.
const STAGGER = 30
const APP_WINDOW_WIDTH = 360

// Spawn position for the Nth simultaneously-open window, roughly centered
// horizontally and slightly above the vertical middle (so it reads as
// "off-center", matching the About window in the design).
function spawnPosition(openCount) {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const baseX = Math.max(24, vw / 2 - APP_WINDOW_WIDTH / 2 - 140)
  const step = openCount % 7 // wrap so we never march off-screen
  return { x: baseX + step * STAGGER, y: 40 + step * STAGGER }
}

export function WindowManagerProvider({ children }) {
  // Open windows, each: { id, x, y }
  const [windows, setWindows] = useState([])
  // z-order: ids ordered back → front; the last entry is focused.
  const [order, setOrder] = useState([])

  const focus = useCallback((id) => {
    setOrder((o) => (o[o.length - 1] === id ? o : [...o.filter((w) => w !== id), id]))
  }, [])

  const open = useCallback((id) => {
    setWindows((ws) => {
      if (ws.some((w) => w.id === id)) return ws // already open → no duplicate
      return [...ws, { id, ...spawnPosition(ws.length) }]
    })
    // Whether newly opened or already open, bring it to the front.
    setOrder((o) => [...o.filter((w) => w !== id), id])
  }, [])

  const close = useCallback((id) => {
    setWindows((ws) => ws.filter((w) => w.id !== id))
    setOrder((o) => o.filter((w) => w !== id))
  }, [])

  const openIds = useMemo(() => new Set(windows.map((w) => w.id)), [windows])
  const focusedId = order[order.length - 1] ?? null

  // On first load, open the About window automatically.
  useEffect(() => {
    open('about')
  }, [open])

  const value = useMemo(
    () => ({
      windows,
      order,
      focusedId,
      isOpen: (id) => openIds.has(id),
      zIndexOf: (id) => order.indexOf(id),
      open,
      close,
      focus,
    }),
    [windows, order, focusedId, openIds, open, close, focus],
  )

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  )
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext)
  if (!ctx) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider')
  }
  return ctx
}
