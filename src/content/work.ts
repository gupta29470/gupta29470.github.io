/**
 * The single source of truth for every word and figure on this site.
 *
 * Provenance rules, applied when this file was written:
 *
 *  - Every number here is copied from Aakash's own resume files. Nothing is
 *    estimated, rounded up, or inferred.
 *  - The Codewalk entry that appears in the AI resume is deliberately absent:
 *    it is not shown as a project, and no Codewalk repository link is rendered
 *    anywhere on the site.
 *  - The phone number on both resumes is deliberately absent.
 *  - Where a claim is a property rather than a metric ("zero third-party
 *    dependencies", "no indexer"), it is quoted as written in the resume.
 */

export const profile = {
  name: "Aakash Gupta",
  role: "Applied AI Engineer",
  desk: "Mumbai, India — IST (UTC+5:30)",
  email: "aa.1998.gupta@gmail.com",
  github: "https://github.com/gupta29470",
  linkedin: "https://www.linkedin.com/in/aakash98gupta/",
  appStore: "https://apps.apple.com/us/app/navica-budget-trip-planner/id6759998334",
  resume: "/resume/Aakash_Gupta_Resume_AI.html",
  resumeMobile: "/resume/Aakash_Gupta_Resume_Flutter.html",
  availability: "Open to applied AI engineer roles and contract work.",
} as const;

export type PlateName = "voice-flow" | "ecom-bot" | "local-first" | "marketplace";

export type Outcome = { claim: string; note?: string };

