// Small circular avatar. Uses the provided image when profile.avatar is set;
// otherwise falls back to an initials monogram on a warm amber gradient so the
// UI never shows a broken image.
import { profile } from '../data/profile.js'

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

export default function Avatar({ size = 48 }) {
  const style = { width: size, height: size }

  if (profile.avatar) {
    return (
      <img
        src={profile.avatar}
        alt={profile.name}
        style={style}
        className="shrink-0 rounded-full object-cover ring-1 ring-black/10"
      />
    )
  }

  return (
    <div
      style={style}
      className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-sm font-semibold text-white ring-1 ring-black/10"
    >
      {initials(profile.name)}
    </div>
  )
}
