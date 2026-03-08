"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";

export default function SplashScreen({ finishLoading }) {
  const counterRef = useRef(null);
  const [decodedText, setDecodedText] = useState("");
  
  const TARGET_TEXT = "MANOJ DEV.";
  const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

  useEffect(() => {
    // 1. The Hardware-Accelerated Loading Counter (0 to 100)
    const duration = 3.5; // Total loading time
    
    const controls = animate(0, 100, {
      duration: duration,
      ease: [0.76, 0, 0.24, 1], // Aggressive cinematic ease
      onUpdate: (value) => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(value) + "%";
        }
      },
      onComplete: () => {
        // Tiny pause for impact, then trigger the split exit
        setTimeout(() => finishLoading(), 400);
      }
    });

    // 2. The Text Decoder Effect
    let iterations = 0;
    const interval = setInterval(() => {
      setDecodedText(
        TARGET_TEXT.split("")
          .map((letter, index) => {
            if (index < iterations) return TARGET_TEXT[index];
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join("")
      );
      
      // Speed of decryption (scales with the 3.5s loading time)
      if (iterations >= TARGET_TEXT.length) clearInterval(interval);
      iterations += 1 / 6; 
    }, 30);

    return () => {
      controls.stop();
      clearInterval(interval);
    };
  }, [finishLoading]);

  // --- Elite Split-Screen Exit Variants ---
  const slideUp = {
    exit: { 
      y: "-100vh", 
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
    }
  };
  
  const slideDown = {
    exit: { 
      y: "100vh", 
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
    }
  };

  const contentFade = {
    exit: { 
      opacity: 0, 
      scale: 1.1, 
      filter: "blur(10px)", 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col">
      
      {/* --- The Split Doors --- */}
      {/* Top Door */}
      <motion.div 
        variants={slideUp} 
        exit="exit" 
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0a0a0a] border-b border-white/5 origin-top z-10"
      />
      {/* Bottom Door */}
      <motion.div 
        variants={slideDown} 
        exit="exit" 
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0a0a0a] border-t border-white/5 origin-bottom z-10"
      />

      {/* --- The Content (Sits above doors, fades out right before split) --- */}
      <motion.div 
        variants={contentFade}
        exit="exit"
        className="absolute inset-0 z-20 flex flex-col items-center justify-center"
      >
        {/* Film Grain Noise */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* The Decoded Brand Name */}
        <div className="overflow-hidden mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter font-mono"
          >
            {decodedText}
          </motion.h1>
        </div>

        {/* Center Progress Box */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-[10px] md:text-xs font-mono text-cyan-400 uppercase tracking-[0.5em]">
            System Initialization
          </div>
          
          <div className="relative flex items-center justify-center">
            {/* Massive Hollow Counter */}
            <span 
              ref={counterRef} 
              className="text-[15vw] md:text-[8rem] font-black leading-none text-transparent tracking-tighter"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
            >
              0%
            </span>
            
            {/* Overlapping Solid Counter */}
            <span className="absolute text-2xl md:text-4xl font-black text-white mix-blend-difference">
              Loading
            </span>
          </div>
        </div>

        {/* Viewport Progress Stroke (Traces the screen edges) */}
        <div className="absolute inset-4 md:inset-8 border border-white/10 pointer-events-none overflow-hidden">
          <motion.div 
            initial={{ height: "0%" }}
            animate={{ height: "100%" }}
            transition={{ duration: 3.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 w-[2px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          />
        </div>
      </motion.div>
    </div>
  );
}