import { NextResponse } from "next/server";

const GEMINI_KEY = process.env.GEMINI_API_KEY;

export async function POST(req) {
  const { idea } = await req.json();
  if (!idea || idea.trim().length < 10) {
    return NextResponse.json({ error: "Please describe your idea in more detail." }, { status: 400 });
  }

  const prompt = `You are a senior full-stack developer analyzing a project idea to estimate what it would take to build it.

Project idea: "${idea}"

The developer's tech stack includes: React, Next.js, TypeScript, Node.js, Express.js, MongoDB, PostgreSQL, Prisma, Tailwind CSS, Framer Motion, AWS (Lambda, DynamoDB, S3), Firebase, Flutter/Dart, Python (ML/AI), Gemini AI, OpenAI API, Docker, GitHub Actions, Vercel.

Return ONLY a valid JSON object with exactly these 5 keys:
{
  "techStack": "2-3 sentence recommendation of specific technologies from the developer's stack best suited for this project and why",
  "complexity": "Simple | Medium | Complex | Enterprise",
  "timeline": "Realistic time estimate as a short string, e.g. '2-3 weeks' or '1-2 months'",
  "keyFeatures": "3-4 core features that would need to be built, as a comma-separated list",
  "approach": "2-3 sentence description of the recommended architectural approach and any important considerations"
}

Be specific and practical. Do not include markdown, code blocks, or any text outside the JSON object.`;

  try {
    if (!GEMINI_KEY) throw new Error("No key");

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.4, maxOutputTokens: 1024 },
        }),
      }
    );
    const data = await res.json();
    const raw = (data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "")
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) return NextResponse.json(JSON.parse(match[0]));
    throw new Error("parse");
  } catch {
    return NextResponse.json(buildFallback(idea));
  }
}

function buildFallback(idea) {
  const lower = idea.toLowerCase();
  const hasAI        = /ai|ml|gpt|gemini|openai|machine learning|chatbot|nlp/.test(lower);
  const hasMobile    = /mobile|flutter|ios|android/.test(lower);
  const hasRealtime  = /chat|realtime|real-time|live|socket|notification/.test(lower);
  const hasEcommerce = /shop|store|ecommerce|e-commerce|cart|payment|stripe|product/.test(lower);
  const hasDashboard = /dashboard|analytics|report|chart|graph|metric|stat/.test(lower);
  const hasSocial    = /social|feed|follow|post|like|comment|profile/.test(lower);
  const isSimple     = idea.length < 80 && !hasAI && !hasMobile && !hasRealtime && !hasEcommerce;

  const techStack = hasMobile
    ? "Flutter with Dart for a cross-platform mobile app, Firebase for authentication and real-time sync, and Node.js/Express for any custom backend API endpoints."
    : hasAI
    ? "Next.js with TypeScript for the frontend, Node.js/Express for the backend, MongoDB for data storage, and Gemini AI or OpenAI API for the AI features. Python may be needed for any custom ML pipelines."
    : hasEcommerce
    ? "Next.js with TypeScript for the storefront, Stripe for payments, PostgreSQL with Prisma for product/order data, and AWS S3 for product image storage."
    : hasRealtime
    ? "Next.js with TypeScript for the frontend, Socket.io with Node.js for real-time events, MongoDB for message persistence, and Redis for pub/sub and presence tracking."
    : hasDashboard
    ? "React with Next.js for the frontend, Node.js/Express for the API layer, PostgreSQL with Prisma for structured analytics data, and Recharts or Chart.js for visualisations."
    : hasSocial
    ? "Next.js with TypeScript for the frontend, Node.js/Express for the API, MongoDB for flexible social graph data, and AWS S3 for user-generated media uploads."
    : "React with Next.js and TypeScript for the frontend, Node.js with Express for the API, and MongoDB or PostgreSQL with Prisma for the database. Deploy on Vercel with GitHub Actions for CI/CD.";

  const complexity = isSimple ? "Simple"
    : hasAI || (hasRealtime && hasSocial) ? "Complex"
    : hasEcommerce || hasMobile ? "Medium"
    : "Medium";

  const timeline = isSimple ? "1-2 weeks"
    : hasAI ? "4-6 weeks"
    : hasMobile ? "6-8 weeks"
    : hasEcommerce ? "4-6 weeks"
    : hasRealtime ? "3-5 weeks"
    : "3-4 weeks";

  const keyFeatures = hasAI
    ? "AI model integration, user authentication & roles, prompt/response history, responsive dashboard UI"
    : hasEcommerce
    ? "Product catalogue, shopping cart & checkout, Stripe payment integration, order management & history"
    : hasRealtime
    ? "Real-time messaging with Socket.io, user authentication, notifications, message history & search"
    : hasDashboard
    ? "Data ingestion pipeline, interactive charts & filters, role-based access control, CSV/PDF export"
    : hasSocial
    ? "User profiles & follow system, post/feed creation, likes & comments, media upload & CDN delivery"
    : hasMobile
    ? "Cross-platform UI, push notifications, offline support, user authentication & profile management"
    : "User authentication & authorization, core CRUD operations, responsive UI, REST API with validation";

  const approach = hasAI
    ? "Design the data schema and API contracts first, then integrate the AI layer as a separate service to keep it independently testable. Stream AI responses to the frontend for a snappier UX, and always implement a fallback for API rate limits."
    : hasEcommerce
    ? "Start with the product catalogue and cart logic before wiring up Stripe. Keep payment code isolated in a dedicated service layer and test with Stripe's test mode end-to-end before going live."
    : hasRealtime
    ? "Architect the real-time layer with Socket.io rooms from the start and use Redis pub/sub for horizontal scalability. Store messages in MongoDB with proper indexing on timestamps and conversation IDs for fast retrieval."
    : hasMobile
    ? "Use Flutter's BLoC or Riverpod for state management from day one to keep the codebase scalable. Build and test on both iOS and Android simulators throughout development, not just at the end."
    : "Start with a clear data model and API design before building the UI. Use component-driven development with reusable pieces, and deploy early to Vercel so you get continuous feedback throughout the build.";

  return { techStack, complexity, timeline, keyFeatures, approach };
}
