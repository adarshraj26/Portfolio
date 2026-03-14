import { NextResponse } from "next/server";

/*
 * GET /api/hackerrank?username=<username>
 *
 * Fetches profile + badges from HackerRank's public REST API.
 * Profile data is treated as optional — if HackerRank blocks it
 * (CSRF / session guard) we still return the badges-only payload.
 * Caches per-username for 10 minutes.
 */

const CACHE_MS = 10 * 60 * 1000;
const cache    = new Map();

const BASE = "https://www.hackerrank.com/rest/hackers";

/* Full Chrome-like headers to pass HackerRank's bot-detection */
const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept":           "application/json, text/plain, */*",
  "Accept-Language":  "en-US,en;q=0.9",
  "Referer":          "https://www.hackerrank.com/",
  "Origin":           "https://www.hackerrank.com",
  "x-requested-with": "XMLHttpRequest",
  "sec-fetch-dest":   "empty",
  "sec-fetch-mode":   "cors",
  "sec-fetch-site":   "same-origin",
};

async function tryFetch(url) {
  try {
    const res = await fetch(url, {
      headers: HEADERS,
      signal:  AbortSignal.timeout(14_000),
    });
    if (!res.ok) return { ok: false, status: res.status };
    const json = await res.json();
    return { ok: true, data: json };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username")?.trim();

  if (!username) {
    return NextResponse.json({ error: "Missing username parameter." }, { status: 400 });
  }

  const now = Date.now();
  const hit = cache.get(username);
  if (hit && now - hit.ts < CACHE_MS) {
    return NextResponse.json(hit.data);
  }

  /* Fetch profile + badges in parallel; either can fail gracefully */
  const [profileResult, badgesResult] = await Promise.all([
    tryFetch(`${BASE}/${encodeURIComponent(username)}/profile`),
    tryFetch(`${BASE}/${encodeURIComponent(username)}/badges`),
  ]);

  /* If both completely failed, surface an error */
  if (!profileResult.ok && !badgesResult.ok) {
    const code = profileResult.status ?? badgesResult.status;
    if (code === 404) {
      return NextResponse.json(
        { error: `User "${username}" not found on HackerRank.` },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "HackerRank API is unavailable. Please try again later." },
      { status: 502 }
    );
  }

  const profile = profileResult.ok  ? (profileResult.data?.model ?? {}) : {};
  const badges  = badgesResult.ok   ? (badgesResult.data?.models ?? []) : [];

  /* Compute total points from badges if profile was blocked */
  const derivedPoints = badges.reduce((s, b) => s + (b.current_points ?? 0), 0);

  const data = {
    username:    profile.username    ?? username,
    name:        profile.name        ?? username,
    country:     profile.country     ?? null,
    avatar:      profile.avatar      ?? null,
    level:       profile.level       ?? 0,
    points:      profile.points      ?? derivedPoints,
    bio:         profile.bio         ?? null,
    school:      profile.school      ?? null,
    badgeCount:  badges.length,
    badges:      badges.map((b) => ({
      name:   b.badge_name     ?? b.name ?? "Badge",
      stars:  b.stars          ?? 0,
      points: b.current_points ?? 0,
    })),
  };

  cache.set(username, { data, ts: now });
  return NextResponse.json(data);
}
