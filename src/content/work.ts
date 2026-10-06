/**
 * The single source of truth for every word and figure on this site.
 *
 * Provenance rules, applied when this file was written:
 *
 *  - Every number here was read out of the repository or the resume, not
 *    remembered. Where a claim could not be verified it was left out rather
 *    than softened. See the "not claimed" note at the bottom of this file.
 *  - The phone number on both resumes is deliberately absent.
 *  - Codewalk is first, because it is the project closest to the work being
 *    applied for.
 */

export const profile = {
  name: "Aakash Gupta",
  role: "Applied AI Engineer",
  tagline: "Five years in production engineering, now building applied AI.",
  email: "aa.1998.gupta@gmail.com",
  github: "https://github.com/gupta29470",
  linkedin: "https://www.linkedin.com/in/aakash98gupta/",
  appStore: "https://apps.apple.com/us/app/navica-budget-trip-planner/id6759998334",
  resume: "/resume/Aakash_Gupta_Resume_AI.html",
  /** The printable version. Regenerated from the HTML at deploy time. */
  resumePdf: "/resume/Aakash_Gupta_Resume_AI.pdf",
  codewalk: "https://www.codewalk.xyz/app",
} as const;

/** Small, checkable facts set under the name. No adjectives. */
export const facts: { label: string; value: string }[] = [
  { label: "Experience", value: "5 years building production software" },
  { label: "Now", value: "Applied AI: voice agents, retrieval, review" },
  { label: "Looking for", value: "AI engineering roles" },
  { label: "Based in", value: "India" },
];

export type PlateName = "codewalk" | "voice-flow";

export type Work = {
  no: string;
  slug: string;
  title: string;
  /** The one-line register entry. Written, not derived from `context`. */
  summary: string;
  /** The two or three things this project is actually about. */
  focus: string[];
  /** Deployment state. "live" means a public URL answers, verified by hand. */
  status: { kind: "live" | "code"; label: string };
  kind: string;
  year: string;
  /** Where the thing lives. Absent when there is no public link. */
  repo?: string;
  product?: string;
  context: string;
  /** The flow, one step per line. Kept to a handful; this is not a spec. */
  flow: string[];
  /** A walkthrough to watch. `youtube` is an id, not a URL. */
  youtube?: string;
  youtubeCredit?: string;
  /** What it is built with. Plain list, no prose. */
  tech: string[];
  plate: PlateName | null;
};

export const work: Work[] = [
  {
    no: "01",
    slug: "codewalk",
    title: "Codewalk",
    summary: "Indexes a repository, answers questions with citations, and reviews diffs.",
    focus: ["Multi-agent review", "RAG-based chat", "Indexing"],
    // Verified 2026-10-05: https://www.codewalk.xyz/app answers 200.
    status: { kind: "live", label: "Live" },
    kind: "Code intelligence platform",
    year: "2026",
    product: "https://www.codewalk.xyz/app",
    context:
      "Reading an unfamiliar repository is slow, and reviewing a diff carefully is slower. Both jobs are mostly about finding the few facts that matter, and being able to point at where they came from. Codewalk indexes a repository once, answers questions about it with citations, and reviews changes against rules written down in a rubric pack.",
    flow: [
      "Indexing. The repository is cloned and parsed with tree-sitter into a symbol graph and parent and child chunks, embedded, then promoted into place with an atomic swap, so readers only ever open a finished index.",
      "Chat. A question is expanded into a few angles, gathered from the graph and the vectors through one shared gather, ranked in a single call, and answered from the best few with citations back to the file and symbol.",
      "Review. A diff is split into batches and a pool of review agents works them in parallel, each batch returning findings plus its own verdict on how much of that batch it covered. Findings are grounded against the checked-out revision before they are stored, then written back to the pull request.",
    ],
    youtube: "bqmJnED7GMk",
    youtubeCredit: "Codewalk walkthrough",
    tech: [
      "Python, FastAPI, SQLAlchemy 2.0, Pydantic v2",
      "PostgreSQL 16 (state and version fences), Redis 7 (streams, locks, counters)",
      "tree-sitter parsing, 14 languages, parent and child chunks",
      "Retrieval: symbol walk over the code graph plus batched vector search",
      "Models: bring your own key, 13 providers behind one gateway",
      "Evaluation: versioned suites, deterministic scorers, an LLM judge, variance derived thresholds",
      "Next.js and TypeScript front end, Docker, Prometheus and Grafana, Go edge gateway",
    ],
    plate: "codewalk",
  },
  {
    no: "02",
    slug: "voice-flow",
    title: "VoiceFlow",
    summary: "A phone agent that listens, answers out loud, and yields when interrupted.",
    focus: ["Real-time voice", "Streaming and barge-in"],
    // No public deployment. voice-flow.vercel.app resolves but belongs to
    // another project, so it is deliberately not linked or counted as live.
    status: { kind: "code", label: "Repo + demo" },
    kind: "Real-time voice agents",
    year: "2025",
    repo: "https://github.com/gupta29470/voice-flow",
    youtube: "WMqto41-tRw",
    youtubeCredit: "VoiceFlow demo",
    context:
      "Collections and inside-sales calls are a turn-taking problem before they are a language problem. A bot that is clever but talks over the person who called it is unusable. VoiceFlow places real phone calls and runs the whole loop, audio in, transcript, tool call, voice out, while staying interruptible at every step.",
    flow: [
      "The call connects through Twilio Media Streams, which sends 8 kHz audio to Deepgram for streaming speech to text. Endpointing on that transcript decides when the caller has finished a turn.",
      "The transcript goes to the model with function calling, which answers and writes structured results such as a promise to pay or a qualified lead rather than leaving them in a recording.",
      "The reply is synthesised one sentence at a time and played back down the same call. If the caller talks over the agent, the in-flight synthesis is cancelled and the buffered audio is stopped mid-sentence.",
    ],
    tech: [
      "Python, FastAPI, WebSockets",
      "Telephony: Twilio Media Streams, 8 kHz mu-law end to end",
      "Speech in: Deepgram streaming STT, endpointing for turn detection",
      "Reasoning: Grok (xAI) and Kimi, with function calling",
      "Speech out: Cartesia and ElevenLabs, sentence-level streaming",
      "Storage: SQLite for workflow runs and captures",
      "Dashboard: Next.js with per-turn latency, average and p95, deployed on Render and Vercel",
    ],
    plate: "voice-flow",
  },
];

