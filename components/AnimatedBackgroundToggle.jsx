"use client";
import { useState } from "react";

const backgrounds = [
  {
    name: "None",
    render: null,
  },
  {
    name: "Particles",
    render: (
      <div className="fixed inset-0 z-0 pointer-events-none animate-fade-in">
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
          {[...Array(40)].map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * window.innerWidth}
              cy={Math.random() * window.innerHeight}
              r={Math.random() * 3 + 1}
              fill="#22d3ee"
              opacity={0.18 + Math.random() * 0.18}
            />
          ))}
        </svg>
      </div>
    ),
  },
];

export default function AnimatedBackgroundToggle() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="fixed left-8 bottom-8 z-[99998] bg-white dark:bg-slate-900 border border-cyan-200 dark:border-slate-700 rounded-xl shadow-lg p-3 flex flex-col gap-2">
      <span className="font-bold text-xs text-cyan-500 mb-1">Background</span>
      {backgrounds.map((bg, i) => (
        <button
          key={bg.name}
          onClick={() => setSelected(i)}
          className={`px-3 py-1 rounded text-xs font-semibold transition-all ${selected === i ? "bg-cyan-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}
        >
          {bg.name}
        </button>
      ))}
      {backgrounds[selected].render}
    </div>
  );
}
