"use client";
import { useEffect, useRef, useState } from "react";
import { FiTool } from "react-icons/fi";
import { useDevMode } from "./DevModeContext";

export default function DevModeToggle({ mobileSidebar }) {
  const { devMode, setDevMode } = useDevMode();
  const toastRef = useRef(null);
  const [hide, setHide] = useState(false);

  // Hide toggle if resume is open
  useEffect(() => {
    const check = () => setHide(window.__resumeOpen === true);
    check();
    window.addEventListener("resumeOpenChange", check);
    const interval = setInterval(check, 300);
    return () => {
      window.removeEventListener("resumeOpenChange", check);
      clearInterval(interval);
    };
  }, []);

  function handleToggle() {
    setDevMode((v) => {
      if (!v) {
        // Show toast when turning ON
        if (toastRef.current) {
          toastRef.current.classList.remove("hidden");
          setTimeout(() => {
            toastRef.current.classList.add("hidden");
          }, 2200);
        }
      }
      return !v;
    });
  }

  if (hide) return null;

  // If in mobile sidebar, render as static button
  if (mobileSidebar) {
    return (
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-2 px-4 py-2 rounded-full shadow border border-cyan-500 bg-white dark:bg-slate-900 transition-colors duration-200 focus:outline-none"
        title={devMode ? "Disable Developer Mode" : "Enable Developer Mode"}
        style={{ minWidth: 80 }}
      >
        <span className="font-bold text-cyan-600 text-xs">Dev Mode</span>
        <span
          className={`relative w-10 h-6 flex items-center bg-cyan-200 rounded-full transition-colors duration-200 ${devMode ? "bg-cyan-500" : "bg-cyan-200"}`}
        >
          <span
            className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${devMode ? "translate-x-4 border-2 border-cyan-600" : "translate-x-0 border border-cyan-400"}`}
            style={{ boxSizing: "border-box" }}
          />
        </span>
        <FiTool className={`w-5 h-5 ml-1 ${devMode ? "text-cyan-600" : "text-cyan-400"}`} />
      </button>
    );
  }

  // Hide on mobile, show only on sm and up, and use absolute positioning in main content
  return (
    <>
      {/* Toast notification */}
      <div
        ref={toastRef}
        className="hidden fixed top-20 right-8 z-[99999] bg-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg font-semibold text-sm transition-all duration-300"
      >
        Developer Mode Enabled! Experimental features unlocked.
      </div>
      {/* Toggle switch (hidden on mobile, block on sm+) */}
      <div className="hidden sm:block absolute top-8 right-8 z-50">
        <button
          onClick={handleToggle}
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border border-cyan-500 bg-white dark:bg-slate-900 transition-colors duration-200 focus:outline-none"
          title={devMode ? "Disable Developer Mode" : "Enable Developer Mode"}
          style={{ minWidth: 80 }}
        >
          <span className="font-bold text-cyan-600 text-xs">Dev Mode</span>
          <span
            className={`relative w-10 h-6 flex items-center bg-cyan-200 rounded-full transition-colors duration-200 ${devMode ? "bg-cyan-500" : "bg-cyan-200"}`}
          >
            <span
              className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${devMode ? "translate-x-4 border-2 border-cyan-600" : "translate-x-0 border border-cyan-400"}`}
              style={{ boxSizing: "border-box" }}
            />
          </span>
          <FiTool className={`w-5 h-5 ml-1 ${devMode ? "text-cyan-600" : "text-cyan-400"}`} />
        </button>
      </div>
    </>
  );
}