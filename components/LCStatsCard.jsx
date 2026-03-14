"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * LCStatsCard — Animated counter stat card.
 * Props:
 *   icon        ReactNode  — icon element
 *   label       string     — card label
 *   value       number|string — the stat value
 *   suffix      string     — appended after value (e.g. "%", "#")
 *   prefix      string     — prepended before value
 *   colorClass  string     — Tailwind text/bg color for icon bg
 *   iconColor   string     — Tailwind text color for icon
 *   delay       number     — animation delay in seconds
 *   animate     boolean    — whether to run counter animation (disable for strings)
 */
function useCounter(target, duration = 1500, active = true, isNumber = true) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active || !isNumber) return;
    const start = performance.now();
    const run = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(run);
      else setCount(target);
    };
    rafRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(rafRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, active]);

  return count;
}

export default function LCStatsCard({
  icon,
  label,
  value,
  suffix = "",
  prefix = "",
  colorClass = "bg-cyan-500/10",
  iconColor = "text-cyan-400",
  delay = 0,
  animate = true,
}) {
  const [active, setActive] = useState(false);
  const isNumber = typeof value === "number";

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  const counted = useCounter(isNumber ? value : 0, 1400, active, isNumber);
  const display = isNumber ? counted : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`dark:bg-slate-800/60 rounded-2xl p-4
                 border dark:border-slate-700/50 border-slate-200
                 shadow-sm hover:shadow-md transition-shadow duration-200
                 ${label === "Total Solved" ? "bg-cyan-100" :
                   label === "Global Rank" ? "bg-purple-100" :
                   label === "Acceptance" ? "bg-emerald-100" :
                   label === "Contribution" ? "bg-yellow-100" :
                   "bg-white"}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
          <span className={iconColor}>{icon}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-medium dark:text-slate-500 text-slate-500 uppercase tracking-wide leading-none mb-1">
            {label}
          </p>
          <p className="text-xl font-bold dark:text-white text-slate-900 font-mono leading-none">
            {prefix}{display}{suffix}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
