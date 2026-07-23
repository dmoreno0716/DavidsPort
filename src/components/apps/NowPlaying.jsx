// Now Playing window: a header + Spotify playlist embed(s) from data/music.js.
import { musicHeader, playlists } from '../../data/music.js'

export default function NowPlaying() {
  return (
    <div className="space-y-3">
      <p className="text-[13px] font-medium text-zinc-700">{musicHeader}</p>

      {playlists.map((pl) => (
        <iframe
          key={pl.id}
          title="Spotify playlist"
          src={pl.embedUrl}
          width="100%"
          height="352"
          style={{ borderRadius: 12 }}
          frameBorder="0"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      ))}
    </div>
  )
}
