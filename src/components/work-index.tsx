"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Work } from "@/content/work";
import { Plate } from "./plates";
import { VideoEmbed } from "./video-embed";

/* ─────────────────────────────────────────────────────────────────────────────
   The register row. It has to look like something that opens, because an
   earlier version did not and nobody realised the rows were interactive.
   ──────────────────────────────────────────────────────────────────────────── */

function IndexRow({
  item,
  index,
  onOpen,
  onPreview,
}: {
  item: Work;
  index: number;
  onOpen: (index: number, at: "top" | "demo") => void;
  onPreview: (index: number | null) => void;
}) {
  return (
    <li className="border-t border-ink last:border-b">
      <div className="flex items-stretch">
        <button
          type="button"
          onClick={() => onOpen(index, "top")}
          onMouseEnter={() => onPreview(index)}
          onMouseLeave={() => onPreview(null)}
          onFocus={() => onPreview(index)}
          onBlur={() => onPreview(null)}
          className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 text-left focus:outline-none lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,15rem)_9rem_2rem] lg:py-6"
        >
          <span className="meta transition-colors duration-300 ease-opslag group-hover:text-signal">
            {item.no}
          </span>
          <span className="font-sans text-[25px] font-black uppercase leading-[0.9] tracking-[-0.02em] transition-transform duration-500 ease-opslag group-hover:translate-x-2 sm:text-[30px] lg:text-[46px] lg:group-hover:translate-x-4">
            {item.title}
          </span>
          <span className="hidden min-w-0 font-serif text-[14.5px] leading-snug text-ink/80 lg:block">
            {item.summary}
          </span>
          <span className="meta lg:whitespace-nowrap">{item.year}</span>
          <span
            aria-hidden
            className="hidden text-right font-sans text-[20px] font-black leading-none text-cool transition-colors duration-300 group-hover:text-signal lg:block"
          >
            ↓
          </span>
        </button>

        {/* A demo is a thing people want to watch, not read about, so it gets
            its own control. It opens the sheet already scrolled to the video.
            The label stays visible on a phone: a bare triangle does not say
            what it does. */}
        {item.youtube ? (
          <button
            type="button"
            onClick={() => onOpen(index, "demo")}
            aria-label={`Play the ${item.title} demo`}
            className="group my-auto mr-3 flex shrink-0 items-center gap-2 self-center border border-rule px-3 py-2 transition-colors duration-300 ease-opslag hover:border-ink hover:bg-ink lg:mr-0"
          >
            <span
              aria-hidden
              className="text-[10px] leading-none text-signal transition-colors duration-300 group-hover:text-paper"
            >
              ▶
            </span>
            <span className="meta !text-ink transition-colors duration-300 group-hover:!text-paper">
              Demo
            </span>
          </button>
        ) : null}
      </div>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   The bottom sheet. Vertical scroll, one project at a time.
   ──────────────────────────────────────────────────────────────────────────── */

function MetaRow({ term, detail, href }: { term: string; detail: string; href?: string }) {
  return (
    <div className="grid grid-cols-[7rem_1fr] gap-x-4 border-t border-rule py-3">
      <dt className="meta pt-[2px]">{term}</dt>
      <dd className="min-w-0 font-serif text-[15px] leading-snug">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="rule-link">
            {detail} ↗
          </a>
        ) : (
          detail
        )}
      </dd>
    </div>
  );
}

