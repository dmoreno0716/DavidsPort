// The shell: warm gradient wallpaper, menu bar, and — depending on viewport —
// either the desktop's draggable windows + dock, or the phone layout's
// single full-screen sheet + bottom tab bar. The desktop path is unchanged from
// before; the mobile path (below the md breakpoint) swaps in Sheet + TabBar and
// never mounts the draggable Window, so dragging is disabled on phones.
import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useWindowManager } from '../windowManager.jsx'
import { useIsMobile } from '../useIsMobile.js'
import { WINDOWS_BY_ID } from '../data/apps.jsx'
import MenuBar from './MenuBar.jsx'
import Dock from './Dock.jsx'
import Window from './Window.jsx'
import Sheet from './mobile/Sheet.jsx'
import TabBar from './mobile/TabBar.jsx'

// Subtle, unbusy wallpaper: a warm amber glow in the top-left over a
// cream → pale-gray diagonal gradient.
const wallpaper = {
  backgroundImage: [
    'radial-gradient(1100px 760px at 14% 8%, rgba(245,158,11,0.12), transparent 62%)',
    'linear-gradient(135deg, #faf7f2 0%, #f1efee 55%, #e9e9ec 100%)',
  ].join(', '),
}

export default function Desktop() {
  const { windows, focusedId, zIndexOf, focus, close } = useWindowManager()
  const isMobile = useIsMobile()
  const constraintsRef = useRef(null)

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={wallpaper}>
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
                  focused={focusedId === w.id}
                  zIndex={zIndexOf(w.id) + 1}
                  constraintsRef={constraintsRef}
                  onFocus={() => focus(w.id)}
                  onClose={() => close(w.id)}
                />
              )
            })}
          </AnimatePresence>
        </div>
      )}

      {isMobile ? <TabBar /> : <Dock />}
    </div>
  )
}
