// Tracks whether the viewport is below Tailwind's `md` breakpoint (768px).
// Drives the phone layout: sheets instead of draggable windows, a bottom tab
// bar instead of the dock. Kept in JS (not just CSS) because the mobile
// behaviour differs structurally — dragging is disabled and navigation becomes
// a single-sheet stack.
import { useEffect, useState } from 'react'

const QUERY = '(max-width: 767px)'

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    // Sync in case the viewport changed between first render and effect.
    setIsMobile(mq.matches)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
