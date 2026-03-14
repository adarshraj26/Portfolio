"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiCpu, FiLayers, FiX, FiZap } from "react-icons/fi";
import { SiOpenai } from "react-icons/si";

/* ── Section config ── */
const SECTIONS = [
  {
    key: "architecture",
    label: "Architecture",
    icon: FiLayers,
    color: "from-cyan-500 to-blue-500",
    bg: "dark:bg-slate-800 bg-white",
    border: "dark:border-cyan-500/40 border-cyan-200",
    accent: "dark:border-l-cyan-500 border-l-cyan-400",
    iconColor: "text-cyan-400",
  },
  {
    key: "techStack",
    label: "Tech Stack",
    icon: FiCpu,
    color: "from-blue-500 to-indigo-500",
    bg: "dark:bg-slate-800 bg-white",
    border: "dark:border-blue-500/40 border-blue-200",
    accent: "dark:border-l-blue-500 border-l-blue-400",
    iconColor: "text-blue-400",
  },
  {
    key: "challenges",
    label: "Challenges",
    icon: FiZap,
    color: "from-violet-500 to-purple-500",
    bg: "dark:bg-slate-800 bg-white",
    border: "dark:border-violet-500/40 border-violet-200",
    accent: "dark:border-l-violet-500 border-l-violet-400",
    iconColor: "text-violet-400",
  },
  {
    key: "howItWorks",
    label: "How It Works",
    icon: SiOpenai,
    color: "from-emerald-500 to-teal-500",
    bg: "dark:bg-slate-800 bg-white",
    border: "dark:border-emerald-500/40 border-emerald-200",
    accent: "dark:border-l-emerald-500 border-l-emerald-400",
    iconColor: "text-emerald-400",
  },
];

/* ── Skeleton card ── */
function SkeletonCard() {
  return (
    <div className="rounded-xl border dark:border-slate-700/40 border-slate-200 p-4 space-y-2 animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg dark:bg-slate-700 bg-slate-200" />
        <div className="h-4 w-24 rounded dark:bg-slate-700 bg-slate-200" />
      </div>
      <div className="h-3 rounded dark:bg-slate-700/60 bg-slate-100 w-full" />
      <div className="h-3 rounded dark:bg-slate-700/60 bg-slate-100 w-5/6" />
      <div className="h-3 rounded dark:bg-slate-700/60 bg-slate-100 w-4/6" />
    </div>
  );
}

/**
 * ProjectExplainerModal — opens when "Explain" is clicked on a project card.
 * Fetches /api/explain-project and renders 4 structured sections.
 */
export default function ProjectExplainerModal({ project, onClose }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  /* Close on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* Fetch explanation */
  useEffect(() => {
    fetch("/api/explain-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title:       project.title,
        description: project.description,
        tech:        project.tech,
        features:    project.features,
        category:    project.category,
      }),
    })
      .then((r) => r.json())
      .then(setData)
      .catch(() => setError(true));
  }, [project]);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
      />

      {/* Panel */}
      <motion.div
        key="panel"
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-2xl max-h-[90vh] overflow-y-auto
                        dark:bg-slate-900 bg-white rounded-2xl shadow-2xl
                        border dark:border-slate-700/50 border-slate-200">

          {/* ── Header ── */}
          <div className="sticky top-0 z-10 dark:bg-slate-900 bg-white
                          border-b dark:border-slate-800 border-slate-100
                          px-6 py-4 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${project.gradient}
                               flex items-center justify-center flex-shrink-0`}>
                <span className="text-base">🤖</span>
              </div>
              <div>
                <p className="text-xs font-medium text-cyan-400 mb-0.5 uppercase tracking-wider">
                  AI Explains
                </p>
                <h2 className="font-bold dark:text-white text-slate-900 text-sm leading-snug">
                  {project.title}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                         dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-500
                         hover:text-red-400 hover:dark:bg-slate-700 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>

          {/* ── Content ── */}
          <div className="p-6 grid sm:grid-cols-2 gap-4">
            {error ? (
              <div className="sm:col-span-2 text-center py-8">
                <p className="text-slate-400 text-sm">
                  Could not generate explanation. Please try again.
                </p>
              </div>
            ) : !data ? (
              /* Loading skeletons */
              SECTIONS.map((s) => <SkeletonCard key={s.key} />)
            ) : (
              /* Populated sections */
              SECTIONS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.key}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className={`rounded-xl border-l-4 border ${s.bg} ${s.border} ${s.accent} p-4 shadow-sm`}
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${s.color}
                                       flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-wider ${s.iconColor}`}>
                        {s.label}
                      </span>
                    </div>
                    <p className="text-sm dark:text-slate-100 text-slate-800 leading-relaxed">
                      {data[s.key]}
                    </p>
                  </motion.div>
                );
              })
            )}
          </div>

          {/* ── Footer ── */}
          <div className="px-6 pb-5">
            <p className="text-xs dark:text-slate-600 text-slate-400 text-center">
              {process.env.NEXT_PUBLIC_HAS_GEMINI
                ? "Powered by Gemini 1.5 Flash"
                : "Generated from project metadata"}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