export type Work = {
  no: string;
  slug: string;
  title: string;
  subtitle: string;
  /** The one-line register entry: what it is, for whom. */
  line: string;
  kind: "Personal AI system" | "Personal project" | "Team platform";
  year: string;
  fields: string[];
  /** Where the code or demo lives. Absent when a repository is not public. */
  repo?: string;
  demo?: string;
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
      "Collections and inside-sales calls are a turn-taking problem before they are a language problem. A bot that is clever but talks over the person who called it is unusable. VoiceFlow places real phone calls and runs the whole loop — audio in, transcript, tool call, voice out — while staying interruptible at every step.",
    approach:
      "A cascaded pipeline over WebSockets, kept end to end in the telephony band. Twilio Media Streams delivers 8 kHz μ-law audio to Deepgram for streaming speech-to-text; the transcript is handed to Grok or Kimi with function calling; the reply is streamed out through Cartesia or ElevenLabs one sentence at a time. Turn-taking comes from STT endpointing rather than a fixed timer, and every synthesis task is cancellable so a caller can talk over the agent and be heard.",
    build: [
      {
        head: "Two clocks, one pipeline",
        body: "Audio arrives on a carrier's clock and the language model answers on its own. Keeping both in a single async loop is what makes the barge-in path possible: the moment endpointing fires, the in-flight synthesis task is cancelled and a clear event is sent to Twilio so buffered audio stops playing mid-sentence.",
      },
      {
        head: "Streaming at sentence granularity",
        body: "Waiting for a complete model response before synthesising puts the whole generation time in front of the caller's first word. Splitting on sentence boundaries starts speech while the rest of the answer is still being written, which moves time-to-first-audio earlier without changing the model.",
      },
      {
        head: "Workflows as configuration",
        body: "Loan recovery, EMI reminders, banking and sales run on the same engine with different prompts, guardrails and tools. Tools write structured results — a promise-to-pay, a qualified lead, an escalation — instead of leaving the outcome in a transcript somebody has to listen to.",
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
        note: "8 kHz μ-law end to end through Twilio Media Streams",
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
      ["Telephony", "Twilio Media Streams, 8 kHz μ-law"],
      ["Speech in", "Deepgram streaming STT, endpointing for turns"],
      ["Reasoning", "Grok (xAI) and Kimi, with function calling"],
      ["Speech out", "Cartesia and ElevenLabs, sentence-level streaming"],
      ["Storage", "SQLite for workflow runs and captures"],
      ["Surfaces", "Next.js dashboard, deployed on Render and Vercel"],
    ],
    plate: "voice-flow",
  },
  {
    no: "02",
    slug: "ecom-bot",
    title: "EcomBot",
    subtitle: "A support assistant that is not allowed to guess",
    line: "A small language model fine-tuned for support tone, wired to the real catalogue for facts.",
    kind: "Personal AI system",
    year: "2025",
    fields: ["Fine-tuning", "LoRA / PEFT", "Structured output", "Grounding"],
    context:
      "A support assistant's worst failure is a confident wrong answer about somebody's order. Fine-tuning alone cannot fix that: the order status is not in the weights and never will be. EcomBot splits the job — the model handles language and intent, the application handles facts.",
    approach:
      "Qwen 2.5 0.5B Instruct was fine-tuned with LoRA through PEFT and TRL on 385 support conversations covering orders, returns and refunds. At inference the tuned model extracts structured intent, and Python performs the catalogue and order lookups the intent names. The reply is composed from what the lookup returned, so the model never states a fact it was not handed.",
    build: [
      {
        head: "Fine-tuning for register, not recall",
        body: "385 real support exchanges are enough to teach a 0.5B model the shape of a support reply: short, specific, no over-apologising, no invented policy. That is the part language models are genuinely good at, and it is what the adapter is trained for.",
      },
      {
        head: "Intent as a typed boundary",
        body: "The only thing crossing from the model into the application is a structured intent — which order, which action, which question. It is validated before any lookup runs, so a malformed or unexpected intent fails loudly instead of reaching a customer.",
      },
      {
        head: "The fact lane",
        body: "Order state, catalogue data and returns policy are read from their own tables at answer time. Combined with a 0.5B parameter model, this keeps the whole assistant cheap and fast to run: the expensive part of the job — being factually correct — was never delegated to the model.",
      },
    ],
    outcome: [
      { claim: "Fine-tuned on 385 support conversations", note: "orders, returns, refunds" },
      { claim: "Structured intent extraction, validated before any lookup" },
      {
        claim: "Factually correct answers by construction",
        note: "order and catalogue facts come from Python, not from the weights",
      },
    ],
    colophon: [
      ["Model", "Qwen 2.5 0.5B Instruct"],
      ["Tuning", "LoRA via PEFT and TRL"],
      ["Training set", "385 customer-support conversations"],
      ["Serving", "FastAPI, hybrid inference path"],
      ["Runtime", "Python, PyTorch, Hugging Face Transformers"],
    ],
    plate: "ecom-bot",
  },
  {
    no: "03",
    slug: "local-first-notes",
    title: "Local First Notes",
    subtitle: "An iPhone app with nothing to install but the app",
    line: "Notes built entirely from Apple's own frameworks — offline by default, synced when it can be.",
    kind: "Personal project",
    year: "2025",
    fields: ["SwiftUI", "SwiftData", "CloudKit", "Local-first"],
    repo: "https://github.com/gupta29470/local-first-notes",
    context:
      "Most apps begin by adding dependencies. This one begins by refusing them: a notes app that must work with no network, no account and no third-party SDK, using only what ships with the operating system. The interesting problem is not the note list — it is keeping three processes honest about the same data.",
    approach:
      "Clean Architecture with MVVM in SwiftUI, persistence in SwiftData, and sync through CloudKit rather than a server of its own. Models live in a local Swift Package so the app and its widget extension share one definition. App Groups move data between processes and BackgroundTasks handles refresh when the app is not running.",
    build: [
      {
        head: "Three surfaces, one type",
        body: "The app, the widget extension and background refresh are separate processes with separate containers. Putting the models in a Swift Package and the store in an App Group means a note written in one is the same type, and the same row, everywhere — no parallel model to drift.",
      },
      {
        head: "Offline is the default state",
        body: "Every write lands in the local store first. CloudKit reconciliation happens when the device decides it can, which means the app is fully usable on a flight and correct again on landing.",
      },
      {
        head: "Zero third-party dependencies",
        body: "No analytics SDK, no networking library, no persistence wrapper. The whole dependency graph is Apple's, which is also why the app stays small and its behaviour stays predictable across OS releases.",
      },
    ],
    outcome: [
      { claim: "Entirely Apple-native stack, zero third-party dependencies" },
      { claim: "Offline-first reads and writes, CloudKit sync when available" },
      { claim: "One shared model layer across app, widget and background tasks" },
      { claim: "Clean Architecture and MVVM throughout" },
    ],
    colophon: [
      ["UI", "SwiftUI with MVVM and Clean Architecture"],
      ["Persistence", "SwiftData"],
      ["Sync", "CloudKit"],
      ["Sharing", "Local Swift Package for models, App Groups for data"],
      ["Background", "BackgroundTasks"],
      ["Dependencies", "None beyond Apple's frameworks"],
    ],
    plate: "local-first",
  },
  {
    no: "04",
    slug: "marketplace-ios",
    title: "Marketplace",
    subtitle: "A commerce app where every entry point is routed, not special-cased",
    line: "Catalogue to checkout, with notifications, widgets and Spotlight sharing one navigation type.",
    kind: "Personal project",
    year: "2025",
    fields: ["SwiftUI", "Swift Concurrency", "Deep linking", "Firebase"],
    repo: "https://github.com/gupta29470/marketplace-ios",
    context:
      "A commerce app has more ways in than any other kind: a push about an order, a widget tap, a Spotlight result, a shared link. Treating each as its own navigation path is how apps end up with four half-correct routers. Here there is one destination type and four ways to reach it.",
    approach:
      "SwiftUI with the Observation framework, async/await and paginated loading for the catalogue, cart, checkout, order tracking, wishlist, reels, search and store map. Core Spotlight, WidgetKit and App Groups make the app's surfaces native rather than web views, and Firebase — Auth, Firestore, Analytics, Crashlytics and Cloud Messaging — carries identity and data underneath.",
    build: [
      {
        head: "One destination, four callers",
        body: "Typed routes are the contract. A notification, a widget, a Spotlight result and an in-app tap all resolve to the same destination value, so deep-link handling is written once and the four entry points cannot disagree about where a link goes.",
      },
      {
        head: "Pagination with a cancellation story",
        body: "Catalogue and search screens page with async/await tied to view lifetime, so scrolling fast or leaving a screen cancels in-flight work instead of letting stale pages land on top of fresh ones.",
      },
      {
        head: "Native surfaces, shared state",
        body: "Widgets and Spotlight need data the app has already fetched. App Groups give those extensions the same store, so the widget shows the real wishlist rather than a guess.",
      },
    ],
    outcome: [
      { claim: "Full commerce flow: catalogue, cart, checkout, order tracking, wishlist, reels, search, store map" },
      { claim: "Typed routing shared by push, widgets, Spotlight and in-app navigation" },
      { claim: "Paginated catalogue and search with lifecycle-bound cancellation" },
      { claim: "Native iOS surfaces backed by Firebase, not web views" },
    ],
    colophon: [
      ["UI", "SwiftUI with Observation"],
      ["Concurrency", "async/await with pagination and cancellation"],
      ["System surfaces", "WidgetKit, Core Spotlight, App Groups"],
      ["Backend", "Firebase Auth, Firestore, Analytics, Crashlytics, FCM"],
      ["Navigation", "Typed routes, deep links, notification and widget entry"],
    ],
    plate: "marketplace",
  },
];

