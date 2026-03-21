"use client";
import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function Magnetic({ children, strength = 0.5 }) {
  const ref = useRef(null);

  // 1. High-Precision Spring Physics
  // mass: 0.1 for instant reaction, stiffness: 200 for snap
  const springConfig = { damping: 20, stiffness: 200, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // 2. Geometric Elasticity (The "WOW" factor)
  // These map the movement to slight rotation and scale for a "stretching" effect
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    // Calculate center point
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Direct Physics Injection
    x.set((clientX - centerX) * strength);
    y.set((clientY - centerY) * strength);
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
      style={{ 
        x, 
        y, 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d" 
      }}
      className="relative flex items-center justify-center transition-shadow duration-500"
    >
      {/* Internal wrapper to ensure child content stays sharp while parent distorts */}
      <motion.div 
        style={{ transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}