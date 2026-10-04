"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Work } from "@/content/work";
import { Plate } from "./plates";

/* ─────────────────────────────────────────────────────────────────────────────
   The index row
   ──────────────────────────────────────────────────────────────────────────── */

function IndexRow({
  item,
  index,
  onOpen,
  onPreview,
}: {
  item: Work;
  index: number;
  onOpen: (index: number) => void;
  onPreview: (index: number | null) => void;
}) {
  return (
    <li className="border-t border-ink last:border-b">
      <button
        type="button"
        onClick={() => onOpen(index)}
        onMouseEnter={() => onPreview(index)}
        onMouseLeave={() => onPreview(null)}
        onFocus={() => onPreview(index)}
        onBlur={() => onPreview(null)}
        className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 text-left focus:outline-none lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,15rem)_11rem_2rem] lg:py-6"
      >
        <span className="meta transition-colors duration-300 ease-opslag group-hover:text-signal">
          {item.no}
        </span>
        <span className="font-sans text-[25px] font-black uppercase leading-[0.9] tracking-[-0.02em] transition-transform duration-500 ease-opslag group-hover:translate-x-2 sm:text-[30px] lg:text-[46px] lg:group-hover:translate-x-4">
          {item.title}
        </span>
        {/* `min-w-0` on the text track: prose will not shrink inside a grid item
            that keeps its default automatic minimum size, and the row then
            overflows the page rather than wrapping. */}
        <span className="hidden min-w-0 font-serif text-[14.5px] leading-snug text-ink/80 lg:block">
          {item.line}
        </span>
        <span className="meta lg:whitespace-nowrap">
          {item.year}
          {/* `lg:inline` is emitted after `hidden` in the compiled sheet, so a
              `hidden lg:inline` pair would win at every width. The responsive
              span carries only `hidden`, and the breakpoint lives on the parent. */}
          <span aria-hidden className="lg:hidden"> · </span>
          <span className="hidden lg:inline"> — {item.kind}</span>
        </span>
        <span
          aria-hidden
          className="hidden text-right font-sans text-[20px] font-black leading-none text-cool transition-colors duration-300 group-hover:text-signal lg:block"
        >
          →
        </span>
      </button>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   The overlay — one project, read as a five-panel spread.
   ──────────────────────────────────────────────────────────────────────────── */

function SpreadHeading({ kicker, page }: { kicker: string; page: string }) {
  return (
    <div className="mb-6 flex items-baseline justify-between border-t border-ink pt-2 md:mb-10">
      <p className="meta !text-ink">{kicker}</p>
      <p className="meta">{page}</p>
    </div>
  );
}

