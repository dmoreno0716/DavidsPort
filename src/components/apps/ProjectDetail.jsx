// Project detail window body. Screenshot (deployed only), title + tagline,
// description, tech-stack chips, and action buttons: "Live ↗" (orange primary,
// deployed only) and "GitHub ↗" (outline, all projects). Links open in new tabs.
import { ArrowUpRightIcon, GitHubIcon } from '../icons.jsx'

// Returns a safe absolute URL, or null if there isn't a real one yet.
//
// A bare "github.com/me/repo" (no protocol) would be treated as a *relative*
// path and navigate to davidsport.vercel.app/github.com/me/repo, so anything
// domain-shaped gets https:// prepended rather than silently breaking.
// '#', empty strings, and leftover TODO markers all count as "no link".
function resolveUrl(url) {
  if (typeof url !== 'string') return null
  const trimmed = url.trim()
  if (!trimmed || trimmed === '#' || trimmed.toUpperCase().startsWith('TODO')) return null
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (trimmed.includes('.')) return `https://${trimmed}` // e.g. "github.com/me/repo"
  return null
}

// A link that only renders as a link when it actually goes somewhere. Without a
// URL it renders as an obviously-inert chip — the previous version rendered a
// full-color button at 50% opacity with `pointer-events-none`, which still read
// as a working button but silently swallowed every click.
function ActionLink({ href, className, disabledLabel, children }) {
  const resolved = resolveUrl(href)

  if (!resolved) {
    return (
      <span
        aria-disabled="true"
        title={disabledLabel}
        className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-dashed border-zinc-200 bg-zinc-50 px-3.5 py-2 text-[13px] font-medium text-zinc-400"
      >
        {children}
      </span>
    )
  }

  return (
    <a href={resolved} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

export default function ProjectDetail({ project }) {
  const {
    title,
    tagline,
    description,
    deployed,
    comingSoon,
    screenshot,
    liveUrl,
    githubUrl,
    tech,
  } = project

  return (
    <div className="space-y-4">
      {/* aspect-[16/9] + intrinsic width/height reserve the box before the
          image decodes, so opening the window doesn't shift the text below. */}
      {deployed && screenshot && (
        <div className="aspect-[16/9] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
          <img
            src={screenshot}
            alt={`Screenshot of ${title}`}
            width={1400}
            height={781}
            className="h-full w-full object-cover object-left-top"
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div>
        <h2 className="text-base font-semibold text-zinc-900">{title}</h2>
        <p className="text-[12px] text-zinc-400">{tagline}</p>
      </div>

      <p className="text-[13px] leading-relaxed text-zinc-600">{description}</p>

      {tech?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Work-in-progress projects have nothing public to link to yet, so they
          get an honest status badge instead of a row of dead buttons. */}
      {comingSoon ? (
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-amber-300 bg-amber-50 px-3.5 py-2.5">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-amber-500" />
          <div className="text-[12px] leading-snug">
            <span className="font-semibold text-amber-700">Coming soon</span>
            <span className="text-amber-700/70">
              {' '}
              — still in the workshop. Links go up when it ships.
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 pt-1">
          {deployed && (
            <ActionLink
              href={liveUrl}
              disabledLabel="No live URL for this project yet"
              className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-3.5 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-amber-600"
            >
              Live <ArrowUpRightIcon />
            </ActionLink>
          )}

          <ActionLink
            href={githubUrl}
            disabledLabel="No repo URL for this project yet"
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            <GitHubIcon /> GitHub <ArrowUpRightIcon />
          </ActionLink>
        </div>
      )}
    </div>
  )
}
