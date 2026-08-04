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

const EMBED_HEIGHT = 352

export default function NowPlaying() {
  return (
    <div className="space-y-3">
      <p className="text-[13px] font-medium text-zinc-700">{musicHeader}</p>

      {playlists.map((pl) => (
        <div key={pl.id} style={{ height: EMBED_HEIGHT }}>
          <iframe
            title="Spotify playlist"
            src={pl.embedUrl}
            width="100%"
            height={EMBED_HEIGHT}
            style={{ borderRadius: 12, border: 0 }}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      ))}
    </div>
  )
}
