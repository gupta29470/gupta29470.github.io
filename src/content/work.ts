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
 *    applied for. The IOS projects from the mobile resume are not listed.
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
  resumeMobile: "/resume/Aakash_Gupta_Resume_Flutter.html",
  codewalk: "https://www.codewalk.xyz/app",
} as const;

/** Small, checkable facts set under the name. No adjectives. */
export const facts: { label: string; value: string }[] = [
  { label: "Experience", value: "5 years building production software" },
  { label: "Now", value: "Applied AI: voice agents, retrieval, review" },
  { label: "Looking for", value: "AI engineering roles" },
  { label: "Based in", value: "India, working remotely" },
];

export type PlateName = "codewalk" | "voice-flow";

export type Outcome = { claim: string; note?: string };

export type Work = {
  no: string;
  slug: string;
  title: string;
  subtitle: string;
  /** The one-line register entry. Plain description, no sales language. */
  line: string;
  kind: string;
  year: string;
  fields: string[];
  /** Where the thing lives. Absent when there is no public link. */
  repo?: string;
  demo?: string;
  product?: string;
  context: string;
  approach: string;
  build: { head: string; body: string }[];
  outcome: Outcome[];
  colophon: [string, string][];
  plate: PlateName | null;
};

export const work: Work[] = [
  {
    no: "01",
    slug: "codewalk",
    title: "Codewalk",
    subtitle: "Code intelligence: ask a repository a question, and review its changes",
    line: "A platform that indexes a repository, answers questions with citations, and reviews diffs against a rubric.",
    kind: "Product platform",
    year: "2026",
    fields: ["Retrieval", "Code review", "Agent runtime", "Multi-agent", "Go + Python"],
    product: "https://www.codewalk.xyz/app",
    context:
      "Reading an unfamiliar repository is slow, and reviewing a diff carefully is slower. Both jobs are mostly about finding the few facts that matter and being able to point at where they came from. Codewalk is a product built around that: index a repository once, then answer questions about it with citations and review changes against rules written down in a rubric pack.",
    approach:
      "The system is one product in three runtimes. Python carries the API, the agent runtime, retrieval, the indexing and review workers, and the evaluation harness, because that is where the model ecosystem lives. Go carries two things it is genuinely better at: the sandbox execution service, which owns the Docker socket and is mostly about cancellation and resource limits, and the edge gateway, which holds many long-lived SSE connections. They meet at a gRPC contract and one shared Postgres table.",
    build: [
      {
        head: "Retrieval, and the one ranking that filters",
        body: "Retrieval gathers from two places at once: a symbol walk over the code graph, and a batched vector search. Both go through the same gather function, so the search endpoint and the agent's search tool cannot disagree about what was found. The agent's path then makes three provider calls: expand the question into a few angles, rank every candidate from 0 to 10 in a single call, answer from the best few. The ranking is the only thing that drops evidence, and if the ranking call fails, nothing is dropped. The deterministic path makes no model calls at all.",
      },
      {
        head: "Review that separates deterministic from generative",
        body: "A diff is split into batches and reviewed in parallel, up to four at a time. Each batch returns findings and its own verdict on how much of that batch it actually covered. Coverage is derived from those per-batch verdicts, not from how many findings came back, so a review that ran and found nothing is a success and a review with a failed batch is reported as incomplete instead of quietly passing. Findings are grounded against the checked-out revision before they are stored.",
      },
      {
        head: "Findings that do not come back",
        body: "The part that decides whether a review bot survives contact with a team: when a person resolves or dismisses a finding, that verdict is fed into the next review as previous findings. A dismissed issue does not get re-reported on the following push. Comments are written back to the pull request after persistence, best effort, so a GitHub outage does not lose the review.",
      },
      {
        head: "The row is the job; the stream is the doorbell",
        body: "No long operation runs inside a request. A request commits the row and its outbox intent in one transaction, then publishes the id onto a Redis stream. A worker claims the row with a version-fenced update, does the work, and writes progress back. Postgres holds the state and the fence; Redis carries ids, locks and counters. A lost stream message is recoverable because the reaper re-announces it from the row, which is the only component in the system that repairs anything.",
      },
      {
        head: "Multi-agent review, with ceilings instead of hope",
        body: "The review engine runs a pool of agents over batches. The agent runtime is hand-written rather than framework-built, because its state has to be a durable row that survives a killed worker and a pause for human approval. It has four independent ceilings (iterations, wall clock, tokens, repeated calls) that complete a run with what it has and name the ceiling that fired, instead of failing the run.",
      },
      {
        head: "Every model call through one gateway",
        body: "Inference is bring-your-own-key. Provider keys are encrypted at rest, decrypted at a single call site, and every call goes through a per-tenant circuit breaker with a retry budget and a usage ledger. There is deliberately no fallback chain between providers: a provider failure surfaces as a provider failure.",
      },
      {
        head: "Knowing when a change made it worse",
        body: "There is an evaluation harness with versioned suites, deterministic scorers over saved trajectories, an LLM judge calibrated against hand labels, and a regression gate whose thresholds come from measured variance rather than taste. Retrieval quality is measured on a fixed baseline so a change to chunking or ranking can be shown to help or hurt.",
      },
    ],
    outcome: [
      {
        claim: "A working product you can open today",
        note: "codewalk.xyz/app",
      },
      {
        claim: "Retrieval that answers with citations, and never drops evidence on a failed ranking call",
      },
      {
        claim: "Review coverage reported per batch, so an incomplete review cannot look like a clean one",
      },
      {
        claim: "Dismissed findings stay dismissed across pushes",
      },
      {
        claim: "Polyglot on purpose: Python for the AI and the API, Go for the sandbox and the edge",
      },
      {
        claim: "A known-gaps ledger listing what is not built, kept next to the code",
        note: "the honest part, and the part I would want a reviewer to read first",
      },
    ],
    colophon: [
      ["API and workers", "Python, FastAPI, SQLAlchemy 2.0, Pydantic v2"],
      ["Sandbox and edge", "Go: execution service over gRPC, gateway over HTTP"],
      ["Data", "PostgreSQL 16 for state and the version fence, Redis 7 for streams, locks and counters"],
      ["Parsing", "tree-sitter, 14 languages, parent and child chunks"],
      ["Retrieval", "Symbol walk plus batched vector search, one ranking call"],
      ["Models", "Bring your own key, 13 providers behind one gateway"],
      ["Evaluation", "Versioned suites, deterministic scorers, LLM judge, regression gate"],
      ["Status", "Pre-deploy. The product runs; nothing here claims a number it has not measured."],
    ],
    plate: "codewalk",
  },
  {
    no: "02",
    slug: "voice-flow",
    title: "VoiceFlow",
    subtitle: "Real-time voice agents that hold a phone conversation",
    line: "A phone agent that listens, answers out loud, and yields the moment it is interrupted.",
    kind: "Personal AI system",
    year: "2025",
    fields: ["Voice agents", "Streaming", "Function calling", "Latency"],
    repo: "https://github.com/gupta29470/voice-flow",
    demo: "https://youtu.be/WMqto41-tRw",
    context:
      "Collections and inside-sales calls are a turn-taking problem before they are a language problem. A bot that is clever but talks over the person who called it is unusable. VoiceFlow places real phone calls and runs the whole loop (audio in, transcript, tool call, voice out) while staying interruptible at every step.",
    approach:
      "A cascaded pipeline over WebSockets, kept end to end in the telephony band. Twilio Media Streams delivers 8 kHz mu-law audio to Deepgram for streaming speech to text; the transcript is handed to Grok or Kimi with function calling; the reply is streamed out through Cartesia or ElevenLabs one sentence at a time. Turn-taking comes from STT endpointing rather than a fixed timer, and every synthesis task is cancellable so a caller can talk over the agent and be heard.",
    build: [
      {
        head: "Two clocks, one pipeline",
        body: "Audio arrives on a carrier's clock and the language model answers on its own. Keeping both in a single async loop is what makes the barge-in path possible: the moment endpointing fires, the in-flight synthesis task is cancelled and a clear event is sent to Twilio so buffered audio stops playing mid-sentence.",
      },
      {
        head: "Streaming at sentence granularity",
        body: "Waiting for a complete model response before synthesising puts the whole generation time in front of the caller's first word. Splitting on sentence boundaries starts speech while the rest of the answer is still being written, which moves time to first audio earlier without changing the model.",
      },
      {
        head: "Workflows as configuration",
        body: "Loan recovery, EMI reminders, banking and sales run on the same engine with different prompts, guardrails and tools. Tools write structured results (a promise to pay, a qualified lead, an escalation) instead of leaving the outcome in a transcript somebody has to listen to.",
      },
      {
        head: "Language-aware routing",
        body: "English, Hindi and Hinglish are handled by routing to language-specific transcription and choosing a matching voice, because code-switched speech is the normal case on an Indian collections call, not an edge case.",
      },
      {
        head: "Measuring the only number that matters",
        body: "Per-turn STT, LLM, TTS and end-to-end latency are recorded as average and p95 on a live dashboard, labelled with the provider and model that served each turn. Tail latency is the number a caller actually feels, so the average alone was never enough.",
      },
    ],
    outcome: [
      {
        claim: "Interruptible, bidirectional speech over a real telephone line",
        note: "8 kHz mu-law end to end through Twilio Media Streams",
      },
      {
        claim: "Per-turn latency and p95 visible live, per provider and model",
        note: "STT, LLM, TTS and end-to-end, on a Next.js dashboard",
      },
      { claim: "Four production call workflows from one engine", note: "loan recovery, EMI, banking, sales" },
      { claim: "English, Hindi and Hinglish in the same deployment" },
    ],
    colophon: [
      ["Runtime", "Python, FastAPI, WebSockets"],
      ["Telephony", "Twilio Media Streams, 8 kHz mu-law"],
      ["Speech in", "Deepgram streaming STT, endpointing for turns"],
      ["Reasoning", "Grok (xAI) and Kimi, with function calling"],
      ["Speech out", "Cartesia and ElevenLabs, sentence-level streaming"],
      ["Storage", "SQLite for workflow runs and captures"],
      ["Surfaces", "Next.js dashboard, deployed on Render and Vercel"],
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
      "Built Leagues, Polls and Paper Trading games for 100K+ users.",
      "Created demo-gameplay onboarding: 63.5K interactions and a ~10% lift in new-user engagement.",
      "Refactored Groups to BLoC, cutting load time by ~50%.",
    ],
  },
];

/**
 * A deliberately short list. This is where the value actually is, so it is
 * written as statements of fact rather than as capabilities.
 */
export const strengths: { head: string; body: string }[] = [
  {
    head: "I have shipped to people who did not ask for a demo",
    body: "Five years of consumer software on real devices, real networks and real release trains. That is where the habits come from: measure before optimising, handle the failure state, and assume somebody will open this on a bad connection.",
  },
  {
    head: "I keep facts out of the model",
    body: "Order state, policy and evidence come from the database or the repository. The model's job is language and intent. It is the difference between an assistant that is usually right and one that cannot be confidently wrong about somebody's order.",
  },
  {
    head: "I instrument the whole path",
    body: "A voice agent is a chain and the slowest link decides the conversation. Per-stage latency and percentile numbers, not just an average, and an evaluation harness so a change that made things worse is visible before it ships.",
  },
  {
    head: "I write down what I have not built",
    body: "Codewalk carries a gap ledger next to the code, and the parts of this system that are not proven say so. I would rather a reviewer trust the numbers that are there than find out later which ones were decoration.",
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
