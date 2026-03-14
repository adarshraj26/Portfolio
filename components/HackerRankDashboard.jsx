"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiAward, FiStar, FiUser, FiZap } from "react-icons/fi";
import { SiHackerrank } from "react-icons/si";
import HRBadgeCard from "./HRBadgeCard";
import LCStatsCard from "./LCStatsCard";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Skeleton ────────────────────────────────────────────── */
function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-lg dark:bg-slate-700/50 bg-slate-200 ${className}`} />;
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20" />)}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-28" />)}
      </div>
    </div>
  );
}

/* ── Error state ─────────────────────────────────────────── */
function ErrorState({ message, onRetry }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
        <SiHackerrank className="w-7 h-7 text-green-400" />
      </div>
      <div>
        <p className="font-semibold dark:text-white text-slate-900 mb-1">Failed to load stats</p>
        <p className="text-sm dark:text-slate-400 text-slate-500">{message}</p>
      </div>
      <button onClick={onRetry}
        className="px-4 py-2 rounded-lg text-sm font-semibold
                   bg-gradient-to-r from-green-500 to-emerald-600 text-white
                   hover:scale-105 transition-transform duration-200"
      >
        Retry
      </button>
    </motion.div>
  );
}

/* ── Tier helpers ─────────────────────────────────────────── */
const TIER_LABEL = ["", "Bronze", "Silver", "Gold", "Platinum", "Diamond"];
const TIER_COLOR = ["", "text-amber-600", "text-slate-400", "text-yellow-400", "text-cyan-400", "text-purple-400"];

function topTier(badges) {
  if (!badges?.length) return { label: "—", color: "text-slate-400" };
  const max = Math.max(...badges.map((b) => b.stars ?? 0));
  return { label: TIER_LABEL[max] ?? `${max}★`, color: TIER_COLOR[max] ?? "text-yellow-400" };
}

/* ── Inner content ───────────────────────────────────────── */
function HackerRankContent({ username }) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  async function fetchStats() {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`/api/hackerrank?username=${encodeURIComponent(username)}`);
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchStats(); }, [username]); // eslint-disable-line react-hooks/exhaustive-deps

  const tier = data ? topTier(data.badges) : null;

  return (
    <>
      {/* Profile link */}
      <div className="flex justify-center mb-8">
        <a href={`https://www.hackerrank.com/profile/${username}`} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     dark:bg-slate-800/60 bg-white border dark:border-slate-700/50 border-slate-200
                     text-sm font-medium dark:text-slate-300 text-slate-600
                     hover:border-green-500/50 hover:text-green-400 transition-all duration-200 shadow-sm"
        >
          <SiHackerrank className="w-4 h-4 text-green-400" />
          hackerrank.com/profile/{username}
        </a>
      </div>

      {loading && <DashboardSkeleton />}
      {!loading && error && <ErrorState message={error} onRetry={fetchStats} />}

      {!loading && !error && data && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <LCStatsCard icon={<FiZap className="w-4 h-4" />} label="Points"
              value={data.points} colorClass="bg-green-500/10" iconColor="text-green-400" delay={0.1} />
            <LCStatsCard icon={<FiUser className="w-4 h-4" />} label="Level"
              value={data.level} colorClass="bg-cyan-500/10" iconColor="text-cyan-400" delay={0.2} />
            <LCStatsCard icon={<FiAward className="w-4 h-4" />} label="Badges"
              value={data.badgeCount} colorClass="bg-purple-500/10" iconColor="text-purple-400" delay={0.3} />
            <LCStatsCard icon={<FiStar className="w-4 h-4" />} label="Top Tier"
              value={tier?.label ?? "—"} colorClass="bg-amber-500/10"
              iconColor={tier?.color ?? "text-amber-400"} animate={false} delay={0.4} />
          </div>

          {data.badges.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold dark:text-white text-slate-900 mb-3 flex items-center gap-2">
                <FiAward className="w-4 h-4 text-green-400" />
                Domain Badges
                <span className="text-xs dark:text-slate-500 text-slate-400 font-normal">
                  ({data.badges.length})
                </span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {data.badges
                  .sort((a, b) => b.stars - a.stars || b.points - a.points)
                  .map((badge, i) => (
                    <HRBadgeCard key={badge.name} name={badge.name}
                      stars={badge.stars} points={badge.points} index={i} />
                  ))}
              </div>
            </div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="dark:bg-slate-800/40 bg-white/60 rounded-2xl p-4
                       border dark:border-slate-700/40 border-slate-200"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest
                          dark:text-slate-500 text-slate-400 mb-3">
              Star Tier Legend
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { stars: 1, label: "Bronze",   color: "text-amber-600"  },
                { stars: 2, label: "Silver",   color: "text-slate-400"  },
                { stars: 3, label: "Gold",     color: "text-yellow-400" },
                { stars: 4, label: "Platinum", color: "text-cyan-400"   },
                { stars: 5, label: "Diamond",  color: "text-purple-400" },
              ].map(({ stars, label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(stars)].map((_, i) => (
                      <svg key={i} viewBox="0 0 20 20" className={`w-3 h-3 ${color}`} fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className={`text-xs font-medium ${color}`}>{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

/* ── Default export ──────────────────────────────────────── */
export default function HackerRankDashboard({ username = "adarshraj26", standalone = true }) {
  if (!standalone) return <HackerRankContent username={username} />;

  return (
    <SectionWrapper id="hackerrank">
      <SectionHeading
        label="Competitive Coding"
        title="HackerRank"
        highlight="Profile"
        subtitle={`Domain badges and scores for @${username} on HackerRank.`}
      />
      <HackerRankContent username={username} />
    </SectionWrapper>
  );
}

export { HackerRankContent };

