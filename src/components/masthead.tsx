import { profile } from "@/content/work";
import { IstClock } from "./ist-clock";

const sections = [
  { label: "Work", href: "#work" },
  { label: "Archive", href: "#archive" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Notes", href: "#notes" },
  { label: "Contact", href: "#contact" },
];

export function Masthead() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink bg-paper">
      <div className="flex h-11 items-center gap-5 px-4 md:px-8">
        <a
          href="#top"
          className="shrink-0 text-[15px] font-extrabold uppercase leading-none tracking-tight"
        >
          {profile.name}
          <span className="text-signal">.</span>
        </a>

        <p className="meta hidden truncate lg:block">
          Applied AI Engineer — agents, retrieval, real-time voice
        </p>

        <nav aria-label="Sections" className="ml-auto flex items-center gap-4 md:gap-6">
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="meta !text-ink hidden transition-all duration-300 ease-opslag hover:px-1 hover:outline hover:outline-1 hover:outline-ink sm:inline-block"
            >
              {section.label}
            </a>
          ))}
          {/* On a phone the useful action is the one that starts a conversation. */}
          <a
            href="#contact"
            className="meta !text-ink transition-all duration-300 ease-opslag hover:px-1 hover:outline hover:outline-1 hover:outline-ink sm:hidden"
          >
            Contact
          </a>
        </nav>

        <div className="ml-auto hidden items-center gap-3 xl:flex">
          <a
            href={`mailto:${profile.email}`}
            className="meta !text-ink transition-colors duration-300 hover:text-signal"
          >
            Email
          </a>
          <span className="meta" aria-hidden>
            ·
          </span>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="meta !text-ink transition-colors duration-300 hover:text-signal"
          >
            GitHub
          </a>
          <span className="meta" aria-hidden>
            ·
          </span>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="meta !text-ink transition-colors duration-300 hover:text-signal"
          >
            LinkedIn
          </a>
          <span className="meta" aria-hidden>
            ·
          </span>
          <IstClock />
        </div>
      </div>
    </header>
  );
}
