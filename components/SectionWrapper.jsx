"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * SectionWrapper — Reusable section container with:
 * - Scroll-triggered directional animation via Framer Motion
 *   "from-left" | "from-right" | "from-bottom" (default)
 * - Consistent padding, max-width, and section id support
 * - Alternating subtle background pattern
 */

const directionOffset = {
  "from-left":   { x: -50, y: 0 },
  "from-right":  { x:  50, y: 0 },
  "from-bottom": { x:   0, y: 40 },
};

const SectionWrapper = ({
  children,
  id,
  className = "",
  alternate = false,
  floating = null,
  direction,              // optional override; auto-derived from alternate if omitted
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.08,
  });

  // Auto-alternate: non-alternate sections slide from left, alternate sections from right
  const resolvedDirection = direction ?? (alternate ? "from-right" : "from-left");
  const offset = directionOffset[resolvedDirection] ?? directionOffset["from-bottom"];

  const variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" },
    },
  };

  return (
    <section
      id={id}
      className={`py-20 sm:py-24 relative ${
        alternate
          ? "dark:bg-slate-900/50 bg-white"
          : "dark:bg-transparent bg-slate-50"
      } ${className}`}
    >
      {floating}
      <motion.div
        ref={ref}
        variants={variants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;
