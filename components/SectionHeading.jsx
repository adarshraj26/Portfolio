"use client";

import { motion } from "framer-motion";

/**
 * SectionHeading — Reusable heading block for every section.
 * Shows a label badge, main title (with gradient on the highlighted word),
 * and an optional subtitle.
 */
const SectionHeading = ({ label, title, highlight, subtitle }) => {
  return (
    <div className="text-center mb-14">
      {/* Label badge */}
      <motion.span
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase
                   bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4"
      >
        {label}
      </motion.span>

      {/* Main title */}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold dark:text-white text-slate-900 mb-4">
        {title}{" "}
        {highlight && (
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {/* Divider line */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
      </div>

      {/* Optional subtitle */}
      {subtitle && (
        <p className="text-base sm:text-lg dark:text-slate-400 text-slate-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
