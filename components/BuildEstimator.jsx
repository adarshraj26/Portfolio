"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiArrowRight, FiClock, FiCpu, FiLayers, FiZap } from "react-icons/fi";
import { SiGoogle } from "react-icons/si";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

const COMPLEXITY_COLOR = {
  Simple:     "text-emerald-400 bg-emerald-500/15 border-emerald-500/30",
  Medium:     "text-blue-400 bg-blue-500/15 border-blue-500/30",
  Complex:    "text-violet-400 bg-violet-500/15 border-violet-500/30",
  Enterprise: "text-rose-400 bg-rose-500/15 border-rose-500/30",
};

const RESULT_CARDS = [
  { key: "techStack",    label: "Tech Stack",    icon: FiCpu,    color: "from-cyan-500 to-blue-500",     accent: "border-l-cyan-500",   text: "text-cyan-400" },
  { key: "approach",     label: "Approach",      icon: FiLayers, color: "from-blue-500 to-indigo-500",   accent: "border-l-blue-500",   text: "text-blue-400" },
  { key: "keyFeatures",  label: "Key Features",  icon: FiZap,    color: "from-violet-500 to-purple-500", accent: "border-l-violet-500", text: "text-violet-400" },
  { key: "timeline",     label: "Timeline",      icon: FiClock,  color: "from-emerald-500 to-teal-500",  accent: "border-l-emerald-500",text: "text-emerald-400" },
];

/**
 * BuildEstimator — "Build this for me" AI estimator section.
 * Visitor describes a project idea; Gemini returns tech stack,
 * timeline, complexity, and key features.
 */
export default function BuildEstimator() {
  const [idea, setIdea]     = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const estimate = async () => {
    if (idea.trim().length < 10) {
      setError("Please describe your idea in a bit more detail.");
      return;
    }
    setError("");
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/build-estimator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setResult(data); }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="estimator" alternate>
      <SectionHeading
        label="AI Estimator"
        title="Build This"
        highlight="For Me"
        subtitle="Describe your project idea and get an instant AI-powered tech stack recommendation, timeline estimate, and build approach."
      />

      {/* Input area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <div className="dark:bg-slate-800/60 bg-white rounded-2xl border dark:border-slate-700/50 border-slate-200 p-6 shadow-sm">
          <label className="block text-sm font-semibold dark:text-slate-300 text-slate-700 mb-3">
            Describe your project idea
          </label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) estimate(); }}
            placeholder="e.g. A mobile app that lets users track their daily water intake, set reminders, and see weekly progress charts..."
            rows={4}
            className="w-full resize-none rounded-xl px-4 py-3 text-sm
                       dark:bg-slate-900/60 bg-slate-50
                       dark:text-slate-200 text-slate-800
                       dark:border-slate-700 border-slate-200 border
                       dark:placeholder-slate-600 placeholder-slate-400
                       focus:outline-none focus:ring-2 focus:ring-cyan-500/40
                       transition-all duration-200"
          />
          {error && (
            <p className="mt-2 text-xs text-red-400">{error}</p>
          )}
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs dark:text-slate-600 text-slate-400 font-mono">
              Ctrl+Enter to submit
            </p>
            <button
              onClick={estimate}
              disabled={loading || idea.trim().length < 10}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                         bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                         hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed
                         transition-all duration-200 shadow-glow-cyan"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Analysing…
                </>
              ) : (
                <>
                  <SiGoogle className="w-4 h-4" />
                  Estimate
                  <FiArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 space-y-4"
            >
              {/* Complexity badge */}
              <div className="flex items-center justify-between">
                <p className="text-xs font-mono dark:text-slate-500 text-slate-400 uppercase tracking-widest">
                  Estimation complete
                </p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${COMPLEXITY_COLOR[result.complexity] ?? COMPLEXITY_COLOR.Medium}`}>
                  {result.complexity} Project
                </span>
              </div>

              {/* 4 detail cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {RESULT_CARDS.map((card, i) => {
                  const Icon = card.icon;
                  return (
                    <motion.div
                      key={card.key}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className={`dark:bg-slate-800 bg-white rounded-xl border-l-4 border
                                  dark:border-slate-700/50 border-slate-200
                                  ${card.accent} p-4 shadow-sm`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-6 h-6 rounded-lg bg-gradient-to-br ${card.color}
                                         flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-wider ${card.text}`}>
                          {card.label}
                        </span>
                      </div>
                      <p className="text-sm dark:text-slate-200 text-slate-700 leading-relaxed">
                        {result[card.key]}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Reset */}
              <div className="text-center">
                <button
                  onClick={() => { setResult(null); setIdea(""); }}
                  className="text-xs dark:text-slate-500 text-slate-400 hover:text-cyan-400 transition-colors font-mono"
                >
                  Try another idea →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
