"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * LoadingScreen — Full-screen intro splash shown once per session.
 * Displays the AR logo, name, tagline, and an animated progress bar,
 * then fades out to reveal the portfolio.
 */
export default function LoadingScreen() {
  const [visible, setVisible]   = useState(true);
  const [percent, setPercent]   = useState(0);

  useEffect(() => {
    // Only show once per browser session
    if (sessionStorage.getItem("ar_loaded")) {
      setVisible(false);
      return;
    }

    // Lock scroll while loading
    document.body.style.overflow = "hidden";

    // Drive percentage counter (0→100 over ~6 s)
    let p = 0;
    const interval = setInterval(() => {
      p += 1;
      setPercent(p);
      if (p >= 100) clearInterval(interval);
    }, 60);

    // Dismiss after 7 s
    const timer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("ar_loaded", "true");
    }, 7000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: "easeInOut" } }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#0f172a]"
        >
          {/* Subtle grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* Ambient glow blob */}
          <div className="absolute w-[500px] h-[500px] rounded-full
                          bg-cyan-500/5 blur-[120px] pointer-events-none" />

          {/* ── Logo ── */}
          <motion.div
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: 1,    opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative mb-6"
          >
            <div className="w-20 h-20 rounded-2xl
                            bg-gradient-to-br from-cyan-500 to-blue-600
                            flex items-center justify-center
                            shadow-[0_0_50px_rgba(6,182,212,0.45)]">
              <span className="text-white font-black text-3xl tracking-tight select-none">
                AR
              </span>
            </div>
            {/* Ping ring */}
            <span className="absolute inset-0 rounded-2xl animate-ping
                             bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20" />
          </motion.div>

          {/* ── Name ── */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0  }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="text-2xl font-bold text-white mb-1 select-none"
          >
            Adarsh{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400
                             bg-clip-text text-transparent">
              Raj
            </span>
          </motion.h1>

          {/* ── Tagline ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.45 }}
            className="text-slate-400 text-sm font-medium mb-10 select-none"
          >
            Full Stack Developer
          </motion.p>

          {/* ── Progress bar + counter ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-4/5 max-w-md"
          >
            {/* Percentage number */}
            <div className="flex items-end justify-between mb-3">
              <span className="text-slate-500 text-[11px] font-mono tracking-widest uppercase">
                Initialising…
              </span>
              <span className="text-4xl font-black font-mono bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent leading-none">
                {percent}<span className="text-xl">%</span>
              </span>
            </div>

            {/* Track */}
            <div className="h-3 rounded-full bg-slate-800/80 overflow-hidden shadow-inner">
              {/* Fill */}
              <motion.div
                className="h-full rounded-full
                           bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500
                           shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.4, duration: 6, ease: "easeInOut" }}
              />
            </div>

            {/* Step hint */}
            <p className="mt-2.5 text-center text-slate-600 text-[11px] font-mono tracking-wide">
              {percent < 30 ? "Loading assets…"
               : percent < 60 ? "Preparing components…"
               : percent < 90 ? "Almost there…"
               : "Ready!"}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
