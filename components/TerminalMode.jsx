"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ── Command definitions ─────────────────────────────────── */
const PROMPT = "visitor@adarsh:~$";

function colorize(text, color) {
  return <span style={{ color }}>{text}</span>;
}

const COMMANDS = {
  help: () => [
    colorize("Available commands:", "#22d3ee"),
    "",
    "  whoami      — About me",
    "  skills      — Tech stack",
    "  projects    — My projects",
    "  contact     — Get in touch",
    "  cat resume  — View my resume",
    "  ls          — List sections",
    "  date        — Current date/time",
    "  echo <text> — Echo text",
    "  clear       — Clear terminal",
    "  exit        — Close terminal",
    "",
    colorize("Tip: Use ↑ ↓ to navigate history", "#64748b"),
  ],

  whoami: () => [
    colorize("Adarsh Raj", "#22d3ee"),
    "Full Stack Developer · AI/ML Enthusiast",
    "📍 India",
    "",
    "Building scalable web apps & AI-driven solutions.",
    "React · Node.js · AWS · Python · MongoDB",
  ],

  skills: () => [
    colorize("Frontend:", "#34d399"),
    "  React, Next.js, Tailwind CSS, Framer Motion",
    colorize("Backend:", "#818cf8"),
    "  Node.js, Express, REST APIs, GraphQL",
    colorize("Database:", "#fbbf24"),
    "  MongoDB, MySQL, PostgreSQL",
    colorize("Cloud & DevOps:", "#f472b6"),
    "  AWS, Docker, Git, CI/CD",
    colorize("AI/ML:", "#22d3ee"),
    "  Python, TensorFlow, scikit-learn",
  ],

  projects: () => [
    colorize("Recent Projects:", "#22d3ee"),
    "",
    "  • TeamCollab      → Real-time team collaboration tool",
    "  • Portfolio       → This site you're browsing!",
    "  • Skin Disease ML → HAM10000 image classifier",
    "",
    colorize("Run 'ls projects' to see more ↓", "#64748b"),
  ],

  contact: () => [
    colorize("Let's connect!", "#34d399"),
    "",
    "  📧  ad26081309@gmail.com",
    "  🐙  github.com/Adarsh-Raj26",
    "  💼  linkedin.com/in/adarsh-raj-dev",
    "",
    colorize("Or scroll to the Contact section below.", "#64748b"),
  ],

  ls: () => [
    colorize("Sections:", "#22d3ee"),
    "  about  skills  projects  experience",
    "  achievements  education  certifications",
    "  coding  blog  contact",
  ],

  date: () => [new Date().toString()],

  "cat resume": () => {
    if (typeof window !== "undefined") {
      setTimeout(() => window.__openResume?.(), 300);
    }
    return [colorize("Opening resume viewer…", "#34d399")];
  },

  clear: () => null, // handled specially

  exit: () => null,  // handled specially
  q:    () => null,
};

/* ── Line renderer ───────────────────────────────────────── */
function TerminalLine({ children }) {
  return (
    <div className="leading-relaxed whitespace-pre-wrap break-words text-sm font-mono">
      {children}
    </div>
  );
}

/* ── Main terminal ───────────────────────────────────────── */
export default function TerminalMode() {
  const [open,    setOpen]    = useState(false);
  const [input,   setInput]   = useState("");
  const [history, setHistory] = useState([
    { type: "output", lines: [
      colorize("Welcome to Adarsh's terminal!", "#22d3ee"),
      colorize('Type "help" for available commands.', "#64748b"),
      "",
    ]},
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [histIdx,    setHistIdx]    = useState(-1);

  const inputRef  = useRef(null);
  const bottomRef = useRef(null);

  /* Open on "/" key — skip if focused on an input/textarea */
  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) &&
        !open
      ) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Auto-focus input when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  /* Auto-scroll to bottom */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    // Save to cmd history
    setCmdHistory((prev) => [raw, ...prev]);
    setHistIdx(-1);

    // Echo the command
    const echo = {
      type: "input",
      text: raw,
    };

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "exit" || cmd === "q") {
      setHistory((prev) => [...prev, echo]);
      setTimeout(() => setOpen(false), 300);
      return;
    }

    const handler = COMMANDS[cmd] ?? COMMANDS[cmd.split(" ")[0]];
    let lines;

    if (handler) {
      lines = handler();
    } else {
      lines = [
        colorize(`bash: ${raw}: command not found`, "#ef4444"),
        colorize('Type "help" for available commands.', "#64748b"),
      ];
    }

    setHistory((prev) => [
      ...prev,
      echo,
      { type: "output", lines: lines ?? [] },
    ]);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    }
  }

  return (
    <>
      {/* Trigger hint */}
      {!open && (
        <div className="fixed bottom-[22.5rem] right-6 z-40 hidden md:flex">
          <button
            onClick={() => setOpen(true)}
            title="Open terminal (/)"
            className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-mono
                       dark:bg-slate-800/90 bg-white/90 backdrop-blur-sm
                       border dark:border-slate-700/60 border-slate-200
                       dark:text-slate-400 text-slate-500
                       hover:text-emerald-400 hover:border-emerald-500/50
                       transition-all duration-200 shadow-sm"
          >
            <span className="text-emerald-400">{">"}_</span>
            <span>/</span>
          </button>
        </div>
      )}

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[9980] bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Terminal window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed z-[9981] inset-x-4 bottom-8 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2
                         sm:w-[680px] md:w-[780px]
                         rounded-2xl overflow-hidden shadow-2xl
                         border dark:border-slate-700/60 border-slate-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3
                              bg-slate-800 border-b border-slate-700/60">
                {/* Traffic lights */}
                <button onClick={() => setOpen(false)}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 flex-1 text-center text-xs font-mono text-slate-400">
                  terminal — adarsh@portfolio
                </span>
                <kbd className="text-[10px] text-slate-600 font-mono">ESC to close</kbd>
              </div>

              {/* Output area */}
              <div className="h-72 sm:h-80 overflow-y-auto p-4 bg-[#1e1e2e] space-y-1"
                   onClick={() => inputRef.current?.focus()}>
                {history.map((entry, i) => (
                  <div key={i}>
                    {entry.type === "input" ? (
                      <TerminalLine>
                        <span className="text-emerald-400">{PROMPT}</span>
                        {" "}
                        <span className="text-slate-200">{entry.text}</span>
                      </TerminalLine>
                    ) : (
                      entry.lines.map((line, j) => (
                        <TerminalLine key={j}>{
                          typeof line === "string"
                            ? <span className="text-slate-300">{line}</span>
                            : line
                        }</TerminalLine>
                      ))
                    )}
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input row */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1e1e2e] border-t border-slate-700/40">
                <span className="text-emerald-400 font-mono text-sm shrink-0">{PROMPT}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  spellCheck={false}
                  autoComplete="off"
                  className="flex-1 bg-transparent text-slate-200 font-mono text-sm
                             outline-none caret-cyan-400"
                  placeholder="type a command…"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
