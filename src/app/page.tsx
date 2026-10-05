import { Experience } from "@/components/experience";
import { Masthead } from "@/components/masthead";
import { Skills } from "@/components/skills";
import { WorkIndex } from "@/components/work-index";
import { experience, facts, profile, work } from "@/content/work";

/** A section label, set the same way everywhere. */
function SectionHead({ title, note, id }: { title: string; note?: string; id?: string }) {
  return (
    <div id={id} className="flex items-end justify-between gap-6 border-b border-ink pb-3">
      <h2 className="font-sans text-[11vw] font-black uppercase leading-none tracking-[-0.02em] lg:text-[4.4vw]">
        {title}
      </h2>
      {/* Hidden on small screens: at 390px a note would force the page wider
          than the viewport instead of wrapping. */}
      {note ? <p className="meta mb-1 hidden text-right lg:block">{note}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Masthead />

      <main id="top">
        {/* ── Masthead ────────────────────────────────────────────────────── */}
        <section className="border-b border-ink px-4 pt-10 pb-8 md:px-8 md:pt-16 md:pb-12">
          <div className="mb-6 flex items-end justify-between gap-4 md:mb-10">
            <p className="meta">Vol. 01 · Applied AI</p>
            <p className="meta hidden sm:block">Open to AI engineering roles</p>
          </div>

          <h1 className="display text-[17.5vw] lg:text-[11.5vw]">
            Aakash
            <br />
            Gupta
          </h1>

          <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 lg:grid-cols-12">
            <p className="max-w-[56ch] font-serif text-[17px] leading-[1.6] md:text-[19px] lg:col-span-6 lg:col-start-5">
              Five years building production software for other people&rsquo;s phones. I am moving
              that into AI engineering, where I build the system around the model: retrieval,
              review agents, and real-time voice. What carries over is the production instinct that
              came first. Latency, failure states, and what happens when it is wrong.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 border-t border-rule pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="meta mb-2">{fact.label}</dt>
                <dd className="font-serif text-[15px] leading-snug">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <nav
            aria-label="Elsewhere"
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-rule pt-4"
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
              Résumé ↗
            </a>
          </nav>
        </section>

        {/* ── The index ───────────────────────────────────────────────────── */}
        <section className="relative px-4 py-8 md:px-8 md:py-12">
          <div className="mb-4 flex items-end justify-between">
            <p className="meta">Selected work</p>
            <p className="meta">
              {work[0].no} to {work[work.length - 1].no}
            </p>
          </div>
          <WorkIndex items={work} />
        </section>

        {/* ── Work experience ─────────────────────────────────────────────── */}
        <section className="border-t border-ink px-4 py-12 md:px-8 md:py-16">
          <SectionHead id="experience" title="Work Experience" />
          <div className="mt-8">
            <Experience entries={experience} />
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────────────────────── */}
        <section className="border-t border-ink px-4 py-12 md:px-8 md:py-16">
          <SectionHead id="skills" title="Skills" />
          <div className="mt-8">
            <Skills />
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────────────────────── */}
        <section className="border-t border-ink px-4 py-12 md:px-8 md:py-20">
          <SectionHead id="contact" title="Contact" note="One email, read by me" />
          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="max-w-[24ch] font-sans text-[8vw] font-black uppercase leading-[0.9] tracking-[-0.03em] lg:text-[3.2vw]">
                Tell me what the system has to do
              </p>
              <p className="mt-6 max-w-[56ch] font-serif text-[17px] leading-[1.65]">
                I am looking for applied AI engineering work, full time or a scoped build. The most
                useful first message says what the system has to do, who is on the other end of it,
                and what happens when it gets it wrong. The rest can wait for the second email.
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
                  Résumé ↗
                </a>
              </div>
            </div>

            <dl className="grid grid-cols-[7rem_1fr] gap-y-3 self-start lg:col-span-4">
              <dt className="meta pt-[3px]">Status</dt>
              <dd className="border-b border-rule pb-3 font-serif text-[15px]">
                Open to AI engineering roles
              </dd>
              <dt className="meta pt-[3px]">Based in</dt>
              <dd className="border-b border-rule pb-3 font-serif text-[15px]">India</dd>
              <dt className="meta pt-[3px]">Codewalk</dt>
              <dd className="border-b border-rule pb-3 font-serif text-[15px]">
                <a
                  href={profile.codewalk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rule-link"
                >
                  codewalk.xyz/app ↗
                </a>
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
            </dl>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="border-t border-ink px-4 pt-10 pb-6 md:px-8 md:pt-14">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <p className="display text-[13vw] lg:col-span-6 lg:text-[5vw]">
            Aakash
            <br />
            Gupta
            <span className="text-signal">.</span>
          </p>

          <div className="lg:col-span-4">
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
            </address>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-rule pt-4 sm:flex-row">
          <p className="meta">© {new Date().getFullYear()} Aakash Gupta</p>
          <p className="meta">Applied AI · Open to work</p>
        </div>
      </footer>
    </>
  );
}
