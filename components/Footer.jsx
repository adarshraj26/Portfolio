"use client";

import { motion } from "framer-motion";
import { FiArrowUp, FiGithub, FiHeart, FiLinkedin, FiMail } from "react-icons/fi";
import VisitorCounter from "./VisitorCounter";

/* ── Footer social links ── */
const socials = [
  { icon: FiGithub, href: "https://github.com/adarshraj26", label: "GitHub" },
  { icon: FiLinkedin, href: "https://www.linkedin.com/in/adarsh-raj26/", label: "LinkedIn" },
  { icon: FiMail, href: "https://mail.google.com/mail/?view=cm&to=contact.adarshraj26@gmail.com", label: "Email" },
];

/* ── Quick nav links ── */
const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const scrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

/**
 * Footer — Clean footer with social links, quick nav,
 * and back-to-top button.
 */
export default function Footer() {
  return (
    <footer className="relative dark:bg-slate-900 bg-slate-100 border-t dark:border-slate-800 border-slate-200">
      {/* Top gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600
                              flex items-center justify-center text-white font-bold text-sm">
                AR
              </div>
              <span className="font-bold dark:text-white text-slate-900">
                Adarsh<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed mb-4">
              Full Stack Developer building scalable web apps and AI-driven solutions.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center
                             dark:text-slate-400 text-slate-600
                             dark:bg-slate-800 bg-white
                             border dark:border-slate-700/50 border-slate-200
                             hover:text-cyan-400 hover:border-cyan-500/40
                             transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold dark:text-white text-slate-900 mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <button
                    onClick={() => {
                      const el = document.querySelector(href);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm dark:text-slate-400 text-slate-600
                               hover:text-cyan-400 transition-colors duration-200
                               text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA column */}
          <div>
            <h4 className="font-semibold dark:text-white text-slate-900 mb-4 text-sm uppercase tracking-wider">
              Let&apos;s Connect
            </h4>
            <p className="text-sm dark:text-slate-400 text-slate-600 mb-4">
              Open to full-time roles, freelance projects, and collaborations.
            </p>
            <a
              href="https://mail.google.com/mail/?view=cm&to=contact.adarshraj26@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                         bg-gradient-to-r from-cyan-500 to-blue-600 text-white
                         hover:scale-105 hover:shadow-glow-cyan transition-all duration-200"
            >
              <FiMail className="w-4 h-4" />
              Hire Me
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t dark:border-slate-800 border-slate-200
                        flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm dark:text-slate-500 text-slate-400 text-center sm:text-left">
            © {new Date().getFullYear()} Adarsh Raj. All rights reserved.
          </p>
          <VisitorCounter />
          <p className="text-sm dark:text-slate-500 text-slate-400 flex items-center gap-1.5">
            Built with{" "}
            <FiHeart className="w-3.5 h-3.5 text-red-400" />
            {" "}using{" "}
            <span className="text-cyan-400 font-medium">React</span>
            {" "}&{" "}
            <span className="text-cyan-400 font-medium">Tailwind CSS</span>
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
        aria-label="Back to top"
        className="fixed bottom-[5.5rem] right-6 w-10 h-10 rounded-xl z-40
                   bg-gradient-to-br from-cyan-500 to-blue-600
                   flex items-center justify-center text-white
                   shadow-glow-cyan hover:scale-110 hover:shadow-lg
                   transition-all duration-200 group"
      >
        <FiArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </motion.button>
    </footer>
  );
}
