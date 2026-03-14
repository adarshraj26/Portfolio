"use client";
import { useState } from "react";

const cursorStyles = [
  { name: "Default", value: "auto" },
  { name: "Pointer", value: "pointer" },
  { name: "Crosshair", value: "crosshair" },
  { name: "Text", value: "text" },
  { name: "Custom Orb", value: "orb" },
];

export default function CursorPlayground() {
  const [cursor, setCursor] = useState("auto");

  // Apply cursor style to body
  if (typeof window !== "undefined") {
    document.body.style.cursor = cursor === "orb" ? "none" : cursor;
  }

  return (
    <div className="fixed left-8 bottom-28 z-[99998] bg-white dark:bg-slate-900 border border-cyan-200 dark:border-slate-700 rounded-xl shadow-lg p-3 flex flex-col gap-2">
      <span className="font-bold text-xs text-cyan-500 mb-1">Cursor</span>
      {cursorStyles.map((c) => (
        <button
          key={c.value}
          onClick={() => setCursor(c.value)}
          className={`px-3 py-1 rounded text-xs font-semibold transition-all ${cursor === c.value ? "bg-cyan-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"}`}
        >
          {c.name}
        </button>
      ))}
      {cursor === "orb" && (
        <div style={{ pointerEvents: "none" }}>
          {/* CustomCursor component will be visible if used globally */}
        </div>
      )}
    </div>
  );
}
