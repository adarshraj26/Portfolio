import { NextResponse } from "next/server";

const GEMINI_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_CONTEXT = `You are an AI assistant for Adarsh Raj's developer portfolio. Answer questions about Adarsh concisely and helpfully.

About Adarsh Raj:
- Full Stack Developer specializing in React, Next.js, Node.js, TypeScript, MongoDB, and AI integrations
- Available for freelance work and full-time opportunities
- Based in India
- Contact: Available through the portfolio contact form, GitHub: adarshraj26

Projects:
1. SensAI – AI Career Coach: AI-powered career platform with mock interviews, resume generation, career insights. Tech: React, Next.js, Gemini AI, Prisma, Tailwind CSS. Live at: sensai-ebon-five.vercel.app
2. JobTracker – Application Tracker: Full-stack job tracking dashboard with analytics and document management. Tech: React, TypeScript, Node.js, Express.js, MongoDB. Live at: application-manager-brown.vercel.app
3. Hirrd – Job Portal: Full-stack job portal connecting seekers with employers. Tech: React, Node.js, MongoDB, Tailwind CSS. Live at: hirrd-ashy.vercel.app
4. AI Email Generator & Sender: AI email generation tool with multi-recipient delivery. Tech: React, Node.js, Gemini AI, Gmail SMTP. Live at: ai-email-generation-frontend.vercel.app
5. Genius – AI SaaS Platform: Multi-format AI content generation (text, audio, video, image). Tech: Next.js, React, Prisma, OpenAI API.
6. Car Rental Platform: Serverless car rental platform. Tech: React, Node.js, AWS Lambda, AWS DynamoDB.
7. Alumni ChatApp: Mobile chat app for college alumni. Tech: Flutter, Dart, Firebase. GitHub: adarshraj26/AlumniChatApp
8. Fake News Detection System: ML system for detecting fake news using NLP. Tech: Python, JavaScript.
9. VisionaryHut – NGO Platform: Website for an NGO supporting entrepreneurship. Tech: HTML, CSS, JavaScript.

Skills: React, Next.js, TypeScript, Node.js, Express.js, MongoDB, PostgreSQL, Prisma, Tailwind CSS, Flutter, Dart, Firebase, Python, AWS (Lambda, DynamoDB), Gemini AI, OpenAI API, Docker, GitHub Actions, Git, Figma, Vercel.

Education: Computer Science background.
Experience: Full Stack Developer with experience building AI-powered web applications and cloud-integrated systems.

Keep answers concise (2-4 sentences max). If asked something you don't know about Adarsh, say you don't have that information and suggest contacting him directly. Never make up specific details not listed above.`;

export async function POST(req) {
  const { messages } = await req.json();
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
  }

  const userMessage = messages[messages.length - 1]?.content ?? "";

  try {
    if (!GEMINI_KEY) throw new Error("No key");

    // Build conversation history for Gemini
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Prepend system context to first user message
    if (contents[0]?.role === "user") {
      contents[0].parts[0].text = `${SYSTEM_CONTEXT}\n\nUser question: ${contents[0].parts[0].text}`;
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: { temperature: 0.5, maxOutputTokens: 256 },
        }),
      }
    );
    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    if (!reply) throw new Error("empty");
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: buildFallback(userMessage) });
  }
}

function buildFallback(msg) {
  const lower = msg.toLowerCase();
  if (/project|built|work|portfolio/.test(lower))
    return "Adarsh has built 9+ projects including SensAI (AI career coach), JobTracker (job tracking dashboard), Hirrd (job portal), and several AI-powered tools. Check the Projects section for details!";
  if (/skill|tech|stack|language|framework/.test(lower))
    return "Adarsh works with React, Next.js, TypeScript, Node.js, MongoDB, and AI integrations (Gemini, OpenAI). He also builds mobile apps with Flutter and has cloud experience with AWS.";
  if (/hire|available|freelance|contact|reach/.test(lower))
    return "Adarsh is open to freelance and full-time opportunities! You can reach him through the Contact section on this portfolio.";
  if (/experience|background|about/.test(lower))
    return "Adarsh is a Full Stack Developer specializing in React, Node.js, and AI-driven applications. He has built everything from job portals to AI SaaS platforms.";
  return "I can answer questions about Adarsh's projects, skills, experience, and availability. What would you like to know?";
}
