"use client";
import { FiBriefcase } from "react-icons/fi";
import { useRecruiterMode } from "./RecruiterModeContext";

export default function RecruiterModeToggle({ mobileSidebar }) {
  const { recruiterMode, setRecruiterMode } = useRecruiterMode();
  // If in mobile sidebar, render as static button
  if (mobileSidebar) {
    return (
      <button
        onClick={() => setRecruiterMode((v) => !v)}
        className={`w-full flex items-center gap-2 px-4 py-2 rounded-full shadow border border-amber-500 bg-white dark:bg-slate-900 transition-colors duration-200 focus:outline-none ${recruiterMode ? "bg-amber-100 dark:bg-amber-900" : ""}`}
        title={recruiterMode ? "Disable Recruiter Mode" : "Enable Recruiter Mode"}
        style={{ minWidth: 110 }}
      >
        <span className="font-bold text-amber-600 text-xs">Recruiter Mode</span>
        <span
          className={`relative w-10 h-6 flex items-center bg-amber-200 rounded-full transition-colors duration-200 ${recruiterMode ? "bg-amber-500" : "bg-amber-200"}`}
        >
          <span
            className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${recruiterMode ? "translate-x-4 border-2 border-amber-600" : "translate-x-0 border border-amber-400"}`}
            style={{ boxSizing: "border-box" }}
          />
        </span>
        <FiBriefcase className={`w-5 h-5 ml-1 ${recruiterMode ? "text-amber-600" : "text-amber-400"}`} />
      </button>
    );
  }

  // Hide on mobile, show only on sm and up, and use absolute positioning in main content
  return (
    <div className="hidden sm:block absolute top-8 left-8 z-50">
      <button
        onClick={() => setRecruiterMode((v) => !v)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border border-amber-500 bg-white dark:bg-slate-900 transition-colors duration-200 focus:outline-none ${recruiterMode ? "bg-amber-100 dark:bg-amber-900" : ""}`}
        title={recruiterMode ? "Disable Recruiter Mode" : "Enable Recruiter Mode"}
        style={{ minWidth: 110 }}
      >
        <span className="font-bold text-amber-600 text-xs">Recruiter Mode</span>
        <span
          className={`relative w-10 h-6 flex items-center bg-amber-200 rounded-full transition-colors duration-200 ${recruiterMode ? "bg-amber-500" : "bg-amber-200"}`}
        >
          <span
            className={`absolute left-0 top-0 w-6 h-6 bg-white rounded-full shadow transition-transform duration-200 ${recruiterMode ? "translate-x-4 border-2 border-amber-600" : "translate-x-0 border border-amber-400"}`}
            style={{ boxSizing: "border-box" }}
          />
        </span>
        <FiBriefcase className={`w-5 h-5 ml-1 ${recruiterMode ? "text-amber-600" : "text-amber-400"}`} />
      </button>
    </div>
  );
}
