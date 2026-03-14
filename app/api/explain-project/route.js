import { NextResponse } from "next/server";

/**
 * POST /api/explain-project
 * Calls Gemini 1.5 Flash to generate a 4-part project explanation.
 * Falls back to structured static generation if GEMINI_API_KEY is not set.
 */
export async function POST(req) {
  const { title, description, tech, features, category } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(buildFallback({ title, description, tech, features, category }));
  }

  const prompt = `You are a senior software engineer explaining a project to a fellow developer.

Project: ${title}
Category: ${category}
Description: ${description}
Tech Stack: ${tech.join(", ")}
Key Features: ${features.join(", ")}

Return ONLY a valid JSON object with exactly these 4 keys (2–3 sentences each, technical but concise):
{
  "architecture": "...",
  "techStack": "...",
  "challenges": "...",
  "howItWorks": "..."
}`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 512 },
        }),
      }
    );

    const data = await res.json();
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const jsonMatch = raw.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.architecture && parsed.techStack && parsed.challenges && parsed.howItWorks) {
        return NextResponse.json(parsed);
      }
    }
  } catch {
    // fall through to static fallback
  }

  return NextResponse.json(buildFallback({ title, description, tech, features, category }));
}

/* ── Static fallback generator ── */
function buildFallback({ title, description, tech, features, category }) {
  const hasFE  = tech.some((t) => ["React", "Next.js", "Flutter", "HTML", "CSS"].includes(t));
  const hasBE  = tech.some((t) => ["Node.js", "Express.js", "Python", "AWS Lambda"].includes(t));
  const hasDB  = tech.some((t) => ["MongoDB", "Prisma", "AWS DynamoDB", "Firebase"].includes(t));
  const hasAI  = tech.some((t) => ["OpenAI API", "Gemini AI"].includes(t)) ||
                 category.includes("AI") || category.includes("ML");
  const isCloud = category === "Cloud";

  const feStack = tech.filter((t) => ["React", "Next.js"].includes(t)).join("/") || "React";
  const beStack = tech.filter((t) => ["Node.js", "Express.js"].includes(t)).join("/") || "Node.js";
  const dbStack = tech.filter((t) => ["MongoDB", "Prisma", "AWS DynamoDB", "Firebase"].includes(t)).join(" / ");

  const architecture =
    hasFE && hasBE
      ? `${title} uses a decoupled client-server architecture — a ${feStack} SPA on the frontend communicates with a ${beStack} REST API on the backend.` +
        (hasDB ? ` Persistent data lives in ${dbStack}.` : "") +
        (isCloud ? " The backend runs serverless on AWS Lambda for horizontal scalability." : "")
      : hasFE
      ? `${title} is a client-side application built with ${feStack}. All business logic runs in the browser, fetching data from external APIs as needed.`
      : `${title} is a ${category} application with a structured codebase following clean separation of concerns across its modules.`;

  const techStack =
    `The project is built on ${tech.join(", ")}.` +
    (hasAI ? " AI capabilities are provided by a large language model API, enabling intelligent, context-aware responses." : "") +
    " This stack was chosen for developer velocity, ecosystem maturity, and production scalability.";

  const challenges =
    hasAI
      ? `Prompt engineering was a key challenge — getting the LLM to return consistent, structured output required iterative refinement and robust response parsing. Latency and rate-limit handling were also important considerations.`
      : `The main engineering challenges were around ${features[0]?.toLowerCase() || "core feature implementation"} and ensuring real-time state stays consistent across the UI. Error boundaries and edge-case handling were added incrementally based on user testing.`;

  const howItWorks =
    `Users interact with the ${hasFE ? "web interface" : "application"} to access features including ${features.slice(0, 2).join(" and ").toLowerCase()}.` +
    (hasAI ? " User inputs are sent to the AI service, which processes them and streams back structured results." : "") +
    " The system handles requests efficiently and provides immediate visual feedback throughout.";

  return { architecture, techStack, challenges, howItWorks };
}
