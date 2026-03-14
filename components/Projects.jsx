"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiCloud, FiExternalLink, FiGithub } from "react-icons/fi";
import {
  SiCss,
  SiDart,
  SiExpress,
  SiFirebase,
  SiFlutter,
  SiGmail,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs, SiOpenai, SiPrisma,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript
} from "react-icons/si";
import { useInView } from "react-intersection-observer";
import ProjectExplainerModal from "./ProjectExplainerModal";
import SectionHeading from "./SectionHeading";
import SectionWrapper from "./SectionWrapper";

/* ── Tech icon + color map ── */
const techMeta = {
  "React":          { icon: SiReact,            color: "#61DAFB" },
  "TypeScript":     { icon: SiTypescript,        color: "#3178C6" },
  "Node.js":        { icon: SiNodedotjs,         color: "#339933" },
  "Express.js":     { icon: SiExpress,           color: "#888888" },
  "MongoDB":        { icon: SiMongodb,           color: "#47A248" },
  "Next.js":        { icon: SiNextdotjs,         color: "#ffffff" },
  "Tailwind CSS":   { icon: SiTailwindcss,       color: "#06B6D4" },
  "Prisma":         { icon: SiPrisma,            color: "#2D3748" },
  "OpenAI API":     { icon: SiOpenai,            color: "#10A37F" },
  "Gemini AI":      { icon: SiGoogle,            color: "#4285F4" },
  "Gmail SMTP":     { icon: SiGmail,             color: "#EA4335" },
  "Flutter":        { icon: SiFlutter,           color: "#02569B" },
  "Dart":           { icon: SiDart,              color: "#0175C2" },
  "Firebase":       { icon: SiFirebase,          color: "#FFCA28" },
  "Python":         { icon: SiPython,            color: "#3776AB" },
  "HTML":           { icon: SiHtml5,             color: "#E34F26" },
  "CSS":            { icon: SiCss,              color: "#1572B6" },
  "JavaScript":     { icon: SiJavascript,        color: "#F7DF1E" },
  "AWS Lambda":     { icon: FiCloud,             color: "#FF9900" },
  "AWS DynamoDB":   { icon: FiCloud,             color: "#FF9900" },
};

