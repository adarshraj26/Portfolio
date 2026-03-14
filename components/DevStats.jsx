"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FiAward,
  FiCode,
  FiCpu,
  FiGitCommit,
  FiLayers,
  FiZap,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Stats data ── */
const STATS = [
  {
    value:     10,
    suffix:    "+",
    label:     "Projects Built",
    desc:      "From AI platforms to cloud-native apps",
    icon:      FiCode,
    gradient:  "from-cyan-400 to-blue-500",
    bg:        "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
  {
    value:     15,
    suffix:    "+",
    label:     "Technologies",
    desc:      "Languages, frameworks, tools & platforms",
    icon:      FiLayers,
    gradient:  "from-violet-400 to-purple-500",
    bg:        "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    value:     1200,
    suffix:    "+",
    label:     "GitHub Commits",
    desc:      "Consistent contributions over the past year",
    icon:      FiGitCommit,
    gradient:  "from-emerald-400 to-teal-500",
    bg:        "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
  {
    value:     3,
    suffix:    "",
    label:     "Hackathons",
    desc:      "Competed and shipped under time pressure",
    icon:      FiZap,
    gradient:  "from-amber-400 to-orange-500",
    bg:        "bg-amber-500/10",
    iconColor: "text-amber-400",
  },
  {
    value:     3,
    suffix:    "+",
    label:     "Years Learning",
    desc:      "Continuous self-driven growth",
    icon:      FiAward,
    gradient:  "from-blue-400 to-indigo-500",
    bg:        "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    value:     3,
    suffix:    "+",
    label:     "Certifications",
    desc:      "Cloud, AI, and full-stack credentials",
    icon:      FiCpu,
    gradient:  "from-pink-400 to-rose-500",
    bg:        "bg-pink-500/10",
    iconColor: "text-pink-400",
  },
];

/* ── Animated counter hook ── */
function useCounter(target, duration, active) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    setCount(0);
    const steps    = 60;
    const increment = target / steps;
    const interval  = duration / steps;
    let current     = 0;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      setCount(Math.floor(current));
      if (current >= target) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

/* ── Individual stat card ── */
function StatCard({ stat, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const count = useCounter(stat.value, 1800, inView);
  const Icon  = stat.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="relative group dark:bg-slate-800/60 bg-white rounded-2xl p-6
                 border dark:border-slate-700/50 border-slate-200
                 hover:border-cyan-500/40 hover:-translate-y-1.5
                 hover:shadow-[0_12px_40px_rgba(0,0,0,0.2),0_0_0_1px_rgba(6,182,212,0.15)]
                 transition-all duration-300 overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.gradient}
                    opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 rounded-2xl`}
      />

      {/* Top accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${stat.gradient} rounded-t-2xl`} />

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${stat.bg} mb-4`}>
        <Icon className={`w-6 h-6 ${stat.iconColor}`} />
      </div>

      {/* Counter */}
      <p
        className={`text-4xl font-black mb-1 bg-gradient-to-r ${stat.gradient}
                    bg-clip-text text-transparent tabular-nums leading-none`}
      >
        {count.toLocaleString()}{stat.suffix}
      </p>

      {/* Label */}
      <p className="text-sm font-bold dark:text-white text-slate-900 mb-1">
        {stat.label}
      </p>

      {/* Description */}
      <p className="text-xs dark:text-slate-500 text-slate-500 leading-relaxed">
        {stat.desc}
      </p>
    </motion.div>
  );
}

/* ── Section ── */
export default function DevStats() {
  return (
    <SectionWrapper id="dev-stats">
      <SectionHeading
        label="By The Numbers"
        title="Developer"
        highlight="Stats"
        subtitle="A data-driven snapshot of my journey — projects shipped, technologies mastered, and milestones hit."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {STATS.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} />
        ))}
      </div>

      {/* Decorative bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center text-xs dark:text-slate-600 text-slate-400 mt-8 font-mono"
      >
        Numbers updated as of 2025 · growing every day
      </motion.p>
    </SectionWrapper>
  );
}
