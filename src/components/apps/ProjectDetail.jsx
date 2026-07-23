// Project detail window body. Screenshot (deployed only), title + tagline,
// description, tech-stack chips, and action buttons: "Live ↗" (orange primary,
// deployed only) and "GitHub ↗" (outline, all projects). Links open in new tabs.
import { ArrowUpRightIcon, GitHubIcon } from '../icons.jsx'

function isPlaceholder(url) {
  return !url || url === '#'
}

export default function ProjectDetail({ project }) {
  const { title, tagline, description, deployed, screenshot, liveUrl, githubUrl, tech } =
    project

  return (
    <div className="space-y-4">
      {deployed && screenshot && (
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
          <img
            src={screenshot}
            alt={`${title} screenshot`}
            className="w-full object-cover"
            loading="lazy"
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

      <div className="flex items-center gap-2 pt-1">
        {deployed && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-disabled={isPlaceholder(liveUrl)}
            className={`inline-flex items-center gap-1 rounded-lg bg-amber-500 px-3.5 py-2 text-[13px] font-medium text-white shadow-sm transition-colors hover:bg-amber-600 ${
              isPlaceholder(liveUrl) ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Live <ArrowUpRightIcon />
          </a>
        )}

        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-disabled={isPlaceholder(githubUrl)}
          className={`inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-50 ${
            isPlaceholder(githubUrl) ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          <GitHubIcon /> GitHub <ArrowUpRightIcon />
        </a>
      </div>
    </div>
  )
}
