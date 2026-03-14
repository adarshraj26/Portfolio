"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiPlay, FiRefreshCw, FiTerminal, FiTrash2 } from "react-icons/fi";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Supported languages ── */
const LANGUAGES = [
  {
    label:       "Python",
    value:       "python",
    filename:    "main.py",
    placeholder: "# Write your Python code here\nprint('Hello, World!')",
  },
  {
    label:       "JavaScript",
    value:       "javascript",
    filename:    "main.js",
    placeholder: "// Write your JavaScript code here\nconsole.log('Hello, World!');",
  },
  {
    label:       "Java",
    value:       "java",
    filename:    "Main.java",
    placeholder: 'class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  },
  {
    label:       "C++",
    value:       "c++",
    filename:    "main.cpp",
    placeholder: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  },
];

/* ── Component ── */
export default function CodePlayground() {
  const [langIdx, setLangIdx]   = useState(0);
  const [code, setCode]         = useState("");
  const [output, setOutput]     = useState("");
  const [running, setRunning]   = useState(false);
  const [hasError, setHasError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef(null);
  const lang    = LANGUAGES[langIdx];

  /* Close language menu on outside click */
  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function selectLang(idx) {
    setLangIdx(idx);
    setCode("");
    setOutput("");
    setHasError(false);
    setMenuOpen(false);
  }

  function clearEditor() {
    setCode("");
    setOutput("");
    setHasError(false);
  }

  async function runCode() {
    const trimmed = code.trim();
    if (!trimmed) return;

    setRunning(true);
    setOutput("");
    setHasError(false);

    try {
      const res = await fetch("/api/run", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language: lang.value, code: trimmed }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data   = await res.json();

      if (data.error) {
        setOutput(data.error);
        setHasError(true);
      } else if (data.stderr && !data.stdout) {
        setOutput(data.stderr.trim());
        setHasError(true);
      } else {
        setOutput(data.stdout?.trim() || "(no output)");
      }
    } catch (err) {
      setOutput(`Error: ${err.message}\n\nPlease try again in a moment.`);
      setHasError(true);
    } finally {
      setRunning(false);
    }
  }

  return (
    <SectionWrapper id="playground">
      <SectionHeading
        label="Code Playground"
        title="Live Code"
        highlight="Editor"
        subtitle="Write and run your own code right in the browser — no setup needed."
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-4">

          {/* ── Editor panel ── */}
          <div className="rounded-2xl overflow-hidden shadow-2xl
                          border dark:border-slate-700/50 border-slate-300
                          flex flex-col">

            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3
                            bg-slate-800 border-b border-slate-700/60 flex-shrink-0">
              {/* Traffic lights */}
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/90" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
                <div className="w-3 h-3 rounded-full bg-green-500/90" />
              </div>

              {/* Language picker */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-mono text-slate-300
                             bg-slate-700/60 hover:bg-slate-700
                             border border-slate-600/60 rounded-lg
                             px-3 py-1.5 transition-colors"
                >
                  {lang.label}
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {menuOpen && (
                  <div className="absolute right-0 top-full mt-1
                                  bg-slate-800 border border-slate-700
                                  rounded-xl shadow-xl z-50 min-w-[140px]
                                  overflow-hidden">
                    {LANGUAGES.map((l, i) => (
                      <button
                        key={l.value}
                        onClick={() => selectLang(i)}
                        className={`w-full text-left px-4 py-2.5 text-xs font-mono
                                    transition-colors
                                    ${i === langIdx
                                      ? "text-cyan-400 bg-cyan-500/10"
                                      : "text-slate-300 hover:bg-slate-700"
                                    }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="text-slate-600 text-[10px] font-mono">
                {lang.filename}
              </span>
            </div>

            {/* Textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                /* Tab inserts spaces instead of shifting focus */
                if (e.key === "Tab") {
                  e.preventDefault();
                  const s = e.target.selectionStart;
                  const v = code.substring(0, s) + "    " + code.substring(e.target.selectionEnd);
                  setCode(v);
                  setTimeout(() => e.target.setSelectionRange(s + 4, s + 4), 0);
                }
              }}
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              placeholder={lang.placeholder}
              className="flex-1 bg-slate-950 text-slate-200 font-mono text-sm
                         p-5 resize-none outline-none min-h-[280px] leading-relaxed
                         placeholder:text-slate-700"
            />

            {/* Actions */}
            <div className="px-4 pb-4 bg-slate-950 flex gap-2 flex-shrink-0">
              <button
                onClick={runCode}
                disabled={running || !code.trim()}
                className="flex-1 flex items-center justify-center gap-2
                           py-2.5 rounded-xl font-semibold text-sm
                           bg-gradient-to-r from-cyan-500 to-blue-600
                           text-white transition-all duration-200
                           hover:from-cyan-400 hover:to-blue-500
                           disabled:opacity-40 disabled:cursor-not-allowed
                           hover:scale-[1.02] active:scale-[0.98]"
              >
                {running ? (
                  <><FiRefreshCw className="w-4 h-4 animate-spin" /> Running...</>
                ) : (
                  <><FiPlay className="w-4 h-4" /> Run Code</>
                )}
              </button>

              <button
                onClick={clearEditor}
                title="Clear editor"
                className="px-3 py-2.5 rounded-xl
                           text-slate-500 hover:text-red-400
                           border border-slate-700/60 hover:border-red-500/40
                           transition-all duration-200"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ── Output panel ── */}
          <div className="rounded-2xl overflow-hidden shadow-2xl
                          border dark:border-slate-700/50 border-slate-300
                          flex flex-col">

            {/* Title bar */}
            <div className="flex items-center gap-3 px-4 py-3
                            bg-slate-800 border-b border-slate-700/60 flex-shrink-0">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors
                               ${output
                                 ? hasError ? "bg-red-400" : "bg-emerald-400"
                                 : "bg-slate-600"
                               } ${running ? "animate-pulse" : ""}`}
              />
              <FiTerminal className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-400 text-xs font-mono">output</span>
              {output && !running && (
                <span className={`ml-auto text-[10px] font-mono
                                  ${hasError ? "text-red-500" : "text-emerald-600"}`}>
                  {hasError ? "error" : "success"}
                </span>
              )}
            </div>

            {/* Output body */}
            <div className="flex-1 bg-slate-950 p-5 min-h-[280px] overflow-auto">
              {!output && !running && (
                <p className="text-slate-700 text-xs font-mono select-none">
                  // Output will appear here after you run your code...
                </p>
              )}

              {running && (
                <div className="flex items-center gap-2">
                  <FiRefreshCw className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span className="text-cyan-400 text-xs font-mono animate-pulse">
                    Executing...
                  </span>
                </div>
              )}

              {output && !running && (
                <pre className={`text-sm font-mono whitespace-pre-wrap break-words leading-relaxed
                                 ${hasError ? "text-red-400" : "text-emerald-300"}`}>
                  {output}
                </pre>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 pb-3 bg-slate-950 flex-shrink-0">
              <p className="text-[10px] text-slate-700 font-mono">
                Powered by Wandbox · Sandboxed · Python, JS, Java, C++
              </p>
            </div>
          </div>

        </div>

        {/* Tip */}
        <p className="text-center text-xs dark:text-slate-600 text-slate-400 mt-4 font-mono">
          Tab key inserts spaces · Select a language from the dropdown to switch
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
