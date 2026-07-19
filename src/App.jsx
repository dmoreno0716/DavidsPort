import { WindowManagerProvider } from './windowManager.jsx'
import Desktop from './components/Desktop.jsx'

export default function App() {
  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  )
}
