import { profile } from "@/content/work";

/**
 * The résumé, offered two ways.
 *
 * "View" opens the HTML, which renders as a page in the browser and prints
 * straight to A4. "Download" is the PDF, which is what an application form or an
 * ATS actually wants. Both come from one source file: the PDF is generated from
 * the HTML at deploy time, so they cannot drift apart.
 */
const contents = [
  "Two AI systems: Codewalk and VoiceFlow",
  "Five years of production experience",
  "Skills, education, and the stack behind both",
];

export function Resume() {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="max-w-[46ch] font-serif text-[17px] leading-[1.6] lg:text-[18px]">
          A one page resume covering the two AI systems above and the production work behind them.
          Open it in the browser, or take the PDF.
        </p>
      </div>

      <div className="min-w-0 lg:col-span-7">
        <ul className="mb-7">
          {contents.map((line) => (
            <li
              key={line}
              className="grid grid-cols-[1.5rem_1fr] gap-x-2 border-t border-rule py-2.5"
            >
              <span className="meta pt-[3px] text-signal" aria-hidden>
                ▸
              </span>
              <span className="min-w-0 font-serif text-[15px] leading-[1.5]">{line}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="border border-ink px-6 py-3 font-sans text-[13px] font-extrabold uppercase tracking-tight transition-colors duration-300 ease-opslag hover:bg-ink hover:text-paper"
          >
            View resume ↗
          </a>
          <a
            href={profile.resumePdf}
            download
            className="border border-ink bg-ink px-6 py-3 font-sans text-[13px] font-extrabold uppercase tracking-tight text-paper transition-colors duration-300 ease-opslag hover:bg-paper hover:text-ink"
          >
            Download PDF ↓
          </a>
        </div>

        <p className="meta mt-5 leading-[1.7]">
          A4, one page, real text rather than a scan, so it survives an applicant tracking system.
        </p>
      </div>
    </div>
  );
}
