"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FiCloud,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiServer,
  FiSettings,
  FiUsers,
} from "react-icons/fi";
import {
  SiCplusplus,
  SiCss,
  SiExpress,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Skills data ── */
const skillCategories = [
  {
    category: "Frontend",
    color: "from-cyan-500 to-teal-500",
    chartColor: "#06B6D4",
    skills: [
      { name: "React.js",          level: 90, icon: SiReact,       brandColor: "#61DAFB" },
      { name: "JavaScript (ES6+)", level: 88, icon: SiJavascript,  brandColor: "#F7DF1E" },
      { name: "HTML5",             level: 95, icon: SiHtml5,        brandColor: "#E34F26" },
      { name: "CSS3",              level: 90, icon: SiCss,          brandColor: "#1572B6" },
      { name: "Tailwind CSS",      level: 92, icon: SiTailwindcss,  brandColor: "#06B6D4" },
    ],
  },
  {
    category: "Backend",
    color: "from-blue-500 to-indigo-500",
    chartColor: "#6366F1",
    skills: [
      { name: "Node.js",      level: 85, icon: SiNodedotjs, brandColor: "#339933" },
      { name: "Express.js",   level: 83, icon: SiExpress,   brandColor: null      },
      { name: "Prisma ORM",   level: 75, icon: SiPrisma,    brandColor: "#5A67D8" },
      { name: "REST APIs",    level: 88, icon: FiGlobe,     brandColor: null      },
    ],
  },
  {
    category: "Databases",
    color: "from-violet-500 to-purple-500",
    chartColor: "#8B5CF6",
    skills: [
      { name: "MySQL",    level: 80, icon: SiMysql,   brandColor: "#4479A1" },
      { name: "MongoDB",  level: 82, icon: SiMongodb, brandColor: "#47A248" },
      { name: "DynamoDB", level: 70, icon: FiDatabase,brandColor: null      },
    ],
  },
  {
    category: "Cloud & DevOps",
    color: "from-orange-500 to-amber-500",
    chartColor: "#F97316",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", level: 72, icon: FiCloud,    brandColor: "#FF9900" },
      { name: "Git",                   level: 88, icon: SiGit,      brandColor: "#F05032" },
      { name: "GitHub",                level: 85, icon: SiGithub,   brandColor: null      },
      { name: "CI/CD",                 level: 68, icon: FiSettings, brandColor: null      },
    ],
  },
  {
    category: "Languages",
    color: "from-emerald-500 to-green-500",
    chartColor: "#10B981",
    skills: [
      { name: "C++",       level: 80, icon: SiCplusplus, brandColor: "#00599C" },
      { name: "Python",    level: 78, icon: SiPython,    brandColor: "#3776AB" },
      { name: "Core Java", level: 75, icon: FiCode,      brandColor: null      },
    ],
  },
  {
    category: "Other",
    color: "from-pink-500 to-rose-500",
    chartColor: "#EC4899",
    skills: [
      { name: "AI/ML Concepts",      level: 70, icon: FiCpu,   brandColor: null      },
      { name: "Networking & OS",     level: 70, icon: FiServer,brandColor: null      },
      { name: "Linux",               level: 75, icon: SiLinux, brandColor: "#FCC624" },
      { name: "Agile/Scrum",         level: 80, icon: FiUsers, brandColor: null      },
      { name: "Figma",               level: 72, icon: SiFigma, brandColor: "#F24E1E" },
    ],
  },
];

/* ── Helpers ── */
function avg(skills) {
  return Math.round(skills.reduce((s, k) => s + k.level, 0) / skills.length);
}

function asciiBar(level, total = 12) {
  const filled = Math.round((level / 100) * total);
  return "█".repeat(filled) + "░".repeat(total - filled);
}

const TOTAL_SKILLS = skillCategories.reduce((s, c) => s + c.skills.length, 0);