function Section({
  title,
  note,
  id,
  children,
}: {
  title: string;
  note?: string;
  /** Set when something scrolls to this section by name. */
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-ink py-8">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h4 className="meta !text-ink">{title}</h4>
        {note ? <p className="meta hidden text-right sm:block">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

function WorkSheet({
  items,
  index,
  onClose,
  onNavigate,
  initialScroll,
}: {
  items: Work[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  /** Where the sheet should land when it opens. */
  initialScroll?: "top" | "demo";
}) {
  const body = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const item = items[index];
  const next = (index + 1) % items.length;

  // Opened from a row's play control, so land on the demo rather than the cover.
  // Scrolling is done through the DOM on purpose: the progress bar is written
  // the same way, and neither is React state that a frame needs to redraw.
  useEffect(() => {
    if (initialScroll !== "demo") return;
    const node = body.current;
    if (!node) return;
    const target = node.querySelector<HTMLElement>("#demo");
    // No demo: fall back to the end, which is where the video and the stack are.
    node.scrollTop = target ? Math.max(0, target.offsetTop - node.offsetTop - 8) : node.scrollHeight;
  }, [initialScroll]);

  // The sheet is remounted per project (see the `key` at the call site), so it
  // always opens at the top. No reset effect, and no setState in an effect.
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
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Read progress is written straight to the DOM: it changes on every scroll
  // frame, and re-rendering the sheet to move a 2px line is the wrong trade.
  const onScroll = () => {
    const node = body.current;
    if (!node) return;
    const max = node.scrollHeight - node.clientHeight;
    const ratio = max > 0 ? node.scrollTop / max : 0;
    bar.current?.style.setProperty("width", `${Math.max(ratio * 100, 3)}%`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-ink/30"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${item.title}: ${item.kind}`}
        className="animate-sheet relative flex max-h-[92vh] w-full flex-col border-t border-ink bg-paper md:max-h-[88vh] md:max-w-6xl md:rounded-t-lg md:border-x"
      >
        <div className="shrink-0 border-b border-ink">
          <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-rule md:mt-3" aria-hidden />
          <div className="flex items-center gap-4 px-4 pt-3 pb-1 md:px-8">
            <p className="meta min-w-0 truncate !text-ink">
              {item.no} · {item.title} · {item.year}
            </p>
            <div className="ml-auto flex shrink-0 items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate((index - 1 + items.length) % items.length)}
                className="meta !text-ink leading-none transition-colors duration-300 hover:text-signal"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => onNavigate(next)}
                className="meta !text-ink leading-none transition-colors duration-300 hover:text-signal"
              >
                Next →
              </button>
              <button
                type="button"
                onClick={onClose}
                className="meta !text-ink leading-none transition-all duration-300 hover:px-1 hover:outline hover:outline-1 hover:outline-ink"
              >
                Close ×
              </button>
            </div>
          </div>
          <div className="relative mt-2 h-px w-full bg-rule" aria-hidden>
            <div
              ref={bar}
              className="absolute left-0 top-1/2 h-[2px] w-[3%] -translate-y-1/2 bg-ink transition-[width] duration-150"
            />
          </div>
        </div>

        <div ref={body} onScroll={onScroll} className="flex-1 overflow-y-auto px-4 md:px-8">
          {/* Cover */}
          <div className="grid grid-cols-1 gap-8 border-t border-ink py-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="meta mb-3">{item.kind}</p>
              <h3 className="display text-[13vw] md:text-[4.6rem]">{item.title}</h3>

              <dl className="mt-8">
                <MetaRow term="Year" detail={item.year} />
                {item.product ? (
                  <MetaRow term="Product" detail="codewalk.xyz/app" href={item.product} />
                ) : null}
                {item.repo ? (
                  <MetaRow term="Code" detail="github.com/gupta29470" href={item.repo} />
                ) : null}
              </dl>
            </div>

            {item.plate ? (
              <div className="lg:col-span-7">
                <div className="border border-ink bg-paper-deep p-4 md:p-6">
                  <Plate name={item.plate} />
                </div>
                <p className="meta mt-3">
                  Drawn to show how the system works, not a screenshot.
                </p>
              </div>
            ) : null}
          </div>

          <Section title="Context">
            <p className="max-w-[64ch] font-serif text-[18px] leading-[1.6] md:text-[20px]">
              {item.context}
            </p>
          </Section>

          <Section title="How it flows" note={`${item.flow.length} steps`}>
            <ol>
              {item.flow.map((step, i) => (
                <li
                  key={step}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-rule py-5 first:border-t-0 first:pt-0"
                >
                  <span className="meta pt-[5px] text-cool">{String(i + 1).padStart(2, "0")}</span>
                  <p className="min-w-0 max-w-[68ch] font-serif text-[16px] leading-[1.7] text-ink/90">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </Section>

          {item.youtube ? (
            <Section title="Demo" id="demo">
              <VideoEmbed
                youtube={item.youtube}
                title={item.youtubeCredit ?? `${item.title} demo`}
              />
            </Section>
          ) : null}

          <Section title="Tech stack and tools">
            <ul className="max-w-[68ch]">
              {item.tech.map((line) => (
                <li
                  key={line}
                  className="grid grid-cols-[1.5rem_1fr] gap-x-3 border-t border-rule py-3"
                >
                  <span className="meta pt-[3px] text-signal" aria-hidden>
                    ▸
                  </span>
                  <span className="min-w-0 font-serif text-[15.5px] leading-[1.6]">{line}</span>
                </li>
              ))}
            </ul>
          </Section>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink py-8">
            <button type="button" onClick={() => onNavigate(next)} className="group text-left">
              <span className="meta mb-2 block">Read next</span>
              <span className="block font-sans text-[30px] font-black uppercase leading-none tracking-[-0.02em] transition-transform duration-500 ease-opslag group-hover:translate-x-2">
                {items[next].title}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="meta ml-auto self-end !text-ink transition-colors duration-300 hover:text-signal"
            >
              Close
            </button>
          </div>
        </div>
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
  const [initialScroll, setInitialScroll] = useState<"top" | "demo">("top");

  const close = useCallback(() => setOpen(null), []);

  const openAt = useCallback((index: number, at: "top" | "demo") => {
    setInitialScroll(at);
    setOpen(index);
  }, []);

  return (
    <>
      <ul>
        {items.map((item, index) => (
          <IndexRow
            key={item.slug}
            item={item}
            index={index}
            onOpen={openAt}
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

      <p className="meta mt-5">Select a project to open it. It reads top to bottom.</p>

      {open !== null ? (
        <WorkSheet
          key={`${items[open].slug}-${initialScroll}`}
          items={items}
          index={open}
          onClose={close}
          onNavigate={(i) => openAt(i, "top")}
          initialScroll={initialScroll}
        />
      ) : null}
    </>
  );
}
