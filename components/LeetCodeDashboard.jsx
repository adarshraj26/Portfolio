"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FiAward, FiCheckCircle, FiPercent, FiTrendingUp } from "react-icons/fi";
import { SiLeetcode } from "react-icons/si";
import LCDifficultyChart from "./LCDifficultyChart";
import LCProgressBar from "./LCProgressBar";
import LCStatsCard from "./LCStatsCard";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Skeleton loader ────────────────────────────────────── */
function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-lg dark:bg-slate-700/50 bg-slate-200 ${className}`} />
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20" />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
      <Skeleton className="h-40" />
    </div>
  );
}

/* ── Activity heatmap (last 24 weeks) ───────────────────── */
function ActivityHeatmap({ calendar }) {
  const WEEKS = 24;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells = useMemo(() => {
    const days = [];
    for (let i = WEEKS * 7 - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const ts = Math.floor(d.getTime() / 1000).toString();
      days.push({ date: d, count: calendar?.[ts] ?? 0 });
    }
    return days;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendar]);

  const weeks = [];
  for (let w = 0; w < WEEKS; w++) {
    weeks.push(cells.slice(w * 7, w * 7 + 7));
  }

  function cellColor(count) {
    if (count === 0) return "dark:bg-slate-700/50 bg-slate-200";
    if (count <= 2)  return "bg-cyan-900/80 dark:bg-cyan-800/60";
    if (count <= 5)  return "bg-cyan-600/80";
    if (count <= 10) return "bg-cyan-500";
    return "bg-cyan-400";
  }

  const monthLabels = useMemo(() => {
    const labels = [];
    weeks.forEach((week, wi) => {
      week.forEach((day) => {
        if (day.date.getDate() === 1) {
          labels.push({ wi, name: day.date.toLocaleString("default", { month: "short" }) });
        }
      });
    });
    return labels;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalThisPeriod = cells.reduce((s, c) => s + c.count, 0);
  const activeDays      = cells.filter((c) => c.count > 0).length;

  return (
    <div className="dark:bg-slate-800/60 bg-white rounded-2xl p-5
                    border dark:border-slate-700/50 border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold dark:text-white text-slate-900">Submission Activity</h3>
        <div className="flex items-center gap-3 text-[11px] dark:text-slate-500 text-slate-500">
          <span>{totalThisPeriod} submissions</span>
          <span>·</span>
          <span>{activeDays} active days</span>
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <div className="flex gap-[3px] mb-1">
          {weeks.map((_, wi) => {
            const lab = monthLabels.find((m) => m.wi === wi);
            return (
              <div key={wi} className="w-3 flex-shrink-0 text-[9px] dark:text-slate-600 text-slate-400 text-center">
                {lab?.name ?? ""}
              </div>
            );
          })}
        </div>
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <motion.div
                  key={di}
                  title={`${day.date.toDateString()}: ${day.count} submission${day.count !== 1 ? "s" : ""}`}
                  className={`w-3 h-3 rounded-sm ${cellColor(day.count)} cursor-default`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (wi * 7 + di) * 0.001 }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1.5 mt-2 justify-end">
          <span className="text-[9px] dark:text-slate-600 text-slate-400">Less</span>
          {["dark:bg-slate-700/50 bg-slate-200", "bg-cyan-900/80", "bg-cyan-600/80", "bg-cyan-500", "bg-cyan-400"].map(
            (c, i) => <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
          )}
          <span className="text-[9px] dark:text-slate-600 text-slate-400">More</span>
        </div>
      </div>
    </div>
  );
}

/* ── Error state ────────────────────────────────────────── */
function ErrorState({ message, onRetry }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
        <SiLeetcode className="w-7 h-7 text-red-400" />
      </div>
      <div>
        <p className="font-semibold dark:text-white text-slate-900 mb-1">Failed to load stats</p>
        <p className="text-sm dark:text-slate-400 text-slate-500">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="px-4 py-2 rounded-lg text-sm font-semibold
                   bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                   hover:scale-105 transition-transform duration-200"
      >
        Retry
      </button>
    </motion.div>
  );
}

/* ── Inner content (shared between standalone and embedded) ─ */
function LeetCodeContent({ username }) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  async function fetchStats() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/leetcode?username=${encodeURIComponent(username)}`);
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

  return (
    <>
      {/* Profile link */}
      <div className="flex justify-center mb-8">
        <a
          href={`https://leetcode.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     dark:bg-slate-800/60 bg-white border dark:border-slate-700/50 border-slate-200
                     text-sm font-medium dark:text-slate-300 text-slate-600
                     hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-200 shadow-sm"
        >
          <SiLeetcode className="w-4 h-4 text-orange-400" />
          leetcode.com/{username}
        </a>
      </div>

      {loading && <DashboardSkeleton />}
      {!loading && error && <ErrorState message={error} onRetry={fetchStats} />}

      {!loading && !error && data && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <LCStatsCard icon={<FiCheckCircle className="w-4 h-4" />} label="Total Solved"
              value={data.totalSolved ?? 0} colorClass="bg-cyan-500/10" iconColor="text-cyan-400" delay={0.1} />
            <LCStatsCard icon={<FiTrendingUp className="w-4 h-4" />} label="Global Rank"
              value={data.ranking ?? 0} prefix="#" colorClass="bg-purple-500/10" iconColor="text-purple-400" delay={0.2} />
            <LCStatsCard icon={<FiPercent className="w-4 h-4" />} label="Acceptance"
              value={typeof data.acceptanceRate === "number" ? parseFloat(data.acceptanceRate.toFixed(1)) : data.acceptanceRate ?? "—"}
              suffix="%" colorClass="bg-emerald-500/10" iconColor="text-emerald-400" delay={0.3} />
            <LCStatsCard icon={<FiAward className="w-4 h-4" />} label="Contribution"
              value={data.contributionPoints ?? 0} colorClass="bg-amber-500/10" iconColor="text-amber-400" delay={0.4} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="dark:bg-slate-800/60 bg-white rounded-2xl p-5 border dark:border-slate-700/50
                         border-slate-200 shadow-sm flex flex-col items-center justify-center gap-2"
            >
              <h3 className="text-sm font-semibold dark:text-white text-slate-900 mb-1 self-start">
                Difficulty Breakdown
              </h3>
              <LCDifficultyChart easy={data.easySolved ?? 0} medium={data.mediumSolved ?? 0}
                hard={data.hardSolved ?? 0} total={data.totalSolved ?? 0} />
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="dark:bg-slate-800/60 bg-white rounded-2xl p-5 border dark:border-slate-700/50
                         border-slate-200 shadow-sm flex flex-col justify-center gap-5"
            >
              <h3 className="text-sm font-semibold dark:text-white text-slate-900">Problems Progress</h3>
              <div className="space-y-5">
                <LCProgressBar label="Easy" solved={data.easySolved ?? 0} total={data.totalEasy ?? 0}
                  colorFrom="from-emerald-400" colorTo="to-green-500" textColor="text-emerald-400" delay={0.4} />
                <LCProgressBar label="Medium" solved={data.mediumSolved ?? 0} total={data.totalMedium ?? 0}
                  colorFrom="from-amber-400" colorTo="to-orange-500" textColor="text-amber-400" delay={0.55} />
                <LCProgressBar label="Hard" solved={data.hardSolved ?? 0} total={data.totalHard ?? 0}
                  colorFrom="from-red-400" colorTo="to-rose-600" textColor="text-red-400" delay={0.7} />
              </div>
              {data.totalQuestions > 0 && (
                <div className="pt-1 border-t dark:border-slate-700/50 border-slate-200">
                  <LCProgressBar label="Overall" solved={data.totalSolved ?? 0} total={data.totalQuestions ?? 0}
                    colorFrom="from-cyan-400" colorTo="to-blue-500" textColor="text-cyan-400" delay={0.85} />
                </div>
              )}
            </motion.div>
          </div>

          {data.submissionCalendar && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}>
              <ActivityHeatmap calendar={data.submissionCalendar} />
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

/* ── Default export — standalone page section ───────────── */
export default function LeetCodeDashboard({ username = "Adarsh_Raj26", standalone = true }) {
  if (!standalone) return <LeetCodeContent username={username} />;

  return (
    <SectionWrapper id="leetcode" alternate>
      <SectionHeading
        label="Competitive Coding"
        title="LeetCode"
        highlight="Stats"
        subtitle={`Live stats for @${username} — fetched directly from LeetCode.`}
      />
      <LeetCodeContent username={username} />
    </SectionWrapper>
  );
}

export { LeetCodeContent };