/**
 * Work that is not an AI system. The register lists it in one line; the
 * folios hold the detail. Numbers here are the resume's own.
 */
export type ArchiveEntry = {
  org: string;
  role: string;
  period: string;
  where: string;
  summary: string;
  points: string[];
};

export const archive: ArchiveEntry[] = [
  {
    org: "ANKO GCC",
    role: "Mobile Engineer",
    period: "Oct 2024 — Present",
    where: "Kmart & Target Australia",
    summary:
      "Retail app used by 3.74M people across Australia and New Zealand. Performance work, a CMS-driven home screen architecture, and an offline model that survives a bad network.",
    points: [
      "Performance: WebView memory 2GB → 400MB; token clear 2,000ms → 10ms; product-list first load 6–9s → 131ms; logged-in product page 3,054ms → 231ms.",
      "Next-Gen Home Screen: co-designed the Contentful-driven architecture with shared BLoC patterns across 10+ modules, supporting 38.9M sessions with no major state-management defects after release.",
      "Shoppable UGC (Tolstoy): owned the SDK integration and vendor rollout — 17M events, 923K users, 24% conversion among interactors, one month ahead of schedule.",
      "Connectivity platform: screen-aware offline handling with auto-recovery, 2–7s faster reconnect across AU/NZ devices.",
      "Rich push: native iOS media notifications — images, video and GIFs — through Braze.",
      "Engineering standards: ran BLoC and code-quality brown-bags for 10–12 engineers; drove review practice and tech-debt cleanup.",
    ],
  },
  {
    org: "Explorex Technologies",
    role: "Frontend Developer (Flutter)",
    period: "Oct 2023 — Jul 2024",
    where: "Digital Dining",
    summary:
      "Built the guest-facing dining product from nothing — home, menu, cart and pay-bill — live across 300+ restaurants in Bangalore.",
    points: [
      "Owned the product end to end from first screen to production rollout across 300+ restaurants.",
    ],
  },
  {
    org: "Deciml",
    role: "Flutter Developer",
    period: "May 2023 — Aug 2023",
    where: "Consumer finance app",
    summary:
      "Moved editorial content out of app releases and into configuration, then kept releases and product copy moving.",
    points: [
      "Migrated FAQs and blogs to Firebase Remote Config so content shipped without an app-store review.",
      "Owned bug fixes, release cycles and product-copy updates.",
    ],
  },
  {
    org: "Threedots",
    role: "Product Engineer",
    period: "Sep 2021 — Mar 2023",
    where: "Social investing platform, 100K+ users",
    summary:
      "Four product surfaces on a social investing platform, plus the onboarding that introduced them.",
    points: [
      "Built Trade Feeds (~50K users), Tag-Based Group Discovery (~24K), In-App Rating (~300K) and the current-affairs feed (~34K).",
      "Built Leagues, Polls and Paper Trading games for 100K+ users.",
      "Created demo-gameplay onboarding: 63.5K interactions and a ~10% lift in new-user engagement.",
      "Refactored Groups to BLoC, cutting load time by ~50%.",
    ],
  },
];

