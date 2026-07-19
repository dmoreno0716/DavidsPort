// The desktop shell: warm gradient wallpaper, menu bar, dock, and the layer
// that hosts (and constrains) all open windows.
import { useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useWindowManager } from '../windowManager.jsx'
import { APPS_BY_ID } from '../data/apps.jsx'
import MenuBar from './MenuBar.jsx'
import Dock from './Dock.jsx'
import Window from './Window.jsx'

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
  const constraintsRef = useRef(null)

  return (
    <div className="relative h-screen w-screen overflow-hidden" style={wallpaper}>
      <MenuBar />

      {/* Window layer, inset below the menu bar; also the drag boundary. */}
      <div ref={constraintsRef} className="absolute inset-x-0 bottom-0 top-7">
        <AnimatePresence>
          {windows.map((w) => {
            const app = APPS_BY_ID[w.id]
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

      <Dock />
    </div>
  )
}
