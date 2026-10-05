import { profile } from "@/content/work";

/**
 * The resume, offered two ways.
 *
 * "View" opens the HTML, which renders as a page in the browser and prints
 * straight to A4. "Download" is the PDF, which is what an application form or an
 * ATS wants. Both come from one source file: the PDF is generated from the HTML
 * at build time, so they cannot drift apart.
 */
export function Resume() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
      <a
        href={profile.resume}
        target="_blank"
        rel="noreferrer"
        className="border border-ink px-7 py-3.5 font-sans text-[14px] font-extrabold uppercase tracking-tight transition-colors duration-300 ease-opslag hover:bg-ink hover:text-paper"
      >
        View resume ↗
      </a>
      <a
        href={profile.resumePdf}
        download
        className="border border-ink bg-ink px-7 py-3.5 font-sans text-[14px] font-extrabold uppercase tracking-tight text-paper transition-colors duration-300 ease-opslag hover:bg-paper hover:text-ink"
      >
        Download PDF ↓
      </a>
    </div>
  );
}
