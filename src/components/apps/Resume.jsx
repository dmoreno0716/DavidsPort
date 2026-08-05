// Resume window: an embedded preview of the PDF plus a prominent download CTA.
//
// Lays out as a full-height column so the preview stretches to fill whatever
// height the window is resized to, with the download button pinned below it.
// The min-height keeps the un-resized window looking exactly as it did before.
import { profile } from '../../data/profile.js'
import { ArrowUpRightIcon } from '../icons.jsx'

export default function Resume() {
  return (
    <div className="flex h-full flex-col gap-3">
      {/* PDF preview — grows with the window.
          The <object> fills via absolute inset-0 rather than height:100%: until
          the window is resized its parent is a flex item with an indefinite
          height, so a percentage height would resolve to auto and the plugin
          would collapse to its 150px intrinsic default. */}
      <div className="relative min-h-[18rem] w-full flex-1 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
        <object
          data={`${profile.resume}#toolbar=0&view=FitH`}
          type="application/pdf"
          className="absolute inset-0 h-full w-full"
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
        className="flex w-full shrink-0 items-center justify-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-amber-600"
      >
        Download PDF <ArrowUpRightIcon />
      </a>
    </div>
  )
}
