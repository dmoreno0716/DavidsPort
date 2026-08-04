// Mobile: a single full-screen sheet for the active window. Below the md
// breakpoint the desktop's draggable windows are replaced by these sheets —
// one visible at a time, filling the area between the menu bar and the tab bar.
// Each has a header (title + a close/back control) and animates in with a quick
// slide + fade. Project-detail sheets show a back chevron (returns to Projects);
// all other sheets show a close (X).
import { motion } from 'framer-motion'
import { WINDOWS_BY_ID } from '../../data/apps.jsx'
import { CloseIcon, ChevronLeftIcon } from '../icons.jsx'

export default function Sheet({ id, onClose }) {
  const app = WINDOWS_BY_ID[id]
  if (!app) return null

  const isProject = id.startsWith('project:')
  const { title, Content } = app

  return (
    <motion.div
      className="fixed inset-x-0 bottom-16 top-7 z-30 flex flex-col bg-white"
      initial={{ opacity: 0, x: '6%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Sheet header */}
      <div className="relative flex h-12 shrink-0 items-center justify-center border-b border-zinc-100 px-2">
        <button
          onClick={onClose}
          aria-label={isProject ? 'Back to Projects' : 'Close'}
          className="absolute left-1 flex h-11 w-11 items-center justify-center rounded-lg text-zinc-600 active:bg-zinc-100"
        >
          {isProject ? <ChevronLeftIcon /> : <CloseIcon />}
        </button>
        <span className="text-[15px] font-semibold text-zinc-800">{title}</span>
      </div>

      {/* Scrollable content */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4">
        <Content />
      </div>
    </motion.div>
  )
}
