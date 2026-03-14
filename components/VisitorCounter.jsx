"use client";

import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";

/**
 * VisitorCounter — Fetches live page view count from /api/visitors.
 * Displays a subtle badge. Gracefully hides if the API is unavailable.
 */
export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("/api/visitors")
      .then((r) => r.json())
      .then((d) => { if (d.count != null) setCount(d.count); })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs
                     dark:text-slate-500 text-slate-400">
      <FiUsers className="w-3 h-3" />
      {count.toLocaleString()} visitors
    </span>
  );
}
