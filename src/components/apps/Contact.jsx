// Contact window: a friendly line + the email with a one-click copy button that
// shows brief "Copied!" feedback. No social links (per spec).
import { useEffect, useState } from 'react'
import { profile } from '../../data/profile.js'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(id)
  }, [copied])

  // Legacy fallback for when the async Clipboard API is unavailable or blocked
  // (insecure context, missing document focus). Copies via a temp textarea.
  function fallbackCopy(text) {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.focus()
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }

  async function copy() {
    let ok = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(profile.email)
        ok = true
      }
    } catch {
      ok = false
    }
    if (!ok) ok = fallbackCopy(profile.email)
    if (ok) setCopied(true)
  }

  return (
    <div className="space-y-4">
      <p className="text-[13px] leading-relaxed text-zinc-600">
        Got a project or a role in mind? I’d love to hear from you.
      </p>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
        <span className="truncate text-[13px] font-medium text-zinc-800">
          {profile.email}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy email address ${profile.email}`}
          className="shrink-0 rounded-md bg-amber-500 px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-amber-600"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* The button's own label doesn't change for screen readers, so announce
          the result here instead. */}
      <span role="status" className="sr-only">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </div>
  )
}