/* ── Projects data ── */
const projects = [
  {
    title: "SensAI – AI Career Coach",
    description:
      "An AI-powered career development platform that helps users generate resumes, prepare for interviews, and explore trending skills.",
    tech: ["React", "Tailwind CSS", "Gemini AI", "Prisma", "Next.js"],
    features: [
      "AI mock interview simulation",
      "AI resume and cover letter generation",
      "Career insights dashboard",
      "Trending technology insights",
    ],
    category: "AI Platform",
    categoryColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    gradient: "from-cyan-500 to-blue-600",
    featured: true,
    github: "https://github.com/adarshraj26",
    demo: "https://sensai-ebon-five.vercel.app/",
  },
  {
    title: "JobTracker – Application Tracker",
    description:
      "A full-stack job application tracking platform to organize applications, analyze progress, and manage job search documents in a single dashboard.",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Application tracking dashboard",
      "Real-time job search analytics",
      "Document management system",
      "Interactive progress visualization",
    ],
    category: "Full Stack",
    categoryColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    gradient: "from-blue-500 to-indigo-600",
    featured: true,
    github: "https://github.com/adarshraj26",
    demo: "https://application-manager-brown.vercel.app/",
  },
  {
    title: "Hirrd – Job Portal",
    description:
      "A full-stack job portal platform that connects job seekers with employers through a clean, modern interface for browsing and applying to opportunities.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    features: [
      "Job listings and smart search",
      "Employer and job seeker profiles",
      "Application submission workflow",
      "Responsive modern dashboard",
    ],
    category: "Full Stack",
    categoryColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    gradient: "from-sky-500 to-cyan-500",
    featured: true,
    github: "https://github.com/adarshraj26",
    demo: "https://hirrd-ashy.vercel.app/",
  },
  {
    title: "AI Email Generator & Sender",
    description:
      "An AI-powered email generation tool that creates professional emails and sends them to multiple recipients from a single interface.",
    tech: ["React", "Node.js", "Gemini AI", "Gmail SMTP"],
    features: [
      "AI-generated professional emails",
      "Multi-recipient email delivery",
      "Editable AI-generated content",
      "Prompt-based email creation",
    ],
    category: "AI Tool",
    categoryColor: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    gradient: "from-violet-500 to-purple-600",
    featured: false,
    github: "https://github.com/adarshraj26",
    demo: "https://ai-email-generation-frontend.vercel.app/",
  },
  {
    title: "Genius – AI SaaS Platform",
    description:
      "A SaaS web application that enables users to generate AI-powered text, audio, video, and image content from a unified dashboard.",
    tech: ["Next.js", "React", "Tailwind CSS", "Prisma", "OpenAI API"],
    features: [
      "Multi-format AI content generation",
      "Unified content dashboard",
      "Reusable UI components",
      "Optimized API integration",
    ],
    category: "SaaS",
    categoryColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    gradient: "from-purple-500 to-indigo-500",
    featured: false,
    github: "https://github.com/adarshraj26/AI-SaaS",
    demo: null,
  },
  {
    title: "Car Rental Platform",
    description:
      "A full-stack car rental platform for browsing vehicles, making bookings, and managing rentals through a responsive web interface.",
    tech: ["React", "Node.js", "AWS Lambda", "AWS DynamoDB"],
    features: [
      "Vehicle listing and booking system",
      "Serverless backend architecture",
      "Scalable AWS infrastructure",
      "Secure transaction workflow",
    ],
    category: "Cloud",
    categoryColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    gradient: "from-emerald-500 to-teal-500",
    featured: false,
    github: "https://github.com/adarshraj26/Deep-Travels",
    demo: null,
  },
  {
    title: "Alumni ChatApp",
    description:
      "A mobile chat application for college alumni networks enabling students and alumni to connect, communicate, and maintain professional relationships.",
    tech: ["Flutter", "Dart", "Firebase"],
    features: [
      "Real-time messaging",
      "Secure authentication",
      "Alumni networking platform",
      "Mobile-friendly chat interface",
    ],
    category: "Mobile App",
    categoryColor: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    gradient: "from-orange-500 to-amber-500",
    featured: false,
    github: "https://github.com/adarshraj26/AlumniChatApp",
    demo: null,
  },
  {
    title: "Fake News Detection System",
    description:
      "An AI-based machine learning system that detects and classifies news articles as real or fake using natural language processing techniques.",
    tech: ["Python", "JavaScript"],
    features: [
      "Text preprocessing and feature extraction",
      "Multiple ML model training",
      "Fake news classification",
      "High accuracy prediction system",
    ],
    category: "ML / AI",
    categoryColor: "bg-red-500/15 text-red-400 border-red-500/30",
    gradient: "from-red-500 to-rose-600",
    featured: false,
    github: "https://github.com/adarshraj26",
    demo: null,
  },
  {
    title: "VisionaryHut – NGO Platform",
    description:
      "A website platform built for an NGO to share inspiring stories, resources, and initiatives supporting entrepreneurship and social development.",
    tech: ["HTML", "CSS", "JavaScript"],
    features: [
      "Informational content platform",
      "Entrepreneurship resources",
      "Success stories and articles",
      "Community engagement platform",
    ],
    category: "Web",
    categoryColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    gradient: "from-amber-500 to-yellow-500",
    featured: false,
    github: "https://github.com/adarshraj26",
    demo: null,
  },
  {
    title: "Inventory Manager",
    description:
      "A web-based inventory management system for tracking stock, managing products, and monitoring inventory levels with ease.",
    tech: ["React", "Node.js", "MongoDB", "Express.js"],
    features: [
      "Product and stock management",
      "Real-time inventory tracking",
      "User authentication and roles",
      "Intuitive dashboard and reporting",
    ],
    category: "Full Stack",
    categoryColor: "bg-green-500/15 text-green-400 border-green-500/30",
    gradient: "from-green-500 to-lime-500",
    featured: false,
    github: "https://github.com/adarshraj26/inventory_manager",
    demo: null,
  },
  {
    title: "Smart Bookmark App",
    description:
      "A smart bookmarking application that helps users save, organize, and search bookmarks efficiently with tagging and categorization features.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Save and organize bookmarks",
      "Tagging and categorization",
      "Search and filter bookmarks",
      "User-friendly interface",
    ],
    category: "Web App",
    categoryColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
    gradient: "from-indigo-500 to-blue-500",
    featured: false,
    github: "https://github.com/adarshraj26/smart-bookmark-app",
    demo: "https://smart-bookmark-app-phi-three.vercel.app",
  },
];

