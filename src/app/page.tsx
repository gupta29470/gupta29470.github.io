import { Archive } from "@/components/archive";
import { Capability } from "@/components/capability";
import { Masthead } from "@/components/masthead";
import { WorkIndex } from "@/components/work-index";
import { archive, archiveExtras, principles, profile, work } from "@/content/work";

const archives = [...archive, ...archiveExtras];

/** A section label, set the same way everywhere. */
function SectionHead({
  title,
  note,
  id,
}: {
  title: string;
  note: string;
  id?: string;
}) {
  return (
    <div id={id} className="flex items-end justify-between gap-6 border-b border-ink pb-3">
      <h2 className="font-sans text-[11vw] font-black uppercase leading-none tracking-[-0.02em] md:text-[4.4vw]">
        {title}
      </h2>
      {/* Hidden on small screens: at 390px a note like "five habits, each one paid
          for in production" would force the whole page wider than the viewport. */}
      <p className="meta mb-1 hidden text-right lg:block">{note}</p>
    </div>
  );
}

const notes: { no: string; head: string; body: string }[] = [
  {
    no: "01",
    head: "Evaluating voice agents",
    body: "Turn-level scoring for a system that never produces the same sentence twice: what the agent heard, what it decided, whether the caller got to interrupt. Latency percentiles say the agent was fast; only the transcript says it was right.",
  },
  {
    no: "02",
    head: "On-device inference in SwiftUI",
    body: "Pulling the Local First Notes stack further: models small enough to run on the phone, where the interesting constraint is memory and battery rather than tokens per second.",
  },
  {
    no: "03",
    head: "Agent harness design",
    body: "The layer underneath the model — tool schemas, retries, fallbacks between providers, and the checkpoints where a human has to look before anything is written.",
  },
];

