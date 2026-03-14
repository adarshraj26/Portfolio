"use client";

import { motion } from "framer-motion";
import {
    FiCloud,
    FiCode,
    FiServer,
    FiZap,
} from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import CodingProfiles from "./CodingProfiles";
import GitHubStatsFloat from "./GitHubStatsFloat";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── About cards data ── */
const stats = [
  { value: "2+", label: "Years Learning", icon: FiCode },
  { value: "5+", label: "Projects Built", icon: FiZap },
  { value: "50+", label: "Users (Beta)", icon: FiServer },
  { value: "3+", label: "Hackathons", icon: FiCloud },
];

/**
 * About — Professional summary section with
 * animated stat cards and bio.
 */
export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="about" alternate floating={<GitHubStatsFloat />}>
      <SectionHeading
        label="About Me"
        title="Who I"
        highlight="Am"
        subtitle="A glimpse into my background, skills, and what drives me."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Bio text */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="text-base sm:text-lg dark:text-slate-300 text-slate-700 leading-relaxed">
            I&apos;m a{" "}
            <span className="text-cyan-400 font-semibold">Full Stack Developer</span>{" "}
            with a passion for building scalable web applications and AI-driven solutions
            that make a real difference.
          </p>
          <p className="text-base sm:text-lg dark:text-slate-400 text-slate-600 leading-relaxed">
            Skilled in{" "}
            <span className="dark:text-slate-200 text-slate-800 font-medium">
              React, Node.js, cloud technologies
            </span>
            , and modern web development practices. I thrive in collaborative environments
            and love solving complex problems with clean, efficient code.
          </p>
          <p className="text-base sm:text-lg dark:text-slate-400 text-slate-600 leading-relaxed">
            Completed my{" "}
            <span className="dark:text-slate-200 text-slate-800 font-medium">
              MCA from Pimpri Chinchwad University
            </span>{" "}
            (2023–2025), and continuously building products that deliver user-centric experiences.
          </p>

          {/* Quick facts */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "🎓 MCA Graduate",
              "💼 Open to Work",
              "📍 India",
              "⚡ AI Enthusiast",
            ].map((fact) => (
              <span
                key={fact}
                className="px-3 py-1.5 rounded-lg text-sm font-medium
                           dark:bg-slate-800 bg-slate-100
                           dark:text-slate-300 text-slate-700
                           border dark:border-slate-700/60 border-slate-200"
              >
                {fact}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right: Stats grid */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map(({ value, label, icon: Icon }, i) => {
            // Assign a different color for each box (border and bg)
            const colorStyles = [
              {
                border: "border-t-4 border-cyan-400",
                bg: "bg-cyan-50",
                icon: "text-cyan-400 bg-cyan-100",
              },
              {
                border: "border-t-4 border-purple-400",
                bg: "bg-purple-50",
                icon: "text-purple-400 bg-purple-100",
              },
              {
                border: "border-t-4 border-emerald-400",
                bg: "bg-emerald-50",
                icon: "text-emerald-400 bg-emerald-100",
              },
              {
                border: "border-t-4 border-orange-400",
                bg: "bg-orange-50",
                icon: "text-orange-400 bg-orange-100",
              },
              {
                border: "border-t-4 border-blue-400",
                bg: "bg-blue-50",
                icon: "text-blue-400 bg-blue-100",
              },
              {
                border: "border-t-4 border-pink-400",
                bg: "bg-pink-50",
                icon: "text-pink-400 bg-pink-100",
              },
            ];
            const style = colorStyles[i % colorStyles.length];
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className={`group text-center border border-slate-200 dark:border-slate-700/50 rounded-2xl p-6 transition-all duration-300 ${style.border} ${style.bg} dark:bg-slate-800/60`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${style.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-black dark:text-white text-slate-900 mb-1">
                  {value}
                </p>
                <p className="text-xs dark:text-slate-400 text-slate-500 font-medium">
                  {label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <CodingProfiles />
    </SectionWrapper>
  );
}
