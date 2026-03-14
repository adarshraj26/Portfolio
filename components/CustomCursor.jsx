"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor — Soft gradient orb cursor.
 * • Cyan → indigo → purple radial gradient blob
 * • Lerp-based position (smooth trailing feel)
 * • Expands on hover, pulses tighter on click
 * Only active on pointer-fine (desktop) devices.
 */
export default function CustomCursor() {
  const orbRef = useRef(null);
  const mouse  = useRef({ x: -200, y: -200 });
  const pos    = useRef({ x: -200, y: -200 });
  const raf    = useRef(null);

  const [visible,  setVisible]  = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onOver = (e) => {
      setHovering(
        !!e.target.closest(
          "a, button, [role='button'], input, textarea, select, label, [tabindex]"
        )
      );
    };

    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove",    onMove);
    window.addEventListener("mouseover",    onOver);
    window.addEventListener("mousedown",    onDown);
    window.addEventListener("mouseup",      onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    function tick() {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;

      if (orbRef.current) {
        orbRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove",    onMove);
      window.removeEventListener("mouseover",    onOver);
      window.removeEventListener("mousedown",    onDown);
      window.removeEventListener("mouseup",      onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const size      = clicking ? 22  : hovering ? 68  : 46;
  const blur      = clicking ? 5   : hovering ? 14  : 10;
  const cyanAlpha = clicking ? 0.9 : hovering ? 0.9 : 0.72;
  const indAlpha  = clicking ? 0.6 : hovering ? 0.65 : 0.45;

  return (
    <div
      ref={orbRef}
      className="fixed top-0 left-0 z-[99999] pointer-events-none"
      style={{ willChange: "transform", opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      {/* Orb — centered on cursor using negative offset */}
      <div style={{
        position:     "absolute",
        width:        size,
        height:       size,
        top:          -size / 2,
        left:         -size / 2,
        borderRadius: "50%",
        background:   `radial-gradient(circle at center,
          rgba(34,211,238,${cyanAlpha})  0%,
          rgba(99,102,241,${indAlpha})  45%,
          rgba(139,92,246,0.15)         72%,
          transparent                   100%
        )`,
        filter:     `blur(${blur}px)`,
        transition: "width 0.2s ease, height 0.2s ease, top 0.2s ease, left 0.2s ease, filter 0.2s ease",
      }} />
    </div>
  );
}
