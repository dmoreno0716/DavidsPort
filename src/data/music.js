// Music data, sourced from content/content.md.
// Spotify embeds are referenced by their playlist embed URL; the component
// builds the <iframe> so we don't store raw markup in JSX.
export const musicHeader = "What I've been listening to."

export const playlists = [
  {
    id: 'main',
    // Public playlist link (content.md "Music Playlist")
    url: 'https://open.spotify.com/playlist/1ceDbGI7XDSdpqjYqawWSd',
    // Embed src (content.md "Music Playlist Embedded")
    embedUrl:
      'https://open.spotify.com/embed/playlist/1ceDbGI7XDSdpqjYqawWSd?utm_source=generator',
  },
]
