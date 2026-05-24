/**
 * Demo-break route - drop into your Next.js project at:
 *
 *   App Router:   src/app/api/demo/break/route.ts
 *   Pages Router: src/pages/api/demo/break.ts  (slightly different export, see below)
 *
 * Purpose: provides a controlled endpoint you can hit during the demo
 * to trigger different production-shaped failures. Each one logs realistic
 * lines and reports to IncidentIQ via the reporter module.
 *
 * Examples:
 *
 *   GET /api/demo/break?mode=db
 *   GET /api/demo/break?mode=oom
 *   GET /api/demo/break?mode=upstream
 *   GET /api/demo/break?mode=cascade
 *
 * The route always responds with HTTP 500 so a judge can see "the live app
 * just failed" in their browser, then switch to IncidentIQ and see the
 * analysis arriving from the webhook.
 *
 * Path-adjustment: change the import to wherever you put the reporter.
 */

import { NextRequest, NextResponse } from "next/server";

import { note, reportIncident } from "@/lib/incidentiq-reporter";

const SCENARIOS: Record<
  string,
  { title: string; lines: string[]; service: string }
> = {
  db: {
    service: "fashion-aura-api",
    title: "Postgres pool exhaustion on fashion-aura-api",
    lines: [
      "WARN  fashion-aura-api Postgres pool getConnection waited 1.8s host=db-primary.internal pool=writer",
      "ERROR fashion-aura-api Postgres pool exhausted: 200/200 connections in use, 47 waiting",
      "ERROR fashion-aura-api Request GET /api/products user=u_4831 status=503 took 30012ms (pool timeout)",
      "WARN  api-gateway       Upstream fashion-aura-api 5xx rate 38% over last 1m",
      "ERROR api-gateway       SLO burn: error_rate=42% target=0.5% (84x budget burn)",
    ],
  },
  oom: {
    service: "fashion-aura-api",
    title: "fashion-aura-api Node process OOM",
    lines: [
      "WARN  fashion-aura-api Heap usage 812MiB (79%) - GC pause 520ms p99 latency 1.4s",
      "WARN  fashion-aura-api Heap usage 905MiB (88%) - Full GC pause 1.2s p99 latency 3.1s",
      "ERROR fashion-aura-api JavaScript heap out of memory",
      "ERROR fashion-aura-api FATAL ERROR: Reached heap limit Allocation failed",
      "INFO  vercel             Function execution terminated: out of memory",
    ],
  },
  upstream: {
    service: "fashion-aura-api",
    title: "Upstream payments provider 504s",
    lines: [
      "WARN  fashion-aura-api Stripe API latency 4.2s on POST /v1/charges",
      "ERROR fashion-aura-api Stripe returned 504 Gateway Timeout (attempt 3/3)",
      "ERROR fashion-aura-api Order ord_91823 failed: payment provider unreachable",
      "WARN  fashion-aura-api Circuit breaker WARN - stripe upstream 50% error rate",
      "ERROR fashion-aura-api Circuit breaker OPEN - stripe upstream (50/50 fails)",
    ],
  },
  cascade: {
    service: "fashion-aura-api",
    title: "Cascading checkout failure - DB pool to payments OOM",
    lines: [
      "WARN  fashion-aura-api Postgres pool getConnection waited 1.8s",
      "WARN  redis-cache       Redis cluster slot moved key=order:lock:u_5512",
      "ERROR fashion-aura-api Postgres pool exhausted: 200/200 connections in use",
      "ERROR payments-worker   Failed to acquire order lock - Redis CLUSTERDOWN",
      "WARN  api-gateway       Upstream fashion-aura-api 5xx rate 38% over last 1m",
      "ERROR fashion-aura-api Circuit breaker OPENED for upstream: payments-worker",
      "FATAL payments-worker   Out of memory: heap=512MiB rss=731MiB, killing process",
    ],
  },
};

/** App Router export. Move the body into a default `handler` for Pages Router. */
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = (url.searchParams.get("mode") || "db").toLowerCase();
  const scenario = SCENARIOS[mode] ?? SCENARIOS.db;

  // Spread the synthetic events over a realistic cascade window
  // (~60 seconds, ending now). Without this every line shares the
  // same ingestion timestamp in Datadog and the IncidentIQ timeline
  // collapses to one instant - MTTD shows 0m and judges can't see
  // the failure unfolding. Prepending an explicit ISO timestamp to
  // each line lets Datadog's auto-parser AND IncidentIQ's
  // correlate_timeline tool pick up the per-event time.
  const now = Date.now();
  const totalSpreadMs = 60_000;
  const lineCount = scenario.lines.length;
  const stepMs = lineCount > 1 ? totalSpreadMs / (lineCount - 1) : 0;

  const stampedLines = scenario.lines.map((line, i) => {
    const ts = new Date(now - totalSpreadMs + i * stepMs).toISOString();
    return `${ts} ${line}`;
  });

  for (const line of stampedLines) {
    note("ERROR", scenario.service, line);
  }

  void reportIncident({
    title: scenario.title,
    logs: stampedLines.join("\n"),
    service: scenario.service,
  });

  return NextResponse.json(
    {
      ok: false,
      error: scenario.title,
      mode,
      reported_to_incidentiq: true,
      // Surface the timestamp span so callers can verify it spread
      // correctly (and so a curl test sees the cascade is real).
      spread_seconds: lineCount > 1 ? totalSpreadMs / 1000 : 0,
      first_event: stampedLines[0]?.slice(0, 24),
      last_event: stampedLines[stampedLines.length - 1]?.slice(0, 24),
    },
    { status: 500 },
  );
}

/* ── Pages Router version ────────────────────────────────────────────────
 * If your project uses /pages instead of /app, replace the GET export
 * above with this default handler and put the file at
 * src/pages/api/demo/break.ts:
 *
 *   import type { NextApiRequest, NextApiResponse } from "next";
 *   import { note, reportIncident } from "@/lib/incidentiq-reporter";
 *
 *   export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 *     const mode = String(req.query.mode || "db").toLowerCase();
 *     const scenario = SCENARIOS[mode] ?? SCENARIOS.db;
 *     for (const line of scenario.lines) note("ERROR", scenario.service, line);
 *     void reportIncident({
 *       title: scenario.title,
 *       logs: scenario.lines.join("\n"),
 *       service: scenario.service,
 *     });
 *     res.status(500).json({ ok: false, error: scenario.title, mode });
 *   }
 * ──────────────────────────────────────────────────────────────────────── */