export default function Home() {
  return (
    <>
      <Masthead />

      <main id="top">
        {/* ── Colophon-style masthead ─────────────────────────────────────── */}
        <section className="border-b border-ink px-4 pt-10 pb-8 md:px-8 md:pt-16 md:pb-12">
          <div className="mb-6 flex items-end justify-between gap-4 md:mb-10">
            <p className="meta">Vol. 01 — Applied AI · Mumbai</p>
            <p className="meta hidden sm:block">Open to AI engineering roles</p>
          </div>

          <h1 className="display text-[17.5vw] md:text-[11.5vw]">
            Aakash
            <br />
            Gupta
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-12">
            <p className="meta md:col-span-3">
              Applied AI engineer.
              <br />
              Agents, retrieval,
              <br />
              real-time voice.
            </p>
            <p className="max-w-[54ch] font-serif text-[17px] leading-[1.6] md:col-span-6 md:col-start-5 md:text-[19px]">
              I build AI systems that have to work while somebody is on the other end of the line.
              Voice agents over a real phone call, retrieval with a source you can check, and
              small tuned models wired to the facts they are not allowed to invent. Four years of
              production engineering sit underneath — including consumer apps used by 1.4M people
              a month, where latency, failure states and offline behaviour stop being theory.
            </p>
          </div>

          <nav
            aria-label="Elsewhere"
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-4"
          >
            <a
              href={`mailto:${profile.email}`}
              className="meta !text-ink transition-colors duration-300 hover:text-signal"
            >
              {profile.email}
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
              GitHub ↗
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
              LinkedIn ↗
            </a>
            <span className="meta" aria-hidden>
              ·
            </span>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="meta !text-ink transition-colors duration-300 hover:text-signal"
            >
              Résumé (PDF-ready) ↗
            </a>
            <span className="meta ml-auto hidden md:block">
              India · {profile.availability}
            </span>
          </nav>
        </section>

        {/* ── The index ───────────────────────────────────────────────────── */}
        <section className="relative px-4 py-8 md:px-8 md:py-12">
          <div className="mb-4 flex items-end justify-between">
            <p className="meta">Selected work</p>
            <p className="meta">
              {work[0].no} — {work[work.length - 1].no}
            </p>
          </div>
          <WorkIndex items={work} />
        </section>

        {/* ── Previous work ───────────────────────────────────────────────── */}
        <section className="border-t border-ink px-4 py-12 md:px-8 md:py-16">
          <SectionHead
            id="archive"
            title="Archive"
            note="Four years of shipping, before and alongside the models"
          />
          <p className="mt-6 mb-2 grid grid-cols-1 gap-6 md:grid-cols-12">
            <span className="meta md:col-span-3">Employment &amp; products</span>
            <span className="max-w-[54ch] font-serif text-[15.5px] leading-[1.6] text-ink/80 md:col-span-6 md:col-start-5">
              The AI work above only makes sense next to this: the years spent making software run
              on other people&rsquo;s phones, on other people&rsquo;s networks, at 8 in the morning.
              Open an entry for the detail.
            </span>
          </p>
          <div className="mt-8">
            <Archive entries={archives} />
          </div>
        </section>

        {/* ── Capabilities ────────────────────────────────────────────────── */}
        <section className="border-t border-ink px-4 py-12 md:px-8 md:py-16">
          <SectionHead
            id="capabilities"
            title="Capabilities"
            note="What I am actually good for on a team"
          />
          <div className="mt-8">
            <Capability />
          </div>
        </section>

        {/* ── How I work ──────────────────────────────────────────────────── */}
        <section className="border-t border-ink px-4 py-12 md:px-8 md:py-16">
          <SectionHead
            id="notes"
            title="How I work"
            note="Five habits, each one paid for in production"
          />
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
            <ol className="md:col-span-7">
              {principles.map((principle, index) => (
                <li
                  key={principle.head}
                  className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 border-t border-ink py-4 last:border-b md:py-5"
                >
                  <span className="meta">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-sans text-[19px] font-extrabold uppercase leading-tight tracking-tight md:text-[21px]">
                      {principle.head}
                    </h3>
                    <p className="mt-2 max-w-[58ch] font-serif text-[15.5px] leading-[1.6] text-ink/85">
                      {principle.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="md:col-span-4 md:col-start-9">
              <p className="meta mb-6">Currently on the desk</p>
              <ul>
                {notes.map((note) => (
                  <li key={note.no} className="border-t border-rule py-4 last:border-b">
                    <p className="meta mb-2">{note.no}</p>
                    <h3 className="font-sans text-[17px] font-extrabold uppercase leading-tight">
                      {note.head}
                    </h3>
                    <p className="mt-2 font-serif text-[14.5px] leading-[1.6] text-ink/80">
                      {note.body}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="meta mt-4">
                Active work, not a curriculum. Written down so the list stays honest.
              </p>
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────────────────── */}
        <section className="border-t border-ink px-4 py-12 md:px-8 md:py-20">
          <SectionHead
            id="contact"
            title="Contact"
            note="One email, read by me, answered within a day or two"
          />
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="max-w-[30ch] font-sans text-[8vw] font-black uppercase leading-[0.9] tracking-[-0.03em] md:text-[3.4vw]">
                Tell me what the model has to do
              </p>
              <p className="mt-6 max-w-[54ch] font-serif text-[17px] leading-[1.65]">
                I am looking for applied AI engineering work — full-time, or a scoped build. The
                most useful first message says what the system has to do, who is on the other end
                of it, and what happens when it gets it wrong. Everything else can wait for the
                second email.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={`mailto:${profile.email}?subject=Applied%20AI%20engineering`}
                  className="border border-ink px-6 py-3 font-sans text-[15px] font-extrabold uppercase tracking-tight transition-colors duration-300 ease-opslag hover:bg-ink hover:text-paper"
                >
                  {profile.email}
                </a>
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="meta !text-ink transition-colors duration-300 hover:text-signal"
                >
                  Résumé, one page ↗
                </a>
                <a
                  href={profile.resumeMobile}
                  target="_blank"
                  rel="noreferrer"
                  className="meta !text-ink transition-colors duration-300 hover:text-signal"
                >
                  Mobile-engineering résumé ↗
                </a>
              </div>
            </div>

            <dl className="grid grid-cols-[7rem_1fr] gap-y-3 self-start md:col-span-4">
              <dt className="meta pt-[3px]">Desk</dt>
              <dd className="border-b border-rule pb-3 font-serif text-[15px]">{profile.desk}</dd>
              <dt className="meta pt-[3px]">Status</dt>
              <dd className="border-b border-rule pb-3 font-serif text-[15px]">
                {profile.availability}
              </dd>
              <dt className="meta pt-[3px]">GitHub</dt>
              <dd className="border-b border-rule pb-3 font-serif text-[15px]">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rule-link"
                >
                  gupta29470 ↗
                </a>
              </dd>
              <dt className="meta pt-[3px]">LinkedIn</dt>
              <dd className="border-b border-rule pb-3 font-serif text-[15px]">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rule-link"
                >
                  aakash98gupta ↗
                </a>
              </dd>
            </dl>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-ink px-4 pt-10 pb-6 md:px-8 md:pt-14">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-12">
          <p className="display text-[13vw] md:col-span-5 md:text-[5vw]">
            Aakash
            <br />
            Gupta
            <span className="text-signal">.</span>
          </p>

          <div className="md:col-span-3">
            <p className="meta mb-4">Elsewhere</p>
            <address className="font-serif text-[15px] not-italic leading-[1.8]">
              <a href={`mailto:${profile.email}`} className="rule-link">
                {profile.email}
              </a>
              <br />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rule-link"
              >
                github.com/gupta29470
              </a>
              <br />
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rule-link"
              >
                linkedin.com/in/aakash98gupta
              </a>
              <br />
              {profile.desk}
            </address>
          </div>

          <div className="md:col-span-4">
            <p className="meta mb-4">Colophon</p>
            <p className="max-w-[46ch] font-serif text-[14px] leading-[1.7] text-ink/80">
              Set in Archivo, Source Serif 4 and IBM Plex Mono. Drawn on newsprint #F5F2EB with ink
              #141414; the red is rationed, and it is always the point of the page. Type and
              schematics are the only images — the diagrams describe real systems rather than
              illustrate them. No trackers, no cookies, no dark mode.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-rule pt-4 sm:flex-row">
          <p className="meta">© {new Date().getFullYear()} Aakash Gupta</p>
          <p className="meta">Applied AI · Mumbai · Open to work</p>
        </div>
      </footer>
    </>
  );
}
