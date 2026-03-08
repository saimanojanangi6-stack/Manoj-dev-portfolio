"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useSpring } from "framer-motion";

export default function SplashScreen({ finishLoading }) {
  const counterRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // --- 1. GPU-Accelerated Mouse Tracking ---
  const mouseX = useMotionValue(-1000); // Start off-screen
  const mouseY = useMotionValue(-1000);

  // Buttery smooth spring physics for the orb
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Center the orb initially
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    // --- 2. The 120fps Hardware Counter ---
    const controls = animate(0, 100, {
      duration: 3.5, // 3.5 seconds of cinematic buildup
      ease: [0.76, 0, 0.24, 1], // Aggressive snap easing
      onUpdate: (value) => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(value);
        }
      },
      onComplete: () => {
        // Pause at 100%, then trigger the "Big Bang"
        setTimeout(() => finishLoading(), 600);
      }
    });

    return () => controls.stop();
  }, [finishLoading]);

  return (
    <motion.div 
      key="splash"
      /* The Background fades out after the orb explodes */
      exit={{ 
        opacity: 0,
        transition: { duration: 0.8, delay: 0.6, ease: "easeInOut" } 
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      
      {/* --- 3. Infinite Kinetic Background Typography --- */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4 md:gap-10 opacity-20 pointer-events-none select-none overflow-hidden">
        <motion.h1 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="text-[15vw] md:text-[12vw] font-black text-white whitespace-nowrap leading-none tracking-tighter"
        >
          UI/UX DESIGNER • UI/UX DESIGNER • UI/UX DESIGNER •
        </motion.h1>
        
        <motion.h1 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="text-[15vw] md:text-[12vw] font-black text-transparent stroke-text whitespace-nowrap leading-none tracking-tighter"
        >
          FULL STACK ENGINEER • FULL STACK ENGINEER •
        </motion.h1>
        
        <motion.h1 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="text-[15vw] md:text-[12vw] font-black text-white whitespace-nowrap leading-none tracking-tighter"
        >
          MANOJ DEV • MANOJ DEV • MANOJ DEV • MANOJ DEV •
        </motion.h1>
      </div>

      {/* --- 4. The Singularity Lens (The Inversion Orb) --- */}
      <motion.div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        /* THE BIG BANG EXIT: The orb scales to 50x its size, blinding the screen */
        exit={{ 
          scale: 60, 
          opacity: 0,
          transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
        }}
        style={{ 
          x: smoothX, 
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-white rounded-full mix-blend-difference flex items-center justify-center cursor-none z-50 pointer-events-auto"
      >
        {/* Loading Counter Inside the Orb */}
        <div className="flex items-start mix-blend-difference text-white">
          <span 
            ref={counterRef} 
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            0
          </span>
          <span className="text-xl md:text-2xl font-bold mt-1 ml-1">%</span>
        </div>
      </motion.div>

      {/* --- 5. Terminal Footer --- */}
      <motion.div 
        exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.5em] animate-pulse">
          Move your mouse
        </div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-400 to-transparent" />
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255,255,255,1);
        }
      `}} />
    </motion.div>
  );
}