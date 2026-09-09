import { useEffect, useRef } from "react";

export function SmoothCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable for desktop with fine pointer
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Fast check for interactive elements without layout thrashing
      const target = e.target as HTMLElement | null;
      isHovering = Boolean(target?.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer"));
    };

    const onMouseDown = () => { isClicking = true; };
    const onMouseUp = () => { isClicking = false; };

    const loop = () => {
      // Smooth linear interpolation for outer ring
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) scale(${isClicking ? 0.75 : 1})`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${isClicking ? 0.85 : isHovering ? 1.5 : 1})`;

      if (isHovering) {
        ring.style.borderColor = "rgba(56, 189, 248, 0.8)";
        ring.style.backgroundColor = "rgba(56, 189, 248, 0.12)";
      } else {
        ring.style.borderColor = "rgba(139, 92, 246, 0.4)";
        ring.style.backgroundColor = "transparent";
      }

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Precision Inner Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-sky-400 rounded-full pointer-events-none z-[9999] will-change-transform shadow-[0_0_8px_rgba(56,189,248,0.8)] hidden md:block"
      />
      {/* Smooth Trailing Spring Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-purple-500/40 rounded-full pointer-events-none z-[9998] will-change-transform transition-[border-color,background-color] duration-200 hidden md:block"
      />
    </>
  );
}

export default SmoothCursor;
