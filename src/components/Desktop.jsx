// The shell: warm gradient wallpaper, menu bar, and — depending on viewport —
// either the desktop's draggable windows + dock, or the phone layout's
// single full-screen sheet + bottom tab bar. The desktop path is unchanged from
// before; the mobile path (below the md breakpoint) swaps in Sheet + TabBar and
// never mounts the draggable Window, so dragging is disabled on phones.
import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useWindowManager } from '../windowManager.jsx'
import { useIsMobile } from '../useIsMobile.js'
import { useWallpaper } from '../wallpaper.jsx'
import { getWallpaper } from '../data/wallpapers.js'
import { WINDOWS_BY_ID } from '../data/apps.jsx'
import MenuBar from './MenuBar.jsx'
import Dock from './Dock.jsx'
import Window from './Window.jsx'
import WallpaperPicker from './WallpaperPicker.jsx'
import Sheet from './mobile/Sheet.jsx'
import TabBar from './mobile/TabBar.jsx'

export default function Desktop() {
  const { windows, focusedId, zIndexOf, focus, close, resize } = useWindowManager()
  const isMobile = useIsMobile()
  const { activeId, mountedIds, isDark } = useWallpaper()
  const constraintsRef = useRef(null)

  // Esc closes the focused window (or, on phones, the visible sheet). Bound on
  // the document rather than the window element so it fires wherever focus sits
  // — inside the window body, on the dock, or nowhere in particular.
  useEffect(() => {
    if (!focusedId) return
    function onKeyDown(e) {
      if (e.key === 'Escape') close(focusedId)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [focusedId, close])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-zinc-900">
      {/* Wallpaper layers. Every wallpaper shown this session stays mounted at
          opacity 0, so switching is a 300ms crossfade with no refetch and no
          flash of empty background. The gradient is pure CSS; the photos cover
          and center. Purely decorative, so hidden from assistive tech. */}
      <div aria-hidden="true" className="absolute inset-0">
        {mountedIds.map((id) => {
          const w = getWallpaper(id)
          return (
            <div
              key={id}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-out"
              style={{
                backgroundImage:
                  w.type === 'image' ? `url(${w.src})` : w.backgroundImage,
                opacity: id === activeId ? 1 : 0,
              }}
            />
          )
        })}

        {/* Scrims: the photos are bright at the top (pink sky) and varied at the
            bottom, so contrast for the menu bar and dock can't rely on the image
            being dark. These fade in only for image wallpapers. */}
        <div
          className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent transition-opacity duration-300"
          style={{ opacity: isDark ? 1 : 0 }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent transition-opacity duration-300"
          style={{ opacity: isDark ? 1 : 0 }}
        />
      </div>

      <MenuBar />

      {isMobile ? (
        // Phone: one full-screen sheet at a time (the focused window), swapped
        // with a quick slide/fade. Everything else in the stack stays mounted
        // in the store so "back" from a project returns to Projects.
        <AnimatePresence>
          {focusedId && (
            <Sheet
              key={focusedId}
              id={focusedId}
              onClose={() => close(focusedId)}
            />
          )}
        </AnimatePresence>
      ) : (
        // Desktop: draggable windows, inset below the menu bar (also the drag
        // boundary).
        <div ref={constraintsRef} className="absolute inset-x-0 bottom-0 top-7">
          <AnimatePresence>
            {windows.map((w) => {
              const app = WINDOWS_BY_ID[w.id]
              if (!app) return null
              return (
                <Window
                  key={w.id}
                  app={app}
                  spawn={{ x: w.x, y: w.y }}
                  size={{ w: w.w, h: w.h }}
                  focused={focusedId === w.id}
                  zIndex={zIndexOf(w.id) + 1}
                  constraintsRef={constraintsRef}
                  onFocus={() => focus(w.id)}
                  onClose={() => close(w.id)}
                  onResize={(next) => resize(w.id, next)}
                />
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {isMobile ? <TabBar /> : <Dock />}
      <WallpaperPicker />
    </div>
  )
}
