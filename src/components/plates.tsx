/**
 * Project plates.
 *
 * These are drawn, not photographed. A portfolio that shows fabricated
 * screenshots of its own projects is worse than one that shows nothing, so each
 * plate is a schematic of the system as described in `content/work.ts`: the
 * boxes are components that exist and the arrows are the paths data actually
 * takes. The single red element on each plate marks the thing that made the
 * project worth building.
 *
 * Both share one drawing language: hairline rules, mono labels, 1120 wide.
 */

import type { PlateName } from "@/content/work";
import { CodewalkArchitecture } from "./codewalk-architecture";

const SANS = "var(--font-archivo), system-ui, sans-serif";
const MONO = "var(--font-plex-mono), ui-monospace, monospace";

const INK = "#141414";
const RULE = "#d8d3c8";
const SIGNAL = "#d93b2b";
const COOL = "#8a8781";

const W = 1120;
const H = 780;

/**
 * A plate is drawn at a fixed readable width and panned horizontally inside its
 * own frame. Scaling a schematic down to phone width makes every label
 * illegible, and letting it size to the viewport pushes the page sideways.
 */
const FRAME = "w-full overflow-x-auto";

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${FRAME} ${className ?? ""}`}>
      <div className="w-[600px] sm:w-[720px]">{children}</div>
    </div>
  );
}

/**
 * A dense, wide drawing needs a much larger frame than a simple one. At a
 * portrait aspect the diagram fits the sheet's width and is read by scrolling
 * the page; at 1780 x 1265 it is small enough that squeezing it into the sheet
 * would make every label unreadable. The frame is what decides that, so it is a
 * property of the plate.
 */
function WideFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-[1240px] lg:w-[1500px]">{children}</div>
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
      <text
        x={W - 44}
        y={62}
        textAnchor="end"
        fontFamily={MONO}
        fontSize={11}
        letterSpacing="0.16em"
        fill={COOL}
      >
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
}: {
  x: number;
  y: number;
  title: string;
  body: string;
}) {
  return (
    <>
      <text
        x={x}
        y={y}
        fontFamily={SANS}
        fontSize={21}
        fontWeight={800}
        fill={INK}
        letterSpacing="-0.01em"
      >
        {title}
      </text>
      <text x={x} y={y + 24} fontFamily={MONO} fontSize={11.5} fill={COOL}>
        {body}
      </text>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   02 — VoiceFlow: the cascaded streaming pipeline, and the barge-in path.
   ──────────────────────────────────────────────────────────────────────────── */

function VoiceFlowPlate() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="VoiceFlow pipeline diagram: a phone call is streamed through Deepgram speech recognition, a Grok or Kimi language model with function calling, and Cartesia or ElevenLabs speech synthesis back to the caller, with a barge-in path that cancels the agent mid-sentence."
    >
      <PlateTitle title="VoiceFlow · the turn" note="Fig. 02" />

      <text x={44} y={156} fontFamily={MONO} fontSize={11} letterSpacing="0.14em" fill={COOL}>
        CARRIER · 8 KHZ MULAW
      </text>
      <text
        x={W - 44}
        y={156}
        textAnchor="end"
        fontFamily={MONO}
        fontSize={11}
        letterSpacing="0.14em"
        fill={COOL}
      >
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

      <rect x={604} y={300} width={472} height={34} fill="none" stroke={INK} strokeWidth={0.8} strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
      <text x={620} y={322} fontFamily={MONO} fontSize={10.5} fill={COOL}>
        SENTENCE-LEVEL STREAMING · SPEECH STARTS BEFORE THE ANSWER ENDS
      </text>

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
        body="STT endpointing, not a fixed timer, closes the caller's turn, so a pause is not mistaken for a finished sentence."
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

export const plates: Record<
  PlateName,
  React.ComponentType<{ className?: string; compact?: boolean }>
> = {
  // Codewalk's plate is the platform architecture diagram, drawn for the repo.
  // The retrieval schematic it replaced is in the git history.
  codewalk: CodewalkArchitecture,
  "voice-flow": VoiceFlowPlate,
};

const WIDE: PlateName[] = ["codewalk"];

/**
 * Whether this plate is worth showing as a hover thumbnail. A dense drawing
 * scaled into a 19rem box is a grey smudge: it says "there is a diagram" and
 * nothing else. Plates that need the wide frame are read in the sheet instead.
 */
export function hasThumbnail(name: PlateName): boolean {
  return !WIDE.includes(name);
}

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
    // A preview is a signpost, not a reading surface: scale the drawing to the
    // box rather than holding a readable width and spilling past the page.
    return (
      <div className={`overflow-hidden ${className ?? ""}`}>
        <Render compact />
      </div>
    );
  }

  return WIDE.includes(name) ? (
    <WideFrame>
      <Render />
    </WideFrame>
  ) : (
    <Frame className={className}>
      <Render />
    </Frame>
  );
}
