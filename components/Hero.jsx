"use client";

import { motion } from "framer-motion";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { HiDownload } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";

/* ── Particle canvas background ── */
function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = canvas.width  = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize, { passive: true });

    /* Build particles */
    const COUNT = Math.min(Math.floor(W * H / 18000), 70);
    const particles = Array.from({ length: COUNT }, () => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      vx:  (Math.random() - 0.5) * 0.35,
      vy:  (Math.random() - 0.5) * 0.35,
      r:   Math.random() * 1.5 + 0.5,
    }));

    const LINK_DIST = 130;
    let raf;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      /* Update positions */
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      /* Draw connections */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
            ctx.lineWidth   = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      /* Draw dots */
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6,182,212,0.55)";
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
    />
  );
}

/* ── Stagger animation variants ── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ── Social links data ── */
const socials = [
  {
    icon: FiGithub,
    href: "https://github.com/adarshraj26",
    label: "GitHub",
    color: "hover:text-white hover:bg-slate-700",
  },
  {
    icon: FiLinkedin,
    href: "https://www.linkedin.com/in/adarsh-raj26/",
    label: "LinkedIn",
    color: "hover:text-white hover:bg-blue-600",
  },
  {
    icon: FiMail,
    href: "https://mail.google.com/mail/?view=cm&to=contact.adarshraj26@gmail.com",
    label: "Email",
    color: "hover:text-white hover:bg-cyan-600",
  },
];

/* ── Typewriter roles ── */
const ROLES = [
  "Full Stack Developer",
  "AI Builder",
  "Open Source Contributor",
];

/**
 * Hero — Full-viewport hero section with:
 * - Animated gradient background + grid overlay
 * - Name, title, tagline with staggered entrance
 * - CTA buttons
 * - Floating tech stack bubble
 * - Social links
 * - Scroll indicator
 */
