import { NextResponse } from "next/server";

/*
 * GET /api/visitors
 * Proxies counterapi.dev to increment + return the visitor count.
 * Short 30s module-level cache to avoid hammering the free API.
 */

const NAMESPACE = "adarshraj-portfolio";
const KEY       = "visitors";
const URL       = `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`;

let cached   = null;
let cachedAt = 0;
const CACHE_MS = 30_000;

export async function GET() {
  const now = Date.now();
  if (cached && now - cachedAt < CACHE_MS) {
    return NextResponse.json({ count: cached });
  }

  try {
    const res  = await fetch(URL, { signal: AbortSignal.timeout(6_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    // counterapi.dev returns { count: number }
    const count = json?.count ?? json?.value ?? 0;
    cached   = count;
    cachedAt = now;
    return NextResponse.json({ count });
  } catch {
    // Graceful fallback — don't surface errors to the UI
    return NextResponse.json({ count: cached ?? null });
  }
}
