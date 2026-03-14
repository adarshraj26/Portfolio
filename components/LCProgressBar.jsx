"use client";

import { motion } from "framer-motion";

/**
 * LCProgressBar — Animated horizontal progress bar for Easy / Medium / Hard.
 * Props:
 *   label       string  — "Easy" | "Medium" | "Hard"
 *   solved      number  — questions solved at this difficulty
 *   total       number  — total questions at this difficulty
 *   colorFrom   string  — Tailwind gradient start class
 *   colorTo     string  — Tailwind gradient end class
 *   textColor   string  — Tailwind text class for the label
 *   delay       number  — animation delay in seconds
 */
export default function LCProgressBar({
  label,
  solved,
  total,
  colorFrom,
  colorTo,
  textColor,
  delay = 0,
}) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className={`font-semibold ${textColor}`}>{label}</span>
        <span className="dark:text-slate-400 text-slate-500 font-mono">
          {solved}
          <span className="dark:text-slate-600 text-slate-400"> / {total}</span>
          <span className="ml-1.5 dark:text-slate-500 text-slate-400">({pct}%)</span>
        </span>
      </div>

      {/* Track */}
      <div className="h-2 rounded-full dark:bg-slate-700/60 bg-slate-200 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorFrom} ${colorTo}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
