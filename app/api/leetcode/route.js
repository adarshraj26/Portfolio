import { NextResponse } from "next/server";

/*
 * GET /api/leetcode?username=<username>
 *
 * Queries LeetCode's public GraphQL API directly — no third-party proxy.
 * Maps the response to the flat shape expected by LeetCodeDashboard.
 * Caches per-username for 10 minutes at module level.
 */

const CACHE_MS = 10 * 60 * 1000;
const cache    = new Map(); // username → { data, ts }

const GRAPHQL_URL = "https://leetcode.com/graphql";

const QUERY = `
query userProfile($username: String!) {
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: $username) {
    profile {
      ranking
      reputation
    }
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    userCalendar {
      submissionCalendar
    }
  }
}
`;

function buildResponse(gql) {
  const user  = gql?.data?.matchedUser;
  const allQ  = gql?.data?.allQuestionsCount ?? [];

  if (!user) return null;

  const acNums = user.submitStatsGlobal?.acSubmissionNum ?? [];

  const get = (diff) => acNums.find((x) => x.difficulty === diff) ?? { count: 0, submissions: 0 };
  const allAc   = get("All");
  const easyAc  = get("Easy");
  const medAc   = get("Medium");
  const hardAc  = get("Hard");

  const totalSolved     = allAc.count;
  const totalSubmissions = allAc.submissions;
  const acceptanceRate  = totalSubmissions > 0
    ? parseFloat(((totalSolved / totalSubmissions) * 100).toFixed(1))
    : 0;

  const getTotal = (diff) => (allQ.find((x) => x.difficulty === diff)?.count ?? 0);

  // submissionCalendar is a JSON string like '{"1672531200": 3, ...}'
  let submissionCalendar = {};
  try {
    const raw = user.userCalendar?.submissionCalendar;
    if (raw) submissionCalendar = JSON.parse(raw);
  } catch { /* ignore */ }

  return {
    totalSolved,
    totalQuestions:     getTotal("All"),
    easySolved:         easyAc.count,
    totalEasy:          getTotal("Easy"),
    mediumSolved:       medAc.count,
    totalMedium:        getTotal("Medium"),
    hardSolved:         hardAc.count,
    totalHard:          getTotal("Hard"),
    acceptanceRate,
    ranking:            user.profile?.ranking ?? 0,
    contributionPoints: user.profile?.reputation ?? 0,
    submissionCalendar,
  };
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

  try {
    const res = await fetch(GRAPHQL_URL, {
      method:  "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer":       "https://leetcode.com",
        "User-Agent":    "Mozilla/5.0 (compatible; portfolio-bot/1.0)",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `LeetCode returned HTTP ${res.status}. Please try again.` },
        { status: 502 }
      );
    }

    const gql  = await res.json();
    const data = buildResponse(gql);

    if (!data) {
      return NextResponse.json(
        { error: `User "${username}" not found on LeetCode.` },
        { status: 404 }
      );
    }

    cache.set(username, { data, ts: now });
    return NextResponse.json(data);

  } catch (err) {
    const msg =
      err.name === "TimeoutError"
        ? "Request to LeetCode timed out. Please try again."
        : `Could not reach LeetCode: ${err.message}`;
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
