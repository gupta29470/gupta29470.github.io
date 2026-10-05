/**
 * The VoiceFlow call path, drawn to match the Codewalk architecture plate.
 *
 * The project's own `architecture.html` is a dark, rounded, Tailwind-flavoured
 * page that fights this site's paper-and-ink register. This is the same system
 * redrawn in the site's language, so the two project plates read as one set. The
 * facts are the project's own: one WebSocket and pipeline per call, four stages,
 * tool calls that land on the dashboard, and a red barge-in path, which is the
 * thing worth looking at.
 *
 * The instrumentation panel sits beside the pipeline rather than under it: the
 * first draft stacked everything and came out 1769px tall in the sheet, which is
 * a scroll to read rather than a diagram.
 */

export function VoiceFlowArchitecture({
  className,
  compact,
}: {
  className?: string;
  /** Scale the whole drawing down instead of holding a readable width. */
  compact?: boolean;
}) {
  return (
    <div className={className}>
      <style>{`
        .vf-arch { fill: var(--color-ink); }
        .vf-arch .box   { fill: #faf8f3; stroke: var(--color-ink); stroke-width: 1.5; }
        .vf-arch .inbox { fill: #f0ece3; stroke: #9c968a; stroke-width: 1; }
        .vf-arch .muted { fill: var(--color-cool); stroke: var(--color-cool); stroke-width: 1; }
        .vf-arch .h  { font-family: var(--font-mono); font-size: 12px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; fill: var(--color-ink); }
        .vf-arch .hs { font-family: var(--font-mono); font-size: 9px; letter-spacing: 1.2px; text-transform: uppercase; fill: var(--color-cool); }
        .vf-arch .t  { font-family: var(--font-sans); font-size: 17px; font-weight: 800; fill: var(--color-ink); }
        .vf-arch .ts { font-family: var(--font-sans); font-size: 14px; font-weight: 800; fill: var(--color-ink); }
        .vf-arch .s  { font-family: var(--font-mono); font-size: 9.5px; fill: #6a6862; }
        .vf-arch .tag  { font-family: var(--font-mono); font-size: 9.5px; fill: var(--color-cool); }
        .vf-arch .tagr { font-family: var(--font-mono); font-size: 9.5px; fill: var(--color-signal); }
        .vf-arch .ln  { stroke: var(--color-ink); stroke-width: 1.5; fill: none; marker-end: url(#vf-ar); }
        .vf-arch .lnr { stroke: var(--color-signal); stroke-width: 1.5; fill: none; stroke-dasharray: 7 5; marker-end: url(#vf-arr); }
      `}</style>

      <svg
        viewBox="0 0 1240 1150"
        className="vf-arch block h-auto w-full"
        style={compact ? undefined : { minWidth: "1200px" }}
        role="img"
        aria-label="VoiceFlow call path: the caller's phone over PSTN to Twilio Media Streams, into a FastAPI WebSocket where four stages run per call, the media stream gateway, Deepgram streaming speech to text, the Grok or Kimi agent with tools, and Cartesia or ElevenLabs speech back down the line. A red dashed barge-in path cancels the in-flight speech and clears Twilio's buffer when the caller interrupts. Metrics and SQLite storage sit alongside the pipeline, and the Next.js dashboard starts calls and reads the results back."
      >
        <defs>
          <marker
            id="vf-ar"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-ink)" />
          </marker>
          <marker
            id="vf-arr"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-signal)" />
          </marker>
        </defs>

        <text className="h" x={32} y={34}>
          VoiceFlow · the call path
        </text>
        <line x1={32} y1={48} x2={1208} y2={48} stroke="var(--color-rule)" />
        <text className="hs" x={1208} y={34} textAnchor="end">
          one websocket and pipeline per call
        </text>

        {/* ── The caller ─────────────────────────────────────────────────── */}
        <rect className="box" x={32} y={64} width={1176} height={62} />
        <text className="h" x={48} y={90}>
          Edge
        </text>
        <text className="t" x={48} y={116}>
          Caller phone
        </text>
        <text className="s" x={196} y={116}>
          PSTN audio · can interrupt at any moment, which is the problem this system is built around
        </text>

        <path className="ln" d="M 620 126 L 620 158" />
        <text className="tag" x={634} y={148}>
          PSTN
        </text>

        {/* ── Telephony ──────────────────────────────────────────────────── */}
        <rect className="box" x={32} y={162} width={1176} height={62} />
        <text className="h" x={48} y={188}>
          Telephony
        </text>
        <text className="t" x={48} y={214}>
          Twilio Media Streams
        </text>
        <text className="s" x={264} y={214}>
          8 kHz mu-law, base64 JSON over one WebSocket per call
        </text>

        <path className="ln" d="M 620 224 L 620 256" />
        <text className="tag" x={634} y={246}>
          WSS /twilio/stream
        </text>

        {/* ── The backend ────────────────────────────────────────────────── */}
        <rect className="box" x={32} y={260} width={1176} height={500} />
        <text className="h" x={48} y={288}>
          Backend · FastAPI
        </text>
        <text className="hs" x={212} y={288}>
          concurrent calls are isolated async tasks
        </text>

        {/* stage 1 */}
        <rect className="inbox" x={48} y={302} width={800} height={46} />
        <text className="ts" x={64} y={330}>
          media_stream.py
        </text>
        <text className="s" x={224} y={330}>
          accepts the socket, decodes frames, wires send, clear, hangup and transfer
        </text>
        <text className="tag" x={832} y={330} textAnchor="end">
          01 · GATEWAY
        </text>

        <path className="ln" d="M 448 348 L 448 374" />

        {/* stage 2 */}
        <rect className="inbox" x={48} y={378} width={800} height={72} />
        <text className="h" x={64} y={404}>
          Speech to text
        </text>
        <text className="ts" x={64} y={430}>
          Deepgram streaming
        </text>
        <text className="s" x={264} y={430}>
          nova-2-phonecall for English, nova-2 for Hindi and Hinglish
        </text>
        <text className="tag" x={832} y={404} textAnchor="end">
          02 · STT
        </text>
        <text className="s" x={64} y={444}>
          interim results drive barge-in · endpointing decides the end of a turn
        </text>

        <path className="ln" d="M 448 450 L 448 476" />
        <text className="tag" x={462} y={468}>
          transcript
        </text>

        {/* stage 3 */}
        <rect className="inbox" x={48} y={480} width={800} height={88} />
        <text className="h" x={64} y={506}>
          Agent
        </text>
        <text className="ts" x={64} y={532}>
          Grok (xAI), Kimi as fallback
        </text>
        <text className="s" x={312} y={532}>
          streams sentences so speech starts before the answer ends
        </text>
        <text className="tag" x={832} y={506} textAnchor="end">
          03 · LLM
        </text>
        <text className="s" x={64} y={556}>
          log_promise_to_pay · qualify_lead · lookup_* · escalate_to_human · end_call
        </text>

        <path className="ln" d="M 448 568 L 448 594" />
        <text className="tag" x={462} y={586}>
          sentences
        </text>

        {/* stage 4 */}
        <rect className="inbox" x={48} y={598} width={800} height={72} />
        <text className="h" x={64} y={624}>
          Speech out
        </text>
        <text className="ts" x={64} y={650}>
          Cartesia Sonic 3.5 · ElevenLabs Flash v2.5
        </text>
        <text className="tag" x={832} y={624} textAnchor="end">
          04 · TTS
        </text>
        <text className="s" x={64} y={664}>
          sentence level stream, synthesised to 8 kHz mu-law and returned down the same call
        </text>

        {/* ── Alongside the pipeline ─────────────────────────────────────── */}
        <rect className="inbox" x={872} y={302} width={320} height={368} />
        <text className="h" x={888} y={330}>
          Alongside
        </text>

        <text className="ts" x={888} y={368}>
          metrics.py
        </text>
        <text className="s" x={888} y={390}>
          per turn STT, LLM, TTS and
        </text>
        <text className="s" x={888} y={406}>
          end-to-end · average and p95
        </text>
        <text className="s" x={888} y={422}>
          tagged with the provider and
        </text>
        <text className="s" x={888} y={438}>
          model that served the turn
        </text>

        <line x1={888} y1={462} x2={1176} y2={462} stroke="var(--color-rule)" />
        <text className="ts" x={888} y={492}>
          storage.py
        </text>
        <text className="s" x={888} y={514}>
          SQLite: transcripts, captures
        </text>
        <text className="s" x={888} y={530}>
          and call context, which is what
        </text>
        <text className="s" x={888} y={546}>
          the call detail page reads back
        </text>

        <line x1={888} y1={570} x2={1176} y2={570} stroke="var(--color-rule)" />
        <text className="ts" x={888} y={600}>
          session.py
        </text>
        <text className="s" x={888} y={622}>
          conversation state and the
        </text>
        <text className="s" x={888} y={638}>
          captures a tool call produced
        </text>

        {/* ── The one red path ───────────────────────────────────────────── */}
        <text className="tagr" x={1236} y={296} textAnchor="end">
          BARGE-IN
        </text>
        <path className="lnr" d="M 1204 388 L 1232 388 L 1232 612 L 1212 612" />
        <text className="tagr" x={832} y={692} textAnchor="end">
          the caller talks, the in-flight speech task is cancelled and Twilio&apos;s buffer cleared
        </text>

        <path className="ln" d="M 620 760 L 620 792" />
        <text className="tag" x={634} y={782}>
          REST /api/*
        </text>

        {/* ── The dashboard ──────────────────────────────────────────────── */}
        <rect className="box" x={32} y={796} width={1176} height={62} />
        <text className="h" x={48} y={822}>
          Frontend · Next.js
        </text>
        <text className="t" x={48} y={848}>
          Dashboard
        </text>
        <text className="s" x={240} y={848}>
          starts calls · live transcript · captured results · latency · language and voice picker
        </text>

        {/* ── Design notes ───────────────────────────────────────────────── */}
        <line x1={32} y1={890} x2={1208} y2={890} stroke="var(--color-rule)" />
        <text className="h" x={32} y={918}>
          Design notes
        </text>

        {[
          {
            x: 32,
            head: "Cascaded, not black box",
            lines: [
              "Every stage is a swappable",
              "adapter, so each hop stays",
              "measurable and replaceable.",
            ],
          },
          {
            x: 336,
            head: "Barge-in is the feature",
            lines: [
              "Interim transcripts cancel",
              "the in-flight speech task and",
              "send Twilio clear.",
            ],
          },
          {
            x: 640,
            head: "Tools land on the dashboard",
            lines: [
              "A promise to pay or a qualified",
              "lead is written as structured",
              "data, not left in a recording.",
            ],
          },
          {
            x: 944,
            head: "Demo scale, plainly",
            lines: [
              "Concurrency is per-process",
              "async pipelines. Production",
              "needs Postgres and dial queues.",
            ],
          },
        ].map((note) => (
          <g key={note.head}>
            <rect className="muted" x={note.x} y={948} width={7} height={7} />
            <text className="t" x={note.x} y={976}>
              {note.head}
            </text>
            {note.lines.map((line, i) => (
              <text key={line} className="s" x={note.x} y={1000 + i * 16}>
                {line}
              </text>
            ))}
          </g>
        ))}

        <line x1={32} y1={1080} x2={1208} y2={1080} stroke="var(--color-rule)" />
        <text className="s" x={32} y={1104}>
          Solid is the call path. Red dashed is what the caller can do to it.
        </text>
        <text className="s" x={1208} y={1104} textAnchor="end">
          Demo scale, not production scale.
        </text>
      </svg>
    </div>
  );
}
