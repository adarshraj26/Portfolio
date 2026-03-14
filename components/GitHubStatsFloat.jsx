"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";

const GITHUB_USERNAME = "adarshraj26";

/**
 * GitHubStatsFloat — Floating card that fetches live GitHub stats.
 * Falls back to static values if the API is unavailable.
 */
export default function GitHubStatsFloat() {
  const [stats, setStats] = useState({ repos: "—", stars: "—", followers: "—" });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
          ),
        ]);
        if (!userRes.ok || !reposRes.ok) return;
        const user = await userRes.json();
        const repos = await reposRes.json();
        const stars = Array.isArray(repos)
          ? repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
          : 0;
        setStats({
          repos: user.public_repos ?? "—",
          stars,
          followers: user.followers ?? "—",
        });
      } catch {
        // keep loading fallback
      }
    }
    fetchStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.9, duration: 0.7 }}
      className="absolute top-16 right-6 hidden xl:block pointer-events-none"
    >
      <div
        className="dark:bg-slate-800/70 bg-white/90 backdrop-blur-sm
                   border dark:border-slate-700/50 border-slate-200
                   rounded-2xl p-4 shadow-card w-48
                   animate-[float_8s_ease-in-out_infinite]"
      >
        <div className="flex items-center gap-2 mb-3">
          <FiGithub className="w-3.5 h-3.5 text-cyan-400" />
          <p className="text-xs dark:text-slate-500 text-slate-400 font-semibold uppercase tracking-wider">
            GitHub Stats
          </p>
        </div>
        <div className="space-y-2">
          {[
            { label: "Repos", val: String(stats.repos) },
            { label: "Stars", val: String(stats.stars) },
            { label: "Followers", val: String(stats.followers) },
          ].map(({ label, val }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs dark:text-slate-400 text-slate-600">
                {label}
              </span>
              <span className="text-xs font-bold text-cyan-400">{val}</span>
            </div>
          ))}
          <div className="h-px dark:bg-slate-700/60 bg-slate-200 my-1" />
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">
              Available for work
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
