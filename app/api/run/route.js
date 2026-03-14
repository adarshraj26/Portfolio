import { NextResponse } from "next/server";

/*
 * POST /api/run
 *
 * Proxies code execution to Wandbox.
 * Dynamically picks the latest stable (non-head) compiler from
 * Wandbox's own /api/list.json to avoid "catatonit" container errors
 * that happen when nightly builds are unavailable.
 *
 * Body:    { language: string, code: string }
 * Returns: { stdout: string, stderr: string } | { error: string }
 */

/* Language → Wandbox compiler-name prefix */
const LANG_PATTERNS = {
  python:     "cpython",
  javascript: "nodejs",
  java:       "openjdk",
  "c++":      "g++",
};

/* Default compile options per language */
const LANG_OPTIONS = {
  python:     "",
  javascript: "",
  java:       "",
  "c++":      "warning,c++17",
};

/* Module-level compiler-list cache (lives as long as the server process) */
let cachedList = null;
let cachedAt   = 0;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

async function getCompilerList() {
  if (cachedList && Date.now() - cachedAt < CACHE_TTL) return cachedList;

  const r = await fetch("https://wandbox.org/api/list.json", {
    signal: AbortSignal.timeout(8_000),
  });
  if (!r.ok) throw new Error(`Wandbox list HTTP ${r.status}`);

  cachedList = await r.json();
  cachedAt   = Date.now();
  return cachedList;
}

function pickCompiler(list, pattern, options) {
  /* Prefer latest stable (versioned) build over nightly heads */
  const stable = list
    .filter((c) => c.name.startsWith(pattern + "-") && !c.name.includes("head"))
    .sort((a, b) => b.name.localeCompare(a.name)); // lexicographic desc ≈ latest first

  if (stable.length > 0) return { compiler: stable[0].name, options };

  /* Fall back to head only when no stable version is listed */
  const head = list.find((c) => c.name === `${pattern}-head`);
  if (head) return { compiler: head.name, options };

  throw new Error(`No Wandbox compiler found for: ${pattern}`);
}

function isCatatonitError(text = "") {
  return (
    text.includes("catatonit") ||
    text.includes("failed to exec pid1") ||
    text.includes("No such file or directory") && text.includes("pid1")
  );
}

export async function POST(request) {
  /* Parse body */
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { language, code } = body;
  if (!language || typeof code !== "string" || !code.trim()) {
    return NextResponse.json({ error: "Missing language or code." }, { status: 400 });
  }

  const lang    = language.toLowerCase();
  const pattern = LANG_PATTERNS[lang];
  if (!pattern) {
    return NextResponse.json(
      { error: `Unsupported language: ${language}` },
      { status: 400 }
    );
  }

  try {
    /* ── 1. Pick a stable compiler from Wandbox's live list ── */
    const list                    = await getCompilerList();
    const { compiler, options }   = pickCompiler(list, pattern, LANG_OPTIONS[lang]);

    /* ── 2. Execute the code ── */
    const execRes = await fetch("https://wandbox.org/api/compile.json", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        compiler,
        code: code.trim(),
        stdin: "",
        ...(options ? { options } : {}),
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!execRes.ok) {
      return NextResponse.json(
        { error: `Execution service returned HTTP ${execRes.status}. Please try again.` },
        { status: 502 }
      );
    }

    const data = await execRes.json();

    const stdout       = data.program_output  ?? "";
    const programErr   = data.program_error   ?? "";
    const compilerErr  = data.compiler_error  ?? "";
    const stderr       = programErr + compilerErr;

    /* Detect container-level infrastructure failures */
    if (isCatatonitError(stdout) || isCatatonitError(stderr)) {
      return NextResponse.json(
        { error: "Execution service is temporarily unavailable. Please try again in a moment." },
        { status: 503 }
      );
    }

    return NextResponse.json({ stdout, stderr });

  } catch (err) {
    const msg =
      err.name === "TimeoutError"
        ? "Execution timed out (20 s limit)."
        : `Could not reach execution service: ${err.message}`;

    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
