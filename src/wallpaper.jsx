// Wallpaper state: which one is active, persisting the choice, and telling the
// rest of the shell whether it needs light-on-dark chrome.
//
// Phones always use the default gradient regardless of what's stored — the
// picker is hidden there, and the sheet UI is built for a light backdrop. The
// stored preference is left untouched so it comes back on a desktop visit.
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useIsMobile } from './useIsMobile.js'
import { DEFAULT_WALLPAPER_ID, WALLPAPERS, getWallpaper } from './data/wallpapers.js'

const STORAGE_KEY = 'davidsport:wallpaper'

const WallpaperContext = createContext(null)

// localStorage can throw in private-mode / storage-blocked browsers, and the
// stored id may be stale if a wallpaper is ever removed — validate both.
function readStoredId() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return WALLPAPERS.some((w) => w.id === stored) ? stored : DEFAULT_WALLPAPER_ID
  } catch {
    return DEFAULT_WALLPAPER_ID
  }
}

export function WallpaperProvider({ children }) {
  const isMobile = useIsMobile()
  const [selectedId, setSelectedId] = useState(readStoredId)

  // Every wallpaper that has been shown this session. Their layers stay mounted
  // at opacity 0 so switching back is an instant crossfade with no re-fetch.
  const [mounted, setMounted] = useState(() => new Set([readStoredId()]))

  const select = useCallback((id) => {
    setMounted((prev) => (prev.has(id) ? prev : new Set(prev).add(id)))
    setSelectedId(id)
    try {
      window.localStorage.setItem(STORAGE_KEY, id)
    } catch {
      // Storage unavailable — the choice just won't survive a reload.
    }
  }, [])

  // Warm the image cache so the first switch crossfades instead of flashing.
  // Called when the picker opens, which is the earliest real signal of intent.
  const preload = useCallback(() => {
    for (const w of WALLPAPERS) {
      if (w.type === 'image') {
        const img = new Image()
        img.src = w.src
      }
    }
  }, [])

  // Phones are pinned to the gradient.
  const activeId = isMobile ? DEFAULT_WALLPAPER_ID : selectedId
  const active = getWallpaper(activeId)

  const value = useMemo(
    () => ({
      wallpapers: WALLPAPERS,
      activeId,
      active,
      // Which layers to render (always includes the active one).
      mountedIds: isMobile ? [DEFAULT_WALLPAPER_ID] : [...mounted],
      isDark: active.dark,
      canChange: !isMobile,
      select,
      preload,
    }),
    [activeId, active, mounted, isMobile, select, preload],
  )

  return <WallpaperContext.Provider value={value}>{children}</WallpaperContext.Provider>
}

export function useWallpaper() {
  const ctx = useContext(WallpaperContext)
  if (!ctx) throw new Error('useWallpaper must be used within a WallpaperProvider')
  return ctx
}

export { STORAGE_KEY as WALLPAPER_STORAGE_KEY }