/* ── Tech badge with icon ── */
const TechBadge = ({ name }) => {
  const meta = techMeta[name];
  const Icon = meta?.icon;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium
                 dark:bg-slate-700/60 bg-slate-100
                 dark:text-slate-300 text-slate-600
                 border dark:border-slate-600/40 border-slate-200
                 hover:border-cyan-500/40 hover:dark:text-cyan-400
                 transition-colors duration-200"
    >
      {Icon && (
        <Icon
          className="w-3 h-3 flex-shrink-0"
          style={{ color: meta.color }}
        />
      )}
      {name}
    </span>
  );
};

/* ── Individual project card ── */
const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const [expanded, setExpanded] = useState(false);
  const [showExplainer, setShowExplainer] = useState(false);

  const visibleFeatures = expanded ? project.features : project.features.slice(0, 3);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: "easeOut" }}
      className="relative group flex flex-col h-full"
    >
      {/* Featured ribbon */}
      {project.featured && (
        <div className="absolute -top-2.5 -right-2.5 z-10">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold
                           bg-gradient-to-r from-amber-400 to-orange-500
                           text-white shadow-lg">
            ⭐ Featured
          </span>
        </div>
      )}

      <div className="flex flex-col h-full dark:bg-slate-800/60 bg-white rounded-2xl overflow-hidden
                      border dark:border-slate-700/50 border-slate-200
                      hover:border-cyan-500/40 hover:-translate-y-1.5
                      hover:shadow-[0_16px_48px_rgba(0,0,0,0.3),0_0_0_1px_rgba(6,182,212,0.2)]
                      transition-all duration-300">

        {/* ── Gradient top bar ── */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

        {/* ── Card header ── */}
        <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Icon circle */}
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient}
                             flex items-center justify-center flex-shrink-0 shadow-md
                             group-hover:scale-110 transition-transform duration-300`}>
              <span className="text-base">
                {project.category === "AI Platform"   ? "🤖"
                : project.category === "Full Stack"   ? "🗂️"
                : project.category === "AI Tool"      ? "✉️"
                : project.category === "SaaS"         ? "⚡"
                : project.category === "Cloud"        ? "☁️"
                : project.category === "Mobile App"   ? "💬"
                : project.category === "ML / AI"      ? "🧠"
                :                                       "🌐"}
              </span>
            </div>
            {/* Project number */}
            <span className="text-xs font-mono dark:text-slate-600 text-slate-400 font-medium">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Category badge */}
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex-shrink-0
                            ${project.categoryColor}`}>
            {project.category}
          </span>
        </div>

        {/* ── Content ── */}
        <div className="px-5 pb-5 flex flex-col flex-1 gap-4">
          {/* Title */}
          <h3 className="font-bold text-base leading-snug dark:text-white text-slate-900
                         group-hover:text-cyan-400 transition-colors duration-200">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed">
            {project.description}
          </p>

          {/* Features */}
          <div className="flex-1">
            <AnimatePresence initial={false}>
              <ul className="space-y-1.5">
                {visibleFeatures.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2 text-sm dark:text-slate-300 text-slate-700"
                  >
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0
                                      bg-gradient-to-r ${project.gradient}`} />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </AnimatePresence>

            {/* Expand / collapse if > 3 features */}
            {project.features.length > 3 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-2 flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {expanded ? (
                  <><FiChevronUp className="w-3.5 h-3.5" /> Show less</>
                ) : (
                  <><FiChevronDown className="w-3.5 h-3.5" /> +{project.features.length - 3} more</>
                )}
              </button>
            )}
          </div>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <TechBadge key={t} name={t} />
            ))}
          </div>

          {/* ── Action buttons ── */}
          <div className="flex flex-col gap-2 pt-3 border-t dark:border-slate-700/50 border-slate-200 mt-auto">
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold
                           dark:bg-slate-700/50 bg-slate-100
                           dark:text-slate-300 text-slate-700
                           dark:border-slate-600/40 border-slate-200 border
                           hover:border-cyan-500/50 hover:text-cyan-400
                           transition-all duration-200"
              >
                <FiGithub className="w-3.5 h-3.5" />
                Source Code
              </a>

              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold
                              bg-gradient-to-r ${project.gradient} text-white
                              hover:opacity-90 hover:scale-[1.02]
                              transition-all duration-200`}
                >
                  <FiExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
            </div>

            {/* Explain button */}
            <button
              onClick={() => setShowExplainer(true)}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold
                         dark:bg-violet-500/10 bg-violet-50
                         dark:text-violet-300 text-violet-700
                         dark:border-violet-500/25 border-violet-200 border
                         hover:dark:bg-violet-500/20 hover:bg-violet-100
                         hover:border-violet-400/50
                         transition-all duration-200"
            >
              <SiOpenai className="w-3.5 h-3.5" />
              Explain this project
            </button>
          </div>
        </div>
      </div>

      {/* AI Explainer modal */}
      {showExplainer && (
        <ProjectExplainerModal
          project={project}
          onClose={() => setShowExplainer(false)}
        />
      )}
    </motion.div>
  );
};

