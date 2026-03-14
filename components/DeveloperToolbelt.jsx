"use client";

import { motion } from "framer-motion";
import { FiCode } from "react-icons/fi";
import {
    SiDocker,
    SiFigma,
    SiGit,
    SiGithubactions,
    SiGooglechrome,
    SiLinux,
    SiMongodb,
    SiPostman,
    SiVercel,
} from "react-icons/si";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Tools data ── */
const tools = [
  {
    name: "VS Code",
    icon: FiCode,
    color: "#007ACC",
    category: "Editor",
    usage:
      "Primary IDE for all development. Daily extensions: Prettier, ESLint, GitLens, Tailwind IntelliSense, and Thunder Client for quick API checks.",
  },
  {
    name: "Postman",
    icon: SiPostman,
    color: "#FF6C37",
    category: "API Testing",
    usage:
      "API design, testing, and documentation. Use Collections and Environments to manage multi-environment request sets and automate integration tests.",
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "#2496ED",
    category: "DevOps",
    usage:
      "Containerize dev environments and production builds. Use Docker Compose for local multi-service stacks so setup is always one command.",
  },
  {
    name: "GitHub Actions",
    icon: SiGithubactions,
    color: "#2088FF",
    category: "CI/CD",
    usage:
      "Automated pipelines for linting, testing, and deploying to Vercel and AWS on every push to main. Also used for nightly dependency audits.",
  },
  {
    name: "Figma",
    icon: SiFigma,
    color: "#F24E1E",
    category: "Design",
    usage:
      "UI/UX wireframing and high-fidelity prototyping before writing a single line of code. Design component systems and validate layouts early.",
  },
  {
    name: "Linux CLI",
    icon: SiLinux,
    color: "#FCC624",
    category: "System",
    usage:
      "Server management, shell scripting, and SSH into cloud instances. Use tmux for persistent sessions and bash aliases to automate repetitive tasks.",
  },
  {
    name: "Git",
    icon: SiGit,
    color: "#F05032",
    category: "VCS",
    usage:
      "Feature branch workflow for every project. Interactive rebase for clean history, conventional commits for changelogs, and tags for releases.",
  },
  {
    name: "Chrome DevTools",
    icon: SiGooglechrome,
    color: "#4285F4",
    category: "Debugging",
    usage:
      "Debug JavaScript, profile rendering performance, inspect network requests, and simulate different viewports and network conditions.",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "#A0AEC0",
    category: "Deployment",
    usage:
      "Zero-config deployment for Next.js and React apps. Preview deployments on every PR and edge functions for globally distributed API routes.",
  },
  {
    name: "MongoDB Compass",
    icon: SiMongodb,
    color: "#47A248",
    category: "Database",
    usage:
      "Visual MongoDB explorer for browsing collections, running aggregation pipelines, analyzing index usage, and profiling slow queries.",
  },
];

/* ── Individual flip card ── */
function ToolCard({ tool, index }) {
  const Icon = tool.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 5) * 0.07, ease: "easeOut" }}
      /* Flip perspective wrapper */
      className="group [perspective:700px] h-44"
    >
      {/* Rotating inner */}
      <div className="relative h-full w-full transition-transform duration-500 ease-in-out
                      [transform-style:preserve-3d]
                      group-hover:[transform:rotateY(180deg)]">

        {/* ── Front face ── */}
        <div className="absolute inset-0 [backface-visibility:hidden]
                        dark:bg-slate-800/60 bg-white rounded-2xl
                        border dark:border-slate-700/50 border-slate-200
                        flex flex-col items-center justify-center gap-3 p-4
                        shadow-sm">
          {/* Icon circle */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md"
               style={{ background: `${tool.color}18`, border: `1.5px solid ${tool.color}40` }}>
            <Icon className="w-7 h-7" style={{ color: tool.color }} />
          </div>
          <div className="text-center">
            <p className="font-bold text-sm dark:text-white text-slate-900">{tool.name}</p>
            <span className="text-xs dark:text-slate-500 text-slate-400 font-medium">{tool.category}</span>
          </div>
          {/* Flip hint */}
          <p className="text-[10px] dark:text-slate-600 text-slate-400 absolute bottom-3">
            hover to see usage
          </p>
        </div>

        {/* ── Back face ── */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]
                        rounded-2xl p-4 flex flex-col justify-between
                        border shadow-sm"
             style={{
               background: `linear-gradient(135deg, ${tool.color}18 0%, ${tool.color}08 100%)`,
               borderColor: `${tool.color}35`,
             }}>
          {/* Header */}
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 flex-shrink-0" style={{ color: tool.color }} />
            <span className="font-bold text-xs dark:text-white text-slate-900">{tool.name}</span>
          </div>
          {/* Usage text */}
          <p className="text-xs dark:text-slate-300 text-slate-700 leading-relaxed flex-1 mt-2">
            {tool.usage}
          </p>
          {/* Category pill */}
          <span className="self-start mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: `${tool.color}25`, color: tool.color }}>
            {tool.category}
          </span>
        </div>

      </div>
    </motion.div>
  );
}

/**
 * DeveloperToolbelt — Grid of tools with flip-card hover revealing usage details.
 */
export default function DeveloperToolbelt() {
  return (
    <SectionWrapper id="toolbelt" alternate>
      <SectionHeading
        label="Toolbelt"
        title="Developer"
        highlight="Toolbelt"
        subtitle="The tools I reach for every day — hover a card to see how I use each one."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {tools.map((tool, i) => (
          <ToolCard key={tool.name} tool={tool} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}
