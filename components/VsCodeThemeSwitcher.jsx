"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const THEMES = [
  {
    id:     "default",
    name:   "Default",
    desc:   "Slate Dark",
    colors: ["#0f172a", "#22d3ee", "#3b82f6"],
  },
  {
    id:     "dracula",
    name:   "Dracula",
    desc:   "Purple & Pink",
    colors: ["#282a36", "#bd93f9", "#ff79c6"],
  },
  {
    id:     "nord",
    name:   "Nord",
    desc:   "Arctic Blue",
    colors: ["#2e3440", "#88c0d0", "#81a1c1"],
  },
  {
    id:     "monokai",
    name:   "Monokai",
    desc:   "Green & Pink",
    colors: ["#272822", "#a6e22e", "#f92672"],
  },
  {
    id:     "one-dark",
    name:   "One Dark",
    desc:   "Atom Blue",
    colors: ["#282c34", "#61afef", "#c678dd"],
  },
];

function applyTheme(id) {
  if (id === "default") {
    document.documentElement.removeAttribute("data-vscode-theme");
  } else {
    document.documentElement.setAttribute("data-vscode-theme", id);
  }
  try { localStorage.setItem("vscode-theme", id); } catch {}
}

export default function VsCodeThemeSwitcher() {
  const [open,   setOpen]   = useState(false);
  const [active, setActive] = useState("default");

  useEffect(() => {
    const saved = (() => { try { return localStorage.getItem("vscode-theme"); } catch { return null; } })();
    const id = saved || "default";
    setActive(id);
    applyTheme(id);
  }, []);

  function select(id) {
    setActive(id);
    applyTheme(id);
    setOpen(false);
  }

  return (
    <div className="fixed bottom-[13.5rem] right-6 z-40">
      {/* Palette button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((v) => !v)}
        title="VS Code Theme"
        className="w-10 h-10 rounded-full
                   dark:bg-slate-800/90 bg-white/90 backdrop-blur-sm
                   border dark:border-slate-700/60 border-slate-200
                   shadow-lg flex items-center justify-center text-base
                   hover:border-cyan-500/50 transition-all duration-200"
      >
        🎨
      </motion.button>

      {/* Theme picker panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-12 right-0 w-56
                       dark:bg-slate-800/95 bg-white/95 backdrop-blur-md
                       border dark:border-slate-700/60 border-slate-200
                       rounded-2xl p-3 shadow-2xl"
          >
            <p className="text-[10px] font-semibold uppercase tracking-widest
                          dark:text-slate-500 text-slate-400 mb-2.5 px-1">
              VS Code Theme
            </p>

            <div className="space-y-0.5">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => select(t.id)}
                  className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl
                              text-left transition-all duration-150
                              ${active === t.id
                                ? "dark:bg-slate-700 bg-slate-100"
                                : "hover:dark:bg-slate-700/50 hover:bg-slate-50"
                              }`}
                >
                  {/* Color swatches */}
                  <div className="flex gap-1 flex-shrink-0">
                    {t.colors.map((c, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full border border-black/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold leading-none mb-0.5
                                   ${active === t.id
                                     ? "dark:text-white text-slate-900"
                                     : "dark:text-slate-300 text-slate-700"
                                   }`}>
                      {t.name}
                    </p>
                    <p className="text-[10px] dark:text-slate-500 text-slate-400">
                      {t.desc}
                    </p>
                  </div>

                  {active === t.id && (
                    <span className="text-cyan-400 text-xs flex-shrink-0">✓</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
