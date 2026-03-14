"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const BUG_EMOJIS = ["🐛", "🦗", "🪲", "🐜", "🦟"];

/* ── Individual crawling bug ── */
function Bug({ id, onCatch }) {
  const emoji = useRef(BUG_EMOJIS[Math.floor(Math.random() * BUG_EMOJIS.length)]);
  const speed = useRef(0.8 + Math.random() * 1.8);

  const posRef = useRef({
    x: Math.random() * (typeof window !== "undefined" ? window.innerWidth - 60 : 800),
    y: Math.random() * (typeof window !== "undefined" ? window.innerHeight - 60 : 600),
  });
  const dirRef = useRef({
    x: (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random()),
    y: (Math.random() > 0.5 ? 1 : -1) * (0.5 + Math.random()),
  });

  const [pos, setPos] = useState(posRef.current);
  const rafRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      const W = window.innerWidth - 44;
      const H = window.innerHeight - 44;
      let newX = posRef.current.x + dirRef.current.x * speed.current;
      let newY = posRef.current.y + dirRef.current.y * speed.current;
      let dx = dirRef.current.x;
      let dy = dirRef.current.y;

      if (newX <= 0 || newX >= W) { dx = -dx; newX = Math.max(0, Math.min(W, newX)); }
      if (newY <= 0 || newY >= H) { dy = -dy; newY = Math.max(0, Math.min(H, newY)); }

      dirRef.current = { x: dx, y: dy };
      posRef.current = { x: newX, y: newY };
      setPos({ x: newX, y: newY });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 2.5, opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ position: "fixed", left: pos.x, top: pos.y, zIndex: 99996 }}
      className="text-3xl cursor-pointer select-none leading-none p-1
                 hover:scale-125 active:scale-75 transition-transform duration-75"
      onClick={() => onCatch(id)}
      aria-label="Catch bug"
    >
      {emoji.current}
    </motion.button>
  );
}

/**
 * BugCatcherGame — Catch crawling bugs for 30 seconds.
 * Toggle via the 🐛 button (bottom-right area).
 * High score persisted in localStorage.
 */
export default function BugCatcherGame() {
  const [active, setActive]     = useState(false);
  const [bugs, setBugs]         = useState([]);
  const [score, setScore]       = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const nextId = useRef(0);

  /* Load high score */
  useEffect(() => {
    const saved = parseInt(localStorage.getItem("bug_highscore") || "0", 10);
    setHighScore(saved);
  }, []);

  /* Spawn bugs while active */
  useEffect(() => {
    if (!active || gameOver) return;
    // Spawn 3 initial bugs
    setBugs([
      { id: nextId.current++ },
      { id: nextId.current++ },
      { id: nextId.current++ },
    ]);
    const interval = setInterval(() => {
      setBugs((prev) => {
        if (prev.length >= 9) return prev;
        return [...prev, { id: nextId.current++ }];
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [active, gameOver]);

  /* Countdown */
  useEffect(() => {
    if (!active || gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          setBugs([]);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [active, gameOver]);

  const catchBug = useCallback((id) => {
    setBugs((prev) => prev.filter((b) => b.id !== id));
    setScore((prev) => {
      const next = prev + 1;
      setHighScore((h) => {
        const newH = Math.max(h, next);
        localStorage.setItem("bug_highscore", String(newH));
        return newH;
      });
      return next;
    });
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setBugs([]);
    nextId.current = 0;
    setActive(true);
  };

  const stopGame = () => {
    setActive(false);
    setBugs([]);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
  };

  return (
    <>
      {/* ── Start button when not active ── */}
      {!active && !gameOver && (
        <div className="flex justify-center mt-8">
          <button
            onClick={startGame}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg hover:opacity-90 transition-all"
          >
            🐛 Start Bug Catcher Game
          </button>
        </div>
      )}
      {/* ── HUD ── */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="hud"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[99995]
                       dark:bg-slate-900/90 bg-white/90 backdrop-blur-sm
                       border dark:border-slate-700/80 border-slate-200 rounded-2xl
                       px-7 py-3 flex items-center gap-8 shadow-2xl"
          >
            <div className="text-center">
              <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-0.5">Score</p>
              <p className="text-2xl font-black text-cyan-400 tabular-nums">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-0.5">Time</p>
              <p className={`text-2xl font-black tabular-nums ${timeLeft <= 10 ? "text-red-400" : "dark:text-slate-200 text-slate-700"}`}>
                {timeLeft}s
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-mono text-slate-500 tracking-widest uppercase mb-0.5">Best</p>
              <p className="text-2xl font-black text-amber-400 tabular-nums">{highScore}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Game-over modal ── */}
      <AnimatePresence>
        {gameOver && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99997] bg-black/65 backdrop-blur-sm"
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.82, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.82 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="fixed inset-0 z-[99998] flex items-center justify-center p-4"
            >
              <div className="dark:bg-slate-900 bg-white rounded-2xl p-8 text-center
                              border dark:border-slate-700/60 border-slate-200
                              shadow-2xl w-full max-w-sm">
                <div className="text-5xl mb-4">{score >= highScore && score > 0 ? "🏆" : "🐛"}</div>
                <h2 className="text-2xl font-black dark:text-white text-slate-900 mb-1">
                  Time&apos;s Up!
                </h2>
                <p className="text-sm dark:text-slate-400 text-slate-600 mb-1">
                  You caught <span className="text-cyan-400 font-bold">{score} bug{score !== 1 ? "s" : ""}</span>
                </p>
                {score > 0 && score >= highScore && (
                  <p className="text-amber-400 font-bold text-sm mb-4">New High Score! 🎉</p>
                )}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={startGame}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
                               text-white font-bold text-sm hover:opacity-90 transition-opacity"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={stopGame}
                    className="flex-1 py-2.5 rounded-xl dark:bg-slate-800 bg-slate-100
                               dark:text-slate-300 text-slate-700 font-bold text-sm
                               hover:dark:bg-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Crawling bugs ── */}
      <AnimatePresence>
        {bugs.map((bug) => (
          <Bug key={bug.id} id={bug.id} onCatch={catchBug} />
        ))}
      </AnimatePresence>
    </>
  );
}
