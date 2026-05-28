"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiInfo, FiX } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Architecture data for each featured project ── */
const ARCH_PROJECTS = [
  {
    id:       "complaint-routing",
    title:    "Complaint Routing System",
    category: "AI/ML Routing",
    gradient: "from-red-500 to-rose-600",
    rows: [
      [
        {
          id:       "ingestion",
          label:    "Multimodal Ingestion",
          sublabel: "Citizen Inputs",
          icon:     "📝",
          gradient: "from-slate-500 to-slate-600",
          detail:   "Ingests citizen complaints via multilingual text, recorded audio statements, or uploaded video files of local infrastructure issues.",
        },
      ],
      [
        {
          id:       "media-processing",
          label:    "Media Processing",
          sublabel: "ASR & Keyframes",
          icon:     "⚙️",
          gradient: "from-amber-500 to-orange-500",
          detail:   "Processes media assets locally: transcribes speech with Whisper-Tiny, extracts acoustic features using Librosa, and captures video keyframes with OpenCV.",
        },
      ],
      [
        {
          id:       "embeddings",
          label:    "Sentence Transformers",
          sublabel: "Semantic Vector",
          icon:     "🤖",
          gradient: "from-violet-500 to-purple-600",
          detail:   "Maps multilingual texts into a shared 384-dimensional vector space using paraphrase-multilingual-MiniLM-L12-v2, aligning different languages semantically.",
        },
      ],
      [
        {
          id:       "ml-models",
          label:    "Predictive ML Models",
          sublabel: "Priority & ETA",
          icon:     "🧠",
          gradient: "from-red-500 to-rose-500",
          detail:   "Scikit-learn Logistic Regression classifies severity (93.3% accuracy), and a Random Forest Regressor estimates resolution ETA (Mean Absolute Error of ~2.25 days).",
        },
        {
          id:       "faiss-index",
          label:    "FAISS Semantic Index",
          sublabel: "Similarity Search",
          icon:     "🔍",
          gradient: "from-cyan-500 to-blue-500",
          detail:   "Runs sub-millisecond inner-product vector search using Meta's FAISS to find the top-5 most similar historical complaints for context.",
        },
      ],
      [
        {
          id:       "routing-engine",
          label:    "Smart Routing Engine",
          sublabel: "Smart Assignment",
          icon:     "🎯",
          gradient: "from-pink-500 to-rose-600",
          detail:   "Routes complaints using a composite score of semantic cosine similarity, zone preference, language compatibility, and active officer workload.",
        },
      ],
      [
        {
          id:       "streamlit-ui",
          label:    "Streamlit Dashboard",
          sublabel: "Command Center",
          icon:     "📊",
          gradient: "from-emerald-500 to-teal-600",
          detail:   "Provides municipal officers with an interactive command center to review complaints, play audio, view keyframes, inspect predictions, and manage assignments.",
        },
      ],
    ],
  },
  {
    id:       "sensai",
    title:    "SensAI",
    category: "AI Career Coach",
    gradient: "from-cyan-500 to-blue-600",
    rows: [
      [
        {
          id:       "browser",
          label:    "User Browser",
          sublabel: "Entry Point",
          icon:     "🌐",
          gradient: "from-slate-500 to-slate-600",
          detail:   "Users access the platform via any modern browser. Next.js handles server-side rendering for fast first-paint and good SEO, then React takes over for client interactions.",
        },
      ],
      [
        {
          id:       "nextjs",
          label:    "Next.js + React",
          sublabel: "Frontend",
          icon:     "⚛️",
          gradient: "from-cyan-500 to-blue-500",
          detail:   "Built with Next.js App Router and React 18. Tailwind CSS provides responsive, utility-first design. Client components manage local state; server components fetch data directly.",
        },
      ],
      [
        {
          id:       "api",
          label:    "Next.js API Routes",
          sublabel: "Server Layer",
          icon:     "⚙️",
          gradient: "from-blue-500 to-indigo-600",
          detail:   "Server-side API routes handle authentication (Clerk), input validation, rate limiting, and coordinate between AI and database layers. Runs on the Node.js runtime.",
        },
      ],
      [
        {
          id:       "prisma",
          label:    "Prisma ORM",
          sublabel: "Data Layer",
          icon:     "🔄",
          gradient: "from-violet-500 to-purple-600",
          detail:   "Type-safe ORM manages PostgreSQL schema, migrations, and queries. Enforces data integrity with relationship tracking and provides a clean query API.",
        },
        {
          id:       "gemini",
          label:    "Gemini AI",
          sublabel: "AI Engine",
          icon:     "🤖",
          gradient: "from-amber-500 to-orange-500",
          detail:   "Google Gemini API powers AI features: resume generation, AI mock interview Q&A, cover letter drafting, and career insights. Prompts are structured server-side for consistent outputs.",
        },
      ],
      [
        {
          id:       "db",
          label:    "PostgreSQL",
          sublabel: "Database",
          icon:     "🗄️",
          gradient: "from-emerald-500 to-teal-600",
          detail:   "Relational database stores user profiles, resumes, interview sessions, and career progression data. Full ACID compliance guarantees data consistency.",
        },
      ],
    ],
  },
  {
    id:       "jobtracker",
    title:    "JobTracker",
    category: "Application Tracker",
    gradient: "from-blue-500 to-indigo-600",
    rows: [
      [
        {
          id:       "browser",
          label:    "User Browser",
          sublabel: "Entry Point",
          icon:     "🌐",
          gradient: "from-slate-500 to-slate-600",
          detail:   "React SPA served globally from Vercel's edge network for low-latency access. Browser handles client-side routing via React Router.",
        },
      ],
      [
        {
          id:       "react",
          label:    "React + TypeScript",
          sublabel: "Frontend",
          icon:     "⚛️",
          gradient: "from-blue-500 to-cyan-500",
          detail:   "Single-page app with TypeScript for full type safety. Features interactive dashboards, kanban application boards, analytics charts, and document management UI.",
        },
      ],
      [
        {
          id:       "express",
          label:    "Express.js REST API",
          sublabel: "Backend",
          icon:     "🚀",
          gradient: "from-indigo-500 to-violet-600",
          detail:   "RESTful API built with Node.js and Express. JWT-based authentication, Zod schema validation, organized route controllers, and middleware error handling.",
        },
      ],
      [
        {
          id:       "mongo",
          label:    "MongoDB Atlas",
          sublabel: "Database",
          icon:     "🗄️",
          gradient: "from-emerald-500 to-green-600",
          detail:   "Flexible document store for job applications, status history, notes, and user files. MongoDB Atlas provides managed cloud hosting, automated backups, and global clusters.",
        },
      ],
    ],
  },
  {
    id:       "hirrd",
    title:    "Hirrd",
    category: "Job Portal",
    gradient: "from-sky-500 to-cyan-500",
    rows: [
      [
        {
          id:       "browser",
          label:    "User Browser",
          sublabel: "Entry Point",
          icon:     "🌐",
          gradient: "from-slate-500 to-slate-600",
          detail:   "Job seekers and employers access the platform through the browser. The app detects user roles and renders a distinct dashboard for each.",
        },
      ],
      [
        {
          id:       "react",
          label:    "React",
          sublabel: "Frontend",
          icon:     "⚛️",
          gradient: "from-sky-500 to-cyan-500",
          detail:   "React SPA with Tailwind CSS. Role-based routing shows job seekers a discovery feed while employers see their listing and applicant management dashboard.",
        },
      ],
      [
        {
          id:       "node",
          label:    "Node.js",
          sublabel: "Backend",
          icon:     "🖥️",
          gradient: "from-cyan-500 to-teal-500",
          detail:   "Node.js server handles authentication, job CRUD operations, application submissions, multi-criteria search, and filtering logic with pagination.",
        },
      ],
      [
        {
          id:       "mongo",
          label:    "MongoDB",
          sublabel: "Database",
          icon:     "🗄️",
          gradient: "from-emerald-500 to-green-600",
          detail:   "NoSQL database storing job listings, applications, and user profiles. Flexible schema easily extends to both employer and job seeker data shapes.",
        },
      ],
    ],
  },
  {
    id:       "carrental",
    title:    "Car Rental",
    category: "Cloud Platform",
    gradient: "from-emerald-500 to-teal-500",
    rows: [
      [
        {
          id:       "browser",
          label:    "User Browser",
          sublabel: "Entry Point",
          icon:     "🌐",
          gradient: "from-slate-500 to-slate-600",
          detail:   "React app served from AWS S3 + CloudFront CDN for globally distributed, low-latency delivery with no server management.",
        },
      ],
      [
        {
          id:       "react",
          label:    "React",
          sublabel: "Frontend",
          icon:     "⚛️",
          gradient: "from-emerald-400 to-teal-500",
          detail:   "React SPA for browsing vehicles, booking management, and account pages. Fully responsive for mobile and desktop users.",
        },
      ],
      [
        {
          id:       "lambda",
          label:    "AWS Lambda",
          sublabel: "Serverless API",
          icon:     "⚡",
          gradient: "from-amber-500 to-orange-500",
          detail:   "Serverless functions auto-scale on demand with zero idle cost. Each Lambda handles a specific operation — listing vehicles, creating bookings, processing payments, sending confirmations.",
        },
      ],
      [
        {
          id:       "dynamo",
          label:    "AWS DynamoDB",
          sublabel: "Database",
          icon:     "🗄️",
          gradient: "from-blue-500 to-indigo-600",
          detail:   "Fully managed NoSQL key-value store with single-digit millisecond latency. Stores vehicle inventory, booking records, and user data with automatic scaling.",
        },
      ],
    ],
  },
];

