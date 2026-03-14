"use client";

import { useState } from "react";
import BugCatcherGame from "./BugCatcherGame";
import { useDevMode } from "./DevModeContext";
import VsCodeThemeSwitcher from "./VsCodeThemeSwitcher";

export default function ExperimentalFeatures() {
  const { devMode } = useDevMode();
  const [showBugGame, setShowBugGame] = useState(false);
  if (!devMode) return null;
  return (
    <>
      <VsCodeThemeSwitcher />
      {/* Bug Game Launcher Button */}
      <button
        onClick={() => setShowBugGame(true)}
        className="fixed top-24 right-8 z-[99998] w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-cyan-400 bg-white dark:bg-slate-900 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-slate-800 transition-all"
        title="Launch Bug Catcher Game"
        style={{ boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)" }}
      >
        <span className="text-2xl">🐛</span>
      </button>
      {/* Bug Game Modal */}
      {showBugGame && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-cyan-200 dark:border-slate-700 p-4 max-w-lg w-full flex flex-col items-center">
            <button
              onClick={() => setShowBugGame(false)}
              className="absolute top-2 right-2 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Close"
            >
              ×
            </button>
            <BugCatcherGame />
          </div>
        </div>
      )}
    </>
  );
}
