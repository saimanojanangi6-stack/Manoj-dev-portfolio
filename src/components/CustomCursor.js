"use client";
import { useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  // 1. POSITION TRACKING
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. PHYSICS ENGINE (High Inertia)
  const springConfig = { damping: 25, stiffness: 250, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3. VELOCITY SKEW (The Squelch Factor)
  const velX = useMotionValue(0);
  const velY = useMotionValue(0);
  
  // Transform velocity into scale and rotation
  const scaleX = useTransform(velX, [-500, 500], [1.5, 0.5]);
  const scaleY = useTransform(velY, [-500, 500], [0.5, 1.5]);
  const rotation = useTransform(velX, [-500, 500], [-15, 15]);

  useEffect(() => {
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastTime = Date.now();

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      const now = Date.now();
      const dt = now - lastTime;
      
      if (dt > 0) {
        velX.set((clientX - lastMouseX) / dt * 10);
        velY.set((clientY - lastMouseY) / dt * 10);
      }

      mouseX.set(clientX);
      mouseY.set(clientY);

      lastMouseX = clientX;
      lastMouseY = clientY;
      lastTime = now;
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, .interactive, [data-cursor]");
      if (target) {
        setIsHovering(true);
        setCursorText(target.getAttribute("data-cursor") || "View");
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY, velX, velY]);

  return (
    <div className="hidden md:block fixed inset-0 z-[9999] pointer-events-none">
      
      {/* --- 1. THE CORE SINGULARITY --- */}
      <motion.div
        className="absolute top-0 left-0 bg-white rounded-full mix-blend-difference z-20"
        style={{ 
          x: mouseX, 
          y: mouseY, 
          width: 6, 
          height: 6, 
          translateX: "-50%", 
          translateY: "-50%",
          scale: isHovering ? 0 : 1
        }}
      />
      
      {/* --- 2. THE LIQUID LENS (Main Stylized Element) --- */}
      <motion.div
        className="absolute top-0 left-0 border border-white/30 flex items-center justify-center overflow-hidden z-10"
        animate={{
          width: isHovering ? 110 : 45,
          height: isHovering ? 110 : 45,
          borderRadius: isHovering ? "30%" : "50%",
          backgroundColor: isHovering ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
          borderColor: isHovering ? "rgba(255,255,255,0)" : "rgba(255,255,255,0.3)",
        }}
        style={{ 
          x: smoothX, 
          y: smoothY, 
          scaleX, 
          scaleY, 
          rotate: rotation,
          translateX: "-50%", 
          translateY: "-50%",
          mixBlendMode: "difference"
        }}
      >
        <motion.span
          animate={{ opacity: isHovering ? 1 : 0, y: isHovering ? 0 : 10 }}
          className="text-[9px] font-black text-black uppercase tracking-[0.3em] italic"
        >
          {cursorText}
        </motion.span>
      </motion.div>

      {/* --- 3. THE CHROMATIC TRAIL (VFX) --- */}
      <motion.div
        className="absolute top-0 left-0 w-8 h-8 rounded-full border border-cyan-500/20 blur-[2px] -z-10"
        style={{ 
          x: useSpring(mouseX, { damping: 40, stiffness: 100 }), 
          y: useSpring(mouseY, { damping: 40, stiffness: 100 }),
          translateX: "-50%", 
          translateY: "-50%" 
        }}
      />
      
      {/* --- 4. DATA STATUS LINE (Aesthetic) --- */}
      <motion.div 
        className="absolute h-px bg-cyan-500/20"
        style={{ 
            width: 40,
            x: mouseX, 
            y: mouseY,
            rotate: 45,
            translateX: "20px",
            translateY: "20px",
            opacity: isHovering ? 0 : 0.5
        }}
      />
    </div>
  );
}