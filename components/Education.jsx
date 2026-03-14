"use client";

import { motion } from "framer-motion";
import { FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Education data ── */
const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "Pimpri Chinchwad University",
    location: "Pune, Maharashtra",
    period: "2023 – 2025",
    status: "Completed",
    color: "from-cyan-500 to-blue-600",
    icon: "🎓",
    highlights: [
      "Focus on Full Stack Development and Cloud Computing",
      "Active participant in technical events and hackathons",
      "Research interest in AI/ML applications",
    ],
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Trident Academy of Creative Technology",
    location: "Bhubaneswar, Odisha",
    period: "2020 – 2023",
    status: "Completed",
    color: "from-violet-500 to-purple-600",
    icon: "🏫",
    highlights: [
      "Core foundation in Computer Science and Programming",
      "Participated in inter-college coding competitions",
      "Hands-on projects in Web Development and Java",
    ],
  },
  {
    degree: "HSC – Science (PCM)",
    institution: "DAV Public School",
    location: null,
    period: "2018 – 2020",
    status: "Completed",
    color: "from-emerald-500 to-teal-600",
    icon: "📗",
    highlights: [
      "Stream: Science with Physics, Chemistry & Mathematics (PCM)",
      "Strong analytical and mathematical problem-solving foundation",
    ],
  },
  {
    degree: "SSC",
    institution: "DAV Public School",
    location: null,
    period: "2016 – 2018",
    status: "Completed",
    color: "from-orange-500 to-amber-600",
    icon: "📘",
    highlights: [
      "Built foundational skills in science, mathematics, and languages",
    ],
  },
];

/** Education card */
const EducationCard = ({ edu, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="dark:bg-slate-800/60 bg-white rounded-2xl p-6 sm:p-8
                 border dark:border-slate-700/50 border-slate-200
                 hover:border-cyan-500/30 hover:shadow-card-hover
                 transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${edu.color}
                         flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
          {edu.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <h3 className="font-bold text-lg dark:text-white text-slate-900 mb-0.5">
                {edu.degree}
              </h3>
              <p className={`font-semibold text-base bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>
                {edu.institution}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              edu.status === "Current"
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-slate-500/20 dark:text-slate-400 text-slate-600 border dark:border-slate-600/30 border-slate-300"
            }`}>
              {edu.status}
            </span>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="flex items-center gap-1.5 text-sm dark:text-slate-400 text-slate-500">
              <FiCalendar className="w-3.5 h-3.5" />
              {edu.period}
            </span>
            {edu.location && (
              <span className="flex items-center gap-1.5 text-sm dark:text-slate-400 text-slate-500">
                <FiMapPin className="w-3.5 h-3.5" />
                {edu.location}
              </span>
            )}
          </div>

          {/* Highlights */}
          <ul className="space-y-1.5">
            {edu.highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm dark:text-slate-300 text-slate-700">
                <FiBookOpen className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Education — Academic background section.
 */
export default function Education() {
  return (
    <SectionWrapper id="education">
      <SectionHeading
        label="Education"
        title="Academic"
        highlight="Background"
        subtitle="My educational journey and foundation."
      />

      <div className="relative max-w-3xl mx-auto mt-10">
        {/* Timeline for desktop, simple stack for mobile */}
        <div className="hidden sm:block absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400/70 to-blue-500/40 rounded-full z-0 left-1/2 -translate-x-1/2" />
        <div className="flex flex-col gap-8 sm:gap-16">
          {education.map((edu, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.18 }}
                className={`relative z-10 w-full ${isLeft ? 'sm:justify-start' : 'sm:justify-end'} flex`}
              >
                {/* Timeline dot and connector for desktop only */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-20">
                  <span className={`w-14 h-14 rounded-full bg-gradient-to-br ${edu.color} flex items-center justify-center text-3xl shadow-xl border-4 border-white dark:border-slate-900 z-20 animate-pulse`}>
                    {edu.icon}
                  </span>
                  {index !== education.length - 1 && (
                    <span className="flex-1 w-1 bg-gradient-to-b from-cyan-400/60 to-blue-500/30 rounded-full" style={{ minHeight: 48 }} />
                  )}
                </div>
                {/* Card: full width on mobile, timeline on desktop */}
                <div
                  className={`w-full sm:w-1/2 max-w-xl ml-0 mr-0 ${isLeft ? 'sm:pr-16 sm:pl-0' : 'sm:pl-16 sm:pr-0'}`}
                  style={{ marginLeft: 0, marginRight: 0 }}
                >
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.18 + 0.1 }}
                    className={`bg-white dark:bg-slate-800/70 rounded-2xl p-6 sm:p-8 border dark:border-slate-700/50 border-slate-200 hover:border-cyan-500/40 hover:shadow-2xl transition-all duration-300 shadow-lg relative ${
                      // Add colored left border on mobile
                      'sm:border-l-0 border-l-4 ' + (edu.color.split(' ')[0] ? 'border-l-[6px]' : '') + ' ' + edu.color.split(' ')[0]
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-bold text-lg dark:text-white text-slate-900 mb-0.5">{edu.degree}</h3>
                        <p className={`font-semibold text-base bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>{edu.institution}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        edu.status === "Current"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-500/20 dark:text-slate-400 text-slate-600 border dark:border-slate-600/30 border-slate-300"
                      }`}>
                        {edu.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <span className="flex items-center gap-1.5 text-sm dark:text-slate-400 text-slate-500">
                        <FiCalendar className="w-3.5 h-3.5" />
                        {edu.period}
                      </span>
                      {edu.location && (
                        <span className="flex items-center gap-1.5 text-sm dark:text-slate-400 text-slate-500">
                          <FiMapPin className="w-3.5 h-3.5" />
                          {edu.location}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5">
                      {edu.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm dark:text-slate-300 text-slate-700">
                          <FiBookOpen className="w-3.5 h-3.5 text-cyan-400 mt-0.5 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
