"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

/* ── Matrix rain canvas ── */
function MatrixCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext("2d");

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 14;
    const cols     = Math.floor(canvas.width / fontSize);
    const drops    = Array(cols).fill(1);

    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF</>{}[]()=+-*&#$@!?;";

    const timer = setInterval(() => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0fa";
      ctx.font      = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? "#fff" : "#0fa";
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }, 33);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

/* ── Component ── */
export default function KonamiEasterEgg() {
  const [active, setActive]   = useState(false);
  const [progress, setProgress] = useState(0); // 0-10
  const seqRef                = useRef([]);
  const timerRef              = useRef(null);

  useEffect(() => {
    function onKey(e) {
      /* Don't fire inside text inputs */
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      seqRef.current.push(e.key);
      if (seqRef.current.length > KONAMI.length) {
        seqRef.current.shift();
      }

      const matched = seqRef.current.length;
      const correct = seqRef.current.every((k, i) => {
        const offset = KONAMI.length - matched;
        return k === KONAMI[offset + i];
      });

      if (correct) {
        setProgress(matched);
        if (matched === KONAMI.length) {
          setActive(true);
          seqRef.current = [];
          clearTimeout(timerRef.current);
          timerRef.current = setTimeout(() => setActive(false), 6000);
        }
      } else {
        setProgress(0);
        seqRef.current = [];
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      {/* Subtle progress indicator in corner when typing sequence */}
      {progress > 0 && progress < KONAMI.length && !active && (
        <div className="fixed bottom-20 left-6 z-40 flex gap-1 pointer-events-none">
          {KONAMI.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-150
                          ${i < progress ? "bg-green-400" : "dark:bg-slate-700 bg-slate-300"}`}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] overflow-hidden bg-black"
            onClick={() => setActive(false)}
          >
            <MatrixCanvas />

            {/* Overlay message */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                className="text-center px-6"
              >
                <p className="text-green-400 font-mono text-4xl sm:text-6xl font-black mb-4 drop-shadow-[0_0_20px_rgba(0,255,100,0.8)]">
                  CHEAT CODE
                </p>
                <p className="text-green-300 font-mono text-lg sm:text-xl mb-2">
                  ↑↑↓↓←→←→BA activated
                </p>
                <p className="text-green-500 font-mono text-sm">
                  You found the easter egg 🎉
                </p>
                <p className="text-green-700 font-mono text-xs mt-6 animate-pulse">
                  [ click anywhere to exit ]
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
