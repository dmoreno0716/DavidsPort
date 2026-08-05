// Now Playing window: a header + Spotify playlist embed(s) from data/music.js.
//
// The Spotify embed is the heaviest thing on the site — the iframe pulls in
// Spotify's own player bundle — so it must not cost anything on first paint.
// It doesn't: this component is only mounted while the Now Playing window is
// open (see data/apps.jsx → Window/Sheet), so the iframe, and every request it
// makes, is created the moment that window first opens and never before.
// `loading="lazy"` hands the browser one more chance to defer, and the fixed
// height reserves the space so nothing shifts when the player paints.
//
// (An IntersectionObserver gate was tried here and removed: the embed sits at
// the top of a small window, so it is always already in view when the window
// opens — the observer bought no deferral and added a way for the player to
// never appear at all.)
import { musicHeader, playlists } from '../../data/music.js'

// Minimum that still shows Spotify's own player chrome without it collapsing.
// Also the height of the un-resized window, so the default look is unchanged.
const MIN_EMBED_HEIGHT = 352

export default function NowPlaying() {
  return (
    // Full-height column so the embed stretches to fill a resized window.
    <div className="flex h-full flex-col gap-3">
      <p className="shrink-0 text-[13px] font-medium text-zinc-700">{musicHeader}</p>

      {playlists.map((pl) => (
        // The iframe fills via absolute inset-0 rather than height:100%: until
        // the window is resized this wrapper is a flex item with an indefinite
        // height, so a percentage height would resolve to auto and the embed
        // would collapse to its 150px intrinsic default.
        <div
          key={pl.id}
          className="relative flex-1"
          style={{ minHeight: MIN_EMBED_HEIGHT }}
        >
          <iframe
            title="Spotify playlist"
            src={pl.embedUrl}
            className="absolute inset-0 h-full w-full"
            style={{ borderRadius: 12, border: 0 }}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      ))}
    </div>
  )
}
