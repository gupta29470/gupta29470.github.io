import type { ExperienceEntry } from "@/content/work";

/**
 * Work experience, set as a register rather than a second portfolio.
 *
 * Every row carries a visible Expand control. The first version relied on a bare
 * "+" at the end of the row and nobody could tell the rows opened at all, so the
 * affordance is now a labelled control that says what it does and flips to
 * "Collapse" when the row is open.
 */
export function Experience({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <ul>
      {entries.map((entry, index) => (
        <li key={entry.org} className="border-t border-ink last:border-b">
          <details className="group">
            {/*
              Two bands rather than five columns. The earlier five-track grid gave
              the summary a column too narrow to wrap in and the period a column
              too narrow to hold its own text, so the two overlapped. Prose tracks
              are minmax(0,…) with min-w-0 on the item: a grid item's default
              automatic minimum size refuses to shrink below its longest word and
              widens the page instead of wrapping.
            */}
            <summary className="grid cursor-pointer list-none gap-y-3 py-5">
              <div className="grid grid-cols-1 items-baseline gap-x-6 gap-y-2 lg:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)_12rem]">
                <span className="meta">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-sans text-[22px] font-extrabold uppercase leading-none tracking-[-0.01em]">
                  {entry.org}
                </h3>
                <p className="min-w-0 font-serif text-[14.5px] leading-snug text-ink/80">
                  {entry.role}
                  <span className="block text-cool">{entry.where}</span>
                </p>
                <p className="meta lg:text-right">{entry.period}</p>
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-2 lg:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)_12rem]">
                <span aria-hidden className="hidden lg:block" />
                <p className="meta min-w-0 leading-[1.7] lg:col-span-2">{entry.summary}</p>
                <p className="meta flex items-center gap-2 text-signal lg:justify-end">
                  <span
                    aria-hidden
                    className="inline-block leading-none transition-transform duration-300 ease-opslag group-open:rotate-45"
                  >
                    +
                  </span>
                  <span className="group-open:hidden">Expand</span>
                  <span className="hidden group-open:inline">Collapse</span>
                </p>
              </div>
            </summary>

            <div className="grid grid-cols-1 gap-x-6 pb-7 lg:grid-cols-[3rem_minmax(0,15rem)_minmax(0,1fr)_12rem]">
              <ul className="lg:col-span-2 lg:col-start-2">
                {entry.points.map((point) => (
                  <li
                    key={point}
                    className="grid grid-cols-[1.5rem_1fr] gap-x-3 border-t border-rule py-3"
                  >
                    <span className="meta pt-[3px] text-signal" aria-hidden>
                      ▸
                    </span>
                    <span className="min-w-0 font-serif text-[15.5px] leading-[1.6]">{point}</span>
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
