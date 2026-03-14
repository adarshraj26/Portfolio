"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { HiMoon, HiSun } from "react-icons/hi2";

/* ── Nav links configuration ── */
import { useDevMode } from "./DevModeContext";
import DevModeToggle from "./DevModeToggle";
import RecruiterModeToggle from "./RecruiterModeToggle";

const baseNavLinks = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Coding",       href: "#coding" },
  { label: "Experience",   href: "#experience" },
  { label: "Projects",     href: "#projects" },
  // { label: "Toolbelt",     href: "#toolbelt" },
  { label: "Estimator",   href: "#estimator" },
  { label: "Achievements", href: "#achievements" },
  { label: "Education",    href: "#education" },
  { label: "Contact",      href: "#contact" },
];

/**
 * Navbar — Floating pill-style navigation bar with:
 * - Rounded capsule shape, centered and floating above content
 * - Glass blur effect + stronger shadow on scroll
 * - Dark/Light mode toggle
 * - Mobile drawer menu
 * - Active link highlighting
 */


export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { setTheme, resolvedTheme }   = useTheme();
  const [mounted, setMounted]         = useState(false);
  const { devMode } = useDevMode();

  // Filter nav links based on dev mode
  const navLinks = devMode
    ? baseNavLinks
    : baseNavLinks.filter((l) => l.label !== "Estimator");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, [navLinks]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Floating pill navbar ── */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`pointer-events-auto w-full max-w-6xl rounded-full
                      transition-all duration-300
                      dark:bg-slate-900/85 bg-white/85 backdrop-blur-xl
                      border dark:border-slate-700/60 border-slate-200/70
                      ${scrolled
                        ? "shadow-[0_8px_32px_rgba(0,0,0,0.25)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "shadow-[0_4px_16px_rgba(0,0,0,0.10)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                      }`}
        >
          <nav className="px-6 sm:px-8 h-14 flex items-center justify-between gap-2">

            {/* Logo / Brand */}
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
              className="flex items-center gap-2 group flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600
                              flex items-center justify-center text-white font-bold text-sm
                              shadow-glow-cyan group-hover:scale-110 transition-transform">
                AR
              </div>
              <span className="font-bold text-sm dark:text-white text-slate-900 hidden sm:block">
                Adarsh<span className="text-cyan-400">.</span>
              </span>
            </a>

            {/* Desktop Nav Links */}
            <ul className="hidden md:flex items-center gap-0.5">
              <AnimatePresence initial={false}>
                {navLinks.map((link) => {
                  const isEstimator = link.label === "Estimator";
                  // Animate only the Estimator link
                  if (isEstimator) {
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <button
                          onClick={() => handleNavClick(link.href)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                            ${activeSection === link.href
                              ? "text-cyan-400 bg-cyan-500/10"
                              : "dark:text-slate-400 text-slate-600 hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                            }`}
                        >
                          {link.label}
                        </button>
                      </motion.li>
                    );
                  }
                  // Other links, no animation
                  return (
                    <li key={link.href}>
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                          ${activeSection === link.href
                            ? "text-cyan-400 bg-cyan-500/10"
                            : "dark:text-slate-400 text-slate-600 hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                          }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  );
                })}
              </AnimatePresence>
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {/* Theme Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  aria-label="Toggle theme"
                  className={`w-11 h-11 rounded-full flex items-center justify-center
                             shadow-glow-cyan hover:scale-110 transition-all duration-300 relative
                             ${resolvedTheme === "dark"
                               ? "bg-gradient-to-br from-cyan-500/10 to-blue-600/10"
                               : "bg-gradient-to-br from-slate-200 to-sky-100"}
                  `}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {resolvedTheme === "dark" ? (
                      <motion.span
                        key="sun"
                        initial={{ rotate: 90, scale: 0.7, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: -90, scale: 0.7, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center justify-center absolute inset-0"
                      >
                        <HiSun className="w-6 h-6 text-yellow-400 drop-shadow-glow-cyan" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="moon"
                        initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0.7, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center justify-center absolute inset-0"
                      >
                        <HiMoon className="w-6 h-6 text-blue-500 drop-shadow-glow-cyan" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              )}

              {/* Status Indicator Only — desktop */}
              <div className="hidden md:inline-flex items-center justify-center">
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 animate-fade-in">
                  Open to Work
                </span>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center
                           dark:text-slate-400 text-slate-600
                           dark:hover:bg-slate-800 hover:bg-slate-100
                           transition-all duration-200"
              >
                {mobileOpen
                  ? <HiX className="w-5 h-5" />
                  : <HiMenuAlt3 className="w-5 h-5" />
                }
              </button>
            </div>
          </nav>
        </motion.header>
      </div>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-y-0 right-0 z-[99] w-64 dark:bg-slate-900 bg-white
                       dark:border-l border-slate-700/50 shadow-2xl md:hidden pt-20 px-6 flex flex-col"
          >
            <div className="flex flex-col gap-1 flex-1">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all
                        ${activeSection === link.href
                          ? "text-cyan-400 bg-cyan-500/10"
                          : "dark:text-slate-300 text-slate-700 hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                        }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="pt-4 flex flex-col items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 animate-fade-in">
                    Open to Work
                  </span>
                </li>
              </ul>
              {/* Toggles at the bottom of sidebar */}
              <div className="mt-auto flex flex-col gap-3 pt-8">
                <RecruiterModeToggle mobileSidebar />
                <DevModeToggle mobileSidebar />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
