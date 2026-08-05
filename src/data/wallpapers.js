// Wallpaper registry.
//
// `default` is the original light gradient — an amber glow in the top-left over
// a cream → pale-gray diagonal, unchanged from before the picker existed.
// The other two are photos in public/wallpapers/. Their filenames are
// background1/background2 (that's how they arrived); the labels here are what
// the UI shows.
//
// `dark: true` tells the shell to switch the menu bar, dock, and picker to
// light-on-dark treatment — see components/Desktop.jsx and wallpaper.jsx.

export const GRADIENT_WALLPAPER = [
  'radial-gradient(1100px 760px at 14% 8%, rgba(245,158,11,0.12), transparent 62%)',
  'linear-gradient(135deg, #faf7f2 0%, #f1efee 55%, #e9e9ec 100%)',
].join(', ')

export const WALLPAPERS = [
  {
    id: 'default',
    label: 'Default',
    type: 'gradient',
    dark: false,
    backgroundImage: GRADIENT_WALLPAPER,
  },
  {
    id: 'forest',
    label: 'Forest',
    type: 'image',
    dark: true,
    src: '/wallpapers/background1.webp',
  },
  {
    id: 'mountains',
    label: 'Mountains',
    type: 'image',
    dark: true,
    src: '/wallpapers/background2.webp',
  },
]

export const DEFAULT_WALLPAPER_ID = 'default'

export function getWallpaper(id) {
  return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0]
}
