"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiDownload, FiX } from "react-icons/fi";

const RESUME_PATH = "/Adarsh_Raj_9386012794.pdf";

export default function ResumeViewer() {
  const [open, setOpen] = useState(false);

  // Set a global flag for resume open state
  useEffect(() => {
    if (open) {
      window.__resumeOpen = true;
    } else {
      window.__resumeOpen = false;
    }
    return () => { window.__resumeOpen = false; };
  }, [open]);

  /* Register a global opener so Hero / Navbar can trigger it */
  useEffect(() => {
    window.__openResume = () => setOpen(true);
    return () => { delete window.__openResume; };
  }, []);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
          />

          {/* ── Modal ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 sm:inset-8 z-[61] flex flex-col
                       dark:bg-slate-900 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Title bar — VS Code style */}
            <div
              className="flex items-center justify-between px-4 py-2.5 flex-shrink-0
                         dark:bg-slate-800/70 bg-slate-100
                         border-b dark:border-slate-700/50 border-slate-200"
            >
              {/* Traffic-light dots */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-60" />
                </div>
                <span className="text-xs font-mono dark:text-slate-400 text-slate-500 ml-1">
                  Adarsh_Raj_Resume.pdf
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={RESUME_PATH}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                             bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                             hover:scale-105 hover:shadow-lg transition-all duration-200"
                >
                  <FiDownload className="w-3.5 h-3.5" />
                  Download
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center
                             dark:text-slate-400 text-slate-600
                             dark:hover:bg-slate-700 hover:bg-slate-200
                             transition-all duration-200"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PDF iframe */}
            <div className="flex-1 overflow-hidden dark:bg-slate-800 bg-slate-100">
              <iframe
                src={RESUME_PATH}
                title="Adarsh Raj — Resume"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