export const archiveExtras: ArchiveEntry[] = [
  {
    org: "Navica",
    role: "Budget Trip Planner",
    period: "Published",
    where: "App Store & Play Store",
    summary:
      "Designed, built and published end to end — from concept to both stores under my own name.",
    points: ["Sole owner of design, build and release for a budget trip-planning app."],
  },
];

export type Capability = { no: string; name: string; body: string; tools: string };

export const capabilities: Capability[] = [
  {
    no: "01",
    name: "Agents & orchestration",
    body: "Function calling, tool schemas and guardrails around what a model is allowed to do. Multi-step flows that write structured results rather than leaving the outcome in a transcript, and human checkpoints where a wrong answer is expensive.",
    tools: "LangChain · LangGraph · MCP · function calling",
  },
  {
    no: "02",
    name: "Retrieval & grounding",
    body: "Chunking strategy, embeddings, semantic and hybrid search, and query rewriting. The goal is never a clever retriever — it is an answer whose source a reader can go and check.",
    tools: "ChromaDB · embeddings · RAG · Langfuse",
  },
  {
    no: "03",
    name: "Fine-tuning",
    body: "Parameter-efficient training for tone, format and intent extraction, and a clear line about when to fine-tune at all. Some jobs belong in the weights; facts belong in the database.",
    tools: "PEFT (LoRA) · TRL · PyTorch · Hugging Face",
  },
  {
    no: "04",
    name: "Real-time systems",
    body: "Streaming audio and tokens under a latency budget, WebSockets, and cancellation as a first-class path rather than an error case. Interruption is a feature you design for.",
    tools: "WebSockets · FastAPI · streaming STT/TTS · Twilio",
  },
  {
    no: "05",
    name: "Python services",
    body: "Async FastAPI services, typed boundaries between model output and application logic, retries with fallback across providers, and Docker images that behave the same outside my laptop.",
    tools: "Python · FastAPI · PostgreSQL · DuckDB · Docker · CI/CD",
  },
  {
    no: "06",
    name: "Product surfaces",
    body: "Four years of shipping consumer software for phones — which is where most of the judgement about latency, failure states and offline behaviour was actually earned.",
    tools: "Flutter (BLoC) · SwiftUI · SwiftData · CloudKit · Firebase",
  },
];

export const principles: { head: string; body: string }[] = [
  {
    head: "Measure before tuning",
    body: "Cutting a product page from 3,054ms to 231ms was not a rewrite, it was a stopwatch and a profiler. Model work is no different: the average hides the tail, and the tail is what a user feels.",
  },
  {
    head: "Facts live in the database, not the weights",
    body: "The model on our support assistant extracts intent; Python owns the truth. Generated prose should never be the only thing standing between a customer and their order status.",
  },
  {
    head: "Instrument the whole turn",
    body: "A voice agent is a chain, and the slowest link decides the conversation. Per-stage and end-to-end latency, average and p95, per provider — otherwise the tuning is a guess.",
  },
  {
    head: "Design for interruption",
    body: "Speech, networks and users all cut in. The interesting engineering is the cancellation path — stopping a synthesis task, a request, or a release cleanly and quickly.",
  },
  {
    head: "Prove it outside the notebook",
    body: "A demo that runs on one laptop is not a system. It has to hold on a real phone, on a real network, in two languages, at 8 in the morning.",
  },
];

/**
 * The deliberate omissions. Kept inline so the next editor does not
 * "helpfully" restore them.
 *
 *  - Codewalk: removed at the owner's request. No card, no repo link, no
 *    mention anywhere.
 *  - Phone number: present on both resume files, excluded from this site.
 */
