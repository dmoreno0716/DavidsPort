// Central window-manager state: which windows are open, their spawn positions,
// and the z-order stack. Exposed via context so any component (Dock, MenuBar,
// Window) can read/act on it through the `useWindowManager` hook.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useIsMobile } from './useIsMobile.js'

const WindowManagerContext = createContext(null)

// Each newly-opened window is nudged down-right so they don't stack exactly.
const STAGGER = 30
const APP_WINDOW_WIDTH = 360

// Widths of the two windows opened on first load. Kept in sync by hand with
// data/apps.jsx — importing that registry here would be circular (apps.jsx →
// components/apps/Projects.jsx → this module).
const ABOUT_WIDTH = 380
const RESUME_WIDTH = 480
const PAIR_GAP = 28 // breathing room between the two
const EDGE_MARGIN = 24 // smallest gap we'll leave against a viewport edge
const PAIR_TOP = 48 // y of both windows, relative to the window layer

// Spawn position for the Nth simultaneously-open window, roughly centered
// horizontally and slightly above the vertical middle (so it reads as
// "off-center", matching the About window in the design).
function spawnPosition(openCount) {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200
  const baseX = Math.max(24, vw / 2 - APP_WINDOW_WIDTH / 2 - 140)
  const step = openCount % 7 // wrap so we never march off-screen
  return { x: baseX + step * STAGGER, y: 40 + step * STAGGER }
}

// Where About and Resume sit on first load: About just left of center, Resume
// just right of it, as a balanced pair. If the viewport is too narrow to fit
// both side by side (a small laptop still above the mobile breakpoint), fall
// back to the diagonal stagger — overlapping is better than off-screen.
function initialPairLayout() {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
  const pairWidth = ABOUT_WIDTH + PAIR_GAP + RESUME_WIDTH

  if (vw >= pairWidth + EDGE_MARGIN * 2) {
    const startX = Math.round((vw - pairWidth) / 2)
    return {
      about: { x: startX, y: PAIR_TOP },
      resume: { x: startX + ABOUT_WIDTH + PAIR_GAP, y: PAIR_TOP },
    }
  }

  const x = Math.max(EDGE_MARGIN, Math.round((vw - RESUME_WIDTH) / 2) - STAGGER)
  return {
    about: { x, y: PAIR_TOP },
    resume: { x: x + STAGGER, y: PAIR_TOP + STAGGER },
  }
}

export function WindowManagerProvider({ children }) {
  const isMobile = useIsMobile()
  // Open windows, each: { id, x, y }
  const [windows, setWindows] = useState([])
  // z-order: ids ordered back → front; the last entry is focused.
  const [order, setOrder] = useState([])

  const focus = useCallback((id) => {
    setOrder((o) => (o[o.length - 1] === id ? o : [...o.filter((w) => w !== id), id]))
  }, [])

  // `position` overrides the automatic stagger — used for the first-load pair,
  // which is laid out deliberately rather than stacked.
  const open = useCallback((id, position) => {
    setWindows((ws) => {
      if (ws.some((w) => w.id === id)) return ws // already open → no duplicate
      return [...ws, { id, ...(position ?? spawnPosition(ws.length)) }]
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

  // First load: on desktop, open About *and* Resume as a pair; on phones open
  // only About, since two stacked full-screen sheets would just hide each other.
  //
  // Resume is opened first so About lands on top of the z-order stack and is
  // the focused window. Guarded by a ref so this runs exactly once — crossing
  // the mobile breakpoint later must not re-open windows the visitor closed.
  const didAutoOpen = useRef(false)
  useEffect(() => {
    if (didAutoOpen.current) return
    didAutoOpen.current = true

    if (isMobile) {
      open('about')
      return
    }

    const layout = initialPairLayout()
    open('resume', layout.resume) // behind
    open('about', layout.about) // focused
  }, [isMobile, open])

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
