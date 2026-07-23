// Window registry.
//
// `APPS`         — the five entries shown in the dock, each opens a window.
// `WINDOWS_BY_ID`— every openable window keyed by id: the five dock apps PLUS
//                  one detail window per project (id `project:<id>`). The window
//                  manager and Desktop resolve any open window through this map,
//                  so project detail windows behave like any other window
//                  (focus, z-order, staggered spawn, no duplicates).
import {
  PersonIcon,
  FolderIcon,
  DocumentIcon,
  MailIcon,
  MusicIcon,
} from '../components/icons.jsx'
import About from '../components/apps/About.jsx'
import Projects from '../components/apps/Projects.jsx'
import ProjectDetail from '../components/apps/ProjectDetail.jsx'
import Resume from '../components/apps/Resume.jsx'
import Contact from '../components/apps/Contact.jsx'
import NowPlaying from '../components/apps/NowPlaying.jsx'
import { projects } from './projects.js'

// Dock apps.
export const APPS = [
  {
    id: 'about',
    label: 'About',
    title: 'About David',
    icon: PersonIcon,
    width: 380,
    Content: About,
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Projects',
    icon: FolderIcon,
    width: 560,
    Content: Projects,
  },
  {
    id: 'resume',
    label: 'Resume',
    title: 'Resume',
    icon: DocumentIcon,
    width: 480,
    Content: Resume,
  },
  {
    id: 'contact',
    label: 'Contact',
    title: 'Contact',
    icon: MailIcon,
    width: 360,
    Content: Contact,
  },
  {
    id: 'nowplaying',
    label: 'Now Playing',
    title: 'Now Playing',
    icon: MusicIcon,
    width: 420,
    Content: NowPlaying,
  },
]

// One detail window per project. Not shown in the dock — opened from the
// Projects grid via open(`project:<id>`).
const PROJECT_WINDOWS = projects.map((p) => ({
  id: `project:${p.id}`,
  title: p.title,
  width: 460,
  Content: () => <ProjectDetail project={p} />,
}))

export const WINDOWS_BY_ID = Object.fromEntries(
  [...APPS, ...PROJECT_WINDOWS].map((w) => [w.id, w]),
)
