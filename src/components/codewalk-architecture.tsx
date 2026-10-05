/**
 * The Codewalk platform architecture, as a hand-maintained schematic.
 *
 * This is the diagram the project team drew for the repo, converted from a
 * standalone HTML file into a component for three reasons: the fonts and colour
 * tokens come from the site instead of a second Google Fonts request, the CSS is
 * scoped under `.cw-arch` so its generic class names cannot leak into the page,
 * and it renders as part of the document rather than inside an iframe.
 *
 * Everything below the title is drawing instructions and labels. If the platform
 * changes, this file changes with it.
 */

export function CodewalkArchitecture({
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
        .cw-arch { fill: var(--color-ink); }
        .cw-arch .layer { fill: #faf8f3; stroke: var(--color-ink); stroke-width: 1.5; }
        .cw-arch .sub   { fill: #f0ece3; stroke: #9c968a; stroke-width: 1; }
        .cw-arch .flow  { fill: #faf8f3; stroke: var(--color-ink); stroke-width: 1.25; }
        .cw-arch .flowq { fill: #f0ece3; stroke: #9c968a; stroke-width: 1; }
        .cw-arch .flowr { fill: #faf8f3; stroke: var(--color-signal); stroke-width: 1.25; }
        .cw-arch .ext   { fill: var(--color-paper); stroke: var(--color-cool); stroke-width: 1; stroke-dasharray: 4 3; }
        .cw-arch .ll  { font-family: var(--font-mono); font-size: 11px; font-weight: 500; letter-spacing: 1.8px; text-transform: uppercase; fill: var(--color-ink); }
        .cw-arch .lls { font-family: var(--font-mono); font-size: 9px; letter-spacing: 1.2px; text-transform: uppercase; fill: var(--color-cool); }
        .cw-arch .st  { font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; fill: var(--color-ink); }
        .cw-arch .stq { font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; fill: #3a3835; }
        .cw-arch .str { font-family: var(--font-mono); font-size: 11.5px; font-weight: 500; fill: var(--color-signal); }
        .cw-arch .ss  { font-family: var(--font-mono); font-size: 9.5px; fill: #6a6862; }
        .cw-arch .ssr { font-family: var(--font-mono); font-size: 9.5px; fill: var(--color-signal); }
        .cw-arch .pill { fill: var(--color-paper); stroke: #b9b3a6; stroke-width: 1; }
        .cw-arch .pt  { font-family: var(--font-mono); font-size: 9.5px; fill: #3a3835; }
        .cw-arch .et  { font-family: var(--font-mono); font-size: 10.5px; font-weight: 500; fill: #4a4844; }
        .cw-arch .es  { font-family: var(--font-mono); font-size: 9px; fill: #7d7a74; }
        .cw-arch .ln  { stroke: var(--color-ink); stroke-width: 1.5; fill: none; marker-end: url(#cw-ar); }
        .cw-arch .lnr { stroke: var(--color-signal); stroke-width: 1.5; fill: none; marker-end: url(#cw-arr); }
        .cw-arch .lne { stroke: var(--color-cool); stroke-width: 1; fill: none; stroke-dasharray: 4 3; marker-end: url(#cw-arc); }
        .cw-arch .cap  { font-family: var(--font-mono); font-size: 9px; letter-spacing: 1px; fill: var(--color-cool); }
        .cw-arch .capr { font-family: var(--font-mono); font-size: 9px; letter-spacing: 1px; fill: var(--color-signal); }
      `}</style>

      <svg
        viewBox="0 0 1780 1265"
        className="cw-arch block h-auto w-full"
        style={compact ? undefined : { minWidth: "1240px" }}
        role="img"
        aria-label="Codewalk platform architecture: the Next.js frontend, the Go edge gateway, the FastAPI routes, then four flows — indexing, chat, review and query — each running to its own end, over shared state in Postgres, Redis, local disk and a graph cache."
      >
        <defs>
          <marker
            id="cw-ar"
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
            id="cw-arr"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-signal)" />
          </marker>
          <marker
            id="cw-arc"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="5.5"
            markerHeight="5.5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--color-cool)" />
          </marker>
        </defs>

        {/* ── 1 · Frontend ─────────────────────────────────────────────── */}
        <rect className="layer" x={30} y={46} width={1720} height={136} />
        <text className="ll" x={48} y={72}>
          Frontend
        </text>
        <text className="lls" x={150} y={72}>
          Next.js · codewalk_web · Clerk session in the browser
        </text>

        <rect className="sub" x={42} y={84} width={200} height={82} />
        <text className="st" x={54} y={108}>
          Landing
        </text>
        <text className="ss" x={54} y={126}>
          / · /features /blog /docs
        </text>
        <text className="ss" x={54} y={142}>
          public site, no auth
        </text>

        <rect className="sub" x={250} y={84} width={200} height={82} />
        <text className="st" x={262} y={108}>
          Auth
        </text>
        <text className="ss" x={262} y={126}>
          /sign-in /sign-up
        </text>
        <text className="ss" x={262} y={142}>
          Clerk · org picker
        </text>

        <rect className="sub" x={458} y={84} width={200} height={82} />
        <text className="st" x={470} y={108}>
          Dashboard
        </text>
        <text className="ss" x={470} y={126}>
          /app
        </text>
        <text className="ss" x={470} y={142}>
          repos · reviews · jobs · usage
        </text>

        <rect className="sub" x={666} y={84} width={200} height={82} />
        <text className="st" x={678} y={108}>
          Review view
        </text>
        <text className="ss" x={678} y={126}>
          /app/reviews/:id
        </text>
        <text className="ss" x={678} y={142}>
          live SSE progress · findings
        </text>

        <rect className="sub" x={874} y={84} width={200} height={82} />
        <text className="st" x={886} y={108}>
          Chat
        </text>
        <text className="ss" x={886} y={126}>
          /app/chat/:repoId
        </text>
        <text className="ss" x={886} y={142}>
          streaming answers · deltas
        </text>

        <rect className="sub" x={1082} y={84} width={200} height={82} />
        <text className="st" x={1094} y={108}>
          Agent
        </text>
        <text className="ss" x={1094} y={126}>
          /app/agent
        </text>
        <text className="ss" x={1094} y={142}>
          tool approvals · history
        </text>

        <rect className="sub" x={1290} y={84} width={200} height={82} />
        <text className="st" x={1302} y={108}>
          Code browse
        </text>
        <text className="ss" x={1302} y={126}>
          /app/repos/:id
        </text>
        <text className="ss" x={1302} y={142}>
          tree · files · symbols
        </text>

        <rect className="sub" x={1498} y={84} width={200} height={82} />
        <text className="st" x={1510} y={108}>
          Settings
        </text>
        <text className="ss" x={1510} y={126}>
          /app/settings
        </text>
        <text className="ss" x={1510} y={142}>
          BYOK keys · tokens · org
        </text>

        {/* ── 2 · Edge ─────────────────────────────────────────────────── */}
        <path className="ln" d="M 890 182 L 890 224" />

        <rect className="layer" x={30} y={228} width={1720} height={104} />
        <text className="ll" x={48} y={254}>
          Edge
        </text>
        <text className="lls" x={150} y={254}>
          the only internet-facing layer
        </text>

        <rect className="sub" x={48} y={266} width={200} height={52} />
        <text className="stq" x={62} y={288}>
          Caddy
        </text>
        <text className="ss" x={62} y={306}>
          TLS termination
        </text>

        <rect className="sub" x={264} y={266} width={1468} height={52} />
        <text className="stq" x={278} y={288}>
          Gateway ⟨Go⟩
        </text>
        <text className="ss" x={278} y={306}>
          verify Clerk session networklessly · default-deny route table · least-connections balance
          with active health checks · stateless — holds no Redis client and no limiter of its own
        </text>

        {/* ── 3 · Routes ───────────────────────────────────────────────── */}
        <path className="ln" d="M 890 332 L 890 372" />

        <rect className="layer" x={30} y={376} width={1720} height={152} />
        <text className="ll" x={48} y={402}>
          API routes
        </text>
        <text className="lls" x={164} y={402}>
          FastAPI · middleware (request id, metrics, RATE LIMIT, CORS) → router → service →
          repository
        </text>

        <text className="cap" x={48} y={424}>
          Indexing
        </text>
        <rect className="pill" x={48} y={430} width={120} height={26} />
        <text className="pt" x={58} y={447}>
          POST /jobs
        </text>
        <rect className="pill" x={176} y={430} width={120} height={26} />
        <text className="pt" x={186} y={447}>
          GET /jobs/:id
        </text>
        <rect className="pill" x={304} y={430} width={126} height={26} />
        <text className="pt" x={314} y={447}>
          /repos
        </text>

        <text className="cap" x={488} y={424}>
          Chat
        </text>
        <rect className="pill" x={488} y={430} width={132} height={26} />
        <text className="pt" x={498} y={447}>
          /agent/tasks
        </text>
        <rect className="pill" x={628} y={430} width={160} height={26} />
        <text className="pt" x={638} y={447}>
          /agent/tasks/:id/events
        </text>
        <rect className="pill" x={796} y={430} width={126} height={26} />
        <text className="pt" x={806} y={447}>
          /conversations
        </text>

        <text className="cap" x={940} y={424}>
          Review
        </text>
        <rect className="pill" x={940} y={430} width={126} height={26} />
        <text className="pt" x={950} y={447}>
          POST /reviews
        </text>
        <rect className="pill" x={1074} y={430} width={150} height={26} />
        <text className="pt" x={1084} y={447}>
          /reviews/:id/events
        </text>
        <rect className="pill" x={1232} y={430} width={150} height={26} />
        <text className="pt" x={1242} y={447}>
          /reviews/:id/findings
        </text>

        <text className="cap" x={1400} y={424}>
          Query
        </text>
        <rect className="pill" x={1400} y={430} width={150} height={26} />
        <text className="pt" x={1410} y={447}>
          /repos/:id/search
        </text>
        <rect className="pill" x={1558} y={430} width={90} height={26} />
        <text className="pt" x={1568} y={447}>
          /symbols
        </text>
        <rect className="pill" x={1656} y={430} width={82} height={26} />
        <text className="pt" x={1666} y={447}>
          /tree
        </text>

        <text className="cap" x={48} y={486}>
          Shared by every flow
        </text>
        <rect className="pill" x={228} y={470} width={126} height={26} />
        <text className="pt" x={238} y={487}>
          /org/members
        </text>
        <rect className="pill" x={362} y={470} width={100} height={26} />
        <text className="pt" x={372} y={487}>
          /tokens
        </text>
        <rect className="pill" x={470} y={470} width={120} height={26} />
        <text className="pt" x={480} y={487}>
          /llm/usage
        </text>
        <rect className="pill" x={598} y={470} width={132} height={26} />
        <text className="pt" x={608} y={487}>
          /guest/session
        </text>
        <rect className="pill" x={738} y={470} width={140} height={26} />
        <text className="pt" x={748} y={487}>
          /notifications
        </text>
        <rect className="pill" x={886} y={470} width={140} height={26} />
        <text className="pt" x={896} y={487}>
          /credentials
        </text>

        {/* the four-way spread */}
        <path className="ln" d="M 230 528 L 230 566" />
        <path className="ln" d="M 670 528 L 670 566" />
        <path className="ln" d="M 1110 528 L 1110 566" />
        <path className="ln" d="M 1550 528 L 1550 566" />
        <text className="cap" x={244} y={552}>
          async
        </text>
        <text className="cap" x={684} y={552}>
          async
        </text>
        <text className="cap" x={1124} y={552}>
          async
        </text>
        <text className="cap" x={1564} y={552}>
          sync
        </text>

        {/* ── 4 · The four flows ───────────────────────────────────────── */}
        <rect className="layer" x={30} y={570} width={400} height={60} />
        <text className="ll" x={48} y={596}>
          Indexing
        </text>
        <text className="lls" x={48} y={614}>
          repo added → published index
        </text>

        <rect className="layer" x={470} y={570} width={400} height={60} />
        <text className="ll" x={488} y={596}>
          Chat
        </text>
        <text className="lls" x={488} y={614}>
          question → streamed answer
        </text>

        <rect className="layer" x={910} y={570} width={400} height={60} />
        <text className="ll" x={928} y={596}>
          Review
        </text>
        <text className="lls" x={928} y={614}>
          commit range → findings
        </text>

        <rect className="layer" x={1350} y={570} width={400} height={60} />
        <text className="ll" x={1368} y={596}>
          Query
        </text>
        <text className="lls" x={1368} y={614}>
          question → code answers
        </text>

        {/* step 1 · the doorbell */}
        <path className="ln" d="M 230 630 L 230 668" />
        <path className="ln" d="M 670 630 L 670 668" />
        <path className="ln" d="M 1110 630 L 1110 668" />
        <path className="ln" d="M 1550 630 L 1550 668" />

        <rect className="flowq" x={30} y={672} width={400} height={76} />
        <text className="st" x={48} y={700}>
          Redis Stream
        </text>
        <text className="ss" x={48} y={718}>
          index_jobs · retry zset · DLQ
        </text>
        <text className="ss" x={48} y={734}>
          row + outbox commit together
        </text>

        <rect className="flowq" x={470} y={672} width={400} height={76} />
        <text className="st" x={488} y={700}>
          Redis Stream
        </text>
        <text className="ss" x={488} y={718}>
          agent_tasks
        </text>
        <text className="ss" x={488} y={734}>
          one consumer group per stream
        </text>

        <rect className="flowq" x={910} y={672} width={400} height={76} />
        <text className="st" x={928} y={700}>
          Redis Stream
        </text>
        <text className="ss" x={928} y={718}>
          review_tasks
        </text>
        <text className="ss" x={928} y={734}>
          shed at 100 deep, then 503
        </text>

        <rect className="flow" x={1350} y={672} width={400} height={76} />
        <text className="st" x={1368} y={700}>
          No queue
        </text>
        <text className="ss" x={1368} y={718}>
          synchronous — answered in the
        </text>
        <text className="ss" x={1368} y={734}>
          request, nothing is enqueued
        </text>

        {/* step 2 · the worker */}
        <path className="ln" d="M 230 748 L 230 786" />
        <path className="ln" d="M 670 748 L 670 786" />
        <path className="ln" d="M 1110 748 L 1110 786" />
        <path className="ln" d="M 1550 748 L 1550 786" />

        <rect className="flow" x={30} y={790} width={400} height={76} />
        <text className="st" x={48} y={818}>
          worker-indexer
        </text>
        <text className="ss" x={48} y={836}>
          clone → parse → build graph
        </text>
        <text className="ss" x={48} y={852}>
          under a per-repo lock
        </text>

        <rect className="flow" x={470} y={790} width={400} height={76} />
        <text className="st" x={488} y={818}>
          worker-agent
        </text>
        <text className="ss" x={488} y={836}>
          explicit state machine · 15 steps
        </text>
        <text className="ss" x={488} y={852}>
          authority re-checked per tool call
        </text>

        <rect className="flow" x={910} y={790} width={400} height={76} />
        <text className="st" x={928} y={818}>
          worker-review
        </text>
        <text className="ss" x={928} y={836}>
          2 slots per org · 4 batches
        </text>
        <text className="ss" x={928} y={852}>
          of 5 files · version fenced
        </text>

        <rect className="flow" x={1350} y={790} width={400} height={76} />
        <text className="st" x={1368} y={818}>
          retrieval ⟨codewalk-ai⟩
        </text>
        <text className="ss" x={1368} y={836}>
          search · symbols · blast radius
        </text>
        <text className="ss" x={1368} y={852}>
          via core_bridge, the only importer
        </text>

        {/* step 3 · the provider */}
        <path className="ln" d="M 230 866 L 230 904" />
        <path className="ln" d="M 670 866 L 670 904" />
        <path className="ln" d="M 1110 866 L 1110 904" />
        <path className="ln" d="M 1550 866 L 1550 904" />

        <rect className="ext" x={30} y={908} width={400} height={76} />
        <text className="et" x={48} y={936}>
          Embedding providers
        </text>
        <text className="es" x={48} y={954}>
          Jina / Voyage · BYOK per org
        </text>
        <text className="es" x={48} y={970}>
          10 req/min · key rotated after 3 failures
        </text>

        <rect className="ext" x={470} y={908} width={400} height={76} />
        <text className="et" x={488} y={936}>
          LLM providers
        </text>
        <text className="es" x={488} y={954}>
          BYOK · circuit breaker per
        </text>
        <text className="es" x={488} y={970}>
          org+provider+model · 3 retries
        </text>

        <rect className="ext" x={910} y={908} width={400} height={76} />
        <text className="et" x={928} y={936}>
          LLM providers
        </text>
        <text className="es" x={928} y={954}>
          BYOK · rubric pack installed
        </text>
        <text className="es" x={928} y={970}>
          before the run · answer cache
        </text>

        <rect className="flowq" x={1350} y={908} width={400} height={76} />
        <text className="st" x={1368} y={936}>
          Index handle cache
        </text>
        <text className="ss" x={1368} y={954}>
          LRU per API process — 8 open
        </text>
        <text className="ss" x={1368} y={970}>
          indexes, evicted and closed
        </text>

        {/* ── the ends ─────────────────────────────────────────────────── */}
        <path className="ln" d="M 230 984 L 230 1022" />
        <path className="ln" d="M 670 984 L 670 1022" />
        <path className="lnr" d="M 1110 984 L 1110 1022" />
        <path className="ln" d="M 1550 984 L 1550 1022" />

        <rect className="flow" x={30} y={1026} width={400} height={80} />
        <text className="cap" x={48} y={1046}>
          END
        </text>
        <text className="st" x={48} y={1068}>
          Published index
        </text>
        <text className="ss" x={48} y={1086}>
          Chroma + DuckDB per repo, on
        </text>
        <text className="ss" x={48} y={1100}>
          LOCAL DISK at data/indexes/:id/latest/
        </text>

        <rect className="flow" x={470} y={1026} width={400} height={80} />
        <text className="cap" x={488} y={1046}>
          END
        </text>
        <text className="st" x={488} y={1068}>
          Answer, streamed
        </text>
        <text className="ss" x={488} y={1086}>
          deltas over SSE back to the chat
        </text>
        <text className="ss" x={488} y={1100}>
          view · approvals park the run
        </text>

        <rect className="flowr" x={910} y={1026} width={400} height={80} />
        <text className="capr" x={928} y={1046}>
          END
        </text>
        <text className="str" x={928} y={1068}>
          Findings + live progress
        </text>
        <text className="ssr" x={928} y={1086}>
          SSE capacity = pool connections − 1
        </text>
        <text className="ssr" x={928} y={1100}>
          14 by default · fails silently
        </text>

        <rect className="flow" x={1350} y={1026} width={400} height={80} />
        <text className="cap" x={1368} y={1046}>
          END
        </text>
        <text className="st" x={1368} y={1068}>
          Code answers
        </text>
        <text className="ss" x={1368} y={1086}>
          ranked chunks · symbol explanations
        </text>
        <text className="ss" x={1368} y={1100}>
          blast-radius reports
        </text>

        {/* ── 5 · Shared state ─────────────────────────────────────────── */}
        <path className="lne" d="M 230 1106 L 230 1146" />
        <path className="lne" d="M 670 1106 L 670 1146" />
        <path className="lne" d="M 1110 1106 L 1110 1146" />
        <path className="lne" d="M 1550 1106 L 1550 1146" />

        <rect className="layer" x={30} y={1150} width={1720} height={92} />
        <text className="ll" x={48} y={1176}>
          Shared state
        </text>
        <text className="lls" x={192} y={1176}>
          written by every flow above
        </text>

        <rect className="sub" x={36} y={1188} width={332} height={42} />
        <text className="stq" x={48} y={1207}>
          Postgres 16
        </text>
        <text className="ss" x={48} y={1222}>
          the contract · ONE primary · no replica
        </text>

        <rect className="sub" x={380} y={1188} width={332} height={42} />
        <text className="stq" x={392} y={1207}>
          Redis 7
        </text>
        <text className="ss" x={392} y={1222}>
          streams · locks · buckets · slots · LLM cache
        </text>

        <rect className="sub" x={724} y={1188} width={332} height={42} />
        <text className="stq" x={736} y={1207}>
          Local disk — per host
        </text>
        <text className="ss" x={736} y={1222}>
          snapshots ./snapshots · indexes ./data/indexes
        </text>

        <rect className="sub" x={1068} y={1188} width={332} height={42} />
        <text className="stq" x={1080} y={1207}>
          Graph cache
        </text>
        <text className="ss" x={1080} y={1222}>
          ./graph_cache per repo+commit · S3 only if set
        </text>

        <rect className="sub" x={1412} y={1188} width={332} height={42} />
        <text className="stq" x={1424} y={1207}>
          Telemetry
        </text>
        <text className="ss" x={1424} y={1222}>
          Prometheus scrapes api + workers · Grafana Cloud
        </text>
      </svg>
    </div>
  );
}
