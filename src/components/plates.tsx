/**
 * Project plates.
 *
 * These are drawn, not photographed. A portfolio that shows fabricated
 * screenshots of its own projects is worse than one that shows nothing, so each
 * plate is a schematic of the system as described in `content/work.ts`: the
 * boxes are components that exist, and the arrows are the paths data actually
 * takes. The single red element on every plate marks the same thing — the
 * decision that made the project interesting.
 *
 * All four share one drawing language: 1120 × 780, hairline rules, mono labels.
 */

import type { PlateName } from "@/content/work";

const SANS = "var(--font-archivo), system-ui, sans-serif";
const MONO = "var(--font-plex-mono), ui-monospace, monospace";
const SERIF = "var(--font-source-serif), Georgia, serif";

const INK = "#141414";
const RULE = "#d8d3c8";
const SIGNAL = "#d93b2b";
const COOL = "#8a8781";

const W = 1120;
const H = 780;

/**
 * Below `md` a plate is drawn at a fixed readable width and panned
 * horizontally inside its own frame (`overflow-x-auto`). Scaling a schematic
 * down to 350px makes every label illegible, and letting it size itself to the
 * viewport instead would push the whole page sideways — which is exactly the
 * bug this wrapper exists to prevent.
 */
const FRAME = "w-full overflow-x-auto";

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${FRAME} ${className ?? ""}`}>
      <div className="min-w-[620px]">{children}</div>
    </div>
  );
}

function PlateTitle({ title, note }: { title: string; note: string }) {
  return (
    <>
      <text x={44} y={62} fontFamily={MONO} fontSize={12} letterSpacing="0.16em" fill={INK}>
        {title.toUpperCase()}
      </text>
      <line x1={44} y1={84} x2={W - 44} y2={84} stroke={RULE} vectorEffect="non-scaling-stroke" />
      <text x={W - 44} y={62} textAnchor="end" fontFamily={MONO} fontSize={11} letterSpacing="0.16em" fill={COOL}>
        {note.toUpperCase()}
      </text>
    </>
  );
}

function Label({
  x,
  y,
  title,
  body,
  anchor = "start",
}: {
  x: number;
  y: number;
  title: string;
  body: string;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <>
      <text
        x={x}
        y={y}
        textAnchor={anchor}
        fontFamily={SANS}
        fontSize={21}
        fontWeight={800}
        fill={INK}
        letterSpacing="-0.01em"
      >
        {title}
      </text>
      <text x={x} y={y + 24} textAnchor={anchor} fontFamily={MONO} fontSize={11.5} fill={COOL}>
        {body}
      </text>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   01 — VoiceFlow: the cascaded streaming pipeline, and the barge-in path.
   ──────────────────────────────────────────────────────────────────────────── */

function VoiceFlowPlate() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="VoiceFlow pipeline diagram: a phone call is streamed through Deepgram speech recognition, a Grok or Kimi language model with function calling, and Cartesia or ElevenLabs speech synthesis back to the caller, with a barge-in path that cancels the agent mid-sentence.">
      <PlateTitle title="VoiceFlow — the turn" note="Fig. 01" />

      {/* the two clocks: carrier in on the left, carrier out on the right */}
      <text x={44} y={156} fontFamily={MONO} fontSize={11} letterSpacing="0.14em" fill={COOL}>
        CARRIER — 8 KHZ MULAW
      </text>
      <text x={W - 44} y={156} textAnchor="end" fontFamily={MONO} fontSize={11} letterSpacing="0.14em" fill={COOL}>
        BACK TO THE CALLER
      </text>

      <rect x={44} y={168} width={180} height={92} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={60} y={200} fontFamily={MONO} fontSize={10.5} fill={COOL}>INBOUND</text>
      <text x={60} y={226} fontFamily={SANS} fontSize={19} fontWeight={800} fill={INK}>Phone call</text>
      <text x={60} y={246} fontFamily={MONO} fontSize={10.5} fill={COOL}>media streams</text>

      <rect x={324} y={168} width={180} height={92} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={340} y={200} fontFamily={MONO} fontSize={10.5} fill={COOL}>SPEECH TO TEXT</text>
      <text x={340} y={226} fontFamily={SANS} fontSize={19} fontWeight={800} fill={INK}>Deepgram</text>
      <text x={340} y={246} fontFamily={MONO} fontSize={10.5} fill={COOL}>streaming · endpointing</text>

      <rect x={604} y={168} width={180} height={92} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={620} y={200} fontFamily={MONO} fontSize={10.5} fill={COOL}>REASONING</text>
      <text x={620} y={226} fontFamily={SANS} fontSize={19} fontWeight={800} fill={INK}>Grok · Kimi</text>
      <text x={620} y={246} fontFamily={MONO} fontSize={10.5} fill={COOL}>function calling</text>

      <rect x={884} y={168} width={192} height={92} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={900} y={200} fontFamily={MONO} fontSize={10.5} fill={COOL}>SPEECH OUT</text>
      <text x={900} y={226} fontFamily={SANS} fontSize={19} fontWeight={800} fill={INK}>Cartesia</text>
      <text x={900} y={246} fontFamily={MONO} fontSize={10.5} fill={COOL}>ElevenLabs · per sentence</text>

      {[
        [224, 324],
        [504, 604],
        [784, 884],
      ].map(([from, to]) => (
        <g key={from}>
          <line x1={from} y1={214} x2={to - 4} y2={214} stroke={INK} vectorEffect="non-scaling-stroke" />
          <polyline points={`${to - 12},208 ${to - 2},214 ${to - 12},220`} fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
        </g>
      ))}

      {/* sentence-level streaming: the model emits text while speech is already leaving */}
      <rect x={604} y={300} width={472} height={34} fill="none" stroke={INK} strokeWidth={0.8} strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
      <text x={620} y={322} fontFamily={MONO} fontSize={10.5} fill={COOL}>
        SENTENCE-LEVEL STREAMING · SPEECH STARTS BEFORE THE ANSWER ENDS
      </text>

      {/* the red path: what a caller does to the agent */}
      <text x={964} y={378} textAnchor="end" fontFamily={MONO} fontSize={11} letterSpacing="0.14em" fill={SIGNAL}>
        BARGE-IN
      </text>
      <path
        d="M 980 400 L 980 460 L 134 460 L 134 268"
        fill="none"
        stroke={SIGNAL}
        strokeWidth={1.5}
        strokeDasharray="7 5"
        vectorEffect="non-scaling-stroke"
      />
      <polyline points="128,278 134,266 140,278" fill="none" stroke={SIGNAL} strokeWidth={1.5} vectorEffect="non-scaling-stroke" />

      <Label
        x={44}
        y={512}
        title="Endpointing decides the turn"
        body="STT endpointing, not a fixed timer, closes the caller's turn — so a pause is not mistaken for a finished sentence."
      />
      <Label
        x={44}
        y={590}
        title="Cancellation is the feature"
        body="On barge-in the in-flight speak task is cancelled and a clear event stops Twilio's buffered audio mid-sentence."
      />
      <Label
        x={44}
        y={668}
        title="Every turn is timed"
        body="STT, LLM, TTS and end-to-end latency, average and p95, tagged with the provider and model that served them."
      />

      <circle cx={W - 62} cy={664} r={12} fill={SIGNAL} />
      <text x={W - 90} y={668} textAnchor="end" fontFamily={MONO} fontSize={11} fill={COOL}>
        THE INTERRUPTION PATH
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   02 — EcomBot: the model writes the sentence, the application owns the facts.
   ──────────────────────────────────────────────────────────────────────────── */

function EcomBotPlate() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="EcomBot diagram: a customer message is read by a fine-tuned Qwen model that extracts structured intent, while Python looks up orders, catalogue and returns policy; the reply is composed only from the looked-up facts.">
      <PlateTitle title="EcomBot — hybrid inference" note="Fig. 02" />

      <rect x={44} y={120} width={360} height={72} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={62} y={150} fontFamily={MONO} fontSize={10.5} fill={COOL}>SUPPORT MESSAGE</text>
      <text x={62} y={176} fontFamily={SANS} fontSize={19} fontWeight={800} fill={INK}>Where is my order?</text>

      <path d="M 224 192 L 224 252" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <polyline points="218,242 224,254 230,242" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />

      <rect x={44} y={268} width={452} height={138} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={62} y={300} fontFamily={MONO} fontSize={10.5} fill={COOL}>FINE-TUNED · LORA / PEFT</text>
      <text x={62} y={332} fontFamily={SANS} fontSize={22} fontWeight={800} fill={INK}>Qwen 2.5 0.5B</text>
      <text x={62} y={362} fontFamily={MONO} fontSize={11} fill={COOL}>385 support conversations · orders, returns, refunds</text>
      <text x={62} y={386} fontFamily={MONO} fontSize={11} fill={INK}>&#123; intent: order_status, order: … &#125;</text>

      <text x={W - 44} y={300} textAnchor="end" fontFamily={MONO} fontSize={11} letterSpacing="0.14em" fill={COOL}>
        DETERMINISTIC LANE
      </text>
      <rect x={556} y={268} width={520} height={138} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      {["Orders", "Catalogue", "Returns policy"].map((row, i) => (
        <g key={row}>
          <text x={580} y={306 + i * 30} fontFamily={MONO} fontSize={11.5} fill={COOL}>
            {String(i + 1).padStart(2, "0")}
          </text>
          <text x={616} y={306 + i * 30} fontFamily={MONO} fontSize={12.5} fill={INK}>
            {row}
          </text>
          <line x1={580} y1={316 + i * 30} x2={1052} y2={316 + i * 30} stroke={RULE} vectorEffect="non-scaling-stroke" />
        </g>
      ))}

      <path d="M 496 337 L 548 337" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <polyline points="538,331 550,337 538,343" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <text x={522} y={326} textAnchor="middle" fontFamily={MONO} fontSize={10} fill={COOL}>looks up</text>

      <path d="M 224 436 L 224 502" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <path d="M 816 436 L 816 502" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <path d="M 224 502 L 816 502" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <path d="M 520 502 L 520 546" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <polyline points="514,536 520,548 526,536" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />

      <rect x={324} y={562} width={392} height={92} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={344} y={594} fontFamily={MONO} fontSize={10.5} fill={COOL}>COMPOSED</text>
      <text x={344} y={622} fontFamily={SANS} fontSize={19} fontWeight={800} fill={INK}>Reply, from the facts</text>
      <text x={344} y={644} fontFamily={MONO} fontSize={10.5} fill={COOL}>the model never states an unchecked fact</text>

      <path d="M 520 654 L 520 700 L 1060 700 L 1060 596 L 1052 596" fill="none" stroke={RULE} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />

      <line x1={44} y1={716} x2={W - 44} y2={716} stroke={RULE} vectorEffect="non-scaling-stroke" />
      <text x={44} y={748} fontFamily={MONO} fontSize={11} fill={COOL}>
        FACTS COME FROM THE LOOKUP, NOT THE WEIGHTS
      </text>
      <text x={W - 44} y={748} textAnchor="end" fontFamily={MONO} fontSize={11} fill={COOL}>
        0.5B PARAMETERS, ON PURPOSE
      </text>
      <circle cx={W - 62} cy={140} r={12} fill={SIGNAL} />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   03 — Local First Notes: three processes, one definition, no dependencies.
   ──────────────────────────────────────────────────────────────────────────── */

function LocalFirstPlate() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Local First Notes diagram: the iPhone app and the widget extension are separate processes sharing one type definition from a local Swift Package, persisting to a SwiftData store in an App Group, with CloudKit reconciliation when the network allows.">
      <PlateTitle title="Local First Notes — three processes" note="Fig. 03" />

      <rect x={80} y={130} width={360} height={140} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={100} y={162} fontFamily={MONO} fontSize={10.5} fill={COOL}>PROCESS 01</text>
      <text x={100} y={196} fontFamily={SANS} fontSize={20} fontWeight={800} fill={INK}>The app</text>
      <text x={100} y={224} fontFamily={MONO} fontSize={11} fill={COOL}>SwiftUI · MVVM</text>
      <text x={100} y={246} fontFamily={MONO} fontSize={11} fill={COOL}>Clean Architecture</text>

      <rect x={680} y={130} width={360} height={140} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={700} y={162} fontFamily={MONO} fontSize={10.5} fill={COOL}>PROCESS 02</text>
      <text x={700} y={196} fontFamily={SANS} fontSize={20} fontWeight={800} fill={INK}>Widget extension</text>
      <text x={700} y={224} fontFamily={MONO} fontSize={11} fill={COOL}>WidgetKit</text>
      <text x={700} y={246} fontFamily={MONO} fontSize={11} fill={COOL}>separate container</text>

      <path d="M 260 270 L 260 342 L 456 342" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <path d="M 860 270 L 860 342 L 684 342" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />

      <rect x={400} y={316} width={340} height={66} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={570} y={344} textAnchor="middle" fontFamily={SANS} fontSize={19} fontWeight={800} fill={INK}>
        Shared models
      </text>
      <text x={570} y={368} textAnchor="middle" fontFamily={MONO} fontSize={10.5} fill={COOL}>
        a local Swift Package
      </text>

      <path d="M 570 382 L 570 464" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <polyline points="564,454 570,466 576,454" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />

      <rect x={300} y={480} width={540} height={150} fill="none" stroke={INK} strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
      <text x={320} y={512} fontFamily={MONO} fontSize={10.5} fill={COOL}>APP GROUP · SHARED CONTAINER</text>
      <text x={320} y={546} fontFamily={SANS} fontSize={20} fontWeight={800} fill={INK}>SwiftData store</text>
      <text x={320} y={576} fontFamily={MONO} fontSize={11} fill={INK}>offline writes land here first</text>
      <text x={320} y={600} fontFamily={MONO} fontSize={11} fill={COOL}>reconciled with CloudKit when it can be</text>

      <path d="M 1040 480 L 1040 340 L 1048 340" fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="7 5" vectorEffect="non-scaling-stroke" />
      <circle cx={1040} cy={480} r={5} fill={SIGNAL} />
      <text x={1024} y={536} textAnchor="end" fontFamily={MONO} fontSize={11} letterSpacing="0.14em" fill={SIGNAL}>
        CLOUDKIT SYNC
      </text>

      <text x={80} y={614} fontFamily={MONO} fontSize={11} fill={COOL}>PROCESS 03</text>
      <text x={80} y={652} fontFamily={SANS} fontSize={20} fontWeight={800} fill={INK}>BackgroundTasks</text>
      <text x={80} y={680} fontFamily={MONO} fontSize={11} fill={COOL}>refresh with the app closed</text>
      <path d="M 236 656 L 292 656" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />
      <polyline points="282,650 294,656 282,662" fill="none" stroke={INK} vectorEffect="non-scaling-stroke" />

      <line x1={44} y1={722} x2={W - 44} y2={722} stroke={RULE} vectorEffect="non-scaling-stroke" />
      <text x={44} y={754} fontFamily={SERIF} fontSize={16} fontStyle="italic" fill={INK}>
        Zero third-party dependencies — the whole graph is Apple&rsquo;s.
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   04 — Marketplace: one route type, four ways in.
   ──────────────────────────────────────────────────────────────────────────── */

function MarketplacePlate() {
  const layers = [
    ["App surface", "SwiftUI · Observation · async/await", "01"],
    ["Catalog & search", "paginated lists, lifecycle-bound cancellation", "02"],
    ["Commerce flow", "cart · checkout · order tracking · wishlist", "03"],
    ["System surfaces", "WidgetKit · Core Spotlight · App Groups", "04"],
    ["Backend", "Firebase Auth · Firestore · Analytics · Crashlytics · FCM", "05"],
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Marketplace diagram: five stacked layers from the SwiftUI app surface through pagination, the commerce flow and native iOS surfaces down to Firebase, with a red route shown resolving into the same typed destination from a push notification, a widget and a Spotlight result.">
      <PlateTitle title="Marketplace — one destination" note="Fig. 04" />

      {layers.map(([name, body, no], i) => {
        const y = 128 + i * 84;
        return (
          <g key={name}>
            <rect x={44} y={y} width={1032} height={64} fill="none" stroke={INK} strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <rect x={44} y={y} width={5} height={64} fill={INK} />
            <text x={72} y={y + 39} fontFamily={MONO} fontSize={12} fill={COOL}>{no}</text>
            <text x={120} y={y + 40} fontFamily={SANS} fontSize={20} fontWeight={800} fill={INK}>{name}</text>
            <text x={W - 68} y={y + 39} textAnchor="end" fontFamily={MONO} fontSize={11.5} fill={COOL}>{body}</text>
          </g>
        );
      })}

      <path d="M 404 140 L 404 96 L 244 96" fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="7 5" vectorEffect="non-scaling-stroke" />
      <path d="M 640 140 L 640 96 L 800 96" fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="7 5" vectorEffect="non-scaling-stroke" />

      <text x={244} y={70} textAnchor="middle" fontFamily={MONO} fontSize={10.5} fill={SIGNAL}>PUSH NOTIFICATION</text>
      <text x={800} y={70} textAnchor="middle" fontFamily={MONO} fontSize={10.5} fill={SIGNAL}>WIDGET TAP</text>
      <text x={544} y={112} textAnchor="middle" fontFamily={MONO} fontSize={10.5} fill={SIGNAL}>SPOTLIGHT RESULT</text>
      <circle cx={544} cy={140} r={5} fill={SIGNAL} />
      <text x={544} y={78} textAnchor="middle" fontFamily={MONO} fontSize={10.5} fill={SIGNAL}>TYPED ROUTE</text>
      <path d="M 544 84 L 544 134" fill="none" stroke={SIGNAL} strokeWidth={1.5} strokeDasharray="7 5" vectorEffect="non-scaling-stroke" />

      <line x1={44} y1={576} x2={W - 44} y2={576} stroke={RULE} vectorEffect="non-scaling-stroke" />
      <text x={44} y={616} fontFamily={SERIF} fontSize={17} fill={INK}>
        Four entry points resolve to one destination value, so they cannot disagree about where a link goes.
      </text>
      <text x={44} y={664} fontFamily={MONO} fontSize={11} fill={COOL}>
        DEEP-LINK HANDLING WRITTEN ONCE
      </text>
      <text x={W - 44} y={664} textAnchor="end" fontFamily={MONO} fontSize={11} fill={COOL}>
        NOT DEPLOYED PUBLICLY
      </text>

      <text x={44} y={726} fontFamily={MONO} fontSize={11} fill={COOL}>
        NO WEB VIEWS — EVERY SURFACE IS NATIVE
      </text>
    </svg>
  );
}

export const plates: Record<PlateName, () => React.JSX.Element> = {
  "voice-flow": VoiceFlowPlate,
  "ecom-bot": EcomBotPlate,
  "local-first": LocalFirstPlate,
  marketplace: MarketplacePlate,
};

export function Plate({
  name,
  className,
  variant = "full",
}: {
  name: PlateName;
  className?: string;
  /** `compact` drops the pannable frame and scales the whole plate to fit. */
  variant?: "full" | "compact";
}) {
  const Render = plates[name];

  if (variant === "compact") {
    return (
      <div className={`overflow-hidden ${className ?? ""}`}>
        <Render />
      </div>
    );
  }

  return (
    <Frame className={className}>
      <Render />
    </Frame>
  );
}
