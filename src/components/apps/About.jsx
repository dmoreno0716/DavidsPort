// About window: avatar, name, title, and short bio (from data/profile.js).
import { profile } from '../../data/profile.js'
import Avatar from '../Avatar.jsx'

export default function About() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar size={52} />
        <div>
          <h2 className="text-lg font-semibold leading-tight text-zinc-900">
            {profile.name}
          </h2>
          <p className="text-[13px] text-zinc-500">{profile.title}</p>
        </div>
      </div>

      <p className="text-[13px] leading-relaxed text-zinc-600">{profile.bio}</p>

      <div className="border-t border-zinc-100 pt-3 text-[12px] text-zinc-400">
        Based in {profile.location} · Open to new roles
      </div>
    </div>
  )
}
