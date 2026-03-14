"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { FiActivity, FiGithub } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

const GITHUB_USERNAME = "adarshraj26";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/* Level 0 = no activity, 4 = max */
const DARK_COLORS  = ["#1e293b", "#14532d", "#15803d", "#22c55e", "#4ade80"];
const LIGHT_COLORS = ["#e2e8f0", "#bbf7d0", "#86efac", "#4ade80", "#16a34a"];

/* ── Helpers ── */
function buildWeeks(contributions) {
  if (!contributions.length) return [];

  const map = {};
  contributions.forEach((c) => { map[c.date] = c; });

  const start  = new Date(contributions[0].date + "T12:00:00");
  const end    = new Date(contributions[contributions.length - 1].date + "T12:00:00");
  const cursor = new Date(start);
  cursor.setDate(cursor.getDate() - cursor.getDay()); // rewind to Sunday

  const weeks = [];
  let week = [];

  while (cursor <= end) {
    const ds = cursor.toISOString().split("T")[0];
    week.push(map[ds] ?? { date: ds, count: 0, level: 0 });
    if (week.length === 7) { weeks.push(week); week = []; }
    cursor.setDate(cursor.getDate() + 1);
  }

  if (week.length) {
    while (week.length < 7) week.push(null); // pad last week
    weeks.push(week);
  }

  return weeks;
}

function getMonthLabels(weeks) {
  const seen   = new Set();
  const labels = {};
  weeks.forEach((week, wi) => {
    const day = week.find((d) => d);
    if (!day) return;
    const m = new Date(day.date + "T12:00:00").getMonth();
    if (!seen.has(m)) {
      seen.add(m);
      labels[wi] = MONTHS[m];
    }
  });
  return labels;
}

/* ── Component ── */
const CELL = 13;
const GAP  = 2;

export default function GitHubHeatmap() {
  const [data, setData]       = useState([]);
  const [total, setTotal]     = useState(0);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed]   = useState(false);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    async function fetchData() {
      try {
        const r = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        if (!r.ok) throw new Error();
        const json = await r.json();
        const c = json.contributions ?? [];
        setData(c);
        setTotal(c.reduce((s, x) => s + x.count, 0));
      } catch {
        setFailed(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const weeks       = useMemo(() => buildWeeks(data), [data]);
  const monthLabels = useMemo(() => getMonthLabels(weeks), [weeks]);
  const colors      = mounted && resolvedTheme === "light" ? LIGHT_COLORS : DARK_COLORS;

  return (
    <SectionWrapper id="github-activity">
      <SectionHeading
        label="GitHub Activity"
        title="Contribution"
        highlight="Heatmap"
        subtitle="A visual record of my coding consistency over the past year."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="dark:bg-slate-800/60 bg-white rounded-2xl p-6 sm:p-8
                   border dark:border-slate-700/50 border-slate-200 max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <FiGithub className="w-5 h-5 text-cyan-400" />
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold dark:text-white text-slate-900
                         hover:text-cyan-400 transition-colors"
            >
              @{GITHUB_USERNAME}
            </a>
          </div>

          <div className="flex items-center gap-1.5 text-sm">
            <FiActivity className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-emerald-400">{total}</span>
            <span className="dark:text-slate-400 text-slate-600">
              contributions in the last year
            </span>
          </div>
        </div>

        {/* States */}
        {(loading || failed || data.length === 0) && (
          <div className="h-40 flex items-center justify-center">
            <span className="text-sm dark:text-slate-500 text-slate-400 font-mono animate-pulse">
              {loading
                ? "Fetching contributions..."
                : "Could not load contribution data."}
            </span>
          </div>
        )}

        {/* Heatmap */}
        {!loading && !failed && data.length > 0 && (
          <div className="overflow-x-auto">
            <div className="inline-block">

              {/* Month labels row */}
              <div className="flex mb-1" style={{ paddingLeft: 30 }}>
                {weeks.map((_, wi) => (
                  <div
                    key={wi}
                    style={{ width: CELL + GAP, flexShrink: 0 }}
                  >
                    {monthLabels[wi] && (
                      <span className="text-[10px] dark:text-slate-500 text-slate-400">
                        {monthLabels[wi]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="flex" style={{ gap: GAP }}>

                {/* Day-of-week labels */}
                <div
                  className="flex flex-col"
                  style={{ gap: GAP, width: 26, marginRight: 4, flexShrink: 0 }}
                >
                  {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                    <div
                      key={i}
                      style={{ height: CELL, lineHeight: `${CELL}px` }}
                      className="text-[10px] dark:text-slate-600 text-slate-400 text-right
                                 select-none"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Week columns */}
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col" style={{ gap: GAP }}>
                    {week.map((day, di) => (
                      <div
                        key={di}
                        title={
                          day
                            ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                            : ""
                        }
                        style={{
                          width: CELL,
                          height: CELL,
                          borderRadius: 2,
                          backgroundColor: day ? colors[day.level] : "transparent",
                          flexShrink: 0,
                        }}
                        className="hover:opacity-75 transition-opacity duration-100 cursor-default"
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-1.5 mt-4 justify-end">
                <span className="text-[10px] dark:text-slate-500 text-slate-400 mr-0.5">
                  Less
                </span>
                {colors.map((c, i) => (
                  <div
                    key={i}
                    style={{ width: CELL, height: CELL, borderRadius: 2, backgroundColor: c }}
                  />
                ))}
                <span className="text-[10px] dark:text-slate-500 text-slate-400 ml-0.5">
                  More
                </span>
              </div>

            </div>
          </div>
        )}
      </motion.div>
    </SectionWrapper>
  );
}
