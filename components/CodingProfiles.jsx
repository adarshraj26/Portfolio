"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiAward, FiExternalLink } from "react-icons/fi";
import { SiHackerrank, SiLeetcode } from "react-icons/si";

const LEETCODE_USERNAME = "Adarsh_Raj26";
const HACKERRANK_USERNAME = "adarshraj26";

/* HackerRank has no public API — update these to match your actual badges */
const hrBadges = [
  // { label: "Problem Solving", stars: 5, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  // { label: "Python",          stars: 5, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { label: "SQL",             stars: 4, color: "text-amber-400  bg-amber-500/10  border-amber-500/20"  },
  { label: "CPP",            stars: 1, color: "text-amber-400  bg-amber-500/10  border-amber-500/20"  },
];

export default function CodingProfiles() {
  const [lc, setLc]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLC() {
      try {
        const res = await fetch(
          `https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`
        );
        if (!res.ok) throw new Error();
        const data = await res.json();
        setLc(data);
      } catch {
        /* show fallback */
      } finally {
        setLoading(false);
      }
    }
    fetchLC();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-10"
    >
      <p className="text-xs font-semibold dark:text-slate-500 text-slate-400 uppercase tracking-widest text-center mb-5">
        Coding Activity
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* ── LeetCode ── */}
        <a
          href={`https://leetcode.com/${LEETCODE_USERNAME}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="dark:bg-slate-800/60 bg-white rounded-2xl p-5
                     border dark:border-slate-700/50 border-slate-200
                     hover:border-amber-500/40 hover:shadow-card-hover
                     transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <SiLeetcode className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white text-slate-900">LeetCode</p>
                <p className="text-xs dark:text-slate-500 text-slate-400">
                  @{LEETCODE_USERNAME}
                </p>
              </div>
            </div>

            <div className="text-2xl font-black text-amber-400">
              {loading ? (
                <span className="animate-pulse">—</span>
              ) : (
                lc?.totalSolved ?? "—"
              )}
            </div>
          </div>

          {!loading && lc ? (
            <div className="flex gap-2">
              {[
                { label: "Easy",   val: lc.easySolved,   cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
                { label: "Medium", val: lc.mediumSolved, cls: "text-amber-400  bg-amber-500/10  border-amber-500/20"  },
                { label: "Hard",   val: lc.hardSolved,   cls: "text-red-400   bg-red-500/10   border-red-500/20"   },
              ].map(({ label, val, cls }) => (
                <div
                  key={label}
                  className={`flex-1 text-center py-1.5 rounded-lg border text-xs font-semibold ${cls}`}
                >
                  <div>{val ?? "—"}</div>
                  <div className="text-[10px] opacity-70">{label}</div>
                </div>
              ))}
            </div>
          ) : !loading ? (
            <p className="text-xs dark:text-slate-500 text-slate-400 flex items-center gap-1">
              <FiExternalLink className="w-3 h-3" /> View profile on LeetCode
            </p>
          ) : (
            <div className="h-8 dark:bg-slate-700/40 bg-slate-100 rounded-lg animate-pulse" />
          )}
        </a>

        {/* ── HackerRank ── */}
        <a
          href={`https://www.hackerrank.com/${HACKERRANK_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="dark:bg-slate-800/60 bg-white rounded-2xl p-5
                     border dark:border-slate-700/50 border-slate-200
                     hover:border-emerald-500/40 hover:shadow-card-hover
                     transition-all duration-300 group"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <SiHackerrank className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-bold dark:text-white text-slate-900">HackerRank</p>
              <p className="text-xs dark:text-slate-500 text-slate-400">
                @{HACKERRANK_USERNAME}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {hrBadges.map(({ label, stars, color }) => (
              <div
                key={label}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-medium ${color}`}
              >
                <FiAward className="w-3 h-3" />
                <span className="dark:text-slate-300 text-slate-700">{label}</span>
                <span className="text-[10px] font-bold">{"★".repeat(stars)}</span>
              </div>
            ))}
          </div>
        </a>
      </div>
    </motion.div>
  );
}
