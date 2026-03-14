"use client";

import { useEffect, useRef } from "react";

const COLORS = [
  "#22d3ee", "#818cf8", "#34d399", "#f472b6",
  "#fbbf24", "#60a5fa", "#a78bfa", "#fb7185",
];

function randomBetween(a, b) { return a + Math.random() * (b - a); }

function createParticles(count) {
  return Array.from({ length: count }, () => ({
    x:       randomBetween(0, 1),   // 0–1 fraction of canvas width
    y:       randomBetween(-0.2, 0), // start above viewport
    size:    randomBetween(6, 12),
    color:   COLORS[Math.floor(Math.random() * COLORS.length)],
    speedY:  randomBetween(0.003, 0.007),
    speedX:  randomBetween(-0.002, 0.002),
    angle:   randomBetween(0, Math.PI * 2),
    spin:    randomBetween(-0.08, 0.08),
    shape:   Math.random() > 0.5 ? "rect" : "circle",
  }));
}

/**
 * HireMeConfetti — Fires a canvas confetti burst exactly once
 * when the #contact section scrolls into view.
 */
export default function HireMeConfetti() {
  const canvasRef = useRef(null);
  const fired     = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let particles = [];
    let rafId     = null;
    let startTime = null;
    const DURATION = 4500; // ms

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw(ts) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y     += p.speedY;
        p.x     += p.speedX;
        p.angle += p.spin;

        const alpha = Math.max(0, 1 - elapsed / DURATION);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(p.x * canvas.width, p.y * canvas.height);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      if (elapsed < DURATION) {
        rafId = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    function fire() {
      if (fired.current) return;
      fired.current = true;
      particles = createParticles(160);
      startTime = null;
      rafId = requestAnimationFrame(draw);
    }

    // Watch for #contact section
    const target = document.getElementById("contact");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) fire(); },
      { threshold: 0.2 }
    );
    observer.observe(target);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9990] pointer-events-none"
    />
  );
}