/* ── Terminal output lines ── */
const OUTPUT_LINES = [
  { type: "blank" },
  { type: "info",    text: "◈  Initializing skill loader v2.5.1..." },
  { type: "info",    text: "◈  Fetching manifest .............. done" },
  { type: "blank" },
  { type: "header" },
  { type: "divider" },
  ...skillCategories.map((cat) => ({ type: "skill", cat })),
  { type: "divider" },
  { type: "blank" },
  { type: "summary" },
];

/* ── Terminal Line ── */
function TerminalLine({ line }) {
  if (line.type === "blank") return <div className="h-2" />;

  if (line.type === "info")
    return (
      <p className="text-amber-400/75 text-xs mt-0.5 font-mono">{line.text}</p>
    );

  if (line.type === "header")
    return (
      <div className="flex text-xs mt-0.5 font-mono">
        <span className="text-slate-500 uppercase tracking-widest w-36 flex-shrink-0">
          Category
        </span>
        <span className="text-slate-500 uppercase tracking-widest w-32 flex-shrink-0 hidden sm:block">
          Level
        </span>
        <span className="text-slate-500 uppercase tracking-widest">
          Technologies
        </span>
      </div>
    );

  if (line.type === "divider")
    return (
      <p className="text-slate-700 text-xs my-0.5 font-mono select-none">
        {"─".repeat(68)}
      </p>
    );

  if (line.type === "skill") {
    const { cat } = line;
    const avgVal = avg(cat.skills);
    return (
      <div className="flex text-xs py-[3px] items-baseline font-mono">
        <span
          className="font-semibold w-36 flex-shrink-0"
          style={{ color: cat.chartColor }}
        >
          {cat.category}
        </span>
        <span className="text-emerald-400 w-32 flex-shrink-0 tracking-tight hidden sm:block">
          {asciiBar(avgVal)}
        </span>
        <span className="text-slate-300">
          {cat.skills.map((s) => s.name).join(" · ")}
        </span>
      </div>
    );
  }

  if (line.type === "summary")
    return (
      <p className="text-xs font-mono">
        <span className="text-emerald-400">◈  Loaded: </span>
        <span className="text-cyan-400 font-bold">{skillCategories.length}</span>
        <span className="text-emerald-400"> categories | </span>
        <span className="text-cyan-400 font-bold">{TOTAL_SKILLS}</span>
        <span className="text-emerald-400"> skills | Status: </span>
        <span className="text-cyan-400 font-bold">AVAILABLE FOR HIRE ✓</span>
      </p>
    );

  return null;
}

/* ── Interactive Terminal ── */
const SKILLS_CMDS = ["show skills", "skills", "load_skills", "load_skills --verbose"];

