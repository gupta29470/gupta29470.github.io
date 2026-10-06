# Aakash Gupta — portfolio

An applied-AI portfolio, built as an editorial index rather than a landing page. Work is
numbered like issues of a publication: a register you can scan, and a spread you can read.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run typecheck
npm run lint
```

## The resume PDF

`public/resume/Aakash_Gupta_Resume_AI.pdf` is **generated**, not committed: Chrome stamps generation
metadata into a PDF, so the bytes differ on every run and git would report the file modified after
each deploy.

- Locally: `npm run dev` and `npm run build` both run `scripts/html-to-pdf.sh` first via the
  `predev` / `prebuild` hooks.
- In CI: the deploy workflow installs a shell-only headless browser and runs the same script.
- Manually: `./scripts/html-to-pdf.sh public/resume/Aakash_Gupta_Resume_AI.html`

The runner has no SF Pro Text, so its PDF falls back to Liberation Sans and DejaVu Sans. Same single
A4 page, and visually the same: the resume asks for system sans faces, so the Mac build embeds SF
Pro Text and the runner embeds Liberation Sans, both sans, both with the same metrics. The runner's
output is treated as canonical, because that is the file a visitor actually downloads.

To bring the published copy into the local `~/Downloads/Professional/resume` folder:

```bash
./scripts/sync-resume.sh          # pulls from gupta29470.github.io
BASE=... DEST=... ./scripts/sync-resume.sh   # override either end
```

It reports a sha for each file and warns if the published HTML no longer matches
`public/resume/`, which means the deploy is behind.

## Deployment

Published to GitHub Pages at **https://gupta29470.github.io/** as a personal project, so the
remote uses the personal SSH host alias, not the default company one:

```bash
git remote -v
# origin  git@github.com-personal:gupta29470/gupta29470.github.io.git
```

`npm run build` produces a static export in `out/` (Next's `output: "export"`, images
unoptimized, trailing slashes). `.github/workflows/deploy-pages.yml` runs the typecheck and the
build on every push to `main`, then publishes `out/` through GitHub Pages.

The repository holds the **source**; Pages must be set to source **"GitHub Actions"** in
Settings → Pages. If it is ever switched to "Deploy from a branch", the site becomes the
repository file listing rather than the portfolio — only `out/` should ever be served.

There is no `CNAME` file. Adding a custom domain means adding it to `public/` and updating
`metadataBase` in `src/app/layout.tsx`.

## Why it looks like this

The design language is print-derived: one warm paper (`#F5F2EB`), one ink (`#141414`), and a
single red (`#D93B2B`) that is only ever used for the one thing that matters on a given
surface: a hovered index number, an interrupted voice turn, a full stop. Type is Archivo for
display, Source Serif 4 for reading, IBM Plex Mono for metadata. Structure is carried by
hairline rules and a 12-column grid instead of cards, shadows and rounded corners.

It is a deliberate borrowing of the **editorial register**: numbered entries, context /
approach / outcome, a colophon on every project — not of anyone's copy, content, or code.

## Where the content lives

`src/content/work.ts` is the only place text and figures are written. It carries its own
provenance rules at the top, and a "deliberately not claimed" list at the bottom:

- Every number was read out of the repository or the resume, not remembered.
- **The phone number is deliberately absent**, although it is on the resume file.
- **The two native iOS projects are deliberately absent**, by request.
- Three claims from the AI resume are **left off rather than softened**, because they do not
  survive checking against `codewalk-prod`: the MCP server and its 39 tools (no MCP module
  exists in `codewalk-platform/app/modules/`), "15+ languages" (`parsing/parser.py` registers
  14), and "7 providers" (`llm_gateway/providers.py` lists 13).

Anyone adding a project should add it there; the sections render from the data and hold no
copy of their own.

## Crawlers

`src/app/sitemap.ts` and `src/app/robots.ts` generate `sitemap.xml` and `robots.txt` at build time.
Only the home page is listed; the resume files are downloads, not pages, and are deliberately absent.
`lastModified` is the build time, which for a static export is the honest answer.

## The plates

`src/components/plates.tsx` holds two SVG schematics, one per project. They are diagrams of
real system components and real data paths, not fabricated screenshots.

- **Codewalk** is `codewalk-architecture.tsx`, the platform architecture drawn for the repo
  (frontend, edge, API routes, four flows, shared state). It was converted from a standalone
  HTML file so the fonts and tokens come from the site, the CSS is scoped under `.cw-arch`, and
  it renders in the document instead of in an iframe.
- **VoiceFlow** is `voiceflow-architecture.tsx`: the call path from the caller's phone through
  Twilio Media Streams into the four pipeline stages, with the barge-in path in red. The project
  ships its own `architecture.html`, but that file is a dark zinc-and-indigo Tailwind page that
  fights this site's paper register, so the system was redrawn here rather than copied. Facts
  come from that file and the repo README.

