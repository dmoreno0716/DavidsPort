// Registry of "apps" — each maps a dock entry to a window.
//   id      unique key, used everywhere in the window manager
//   label   dock tooltip
//   title   text shown in the menu bar + window title bar
//   icon    dock/menu icon component
//   width   window width in px
//   Content placeholder body (real content comes in a later phase)
import {
  PersonIcon,
  FolderIcon,
  DocumentIcon,
  MailIcon,
  MusicIcon,
} from '../components/icons.jsx'

function Placeholder({ children }) {
  return (
    <div className="space-y-3 text-[13px] leading-relaxed text-zinc-500">
      {children}
      <div className="space-y-2 pt-1">
        <div className="h-2 w-full rounded-full bg-zinc-100" />
        <div className="h-2 w-11/12 rounded-full bg-zinc-100" />
        <div className="h-2 w-4/5 rounded-full bg-zinc-100" />
      </div>
    </div>
  )
}

export const APPS = [
  {
    id: 'about',
    label: 'About',
    title: 'About David',
    icon: PersonIcon,
    width: 360,
    Content: () => (
      <Placeholder>
        <p className="text-zinc-600">
          Placeholder for the About window — intro, role, and a short bio.
        </p>
      </Placeholder>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Projects',
    icon: FolderIcon,
    width: 380,
    Content: () => (
      <Placeholder>
        <p className="text-zinc-600">
          Placeholder for the Projects window — cards with screenshots and links.
        </p>
      </Placeholder>
    ),
  },
  {
    id: 'resume',
    label: 'Resume',
    title: 'Resume',
    icon: DocumentIcon,
    width: 360,
    Content: () => (
      <Placeholder>
        <p className="text-zinc-600">
          Placeholder for the Resume window — embedded PDF and a download link.
        </p>
      </Placeholder>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Contact',
    icon: MailIcon,
    width: 340,
    Content: () => (
      <Placeholder>
        <p className="text-zinc-600">
          Placeholder for the Contact window — email and social links.
        </p>
      </Placeholder>
    ),
  },
  {
    id: 'nowplaying',
    label: 'Now Playing',
    title: 'Now Playing',
    icon: MusicIcon,
    width: 340,
    Content: () => (
      <Placeholder>
        <p className="text-zinc-600">
          Placeholder for the Now Playing window — embedded Spotify playlist.
        </p>
      </Placeholder>
    ),
  },
]

export const APPS_BY_ID = Object.fromEntries(APPS.map((a) => [a.id, a]))