function TerminalWindow() {
  const [input, setInput]               = useState("");
  const [history, setHistory]           = useState([]); // completed entries
  const [streaming, setStreaming]       = useState(null); // { cmd } | null
  const [linesVisible, setLinesVisible] = useState(0);
  const [running, setRunning]           = useState(false);
  const [blink, setBlink]               = useState(true);
  const [focused, setFocused]           = useState(false);
  const inputRef  = useRef(null);
  const bodyRef   = useRef(null);
  const timersRef = useRef([]);

  /* Cursor blink */
  useEffect(() => {
    const id = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  /* Auto-scroll to bottom on new output — scroll only inside the terminal body */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history, linesVisible]);

  /* Timer cleanup */
  function clearTimers() {
    timersRef.current.forEach(clearInterval);
    timersRef.current = [];
  }
  useEffect(() => () => clearTimers(), []);

  /* Stream OUTPUT_LINES one by one */
  function startStreaming(cmd) {
    clearTimers();
    setStreaming({ cmd });
    setLinesVisible(0);
    setRunning(true);
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setLinesVisible(i);
      if (i >= OUTPUT_LINES.length) {
        clearInterval(timer);
        setHistory((prev) => [...prev, { cmd, type: "skills" }]);
        setStreaming(null);
        setRunning(false);
      }
    }, 155);
    timersRef.current.push(timer);
  }

  function handleSubmit() {
    const cmd   = input.trim();
    const lower = cmd.toLowerCase();
    setInput("");

    if (lower === "clear") {
      setHistory([]);
      setStreaming(null);
      clearTimers();
      setLinesVisible(0);
      setRunning(false);
      return;
    }
    if (lower === "") {
      setHistory((prev) => [...prev, { cmd: "", type: "blank" }]);
      return;
    }
    if (SKILLS_CMDS.includes(lower)) {
      if (running) { clearTimers(); setStreaming(null); setLinesVisible(0); }
      startStreaming(cmd);
      return;
    }
    if (lower === "help") {
      setHistory((prev) => [...prev, { cmd, type: "help" }]);
      return;
    }
    setHistory((prev) => [...prev, { cmd, type: "error" }]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  /* Render a completed history entry */
  function HistoryEntry({ entry }) {
    return (
      <div className="mb-2">
        {entry.cmd !== "" && (
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold select-none">➜</span>
            <span className="text-violet-400 select-none">~</span>
            <span className="text-slate-100">{entry.cmd}</span>
          </div>
        )}
        {entry.type === "skills" && (
          <div className="mt-0.5">
            {OUTPUT_LINES.map((line, i) => <TerminalLine key={i} line={line} />)}
          </div>
        )}
        {entry.type === "help" && (
          <div className="mt-1 text-xs space-y-1">
            <p className="text-slate-400">Available commands:</p>
            <p className="pl-3 text-slate-500">
              <span className="text-cyan-400">show skills</span>
              {"  "}— Display technical skills overview
            </p>
            <p className="pl-3 text-slate-500">
              <span className="text-cyan-400">help</span>
              {"        "}— Show available commands
            </p>
            <p className="pl-3 text-slate-500">
              <span className="text-cyan-400">clear</span>
              {"       "}— Clear the terminal
            </p>
          </div>
        )}
        {entry.type === "error" && (
          <p className="text-red-400/80 text-xs mt-0.5">
            bash: <span className="text-red-300">{entry.cmd}</span>: command not
            found. Type <span className="text-cyan-400">&apos;help&apos;</span> for
            available commands.
          </p>
        )}
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl
                 border border-slate-700/70 ring-1 ring-slate-800/80"
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 px-4 py-3
                      bg-slate-800 border-b border-slate-700/60">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/90" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
          <div className="w-3 h-3 rounded-full bg-green-500/90" />
        </div>
        <span className="text-slate-400 text-xs font-mono mx-auto">
          adarsh@portfolio: ~
        </span>
        <span className="text-slate-600 text-xs font-mono">bash</span>
      </div>

      {/* Body — click anywhere to focus the hidden input */}
      <div
        ref={bodyRef}
        className="bg-slate-950 px-5 sm:px-8 py-6 font-mono text-sm
                   min-h-[320px] max-h-[520px] overflow-y-auto cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Welcome hint shown only before first command */}
        {history.length === 0 && !streaming && (
          <div className="text-xs mb-4 space-y-1">
            <p className="text-slate-400 font-semibold">
              Welcome to adarsh&apos;s portfolio terminal.
            </p>
            <p className="text-slate-500">
              Type{" "}
              <span className="text-cyan-400 font-semibold">show skills</span>
              {" "}and press{" "}
              <span className="border border-slate-600 rounded px-1 py-0.5 text-slate-400">
                Enter
              </span>
              {" "}to load my skills.
            </p>
            <p className="text-slate-600">
              Type <span className="text-slate-500">help</span> for all commands.
            </p>
          </div>
        )}

        {/* Completed history */}
        {history.map((entry, i) => (
          <HistoryEntry key={i} entry={entry} />
        ))}

        {/* Currently streaming entry */}
        {streaming && (
          <div className="mb-2">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold select-none">➜</span>
              <span className="text-violet-400 select-none">~</span>
              <span className="text-slate-100">{streaming.cmd}</span>
            </div>
            <div className="mt-0.5">
              {OUTPUT_LINES.slice(0, linesVisible).map((line, i) => (
                <TerminalLine key={i} line={line} />
              ))}
            </div>
          </div>
        )}

        {/* Active input prompt — hidden while output is streaming */}
        {!running && (
          <div
            className="flex items-center gap-2 mt-1"
            onClick={() => inputRef.current?.focus()}
          >
            <span className="text-cyan-400 font-bold select-none">➜</span>
            <span className="text-violet-400 select-none">~</span>
            <span className="text-slate-100">{input}</span>
            <span
              className={`text-cyan-400 font-bold transition-opacity duration-75 ${
                focused && blink ? "opacity-100" : "opacity-0"
              }`}
            >
              █
            </span>
          </div>
        )}

        {/* Hidden real input — captures keyboard events */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Terminal input"
          className="absolute opacity-0 pointer-events-none w-px h-px"
        />
      </div>
    </div>
  );
}

/**
 * Skills — Terminal-style developer aesthetic.
 */
export default function Skills() {
  return (
    <SectionWrapper
      id="skills"
      floating={
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="absolute bottom-20 left-6 hidden xl:block pointer-events-none"
        >
          <div
            className="dark:bg-slate-800/70 bg-white/90 backdrop-blur-sm
                        border dark:border-slate-700/50 border-slate-200
                        rounded-2xl p-4 shadow-card font-mono text-xs
                        w-52 animate-[float_9s_ease-in-out_infinite]"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 font-bold">{"{}"}</span>
              <span className="dark:text-slate-400 text-slate-500">
                package.json
              </span>
            </div>
            <div className="space-y-1 dark:text-slate-400 text-slate-500">
              <p>
                <span className="text-blue-400">&quot;learning&quot;</span>: [
              </p>
              <p className="pl-3 text-amber-300">&quot;Next.js 15&quot;,</p>
              <p className="pl-3 text-amber-300">&quot;TypeScript&quot;,</p>
              <p className="pl-3 text-amber-300">
                &quot;System Design&quot;
              </p>
              <p>],</p>
              <p>
                <span className="text-blue-400">&quot;streak&quot;</span>:{" "}
                <span className="text-emerald-400">&quot;🔥 ongoing&quot;</span>
              </p>
            </div>
          </div>
        </motion.div>
      }
    >
      <SectionHeading
        label="Skills"
        title="Technical"
        highlight="Expertise"
        subtitle="Technologies and tools I use to build great products."
      />

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <TerminalWindow />
      </motion.div>

      {/* Tech badge pills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-10 flex flex-wrap justify-center gap-2"
      >
        {[
          { label: "React",      Icon: SiReact,       color: "#61DAFB" },
          { label: "Node.js",    Icon: SiNodedotjs,   color: "#339933" },
          { label: "MongoDB",    Icon: SiMongodb,     color: "#47A248" },
          { label: "MySQL",      Icon: SiMysql,       color: "#4479A1" },
          { label: "AWS",        Icon: FiCloud,       color: "#FF9900" },
          { label: "Git",        Icon: SiGit,         color: "#F05032" },
          { label: "GitHub",     Icon: SiGithub,      color: null      },
          { label: "Python",     Icon: SiPython,      color: "#3776AB" },
          { label: "Tailwind",   Icon: SiTailwindcss, color: "#06B6D4" },
          { label: "Linux",      Icon: SiLinux,       color: "#FCC624" },
          { label: "Figma",      Icon: SiFigma,       color: "#F24E1E" },
          { label: "C++",        Icon: SiCplusplus,   color: "#00599C" },
          { label: "JavaScript", Icon: SiJavascript,  color: "#F7DF1E" },
        ].map(({ label, Icon, color }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
                       dark:bg-slate-800 bg-slate-100
                       dark:text-slate-300 text-slate-700
                       border dark:border-slate-700/60 border-slate-200
                       hover:border-cyan-500/50 hover:text-cyan-400
                       transition-all duration-200 cursor-default"
          >
            <Icon className="w-3.5 h-3.5" style={{ color }} />
            {label}
          </span>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
