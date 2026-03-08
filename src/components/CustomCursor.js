"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // 1. Direct DOM tracking (No React State)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // 2. Motion Values for size and opacity
  const dotSize = useMotionValue(8);
  const ringSize = useMotionValue(36);
  const ringOpacity = useMotionValue(0.5);

  // 3. Hardware-accelerated springs
  const springConfig = { damping: 25, stiffness: 300, mass: 0.1 };
  
  // Outer ring lags slightly behind for that premium "drag" effect
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  // Smooth sizing transitions
  const smoothDotSize = useSpring(dotSize, { damping: 20, stiffness: 200 });
  const smoothRingSize = useSpring(ringSize, springConfig);

  useEffect(() => {
    // Track mouse position instantly
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // --- ELITE FIX: Event Delegation ---
    // Instead of looping through all buttons (which breaks in Next.js),
    // we listen to the window and check what the mouse just touched.
    const handleMouseOver = (e) => {
      // Check if the hovered element (or its parent) is interactive
      const isInteractive = e.target.closest("a, button, input, textarea, .interactive");
      
      if (isInteractive) {
        // Hover State: Dot disappears, Ring expands and glows
        dotSize.set(0); 
        ringSize.set(60); 
        ringOpacity.set(1);
      } else {
        // Default State
        dotSize.set(8); 
        ringSize.set(36); 
        ringOpacity.set(0.4);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, dotSize, ringSize, ringOpacity]);

  return (
    // Hidden on mobile (touch devices don't need cursors and it causes scroll bugs)
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9999]">
      
      {/* --- Main Precision Dot --- */}
      <motion.div
        className="absolute top-0 left-0 bg-white rounded-full mix-blend-difference pointer-events-none"
        style={{ 
          x: cursorX, 
          y: cursorY, 
          width: smoothDotSize, 
          height: smoothDotSize, 
          translateX: "-50%", 
          translateY: "-50%" 
        }}
      />
      
      {/* --- Outer Designer Ring --- */}
      <motion.div
        className="absolute top-0 left-0 border border-white rounded-full mix-blend-difference pointer-events-none flex items-center justify-center"
        style={{ 
          x: smoothX, 
          y: smoothY, 
          width: smoothRingSize, 
          height: smoothRingSize, 
          opacity: ringOpacity,
          translateX: "-50%", 
          translateY: "-50%",
          backgroundColor: ringOpacity.get() === 1 ? "rgba(255,255,255,0.1)" : "transparent"
        }}
      />
      
    </div>
  );
}