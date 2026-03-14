"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiMessageSquare, FiSend, FiX } from "react-icons/fi";
import { SiGoogle } from "react-icons/si";

const SUGGESTED = [
  "What projects has Adarsh built?",
  "What are his main skills?",
  "Is he available for hire?",
  "Tell me about SensAI",
];

const WELCOME = {
  role: "assistant",
  content: "Hi! I'm Adarsh's AI assistant. Ask me anything about his projects, skills, or availability. 👋",
};

/**
 * AiPortfolioChat — Floating chat widget powered by Gemini.
 * Answers questions about Adarsh's portfolio, skills, and availability.
 */
export default function AiPortfolioChat() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  /* Scroll to bottom on new message */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const send = async (text) => {
    const userText = (text ?? input).trim();
    if (!userText || loading) return;
    setInput("");

    const userMsg = { role: "user", content: userText };
    const next = [...messages, userMsg];
    setMessages(next);
    setLoading(true);

    try {
      const res = await fetch("/api/portfolio-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m) => m.role !== "assistant" || m !== WELCOME) }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply || "Sorry, I couldn't get a response." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Toggle button ── */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full
                    flex items-center justify-center shadow-xl border
                    transition-colors duration-200
                    ${open
                      ? "bg-slate-800 border-slate-600 text-slate-300"
                      : "bg-gradient-to-br from-cyan-500 to-blue-600 border-transparent text-white shadow-[0_0_24px_rgba(6,182,212,0.4)]"
                    }`}
        aria-label="Open portfolio chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <FiX className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <FiMessageSquare className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-6 z-40 w-[340px] sm:w-[380px]
                       dark:bg-slate-900 bg-white rounded-2xl shadow-2xl
                       border dark:border-slate-700/60 border-slate-200
                       flex flex-col overflow-hidden"
            style={{ maxHeight: "min(520px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="px-4 py-3.5 border-b dark:border-slate-800 border-slate-100
                            flex items-center gap-3 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600
                              flex items-center justify-center flex-shrink-0">
                <SiGoogle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold dark:text-white text-slate-900 leading-tight">Portfolio Assistant</p>
                <p className="text-[11px] dark:text-slate-500 text-slate-400">Ask about Adarsh&apos;s work</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-400 font-medium">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed
                      ${msg.role === "user"
                        ? "bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-br-sm"
                        : "dark:bg-slate-800 bg-slate-100 dark:text-slate-200 text-slate-700 rounded-bl-sm"
                      }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading bubble */}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="dark:bg-slate-800 bg-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full dark:bg-slate-500 bg-slate-400"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions (only at start) */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-2.5 py-1 rounded-full
                               dark:bg-slate-800 bg-slate-100
                               dark:text-slate-300 text-slate-600
                               dark:border-slate-700 border-slate-200 border
                               hover:border-cyan-500/50 hover:text-cyan-400
                               transition-colors duration-150"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pb-3 pt-2 border-t dark:border-slate-800 border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-2 dark:bg-slate-800 bg-slate-50
                              rounded-xl px-3 py-2 border dark:border-slate-700 border-slate-200">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Ask something…"
                  className="flex-1 bg-transparent text-sm dark:text-slate-200 text-slate-800
                             dark:placeholder-slate-600 placeholder-slate-400
                             outline-none min-w-0"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600
                             flex items-center justify-center flex-shrink-0
                             disabled:opacity-30 hover:opacity-90 transition-opacity"
                >
                  <FiSend className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
              <p className="text-center text-[10px] dark:text-slate-700 text-slate-400 mt-1.5 font-mono">
                Powered by Gemini 1.5 Flash
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