Both diagrams are dense, so they get `WideFrame` and the sheet scrolls them sideways rather
than shrinking them to a smudge. Plates that need that frame are excluded from the hover
preview by `hasThumbnail`: a dense drawing in a 19rem box is a grey smudge and says nothing.

**The pan surface has to reach the sheet's edges.** The sheet pads its content, and a wide plate
rendered inside that padding can only pan within the padded column, which clips the first
characters of every left-hand label. So the sheet is a padded block, then the plate, then the
padding resumes: the plate sits between two padded blocks rather than inside one. Each drawing
then carries its own gutter (`width: 1304px; padding: 0 32px` on `.cw-arch-pad` / `.vf-arch-pad`)
so the scroll runs edge to edge while the content still breathes at both ends. Measured: 1px gap
at each edge on desktop, which is the sheet border, and 0 on mobile.

## Structure

```
src/
├── app/
│   ├── layout.tsx        fonts, metadata, JSON-LD
│   ├── page.tsx          all sections, in order
│   └── globals.css       design tokens, .meta, .display, press grain, sheet keyframes
├── components/
│   ├── masthead.tsx      sticky nav + IST clock
│   ├── work-index.tsx    the register and the bottom sheet
│   ├── video-embed.tsx   click-to-play demo, loaded on demand
│   ├── plates.tsx        two schematic diagrams
│   ├── experience.tsx    work experience, behind <details>
│   ├── capacities.tsx    what I can take on, with the proof beside it
│   └── ist-clock.tsx     client clock, filled on mount
└── content/work.ts       every word and figure on the site
public/resume/            the AI resume, served as-is
```

## Notes for whoever works on this next

- A project opens as a **bottom sheet with vertical scroll**. An earlier version was a
  five-panel horizontal spread, which read badly on a phone and hid the fact that a project
  had more than one panel. The sheet is remounted per project (via `key`), which is what resets
  its scroll position to the top without a reset effect.
- Each project carries a `focus` list, shown as tags under the title: Codewalk is multi-agent
  review, RAG-based chat and indexing; VoiceFlow is real-time voice and streaming. It is the
  first thing a reader sees, so they know what the project is before the context paragraph.
- No copy mentions dismissed findings, by request. The feature is real (`/codewalk dismiss`,
  per-batch verdicts, `previous_findings` fed to the next run), so this is a product call about
  what to advertise, not a correction. If it goes back in, restore it in `content/work.ts` only.
- A project sheet is Context, How it flows, Demo, Tech stack and tools. It used to carry seven
  sections including an outcome list and a per-project colophon; that was more detail than a
  reader wanted and it buried the two things that matter, the flow and the stack.
- Each project row carries a Demo chip beside the row, and the row itself is a button. The row
  opens the sheet at the cover; the chip opens the same sheet already scrolled to the video. The
  sheet is keyed on `slug` plus the target, so choosing the chip on a project whose sheet was
  already open still lands on the demo.
- The demo player is a facade until clicked. Rendering the YouTube iframe immediately loads
  YouTube's player and cookies on every page view, which the colophon says we do not do. Clicking
  swaps in `youtube-nocookie.com` with autoplay.
- The register line is `item.summary`, written by hand. It was briefly derived by splitting
  `context` on its first full stop, which is the kind of parsing that breaks on the first edit.
- The capabilities section is three statements, not a keyword list. An earlier version was four
  rows of comma-separated nouns, which failed for a specific reason: a list answers "what does he
  know", while the reader is asking "what would I hand him in week one". Every statement now
  carries the project that proves it, and a statement with no proof does not belong in the list.
- Outcome notes can carry an `href`; when they do they render as links. The product URL was
  plain text in an outcome note for a while, which is exactly the kind of thing nobody notices
  until a reader cannot click it.
- Rows that open say so. The archive rows used to end in a bare `+` and nobody could tell they
  were interactive, so `experience.tsx` carries a labelled Expand control that flips to
  Collapse with `group-open:`.
- All registers switch to their multi-column layout at `lg`, not `md`. Between 768px and
  1024px the columns are too narrow for the display type, and headings run over body text.
  This was measured at 14 widths, not guessed.
- Prose tracks are `minmax(0,1fr)` with `min-w-0` on the item. A grid item's default automatic
  minimum size will happily widen the whole page instead of wrapping a long summary.
- One Tailwind v4 trap is worth knowing: `lg:inline` is emitted *after* `hidden`, so
  `hidden lg:inline` on the same element applies at every width. Put the breakpoint on the
  parent, or use a class whose utility is emitted after (as the index row does with
  `lg:hidden`).
- No em dash appears in any rendered string. The owner reads them as machine-written. The rule
  is not enforced by a test, so it is on you.

