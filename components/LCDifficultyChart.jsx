"use client";

import { motion } from "framer-motion";

/**
 * LCDifficultyChart — SVG doughnut chart for Easy/Medium/Hard solved counts.
 * No external chart library needed.
 *
 * Props:
 *   easy    number
 *   medium  number
 *   hard    number
 *   total   number  — total solved (used for center label)
 */
const SEGMENTS = [
  { key: "easy",   label: "Easy",   color: "#22c55e", trackColor: "#166534" },
  { key: "medium", label: "Medium", color: "#f59e0b", trackColor: "#92400e" },
  { key: "hard",   label: "Hard",   color: "#ef4444", trackColor: "#7f1d1d" },
];

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end   = polarToCartesian(cx, cy, r, startAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y}`;
}

export default function LCDifficultyChart({ easy = 0, medium = 0, hard = 0, total = 0 }) {
  const counts = { easy, medium, hard };
  const sum    = easy + medium + hard;
  const CX = 60, CY = 60, R = 48, SW = 10;
  const GAP = 3; // degrees gap between segments

  // Compute angle spans
  let cursor = 0;
  const arcs = SEGMENTS.map((seg) => {
    const span = sum > 0 ? (counts[seg.key] / sum) * (360 - SEGMENTS.length * GAP) : 0;
    const start = cursor;
    cursor += span + GAP;
    return { ...seg, start, end: start + span };
  });

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Ring */}
      <div className="relative">
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Track rings */}
          {SEGMENTS.map((seg) => (
            <circle
              key={seg.key + "-track"}
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke={seg.trackColor}
              strokeWidth={SW}
              strokeDasharray={`${(counts[seg.key] / (sum || 1)) * 2 * Math.PI * R} 999`}
              opacity="0.15"
            />
          ))}
          {/* Colored arcs */}
          {arcs.map((arc, i) =>
            arc.end > arc.start ? (
              <motion.path
                key={arc.key}
                d={describeArc(CX, CY, R, arc.start, arc.end)}
                fill="none"
                stroke={arc.color}
                strokeWidth={SW}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}
              />
            ) : null
          )}
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold dark:text-white text-slate-900 font-mono leading-none">
            {total}
          </span>
          <span className="text-[9px] dark:text-slate-500 text-slate-500 uppercase tracking-wide mt-0.5">
            solved
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4">
        {SEGMENTS.map((seg) => (
          <div key={seg.key} className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-[10px] dark:text-slate-400 text-slate-500">{seg.label}</span>
            </div>
            <span className="text-sm font-bold dark:text-white text-slate-900 font-mono">
              {counts[seg.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