export default function Hero() {
  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* ── Typewriter state ── */
  const [roleIdx, setRoleIdx]       = useState(0);
  const [displayed, setDisplayed]   = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIdx];
    let timeout;
    if (!isDeleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === target.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIdx]); // eslint-disable-line

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden
                 bg-gradient-to-br from-slate-100 to-white
                 dark:bg-none dark:bg-[#0f172a]"
    >
      {/* ── Particle canvas ── */}
      <ParticleCanvas />

      {/* ── Background Glow Orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl animate-pulse-slow delay-1000" />
        <div className="absolute -bottom-40 left-1/3 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow delay-2000" />
      </div>

      {/* ── Grid background pattern ── */}
      <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-100" />

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Status badge */}
          <motion.div variants={item} className="mb-6 pt-24 sm:pt-0">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                             dark:bg-slate-800/80 bg-slate-100 dark:text-slate-300 text-slate-600
                             border dark:border-slate-700/60 border-slate-200
                             backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to Full-Time Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4
                       dark:text-white text-slate-900"
          >
            Adarsh{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Raj
            </span>
          </motion.h1>

          {/* Title — typewriter */}
          <motion.div variants={item} className="mb-6">
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold
                          dark:text-slate-300 text-slate-700 font-mono tracking-wide">
              <span className="text-cyan-400">&lt;</span>
              <span className="inline-block">{displayed}</span>
              <span className="text-cyan-400 animate-pulse ml-0.5">|</span>
              <span className="text-cyan-400"> /&gt;</span>
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg dark:text-slate-400 text-slate-600
                       max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Building{" "}
            <span className="dark:text-cyan-400 text-cyan-600 font-medium">
              scalable web applications
            </span>{" "}
            and{" "}
            <span className="dark:text-blue-400 text-blue-600 font-medium">
              AI-driven solutions
            </span>{" "}
            that solve real-world problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center gap-4 mb-12"
          >
            {/* View Projects */}
            <button
              onClick={() => scrollToSection("#projects")}
              className="btn-primary text-sm px-8 py-3.5 min-w-[160px]"
            >
              View Projects
            </button>

            {/* View Resume — opens inline modal */}
              <button
                onClick={() => window.__openResume?.()}
                className="btn-outline text-sm px-8 py-3.5 min-w-[160px]"
            >
              <HiDownload className="w-4 h-4" />
              View Resume
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={item} className="flex items-center gap-3 mb-16">
            {socials.map(({ icon: Icon, href, label, color }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-11 h-11 rounded-xl flex items-center justify-center
                            dark:text-slate-400 text-slate-600
                            dark:bg-slate-800/60 bg-slate-100
                            border dark:border-slate-700/50 border-slate-200
                            transition-all duration-200 hover:scale-110 hover:-translate-y-0.5
                            ${color}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </motion.div>

          {/* Tech stack pills */}
          <motion.div variants={item} className="flex flex-wrap justify-center gap-2 mb-12">
            {["React", "Node.js", "AWS", "TypeScript", "MongoDB", "AI/ML"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-medium
                           dark:bg-slate-800/60 bg-slate-100
                           dark:text-slate-400 text-slate-600
                           border dark:border-slate-700/40 border-slate-200
                           dark:hover:border-cyan-500/40 hover:border-cyan-400/40
                           dark:hover:text-cyan-400 hover:text-cyan-600
                           transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          onClick={() => scrollToSection("#about")}
          className="flex flex-col items-center gap-1 mx-auto dark:text-slate-500 text-slate-400
                     hover:text-cyan-400 transition-colors duration-200 group"
          aria-label="Scroll to About"
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FiArrowDown className="w-5 h-5 group-hover:text-cyan-400" />
          </motion.div>
        </motion.button>
      </div>

      {/* ── Floating terminal (left, desktop) ── */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <div className="dark:bg-slate-800/60 bg-white/80 backdrop-blur-sm
                        border dark:border-slate-700/50 border-slate-200
                        rounded-2xl p-5 shadow-card font-mono text-xs dark:text-slate-400 text-slate-500
                        w-56 animate-[float_7s_ease-in-out_infinite]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="dark:text-slate-400 text-slate-500">~/portfolio</span>
          </div>
          <div className="space-y-1.5">
            <p><span className="text-emerald-400">$</span> npm run dev</p>
            <p className="dark:text-slate-500 text-slate-400">▶ compiled successfully</p>
            <p className="dark:text-slate-500 text-slate-400">✓ ready on :3000</p>
            <p className="mt-2"><span className="text-emerald-400">$</span> git commit <span className="text-amber-400">-m</span></p>
            <p className="pl-3 text-amber-300">&quot;feat: shipped 🚀&quot;</p>
            <p><span className="text-cyan-400">✓</span> build passed</p>
          </div>
        </div>
      </motion.div>

      {/* ── Floating decorative code snippet (desktop) ── */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
      >
        <div className="dark:bg-slate-800/60 bg-white/80 backdrop-blur-sm
                        border dark:border-slate-700/50 border-slate-200
                        rounded-2xl p-5 shadow-card font-mono text-xs dark:text-slate-400 text-slate-500
                        w-64 animate-[float_6s_ease-in-out_infinite]">
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="space-y-1">
            <p><span className="text-purple-400">const</span> <span className="text-cyan-400">dev</span> = {"{"}</p>
            <p className="pl-4"><span className="text-blue-400">name</span>: <span className="text-amber-300">&apos;Adarsh Raj&apos;</span>,</p>
            <p className="pl-4"><span className="text-blue-400">role</span>: <span className="text-amber-300">&apos;Full Stack&apos;</span>,</p>
            <p className="pl-4"><span className="text-blue-400">passion</span>: <span className="text-amber-300">&apos;Building AI&apos;</span>,</p>
            <p className="pl-4"><span className="text-blue-400">open</span>: <span className="text-emerald-400">true</span></p>
            <p>{"}"}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
