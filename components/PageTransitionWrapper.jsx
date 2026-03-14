"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * PageTransitionWrapper — Wraps page content with Framer Motion.
 * - On initial load: page fades + slides up into view.
 * - On route change: current page fades out, new page fades in.
 * - Keyed by pathname so AnimatePresence fires on every navigation.
 */
export default function PageTransitionWrapper({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
