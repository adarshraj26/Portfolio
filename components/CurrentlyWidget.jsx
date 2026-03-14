"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

/* ── What I'm currently up to ── */
const CURRENTLY = [
  {
    emoji: "📚",
    category: "Learning",
    items: ["Next.js 15", "TypeScript (Advanced)", "System Design"],
  },
  {
    emoji: "🔨",
    category: "Building",
    items: ["AI-powered portfolio projects", "Open source contributions"],
  },
  {
    emoji: "🎯",
    category: "Goals",
    items: ["Land first full-time role", "Contribute to 3 OSS projects"],
  },
  {
    emoji: "🔥",
    category: "Streak",
    items: ["Daily coding · GitHub streak going"],
  },
];

/* ── Component ── */
export default function CurrentlyWidget() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="w-56"
      >
        {/* Header / toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between gap-2
                     dark:bg-slate-800/90 bg-white/90 backdrop-blur-sm
                     border dark:border-slate-700/60 border-slate-200
                     rounded-xl px-3 py-2.5 shadow-lg
                     dark:text-slate-300 text-slate-700
                     hover:border-cyan-500/50 hover:text-cyan-400
                     transition-all duration-200"
        >
          <div className="flex items-center gap-2">
            <span className="relative flex">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-75" />
            </span>
            <span className="text-xs font-semibold">Currently</span>
          </div>
          {expanded
            ? <FiChevronDown className="w-3.5 h-3.5" />
            : <FiChevronUp className="w-3.5 h-3.5" />
          }
        </button>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 4 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: 4 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-1"
            >
              <div
                className="dark:bg-slate-800/90 bg-white/90 backdrop-blur-sm
                           border dark:border-slate-700/60 border-slate-200
                           rounded-xl px-3 py-3 shadow-lg space-y-3"
              >
                {CURRENTLY.map(({ emoji, category, items }) => (
                  <div key={category}>
                    <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase
                                  tracking-widest dark:text-slate-500 text-slate-400 mb-1">
                      <span>{emoji}</span>
                      {category}
                    </p>
                    <ul className="space-y-0.5">
                      {items.map((item) => (
                        <li
                          key={item}
                          className="text-xs dark:text-slate-300 text-slate-700 pl-2
                                     border-l-2 border-cyan-500/40 leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <p className="text-[10px] dark:text-slate-600 text-slate-400 font-mono pt-1 border-t dark:border-slate-700/50 border-slate-200">
                  Updated March 2025
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