/* ── Category filter config ── */
const FILTER_MAP = {
  "AI Platform": "AI",
  "AI Tool":     "AI",
  "ML / AI":     "AI",
  "Full Stack":  "Full Stack",
  "SaaS":        "Full Stack",
  "Cloud":       "Cloud",
  "Mobile App":  "Mobile",
  "Web":         "Web",
};
const FILTERS = ["All", "AI", "Full Stack", "Cloud", "Mobile", "Web"];

/**
 * Projects — Responsive 3-column grid of all 9 projects.
 * Each card has tech icons, animated features, and CTA buttons.
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  return (
    <SectionWrapper id="projects" floating={
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="absolute bottom-24 right-6 hidden xl:block pointer-events-none"
      >
        <div className="dark:bg-slate-800/70 bg-white/90 backdrop-blur-sm
                        border dark:border-slate-700/50 border-slate-200
                        rounded-2xl p-4 shadow-card w-52
                        animate-[float_6s_ease-in-out_infinite]">
          <div className="flex items-center gap-2 mb-3">
            <FiGithub className="w-4 h-4 text-cyan-400" />
            <p className="text-xs font-bold dark:text-white text-slate-900">Code Stats</p>
          </div>
          <div className="space-y-2">
            {[
              { label: "Total Projects", val: "9+" },
              { label: "AI / ML Tools", val: "4" },
              { label: "Full Stack Apps", val: "6" },
              { label: "Open Source", val: "100%" },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs dark:text-slate-400 text-slate-600">{label}</span>
                <span className="text-xs font-bold text-cyan-400">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    }>
      <SectionHeading
        label="Projects"
        title="Things I've"
        highlight="Built"
        subtitle={`${projects.length} projects spanning AI, full-stack, cloud, and mobile development.`}
      />

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-6 mb-12"
      >
        {[
          { label: "Total Projects", value: "9+" },
          { label: "AI / ML Projects", value: "4" },
          { label: "Full Stack Apps", value: "6" },
          { label: "Cloud Integrated", value: "3" },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {value}
            </p>
            <p className="text-xs dark:text-slate-500 text-slate-400 font-medium mt-0.5">{label}</p>
          </div>
        ))}
      </motion.div>

      {/* Category filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
              ${activeFilter === filter
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-glow-cyan"
                : "dark:bg-slate-800/50 bg-white dark:text-slate-300 text-slate-700 dark:border-slate-700/50 border-slate-200 hover:border-cyan-500/50 hover:text-cyan-400"
              }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Projects grid — grid on desktop, horizontal scroll on mobile */}
      <div>
        {/* Desktop grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects
            .filter((p) => activeFilter === "All" || FILTER_MAP[p.category] === activeFilter)
            .map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
        </div>
        {/* Mobile horizontal scroll */}
        <div className="sm:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
          {projects
            .filter((p) => activeFilter === "All" || FILTER_MAP[p.category] === activeFilter)
            .map((project, index) => (
              <div key={project.title} className="min-w-[85vw] max-w-xs snap-center flex-shrink-0">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
        </div>
      </div>

      {/* GitHub CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="text-center mt-12"
      >
        <a
          href="https://github.com/adarshraj26"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <FiGithub className="w-4 h-4" />
          View All on GitHub
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
