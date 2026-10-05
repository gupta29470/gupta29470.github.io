"use client";

import { useState } from "react";

/**
 * A demo that plays on the page.
 *
 * The frame is deliberately a facade until it is clicked: rendering the YouTube
 * iframe straight away loads YouTube's player and cookies on every page view,
 * which is a tracking cost the reader did not ask for and the colophon claims we
 * do not impose. Clicking swaps in the real player with autoplay, so the reader
 * still gets one click and then video.
 */
export function VideoEmbed({
  youtube,
  title,
}: {
  /** The YouTube video id, not a URL. */
  youtube: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  const watchUrl = `https://www.youtube.com/watch?v=${youtube}`;
  const thumb = `https://i.ytimg.com/vi/${youtube}/maxresdefault.jpg`;

  return (
    <figure>
      <div className="relative aspect-video w-full overflow-hidden border border-ink bg-paper-deep">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer focus:outline-none"
            aria-label={`Play ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb}
              alt=""
              width={1280}
              height={720}
              loading="lazy"
              className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center gap-3 border border-ink bg-paper px-5 py-3 font-sans text-[13px] font-extrabold uppercase tracking-tight transition-colors duration-300 ease-opslag group-hover:bg-ink group-hover:text-paper">
                <span
                  aria-hidden
                  className="text-signal transition-colors duration-300 group-hover:text-paper"
                >
                  ▶
                </span>
                Play demo
              </span>
            </span>
          </button>
        )}
      </div>

      <figcaption className="meta mt-3">
        {title} ·{" "}
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="!text-ink transition-colors duration-300 hover:text-signal"
        >
          Open on YouTube ↗
        </a>
      </figcaption>
    </figure>
  );
}