function WorkOverlay({
  items,
  index,
  onClose,
  onNavigate,
}: {
  items: Work[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const item = items[index];
  const next = (index + 1) % items.length;

  // The overlay is remounted per project (see the `key` at the call site), so
  // the spread always starts on panel one: no reset effect, and no setState
  // during render or in an effect body.

  // Lock the page behind the overlay.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        scroller.current?.scrollBy({ left: window.innerWidth * 0.7, behavior: "smooth" });
      }
      if (event.key === "ArrowLeft") {
        scroller.current?.scrollBy({ left: -window.innerWidth * 0.7, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // The read-progress indicator is written straight to the DOM. It changes on
  // every scroll frame, and re-rendering the whole spread to move a 7px dot is
  // the wrong trade.
  const onScroll = () => {
    const node = scroller.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    const ratio = max > 0 ? node.scrollLeft / max : 0;
    bar.current?.style.setProperty("width", `${Math.max(ratio * 100, 4)}%`);
    dot.current?.style.setProperty("left", `${Math.max(ratio * 100, 2)}%`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} — ${item.subtitle}`}
      className="fixed inset-0 z-50 flex flex-col bg-paper"
    >
      <div className="flex h-11 shrink-0 items-center justify-between gap-4 border-b border-ink px-4 md:px-8">
        <p className="meta !text-ink truncate">
          {item.no} — {item.title} — {item.year}
        </p>
        <div className="flex shrink-0 items-center gap-5">
          <span className="meta hidden lg:block">← → to read · Esc to close</span>
          <button
            type="button"
            onClick={onClose}
            className="meta !text-ink transition-all duration-300 ease-opslag hover:px-1 hover:outline hover:outline-1 hover:outline-ink"
          >
            Close ×
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar flex flex-1 snap-x snap-mandatory flex-col overflow-y-auto md:snap-y md:flex-row md:overflow-x-auto md:overflow-y-hidden"
      >
        {/* 01 — Cover */}
        <article className="flex shrink-0 snap-start flex-col border-b border-ink md:w-[78vw] md:flex-row md:border-b-0 md:border-r">
          <div className="flex items-center border-b border-ink bg-paper-deep p-4 md:w-1/2 md:border-b-0 md:border-r md:p-10">
            {item.plate ? <Plate name={item.plate} className="w-full" /> : null}
          </div>
          <div className="flex flex-col justify-between p-4 py-8 md:w-1/2 md:p-10">
            <SpreadHeading kicker="Cover" page="1 / 5" />
            <div>
              <p className="mb-3 font-mono text-[13px]">{item.kind}</p>
              <h3 className="display text-[16vw] md:text-[6vw]">{item.title}</h3>
              <p className="mt-4 max-w-[34ch] font-serif text-[17px] leading-[1.55] text-ink/80">
                {item.subtitle}
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-[6rem_1fr] gap-y-2 md:mt-10">
              <dt className="meta pt-[3px]">Year</dt>
              <dd className="border-b border-rule pb-2 font-serif text-[15px]">{item.year}</dd>
              <dt className="meta pt-[3px]">Fields</dt>
              <dd className="border-b border-rule pb-2 font-serif text-[15px]">
                {item.fields.join(", ")}
              </dd>
              <dt className="meta pt-[3px]">Kind</dt>
              <dd className="border-b border-rule pb-2 font-serif text-[15px]">{item.kind}</dd>
              {item.repo || item.demo ? (
                <>
                  <dt className="meta pt-[3px]">Links</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1 border-b border-rule pb-2 font-serif text-[15px]">
                    {item.repo ? (
                      <a
                        href={item.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rule-link"
                      >
                        Repository ↗
                      </a>
                    ) : null}
                    {item.demo ? (
                      <a
                        href={item.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rule-link"
                      >
                        Demo video ↗
                      </a>
                    ) : null}
                  </dd>
                </>
              ) : null}
            </dl>
          </div>
        </article>

        {/* 02 — Context */}
        <article className="shrink-0 snap-start border-b border-rule p-4 py-8 md:w-[64vw] md:overflow-y-auto md:border-b-0 md:border-r md:p-10">
          <SpreadHeading kicker="Context" page="2 / 5" />
          <p className="max-w-[46ch] font-serif text-[19px] leading-[1.55] md:text-[23px]">
            {item.context}
          </p>
        </article>

        {/* 03 — Approach */}
        <article className="shrink-0 snap-start border-b border-rule p-4 py-8 md:w-[76vw] md:overflow-y-auto md:border-b-0 md:border-r md:p-10">
          <SpreadHeading kicker="Approach" page="3 / 5" />
          <p className="max-w-[52ch] font-serif text-[17px] leading-[1.65] md:text-[19px]">
            {item.approach}
          </p>
        </article>

        {/* 04 — What was built */}
        <article className="shrink-0 snap-start border-b border-rule p-4 py-8 md:w-[76vw] md:overflow-y-auto md:border-b-0 md:border-r md:p-10">
          <SpreadHeading kicker="What was built" page="4 / 5" />
          <ul className="max-w-[62ch]">
            {item.build.map((entry, i) => (
              <li
                key={entry.head}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-rule py-5 first:border-t-0 first:pt-0"
              >
                <span className="meta pt-[5px] text-cool">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-sans text-[17px] font-extrabold uppercase tracking-[-0.01em]">
                    {entry.head}
                  </h4>
                  <p className="mt-2 font-serif text-[16px] leading-[1.65] text-ink/90">
                    {entry.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </article>

        {/* 05 — Outcome */}
        <article className="shrink-0 snap-start border-b border-rule p-4 py-8 md:w-[64vw] md:overflow-y-auto md:border-b-0 md:border-r md:p-10">
          <SpreadHeading kicker="Outcome" page="5 / 5" />
          <ul className="max-w-[56ch]">
            {item.outcome.map((entry, i) => (
              <li
                key={entry.claim}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink py-4"
              >
                <span className="meta pt-[4px] text-cool">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="font-serif text-[17px] leading-[1.55] md:text-[18px]">
                    {entry.claim}
                  </span>
                  {entry.note ? (
                    <span className="meta mt-1 block normal-case tracking-normal">
                      {entry.note}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <SpreadHeading kicker="Colophon" page="—" />
            <dl className="max-w-[56ch]">
              {item.colophon.map(([term, detail]) => (
                <div
                  key={term}
                  className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-rule py-3"
                >
                  <dt className="meta pt-[2px]">{term}</dt>
                  <dd className="font-serif text-[15px] leading-snug">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>

        {/* 06 — Next */}
        <article className="flex shrink-0 snap-start flex-col items-start justify-center border-ink p-4 py-16 md:w-[50vw] md:border-l md:p-10">
          <p className="meta mb-6">Next in the index</p>
          <button type="button" onClick={() => onNavigate(next)} className="group text-left">
            <span className="mb-2 block font-mono text-[12px] text-cool transition-colors duration-300 group-hover:text-signal">
              {items[next].no}
            </span>
            <span className="block font-sans text-[13vw] font-black uppercase leading-[0.86] tracking-[-0.03em] transition-transform duration-500 ease-opslag group-hover:translate-x-2 md:text-[4.5vw]">
              {items[next].title}
            </span>
            <span className="meta mt-4 block">Continue →</span>
          </button>
        </article>
      </div>

      <div className="flex h-11 shrink-0 items-center gap-4 border-t border-ink px-4 md:px-8">
        <button
          type="button"
          onClick={() => onNavigate((index - 1 + items.length) % items.length)}
          className="meta !text-ink leading-none transition-colors duration-300 hover:text-signal"
        >
          ← Prev
        </button>
        <div className="relative h-px flex-1 bg-rule">
          <div
            ref={bar}
            className="absolute left-0 top-1/2 h-[3px] w-[4%] -translate-y-1/2 bg-ink transition-[width] duration-150"
          />
          <div
            ref={dot}
            className="absolute top-1/2 left-[2%] h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 bg-signal transition-[left] duration-150"
          />
        </div>
        <button
          type="button"
          onClick={() => onNavigate(next)}
          className="meta !text-ink leading-none transition-colors duration-300 hover:text-signal"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   The index
   ──────────────────────────────────────────────────────────────────────────── */

export function WorkIndex({ items }: { items: Work[] }) {
  const [preview, setPreview] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <ul>
        {items.map((item, index) => (
          <IndexRow
            key={item.slug}
            item={item}
            index={index}
            onOpen={setOpen}
            onPreview={setPreview}
          />
        ))}
      </ul>

      {/* Hovered plate, pinned beside the register. The section is the
          positioning context, so this must not be given a transform. */}
      {items.map((item, index) =>
        item.plate ? (
          <div
            key={`preview-${item.slug}`}
            aria-hidden
            className={`pointer-events-none absolute top-1/2 right-8 z-10 hidden w-[19rem] -translate-y-1/2 transition-opacity duration-300 ease-opslag xl:block ${
              preview === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="overflow-hidden border border-ink bg-paper p-3">
              <Plate name={item.plate} variant="compact" />
            </div>
          </div>
        ) : null,
      )}

      <p className="meta mt-5 md:hidden">Tap a project to read the spread.</p>
      <p className="meta mt-5 hidden md:block">
        Select a project to read it — context, approach, what was built, outcome.
      </p>

      {open !== null ? (
        // Remounted per project: a new spread always opens on its cover, and
        // "next in the index" resets the scroll without an effect doing it.
        <WorkOverlay
          key={items[open].slug}
          items={items}
          index={open}
          onClose={close}
          onNavigate={setOpen}
        />
      ) : null}
    </>
  );
}
