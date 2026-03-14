"use client";

import { motion } from "framer-motion";
import { FiBriefcase, FiCalendar, FiCheckCircle, FiMapPin } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Experience data ── */
const experiences = [
  {
    title: "Software Developer Intern",
    company: "Flying Devs",
    location: "Jamshedpur, Jharkhand",
    period: "May 2025 – Dec 2025",
    type: "Internship",
    color: "from-violet-500 to-purple-500",
    responsibilities: [
      "Developed and deployed features for a React.js + DynamoDB web app, boosting user engagement by 15% through UI optimizations and faster query handling",
      "Implemented AWS DynamoDB queries that reduced data retrieval time by 20%, improving overall application performance",
      "Collaborated with cross-functional teams to deliver 2+ production-ready modules within project deadlines",
    ],
    skills: ["React.js", "AWS DynamoDB", "AWS", "UI Optimization", "Agile"],
  },
  {
    title: "Software Developer Intern",
    company: "HashedBit Innovations",
    location: "Pune, India",
    period: "April 2024 – August 2024",
    type: "Internship",
    color: "from-cyan-500 to-blue-500",
    responsibilities: [
      "Built reusable, accessible UI components using React.js, improving development speed by 30%",
      "Developed and maintained RESTful APIs using Node.js and Express.js for multiple modules",
      "Integrated MongoDB and PostgreSQL databases with efficient query optimization",
      "Collaborated with a cross-functional team in Agile/Scrum sprints, participating in daily standups and code reviews",
      "Contributed to code refactoring and documentation for improved maintainability",
    ],
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL", "Agile"],
  },
];

/**
 * Experience — Timeline-style work experience section.
 */
export default function Experience() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <SectionWrapper id="experience" alternate floating={
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="absolute top-20 right-6 hidden xl:block pointer-events-none"
      >
        <div className="dark:bg-slate-800/70 bg-white/90 backdrop-blur-sm
                        border dark:border-slate-700/50 border-slate-200
                        rounded-2xl p-4 shadow-card w-48
                        animate-[float_10s_ease-in-out_infinite]">
          <p className="text-xs dark:text-slate-500 text-slate-400 font-semibold uppercase tracking-wider mb-3">
            Work Style
          </p>
          <div className="space-y-2">
            {[
              { emoji: "🚀", text: "Fast Learner" },
              { emoji: "🤝", text: "Team Player" },
              { emoji: "💡", text: "Problem Solver" },
              { emoji: "⚡", text: "Agile Mindset" },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-center gap-2">
                <span className="text-sm">{emoji}</span>
                <span className="text-xs dark:text-slate-300 text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    }>
      <SectionHeading
        label="Experience"
        title="Work"
        highlight="Experience"
        subtitle="Professional experience building real-world applications."
      />

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px dark:bg-slate-700 bg-slate-200 hidden sm:block" />

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              ref={ref}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative sm:pl-16"
            >
              {/* Timeline dot */}
              <div className={`hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-xl
                              bg-gradient-to-br ${exp.color}
                              items-center justify-center shadow-glow-cyan z-10`}>
                <FiBriefcase className="w-5 h-5 text-white" />
              </div>

              {/* Card */}
              <div className="dark:bg-slate-800/60 bg-white rounded-2xl p-6 sm:p-8
                              border dark:border-slate-700/50 border-slate-200
                              hover:border-cyan-500/30 hover:shadow-card-hover
                              transition-all duration-300">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg dark:text-white text-slate-900">
                        {exp.title}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold
                                       bg-gradient-to-r ${exp.color} text-white`}>
                        {exp.type}
                      </span>
                    </div>
                    <p className="font-semibold text-cyan-400">{exp.company}</p>
                  </div>

                  <div className="flex flex-col gap-1 sm:text-right">
                    <span className="flex sm:justify-end items-center gap-1.5 text-sm dark:text-slate-400 text-slate-500">
                      <FiCalendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex sm:justify-end items-center gap-1.5 text-sm dark:text-slate-400 text-slate-500">
                      <FiMapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2 mb-5">
                  {exp.responsibilities.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <FiCheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm dark:text-slate-300 text-slate-700 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-lg text-xs font-medium
                                 dark:bg-slate-700/60 bg-slate-100
                                 dark:text-slate-300 text-slate-600
                                 border dark:border-slate-600/40 border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Future placeholder */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative sm:pl-16"
          >
            <div className="hidden sm:flex absolute left-0 top-4 w-12 h-12 rounded-xl
                            border-2 border-dashed dark:border-slate-600 border-slate-300
                            items-center justify-center">
              <span className="text-lg">✨</span>
            </div>
            <div className="dark:bg-slate-800/30 bg-slate-100/60 rounded-2xl p-6
                            border-2 border-dashed dark:border-slate-700/50 border-slate-200
                            text-center sm:text-left">
              <p className="dark:text-slate-500 text-slate-400 text-sm">
                Your company could be next!{" "}
                <button
                  onClick={() => {
                    const el = document.querySelector("#contact");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-cyan-400 font-medium hover:underline"
                >
                  Let&apos;s connect →
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
