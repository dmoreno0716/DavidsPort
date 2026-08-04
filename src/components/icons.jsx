// Neutral line icons used in the dock and menu bar.
// All use `currentColor` so the parent controls color, and a 1.5 stroke to
// match the light, thin aesthetic of the design.
//
// Every icon here is decorative: the button or link wrapping it carries the
// accessible name (aria-label or visible text), so the svg is hidden from
// assistive tech to avoid a doubled-up announcement. `base` is spread first, so
// a caller that needs a labelled icon can still pass aria-hidden={false}.

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export function PersonIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
    </svg>
  )
}

export function FolderIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 7.5a2 2 0 0 1 2-2h3l2 2h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2z" />
    </svg>
  )
}

export function DocumentIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 3.5h6l4 4v11a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 18.5v-13.5A1.5 1.5 0 0 1 7 3.5z" />
      <path d="M13 3.5v4h4" />
      <path d="M8.5 12.5h7M8.5 15.5h7" />
    </svg>
  )
}

export function MailIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7l8 5.5L20 7" />
    </svg>
  )
}

export function MusicIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 17.5V6l10-2v9.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="16.5" cy="15.5" r="2.5" />
    </svg>
  )
}

export function BatteryIcon(props) {
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2.5" y="8" width="16" height="8" rx="2" />
      <rect x="4.5" y="10" width="10" height="4" rx="1" fill="currentColor" stroke="none" />
      <path d="M20.5 10.5v3" />
    </svg>
  )
}

export function ControlIcon(props) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      {...props}
    >
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  )
}

// Diagonal arrow used on "Live ↗" / "GitHub ↗" buttons.
export function ArrowUpRightIcon(props) {
  return (
    <svg {...base} width={14} height={14} {...props}>
      <path d="M8 16L16 8" />
      <path d="M9 8h7v7" />
    </svg>
  )
}

// GitHub glyph for repo buttons.
export function GitHubIcon(props) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z" />
    </svg>
  )
}

// Code / file glyph shown as the thumbnail for repo-only (undeployed) projects.
export function CodeIcon(props) {
  return (
    <svg {...base} width={28} height={28} {...props}>
      <path d="M9 8l-4 4 4 4" />
      <path d="M15 8l4 4-4 4" />
    </svg>
  )
}

// Close (X) — used on mobile top-level sheet headers.
export function CloseIcon(props) {
  return (
    <svg {...base} width={22} height={22} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

// Back chevron — used on mobile project-detail sheet headers to return to Projects.
export function ChevronLeftIcon(props) {
  return (
    <svg {...base} width={24} height={24} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}
