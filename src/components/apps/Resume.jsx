// Resume window: an embedded preview of the PDF plus a prominent download CTA.
import { profile } from '../../data/profile.js'
import { ArrowUpRightIcon } from '../icons.jsx'

export default function Resume() {
  return (
    <div className="space-y-3">
      {/* PDF preview */}
      <div className="h-72 w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
        <object
          data={`${profile.resume}#toolbar=0&view=FitH`}
          type="application/pdf"
          className="h-full w-full"
          aria-label="Resume preview"
        >
          {/* Fallback for browsers that can't inline-render PDFs */}
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-[12px] text-zinc-400">
            Preview isn’t available in this browser — use Download below.
          </div>
        </object>
      </div>

      <a
        href={profile.resume}
        download
        className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
      >
        Download PDF <ArrowUpRightIcon />
      </a>
    </div>
  )
}