/**
 * Work that is not an AI system. The register lists it; a row expands for the
 * detail. Numbers here are the resume's own.
 */
export type ExperienceEntry = {
  org: string;
  role: string;
  period: string;
  where: string;
  summary: string;
  points: string[];
};

export const experience: ExperienceEntry[] = [
  {
    org: "ANKO GCC",
    role: "Mobile Engineer",
    period: "Oct 2024 to present",
    where: "Kmart and Target Australia",
    summary: "Retail app used by 3.74M people across Australia and New Zealand.",
    points: [
      "Performance: WebView memory 2GB to 400MB; token clear 2,000ms to 10ms; product-list first load 6 to 9s down to 131ms; logged-in product page 3,054ms to 231ms.",
      "Next-Gen Home Screen: co-designed the Contentful-driven architecture with shared BLoC patterns across 10+ modules, supporting 38.9M sessions with no major state-management defects after release.",
      "Shoppable UGC (Tolstoy): owned the SDK integration and vendor rollout. 17M events, 923K users, 24% conversion among interactors, one month ahead of schedule.",
      "Connectivity platform: screen-aware offline handling with auto-recovery, 2 to 7s faster reconnect across AU/NZ devices.",
      "Rich push: native iOS media notifications (images, video and GIFs) through Braze.",
      "Engineering standards: ran BLoC and code-quality brown-bags for 10 to 12 engineers; drove review practice and tech-debt cleanup.",
    ],
  },
  {
    org: "Explorex Technologies",
    role: "Frontend Developer (Flutter)",
    period: "Oct 2023 to Jul 2024",
    where: "Digital Dining",
    summary: "Built the guest-facing dining product from nothing, live across 300+ restaurants in Bangalore.",
    points: [
      "Owned the product end to end from first screen to production rollout across 300+ restaurants.",
    ],
  },
  {
    org: "Deciml",
    role: "Flutter Developer",
    period: "May 2023 to Aug 2023",
    where: "Consumer finance app",
    summary: "Moved editorial content out of app releases and into configuration.",
    points: [
      "Migrated FAQs and blogs to Firebase Remote Config so content shipped without an app-store review.",
      "Owned bug fixes, release cycles and product-copy updates.",
    ],
  },
  {
    org: "Threedots",
    role: "Product Engineer",
    period: "Sep 2021 to Mar 2023",
    where: "Social investing platform, 100K+ users",
    summary: "Four product surfaces on a social investing platform, plus the onboarding that introduced them.",
    points: [
      "Built Trade Feeds (~50K users), Tag-Based Group Discovery (~24K), In-App Rating (~300K) and the current-affairs feed (~34K).",
      "Maintained and supported the Leagues, Polls and Paper Trading games used by 100K+ users.",
      "Created demo-gameplay onboarding: 63.5K interactions and a ~10% lift in new-user engagement.",
      "Refactored Groups to BLoC, cutting load time by ~50%.",
    ],
  },
];

/**
 * Skills, set as a register rather than a wall of keywords.
 *
 * Deliberately short, and grouped by what the work is rather than by which tool
 * it was. The project write-ups name the specifics, so this is the index to them
 * and claims nothing the projects do not already support.
 */
export type Capacity = {
  no: string;
  name: string;
  body: string;
  /** Where the claim is proven. A statement without one does not belong here. */
  proof: string;
};

export const capacities: Capacity[] = [
  {
    no: "01",
    name: "Retrieval and review agents",
    body: "I build the gather, rank and answer loop, and I can tell you which step drops evidence and what the system does when that step fails. On Codewalk that meant one shared gather for both retrieval paths, a ranking call that is the only filter, and review coverage derived from per-batch verdicts so an incomplete review cannot look like a clean one.",
    proof: "Codewalk",
  },
  {
    no: "02",
    name: "Real-time voice",
    body: "A cascaded streaming pipeline over a live phone call: speech to text, a model with tool calling, speech back out, with barge-in so a caller can interrupt mid-sentence. Per-turn latency is reported at average and p95, because the tail is what the person on the call actually feels.",
    proof: "VoiceFlow",
  },
  {
    no: "03",
    name: "Production instinct",
    body: "Five years of shipping software to real users, which is where the habits come from. I measure before optimising, assume the connection will drop, handle the failure state, and expect somebody to open it on a bad network. Flutter, SwiftUI and Firebase are part of that background, not the direction.",
    proof: "ANKO GCC · retail app, 3.74M users",
  },
];

/**
 * Deliberately not claimed anywhere on this site, and the reason each one was
 * left out. Kept here so the next editor does not helpfully restore them.
 *
 *  - "MCP server, 39 tools": no MCP server exists in codewalk-platform's
 *    app/modules/ and architecture.md does not mention MCP. Unverifiable here.
 *  - "tree-sitter, 15+ languages": parsing/parser.py registers 14.
 *  - "multi-provider layer, 7 providers": llm_gateway/providers.py lists 13.
 *  - The phone number on both resume files: excluded by request.
 *  - The two native iOS projects on the mobile resume: excluded by request.
 */
