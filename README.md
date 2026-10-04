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
- **The phone number is deliberately absent**, although it is on both resume files.
- **The two native iOS projects are deliberately absent**, by request.
- Three claims from the AI resume are **left off rather than softened**, because they do not
  survive checking against `codewalk-prod`: the MCP server and its 39 tools (no MCP module
  exists in `codewalk-platform/app/modules/`), "15+ languages" (`parsing/parser.py` registers
  14), and "7 providers" (`llm_gateway/providers.py` lists 13).

Anyone adding a project should add it there; the sections render from the data and hold no
copy of their own.

## The plates

`src/components/plates.tsx` holds two hand-drawn SVG schematics, one per project. They are
diagrams of real system components and real data paths, not fabricated screenshots. Each keeps
a single red element marking the decision that made the project worth building: the ranking
call that is the only filter in Codewalk's retrieval, and the barge-in path in VoiceFlow.

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
│   ├── plates.tsx        two schematic diagrams
│   ├── experience.tsx    work experience, behind <details>
│   ├── skills.tsx        the skills register
│   └── ist-clock.tsx     client clock, filled on mount
└── content/work.ts       every word and figure on the site
public/resume/            the two resumes, served as-is
```

## Notes for whoever works on this next

- A project opens as a **bottom sheet with vertical scroll**. An earlier version was a
  five-panel horizontal spread, which read badly on a phone and hid the fact that a project
  had more than one panel. The sheet is remounted per project (via `key`), which is what resets
  its scroll position to the top without a reset effect.
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

