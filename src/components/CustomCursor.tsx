import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [isClicked, setIsClicked] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      setRotation((prev) => prev + 1080); // 3 spins = 1080 degrees
    };
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{ x: cursorX, y: cursorY, originX: 0, originY: 0 }}
      animate={{
        scale: isClicked ? 0.75 : 1,
      }}
      transition={{
        scale: { type: "spring", stiffness: 400, damping: 25 },
      }}
    >
      {/* Rotate parent 45deg so the X-axis aligns with the arrow's shaft (top-left to bottom-right) */}
      <div style={{ transform: "rotate(45deg)", transformOrigin: "0 0" }}>
        {/* RotateX creates a barrel roll spin along the new X-axis (the shaft) */}
        <motion.div
          animate={{ rotateX: rotation }}
          transition={{ rotateX: { type: "tween", duration: 0.6, ease: "easeInOut" } }}
          style={{ transformOrigin: "0 0" }}
        >
          {/* Rotate child back -45deg so the arrow points in the original direction relative to the screen */}
          <div style={{ transform: "rotate(-45deg)", transformOrigin: "0 0" }}>
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="url(#goldGradient)"
              stroke="#1a1a1a"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: "translate(-5.6px, -2.8px)", display: "block" }}
            >
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbf9f1" />
                  <stop offset="25%" stopColor="#d4af37" />
                  <stop offset="70%" stopColor="#b58d24" />
                  <stop offset="100%" stopColor="#78561a" />
                </linearGradient>
              </defs>
              <path d="M4 2L20 10L13 13L10 20L4 2Z" />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
