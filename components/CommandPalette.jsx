"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import {
    FiArrowDown,
    FiDownload,
    FiExternalLink,
    FiGithub,
    FiLinkedin,
    FiMail,
    FiMoon,
    FiSearch,
    FiSun,
} from "react-icons/fi";
import BugCatcherGame from "./BugCatcherGame";

/* ── Command definitions ── */
const NAV_SECTIONS = [
  { id: "about",        label: "About Me",       icon: "👤", group: "Navigate" },
  { id: "skills",       label: "Skills",          icon: "⚡", group: "Navigate" },
  { id: "playground",   label: "Code Playground", icon: "💻", group: "Navigate" },
  { id: "experience",   label: "Experience",      icon: "💼", group: "Navigate" },
  { id: "projects",     label: "Projects",        icon: "🗂️", group: "Navigate" },
  { id: "architecture", label: "Architecture",    icon: "🏗️", group: "Navigate" },
  { id: "achievements", label: "Achievements",    icon: "🏆", group: "Navigate" },
  { id: "education",    label: "Education",       icon: "🎓", group: "Navigate" },
  { id: "contact",      label: "Contact",         icon: "✉️", group: "Navigate" },
];

/* ── Component ── */
function DevModeModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={e => e.stopPropagation()}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-xl max-h-[90vh] overflow-y-auto dark:bg-slate-900 bg-white rounded-2xl shadow-2xl border dark:border-slate-700/50 border-slate-200">
              <div className="flex items-center justify-between px-6 py-4 border-b dark:border-slate-800 border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛠️</span>
                  <span className="font-bold text-lg dark:text-white text-slate-900">Developer Mode</span>
                </div>
                <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center dark:bg-slate-800 bg-slate-100 dark:text-slate-400 text-slate-500 hover:text-red-400 hover:dark:bg-slate-700 transition-colors">
                  ×
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-cyan-400 mb-2">Hidden Projects</h3>
                  <ul className="list-disc pl-6 text-sm dark:text-slate-200 text-slate-800">
                    <li>Experimental AI Playground</li>
                    <li>Unreleased Portfolio Features</li>
                    <li>Bug Catcher Game (see below!)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-cyan-400 mb-2">Experimental Ideas</h3>
                  <ul className="list-disc pl-6 text-sm dark:text-slate-200 text-slate-800">
                    <li>Live Coding Challenges</li>
                    <li>Custom Theme Generator</li>
                    <li>Konami Code Easter Egg</li>
                  </ul>
                </div>
                <div className="mt-8">
                  <h3 className="font-semibold text-cyan-400 mb-2">🐛 Bug Catcher Game</h3>
                  <BugCatcherGame />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function CommandPalette() {
  const [open, setOpen]         = useState(false);
  const [query, setQuery]       = useState("");
  const [cursor, setCursor]     = useState(0);
  const [devModeOpen, setDevModeOpen] = useState(false);
  const inputRef                = useRef(null);
  const listRef                 = useRef(null);
  const { resolvedTheme, setTheme } = useTheme();

  /* Build full command list including actions */
  function buildCommands() {
    const commands = [
      ...NAV_SECTIONS.map((s) => ({
        id:     `nav-${s.id}`,
        label:  s.label,
        icon:   s.icon,
        group:  s.group,
        action: () => {
          const el = document.getElementById(s.id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          closePanel();
        },
      })),
      {
        id:     "github",
        label:  "Open GitHub",
        icon:   <FiGithub className="w-4 h-4" />,
        group:  "Links",
        action: () => { window.open("https://github.com/adarshraj26", "_blank"); closePanel(); },
      },
      {
        id:     "linkedin",
        label:  "Open LinkedIn",
        icon:   <FiLinkedin className="w-4 h-4" />,
        group:  "Links",
        action: () => { window.open("https://www.linkedin.com/in/adarsh-raj26/", "_blank"); closePanel(); },
      },
      {
        id:     "email",
        label:  "Send Email",
        icon:   <FiMail className="w-4 h-4" />,
        group:  "Links",
        action: () => { window.open("mailto:contact.adarshraj26@gmail.com"); closePanel(); },
      },
      {
        id:     "resume",
        label:  "Download Resume",
        icon:   <FiDownload className="w-4 h-4" />,
        group:  "Links",
        action: () => {
          const a = document.createElement("a");
          a.href = "/Adarsh_Raj_9386012794.pdf";
          a.download = "Adarsh_Raj_Resume.pdf";
          a.click();
          closePanel();
        },
      },
      {
        id:     "theme",
        label:  resolvedTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode",
        icon:   resolvedTheme === "dark"
          ? <FiSun className="w-4 h-4" />
          : <FiMoon className="w-4 h-4" />,
        group:  "Actions",
        action: () => { setTheme(resolvedTheme === "dark" ? "light" : "dark"); closePanel(); },
      },
    ];
    // Easter egg: /devmode
    if (query.trim() === "/devmode") {
      commands.unshift({
        id: "devmode",
        label: "Enter Developer Mode",
        icon: "🛠️",
        group: "Easter Eggs",
        action: () => { setDevModeOpen(true); closePanel(); },
      });
    }
    return commands;
  }

  const allCommands = buildCommands();
  let filtered;
  if (query.trim() === "/devmode") {
    // Only show the devmode command
    filtered = allCommands.filter((c) => c.id === "devmode");
  } else if (query.trim()) {
    filtered = allCommands.filter((c) =>
      c.label.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    filtered = allCommands;
  }

  /* Group filtered results */
  const groups = filtered.reduce((acc, cmd) => {
    (acc[cmd.group] ??= []).push(cmd);
    return acc;
  }, {});

  /* Flat list for keyboard nav */
  const flat = Object.values(groups).flat();

  function closePanel() {
    setOpen(false);
    setQuery("");
    setCursor(0);
  }

  /* Open on Cmd/Ctrl+K */
  useEffect(() => {
    function onKey(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") closePanel();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []); // eslint-disable-line

  /* Register global opener for navbar button */
  useEffect(() => {
    window.__openCommandPalette = () => setOpen(true);
    return () => { delete window.__openCommandPalette; };
  }, []);

  /* Focus input when opened */
  useEffect(() => {
    if (open) {
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  /* Keyboard navigation inside palette */
  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => (c + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => (c - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter" && flat[cursor]) {
      flat[cursor].action();
    }
  }

  /* Auto-scroll highlighted item into view */
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  return (
    <>
      {/* Floating ⌘K button — above VsCodeThemeSwitcher */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-[18rem] right-6 z-40 hidden md:flex items-center gap-1.5
                   dark:bg-slate-800/90 bg-white/90 backdrop-blur-sm
                   border dark:border-slate-700/60 border-slate-200
                   rounded-full px-3 py-2 shadow-lg
                   dark:text-slate-400 text-slate-500 hover:text-cyan-400
                   hover:border-cyan-500/50 transition-all duration-200"
        title="Open command palette (⌘K)"
      >
        <FiSearch className="w-3.5 h-3.5" />
        <span className="text-xs font-mono">⌘K</span>
      </button>

      <DevModeModal open={devModeOpen} onClose={() => setDevModeOpen(false)} />
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={closePanel}
            />

            {/* Palette panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -16 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="fixed inset-x-4 top-[10vh] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2
                         z-50 w-full sm:w-[560px] max-w-[95vw]
                         dark:bg-slate-900 bg-white
                         rounded-2xl shadow-2xl overflow-hidden
                         border dark:border-slate-700/60 border-slate-200"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b dark:border-slate-700/60 border-slate-200">
                <FiSearch className="w-5 h-5 dark:text-slate-500 text-slate-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
                  onKeyDown={onKeyDown}
                  placeholder="Search sections, links, actions..."
                  className="flex-1 bg-transparent text-sm dark:text-white text-slate-900
                             placeholder:dark:text-slate-500 placeholder:text-slate-400
                             outline-none"
                />
                <kbd className="text-xs dark:text-slate-600 text-slate-400 border dark:border-slate-700 border-slate-200 rounded-md px-1.5 py-0.5 font-mono">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div
                ref={listRef}
                className="max-h-[60vh] overflow-y-auto overscroll-contain py-2"
              >
                {flat.length === 0 && (
                  <p className="text-center py-8 text-sm dark:text-slate-500 text-slate-400">
                    No results for &quot;{query}&quot;
                  </p>
                )}

                {Object.entries(groups).map(([group, cmds]) => (
                  <div key={group} className="mb-1">
                    <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest
                                  dark:text-slate-600 text-slate-400">
                      {group}
                    </p>
                    {cmds.map((cmd) => {
                      const idx = flat.indexOf(cmd);
                      return (
                        <button
                          key={cmd.id}
                          data-idx={idx}
                          onClick={cmd.action}
                          onMouseEnter={() => setCursor(idx)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm
                                      transition-colors duration-100 text-left
                                      ${cursor === idx
                                        ? "dark:bg-slate-800 bg-slate-100 dark:text-white text-slate-900"
                                        : "dark:text-slate-300 text-slate-700"
                                      }`}
                        >
                          {/* Icon */}
                          <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm
                                           ${cursor === idx
                                             ? "dark:bg-slate-700 bg-slate-200"
                                             : "dark:bg-slate-800/60 bg-slate-100"
                                           }`}>
                            {typeof cmd.icon === "string" ? cmd.icon : cmd.icon}
                          </span>

                          <span className="flex-1">{cmd.label}</span>

                          {/* Right hint */}
                          {cmd.group === "Links" && (
                            <FiExternalLink className="w-3.5 h-3.5 dark:text-slate-600 text-slate-400 flex-shrink-0" />
                          )}
                          {cmd.group === "Navigate" && cursor === idx && (
                            <FiArrowDown className="w-3.5 h-3.5 dark:text-slate-600 text-slate-400 flex-shrink-0 rotate-[-90deg]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t dark:border-slate-700/60 border-slate-200
                              flex items-center gap-4">
                <span className="text-xs dark:text-slate-600 text-slate-400 flex items-center gap-1">
                  <kbd className="border dark:border-slate-700 border-slate-300 rounded px-1 font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="text-xs dark:text-slate-600 text-slate-400 flex items-center gap-1">
                  <kbd className="border dark:border-slate-700 border-slate-300 rounded px-1 font-mono">↵</kbd>
                  select
                </span>
                <span className="text-xs dark:text-slate-600 text-slate-400 flex items-center gap-1">
                  <kbd className="border dark:border-slate-700 border-slate-300 rounded px-1 font-mono">ESC</kbd>
                  close
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
