"use client";
import { useRef } from "react";
import { motion, useSpring } from "framer-motion";

export default function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);

  // 1. Bypass React State: We use Springs directly for GPU-accelerated 120fps physics
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Calculate distance from center
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Inject directly into the spring (No React re-renders!)
    x.set(middleX * strength);
    y.set(middleY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x, y }} // Bind springs directly to the style
      className="relative flex items-center justify-center cursor-none"
    >
      {children}
    </motion.div>
  );
}