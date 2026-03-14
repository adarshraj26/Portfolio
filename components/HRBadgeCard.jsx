"use client";

import { motion } from "framer-motion";

/* Domain → accent color mapping */
const DOMAIN_COLORS = {
  "problem solving":  { bg: "bg-cyan-500/10",    text: "text-cyan-400",    ring: "border-cyan-500/30"    },
  "python":           { bg: "bg-blue-500/10",     text: "text-blue-400",    ring: "border-blue-500/30"    },
  "java":             { bg: "bg-orange-500/10",   text: "text-orange-400",  ring: "border-orange-500/30"  },
  "sql":              { bg: "bg-emerald-500/10",  text: "text-emerald-400", ring: "border-emerald-500/30" },
  "algorithms":       { bg: "bg-purple-500/10",   text: "text-purple-400",  ring: "border-purple-500/30"  },
  "data structures":  { bg: "bg-teal-500/10",     text: "text-teal-400",    ring: "border-teal-500/30"    },
  "mathematics":      { bg: "bg-pink-500/10",     text: "text-pink-400",    ring: "border-pink-500/30"    },
  "c":                { bg: "bg-slate-500/10",    text: "text-slate-400",   ring: "border-slate-500/30"   },
  "c++":              { bg: "bg-blue-500/10",     text: "text-blue-400",    ring: "border-blue-500/30"    },
  "javascript":       { bg: "bg-yellow-500/10",   text: "text-yellow-400",  ring: "border-yellow-500/30"  },
  "node.js":          { bg: "bg-green-500/10",    text: "text-green-400",   ring: "border-green-500/30"   },
  "react":            { bg: "bg-cyan-500/10",     text: "text-cyan-400",    ring: "border-cyan-500/30"    },
  "shell":            { bg: "bg-green-500/10",    text: "text-green-400",   ring: "border-green-500/30"   },
  "rest api":         { bg: "bg-amber-500/10",    text: "text-amber-400",   ring: "border-amber-500/30"   },
  "linux shell":      { bg: "bg-green-500/10",    text: "text-green-400",   ring: "border-green-500/30"   },
  "regex":            { bg: "bg-rose-500/10",     text: "text-rose-400",    ring: "border-rose-500/30"    },
};

const DEFAULT_COLOR = { bg: "bg-indigo-500/10", text: "text-indigo-400", ring: "border-indigo-500/30" };

function getColor(name = "") {
  return DOMAIN_COLORS[name.toLowerCase()] ?? DEFAULT_COLOR;
}

/* Star rating visual — up to 5 stars */
function StarRating({ count = 0, max = 5 }) {
  const starColor = [
    "",
    "text-amber-600",   // 1 — bronze
    "text-slate-400",   // 2 — silver
    "text-yellow-400",  // 3 — gold
    "text-cyan-400",    // 4 — platinum
    "text-purple-400",  // 5 — diamond
  ];
  const color = starColor[Math.min(count, max)] ?? "text-yellow-400";

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`w-3 h-3 ${i < count ? color : "dark:text-slate-700 text-slate-300"}`}
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * HRBadgeCard — Single HackerRank domain badge with star rating.
 * Props: name, stars, points, index (for stagger delay)
 */
export default function HRBadgeCard({ name, stars, points, index = 0 }) {
  const { bg, text, ring } = getColor(name);

  // Abbreviate long names for the icon initials
  const initials = name
    .split(" ")
    .map((w) => w[0]?.toUpperCase() ?? "")
    .slice(0, 2)
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={`dark:bg-slate-800/60 bg-white rounded-2xl p-4
                  border ${ring} dark:border-opacity-100 border-opacity-60
                  shadow-sm hover:shadow-md hover:-translate-y-0.5
                  transition-all duration-200 flex flex-col gap-3`}
    >
      {/* Icon + name */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
          <span className={`text-xs font-bold ${text}`}>{initials}</span>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold dark:text-white text-slate-900 leading-tight truncate">
            {name}
          </p>
          {points > 0 && (
            <p className={`text-[10px] font-mono ${text} leading-none mt-0.5`}>
              {points} pts
            </p>
          )}
        </div>
      </div>

      {/* Stars */}
      <StarRating count={stars} />
    </motion.div>
  );
}
