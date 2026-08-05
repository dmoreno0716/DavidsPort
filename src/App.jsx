import { MotionConfig } from 'framer-motion'
import { WindowManagerProvider } from './windowManager.jsx'
import { WallpaperProvider } from './wallpaper.jsx'
import Desktop from './components/Desktop.jsx'

export default function App() {
  return (
    // reducedMotion="user" collapses every framer-motion transform/opacity
    // animation to an instant state change when the visitor has "reduce motion"
    // enabled at the OS level.
    <MotionConfig reducedMotion="user">
      <WallpaperProvider>
        <WindowManagerProvider>
          <Desktop />
        </WindowManagerProvider>
      </WallpaperProvider>
    </MotionConfig>
  )
}
