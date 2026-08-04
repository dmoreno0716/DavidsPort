// Mobile: a fixed bottom tab bar replacing the dock. Same five items. Tapping a
// tab makes that app the single visible sheet — any other open sheet is closed
// first (tab-bar "switch" semantics), while project-detail sheets opened from
// within the Projects sheet stack on top of it (see Projects.jsx / Sheet.jsx).
// The active tab is highlighted amber; a project sheet keeps Projects active.
import { useWindowManager } from '../../windowManager.jsx'
import { APPS } from '../../data/apps.jsx'

export default function TabBar() {
  const { windows, open, close } = useWindowManager()

  const openIds = windows.map((w) => w.id)
  const openApp = APPS.find((a) => openIds.includes(a.id))
  const viewingProject = openIds.some((id) => id.startsWith('project:'))
  const activeTab = openApp?.id ?? (viewingProject ? 'projects' : null)

  // Switch to a top-level tab: close whatever else is open, then open this one.
  function selectTab(id) {
    windows.forEach((w) => {
      if (w.id !== id) close(w.id)
    })
    open(id)
  }

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 flex h-16 items-stretch border-t border-black/5 bg-white/85 backdrop-blur-xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {APPS.map((app) => {
        const Icon = app.icon
        const active = activeTab === app.id
        return (
          <button
            key={app.id}
            type="button"
            onClick={() => selectTab(app.id)}
            aria-label={app.label}
            aria-current={active ? 'page' : undefined}
            className="flex flex-1 flex-col items-center justify-center gap-1"
          >
            <Icon className={active ? 'text-amber-500' : 'text-zinc-500'} />
            <span
              className={`text-[10px] leading-none ${
                active ? 'font-semibold text-amber-600' : 'text-zinc-500'
              }`}
            >
              {app.short ?? app.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