/* ── Single architecture node ── */
function ArchNode({ node, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center text-center px-4 py-3.5 rounded-xl w-full
        min-w-[120px] max-w-[180px] mx-auto
        border transition-all duration-200 cursor-pointer select-none
        ${isActive
          ? "dark:bg-slate-700/90 bg-white border-cyan-400/70 shadow-[0_0_24px_rgba(6,182,212,0.25)]"
          : "dark:bg-slate-800/70 bg-white/80 dark:border-slate-700/50 border-slate-200 hover:border-cyan-500/50 hover:-translate-y-0.5 hover:shadow-md"
        }
      `}
    >
      {/* Top accent bar */}
      <div className={`absolute top-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r ${node.gradient}`} />

      <span className="text-2xl mb-1.5 mt-0.5">{node.icon}</span>
      <span className="text-xs font-bold dark:text-white text-slate-900 leading-tight">{node.label}</span>
      <span
        className={`mt-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full
                    bg-gradient-to-r ${node.gradient} text-white`}
      >
        {node.sublabel}
      </span>

      {/* Info hint */}
      <FiInfo
        className={`absolute top-2 right-2 w-3 h-3 transition-colors
                    ${isActive ? "text-cyan-400" : "dark:text-slate-600 text-slate-300"}`}
      />
    </button>
  );
}

/* ── Component ── */
export default function ProjectArchitecture() {
  const [activeProject, setActiveProject] = useState(0);
  const [activeNode, setActiveNode]       = useState(null);

  const project     = ARCH_PROJECTS[activeProject];
  const activeDetail = project.rows.flat().find((n) => n.id === activeNode);

  function handleNodeClick(nodeId) {
    setActiveNode(activeNode === nodeId ? null : nodeId);
  }

  function switchProject(idx) {
    setActiveProject(idx);
    setActiveNode(null);
  }

  return (
    <SectionWrapper id="architecture" alternate>
      <SectionHeading
        label="Architecture"
        title="Project"
        highlight="Diagrams"
        subtitle="Visualize how each project is built — click any component to explore its role."
      />

      {/* Project selector tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {ARCH_PROJECTS.map((p, i) => (
          <button
            key={p.id}
            onClick={() => switchProject(i)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
              ${activeProject === i
                ? `bg-gradient-to-r ${p.gradient} text-white border-transparent shadow-md scale-105`
                : "dark:bg-slate-800/50 bg-white dark:text-slate-300 text-slate-700 dark:border-slate-700/50 border-slate-200 hover:border-cyan-500/50 hover:text-cyan-400"
              }`}
          >
            <span className="hidden sm:inline">{p.title}</span>
            <span className="sm:hidden">{p.title.split(" ")[0]}</span>
          </button>
        ))}
      </motion.div>

      {/* Diagram area */}
      <div className="max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          >
            {/* Flow diagram */}
            <div className="flex flex-col items-center">
              {project.rows.map((row, rowIdx) => (
                <div key={rowIdx} className="w-full flex flex-col items-center">

                  {/* Connector arrow from previous row */}
                  {rowIdx > 0 && (
                    <div className="flex flex-col items-center py-1">
                      <div className="w-px h-5 dark:bg-slate-700 bg-slate-300" />
                      <FiChevronDown className="w-4 h-4 -mt-1 dark:text-slate-500 text-slate-400" />
                    </div>
                  )}

                  {/* Row of nodes */}
                  <div className="relative flex items-center justify-center gap-4 w-full">
                    {/* Horizontal dashed connector for parallel nodes */}
                    {row.length > 1 && (
                      <div
                        className="absolute top-1/2 -translate-y-1/2 left-[calc(50%-90px)] right-[calc(50%-90px)]
                                   border-t-2 border-dashed dark:border-slate-700 border-slate-300 pointer-events-none"
                      />
                    )}

                    {row.map((node) => (
                      <motion.div
                        key={node.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="z-10 flex-1"
                        style={{ maxWidth: 180 }}
                      >
                        <ArchNode
                          node={node}
                          isActive={activeNode === node.id}
                          onClick={() => handleNodeClick(node.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Detail panel */}
            <AnimatePresence>
              {activeDetail && (
                <motion.div
                  key={activeDetail.id}
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: 8, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-6"
                >
                  <div
                    className="dark:bg-slate-800/80 bg-white rounded-2xl p-4
                               border dark:border-slate-700/50 border-slate-200"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-0.5 flex-shrink-0">{activeDetail.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="font-bold dark:text-white text-slate-900">
                            {activeDetail.label}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-full
                                        bg-gradient-to-r ${activeDetail.gradient} text-white`}
                          >
                            {activeDetail.sublabel}
                          </span>
                        </div>
                        <p className="text-sm dark:text-slate-300 text-slate-600 leading-relaxed">
                          {activeDetail.detail}
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveNode(null)}
                        className="flex-shrink-0 dark:text-slate-600 text-slate-400
                                   hover:text-red-400 transition-colors mt-0.5"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!activeNode && (
              <p className="text-center text-xs dark:text-slate-600 text-slate-400 mt-6 font-mono">
                Click any component to see its role in the architecture
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionWrapper>
  );
}
