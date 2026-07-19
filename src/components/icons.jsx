// Neutral line icons used in the dock and menu bar.
// All use `currentColor` so the parent controls color, and a 1.5 stroke to
// match the light, thin aesthetic of the design.

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
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
