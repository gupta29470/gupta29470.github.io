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
 * A plate is drawn at a fixed readable width and panned horizontally inside its
 * own frame. Scaling a schematic down to phone width makes every label
 * illegible, and letting it size to the viewport pushes the page sideways.
 */
const FRAME = "w-full overflow-x-auto";

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${FRAME} ${className ?? ""}`}>
      <div className="min-w-[600px]">{children}</div>
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
   01 — Codewalk: how a question becomes an answer.
   ──────────────────────────────────────────────────────────────────────────── */

type Step = { no: string; title: string; rows: string[]; note: string; y: number };

function CodewalkPlate() {
  const steps: Step[] = [
    {
      no: "01",
      title: "Expand the question",
      rows: ["2 to 4 angles, one call", "skipped if the planner already wrote an angle"],
      note: "1 PROVIDER CALL",
      y: 150,
    },
    {
      no: "02",
      title: "Gather evidence",
      rows: ["symbol walk over the graph", "batched vector search, one embedding request"],
      note: "NO MODEL CALLS",
      y: 330,
    },
    {
      no: "03",
      title: "Rank, and that is the only filter",
      rows: ["every candidate scored 0 to 10 in one call", "a failed ranking keeps everything"],
      note: "1 PROVIDER CALL",
      y: 510,
    },
    {
      no: "04",
      title: "Answer from the best few",
      rows: ["with citations back to file and symbol"],
      note: "1 PROVIDER CALL",
      y: 690,
    },
  ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      role="img"
      aria-label="Codewalk retrieval diagram: a question is expanded into angles, evidence is gathered by a symbol walk and batched vector search with no model calls, every candidate is ranked once, and the answer is written from the best few. The ranking is the only filter, and a failed ranking keeps everything."
    >
      <PlateTitle title="Codewalk · question to answer" note="Fig. 01" />

      {/* the pipeline rail, numbered top to bottom */}
      <line x1={62} y1={140} x2={62} y2={752} stroke={INK} vectorEffect="non-scaling-stroke" />

      {steps.map((step, index) => {
        const next = steps[index + 1];
        return (
          <g key={step.no}>
            <circle cx={62} cy={step.y + 30} r={9} fill={INK} />
            <text
              x={62}
              y={step.y + 34}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize={9}
              fill="#f5f2eb"
            >
              {index + 1}
            </text>

            <text x={96} y={step.y + 20} fontFamily={MONO} fontSize={10.5} fill={COOL}>
              {step.no}
            </text>
            <text x={96} y={step.y + 52} fontFamily={SANS} fontSize={23} fontWeight={800} fill={INK} letterSpacing="-0.01em">
              {step.title}
            </text>
            {step.rows.map((row, rowIndex) => (
              <text
                key={row}
                x={96}
                y={step.y + 78 + rowIndex * 21}
                fontFamily={MONO}
                fontSize={11.5}
                fill={COOL}
              >
                {row}
              </text>
            ))}

            <text
              x={W - 44}
              y={step.y + 34}
              textAnchor="end"
              fontFamily={MONO}
              fontSize={11}
              letterSpacing="0.14em"
              fill={index === 2 ? SIGNAL : COOL}
            >
              {step.note}
            </text>

            {next ? (
              <path
                d={`M 62 ${step.y + 39} L 62 ${next.y + 30}`}
                fill="none"
                stroke={RULE}
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            ) : null}
          </g>
        );
      })}

      <line x1={44} y1={752} x2={W - 44} y2={752} stroke={RULE} vectorEffect="non-scaling-stroke" />
      <text x={44} y={774} fontFamily={SERIF} fontSize={15} fontStyle="italic" fill={INK}>
        The ranking is the only step that drops evidence, and a failed ranking drops nothing.
      </text>
    </svg>
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

export const plates: Record<PlateName, () => React.JSX.Element> = {
  codewalk: CodewalkPlate,
  "voice-flow": VoiceFlowPlate,
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
