import type { ArchiveEntry } from "@/content/work";

/**
 * Previous work, set as a register rather than a second portfolio.
 *
 * The one-line summary is always visible; the detail is behind a native
 * disclosure so the section stays scannable without hiding anything.
 */
export function Archive({ entries }: { entries: ArchiveEntry[] }) {
  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={entry.org} className="border-t border-ink last:border-b">
          <details className="group">
            {/* Every prose track is minmax(0,…) and its span carries min-w-0:
                a grid item's default automatic minimum size refuses to shrink
                below its longest word, which widens the page instead of wrapping
                the summary. The period gets a fixed track and wraps onto two
                lines rather than pushing the row out. */}
            <summary className="grid cursor-pointer list-none grid-cols-1 gap-x-6 gap-y-2 py-5 lg:grid-cols-[3rem_minmax(0,13rem)_minmax(0,1.35fr)_minmax(6.5rem,9rem)_1.25rem] lg:items-baseline">
              <span className="meta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-sans text-[22px] font-extrabold uppercase leading-none tracking-[-0.01em]">
                {entry.org}
              </span>
              <span className="font-serif text-[14.5px] leading-snug text-ink/80">
                {entry.role}
                <span className="block text-cool">{entry.where}</span>
              </span>
              <span className="meta min-w-0 leading-[1.6]">{entry.summary}</span>
              <span className="meta flex items-baseline justify-between gap-3 lg:flex-col lg:items-end lg:gap-1">
                <span className="min-w-0">{entry.period}</span>
                <span
                  aria-hidden
                  className="inline-block leading-none text-signal transition-transform duration-300 ease-opslag group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>

            <div className="grid grid-cols-1 gap-x-6 pb-7 lg:grid-cols-[3rem_minmax(0,13rem)_minmax(0,1.35fr)_minmax(6.5rem,9rem)_1.25rem]">
              <ul className="lg:col-span-2 lg:col-start-3">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="grid grid-cols-[1.5rem_1fr] gap-x-3 border-t border-rule py-3"
                  >
                    <span className="meta pt-[3px] text-signal" aria-hidden>
                      ▸
                    </span>
                    <span className="font-serif text-[15.5px] leading-[1.6]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
