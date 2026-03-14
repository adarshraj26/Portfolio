"use client";

import { useEffect, useRef } from "react";

/**
 * CursorSpotlight — A fixed radial-gradient glow that follows the cursor.
 * pointer-events-none so it never blocks clicks. Hidden on touch devices.
 */
export default function CursorSpotlight() {
  const divRef = useRef(null);

  useEffect(() => {
    const el = divRef.current;
    if (!el) return;

    const handleMove = (e) => {
      el.style.background = `radial-gradient(700px at ${e.clientX}px ${e.clientY}px, rgba(6,182,212,0.07), transparent 80%)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-30 hidden md:block transition-none"
      style={{
        background:
          "radial-gradient(700px at -300px -300px, rgba(6,182,212,0.07), transparent 80%)",
      }}
    />
  );
}
