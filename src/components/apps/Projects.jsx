// Projects window: a folder-style grid of every project. Deployed projects show
// their screenshot thumbnail; repo-only projects show a code glyph. Clicking a
// tile opens that project's detail window through the shared window manager
// (id `project:<id>`), so it participates in focus/z-order/staggering like any
// other window and never opens a duplicate.
import { useWindowManager } from '../../windowManager.jsx'
import { projects } from '../../data/projects.js'
import { CodeIcon } from '../icons.jsx'

export default function Projects() {
  const { open } = useWindowManager()

  return (
    <div className="grid grid-cols-2 gap-3">
      {projects.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => open(`project:${p.id}`)}
          aria-label={`${p.title} — ${p.tagline}`}
          className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-left ring-1 ring-black/5 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-12px_rgba(24,24,27,0.28)]"
        >
          {/* Thumbnail */}
          <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-100">
            {p.deployed && p.screenshot ? (
              <img
                src={p.screenshot}
                alt=""
                width={1400}
                height={781}
                className="h-full w-full object-cover object-left-top transition-transform duration-200 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 text-zinc-400">
                <CodeIcon />
              </div>
            )}
          </div>

          {/* Label */}
          <div className="px-3 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-[13px] font-semibold text-zinc-800">
                {p.title}
              </span>
              {!p.deployed && (
                <span className="shrink-0 rounded-full bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
                  {p.note ?? 'Repo'}
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-[11px] text-zinc-400">
              {p.tagline}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}
