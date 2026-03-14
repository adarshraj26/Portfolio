"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SiHackerrank, SiLeetcode } from "react-icons/si";
import { HackerRankContent } from "./HackerRankDashboard";
import { LeetCodeContent } from "./LeetCodeDashboard";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

const TABS = [
  {
    id:       "leetcode",
    label:    "LeetCode",
    icon:     <SiLeetcode className="w-4 h-4" />,
    iconColor: "text-orange-400",
    active:   "from-orange-500/20 to-yellow-500/10 border-orange-500/40 text-orange-400",
    inactive: "dark:text-slate-400 text-slate-500 hover:text-orange-400 dark:hover:bg-slate-800/60 hover:bg-slate-100",
  },
  {
    id:       "hackerrank",
    label:    "HackerRank",
    icon:     <SiHackerrank className="w-4 h-4" />,
    iconColor: "text-green-400",
    active:   "from-green-500/20 to-emerald-500/10 border-green-500/40 text-green-400",
    inactive: "dark:text-slate-400 text-slate-500 hover:text-green-400 dark:hover:bg-slate-800/60 hover:bg-slate-100",
  },
];

/**
 * CodingStats — Combined tabbed section for LeetCode + HackerRank.
 * Houses both dashboards in one SectionWrapper to save vertical space.
 */
export default function CodingStats({
  leetcodeUsername  = "Adarsh_Raj26",
  hackerrankUsername = "adarshraj26",
}) {
  const [active, setActive] = useState("leetcode");

  return (
    <SectionWrapper id="coding" alternate>
      <SectionHeading
        label="Competitive Coding"
        title="Coding"
        highlight="Stats"
        subtitle="Live stats from LeetCode and HackerRank — switch platforms below."
      />

      {/* ── Tab switcher ── */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex gap-1.5 p-1.5 rounded-2xl
                        dark:bg-slate-800/60 bg-white
                        border dark:border-slate-700/50 border-slate-200 shadow-sm">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                          border transition-all duration-200
                          ${active === tab.id
                            ? `bg-gradient-to-r ${tab.active}`
                            : `border-transparent ${tab.inactive}`
                          }`}
            >
              {tab.icon}
              {tab.label}
              {/* Active indicator dot */}
              {active === tab.id && (
                <motion.span
                  layoutId="coding-tab-dot"
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-current"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab content ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {active === "leetcode" && (
            <LeetCodeContent username={leetcodeUsername} />
          )}
          {active === "hackerrank" && (
            <HackerRankContent username={hackerrankUsername} />
          )}
        </motion.div>
      </AnimatePresence>
    </SectionWrapper>
  );
}
