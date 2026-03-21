"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

export default function SplashScreen({ finishLoading }) {
  const counterRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // State to hold the animation until the user clicks (Fixes Browser Autoplay Block)
  const [hasStarted, setHasStarted] = useState(false);

  // Audio Refs
  const ambientAudio = useRef(null);
  const hoverAudio = useRef(null);
  const bangAudio = useRef(null);

  // --- GPU-Accelerated Mouse Tracking ---
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // 1. Initialize the exactly requested audio files
    ambientAudio.current = new Audio("/sounds/ambient-hum.mp3");
    hoverAudio.current = new Audio("/sounds/hover-glitch.mp3");
    bangAudio.current = new Audio("/sounds/big-bang.mp3");

    // --- FULL 100% VOLUME SETUP ---
    if (ambientAudio.current) {
      ambientAudio.current.loop = true;
      ambientAudio.current.volume = 1.0; // 100% Volume
    }
    if (bangAudio.current) bangAudio.current.volume = 1.0; // 100% Volume
    if (hoverAudio.current) hoverAudio.current.volume = 1.0; // 100% Volume

    // Center mouse initially
    mouseX.set(window.innerWidth / 2);
    mouseY.set(window.innerHeight / 2);

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // --- The Start Function (Unlocks Audio) ---
  const handleStartSequence = () => {
    setHasStarted(true);
    // 2. Play Ambient Hum instantly on click at 100% volume
    if (ambientAudio.current) {
      ambientAudio.current.play().catch(() => console.log("Audio failed to play"));
    }
  };

  useEffect(() => {
    // --- The 120fps Hardware Counter ---
    if (!hasStarted) return; // Pause here until user clicks start

    const controls = animate(0, 100, {
      duration: 3.5, // 3.5 seconds of cinematic buildup
      ease: [0.76, 0, 0.24, 1],
      onUpdate: (value) => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(value);
        }
      },
      onComplete: () => {
        // Fade out ambient hum quickly from 100% volume
        if (ambientAudio.current) {
          let fade = setInterval(() => {
            if (ambientAudio.current.volume > 0.1) {
              ambientAudio.current.volume -= 0.1;
            } else {
              clearInterval(fade);
              ambientAudio.current.pause();
            }
          }, 50);
        }
        
        // 3. Trigger Big Bang Explosion Audio at exactly 100%
        if (bangAudio.current) {
          bangAudio.current.currentTime = 0;
          bangAudio.current.play().catch(() => {});
        }

        setTimeout(() => finishLoading(), 1000);
      }
    });

    return () => controls.stop();
  }, [hasStarted, finishLoading]);

  // 4. Handle Hover Glitch Sound at 100% Volume
  useEffect(() => {
    if (isHovering && hoverAudio.current && hasStarted) {
      hoverAudio.current.currentTime = 0; // Reset sound to start
      hoverAudio.current.play().catch(() => {});
    }
  }, [isHovering, hasStarted]);

  return (
    <motion.div
      key="splash"
      exit={{
        opacity: 0,
        transition: { duration: 0.8, delay: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Noise/Grain Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')] bg-repeat"></div>

      {/* --- The Entry Gate (Fixes Browser Autoplay Rules) --- */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 0.8 } }}
            className="absolute inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a]/80 backdrop-blur-sm cursor-pointer"
            onClick={handleStartSequence}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border border-cyan-400/50 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              </div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.5em]">
                Click to Initialize
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Infinite Kinetic Background Typography --- */}
      <div className={`absolute inset-0 flex flex-col justify-center gap-4 md:gap-10 opacity-20 pointer-events-none select-none overflow-hidden transition-transform duration-700 ease-out ${!hasStarted && 'blur-sm'}`}
           style={{ transform: isHovering ? "scale(1.05)" : "scale(1)" }}>
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

      {/* --- The Singularity Lens (The Inversion Orb) --- */}
      <motion.div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        animate={{
          scale: isHovering ? 1.1 : 1, 
        }}
        exit={{
          scale: 150, 
          opacity: 0,
          transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
        }}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="absolute top-0 left-0 w-40 h-40 md:w-64 md:h-64 bg-white rounded-full mix-blend-difference flex items-center justify-center cursor-none z-50 pointer-events-auto shadow-[0_0_40px_rgba(255,255,255,0.2)]"
      >
        <div className="flex items-start mix-blend-difference text-white">
          <span ref={counterRef} className="text-5xl md:text-7xl font-black tracking-tighter">
            0
          </span>
          <span className="text-xl md:text-2xl font-bold mt-1 ml-1">%</span>
        </div>
      </motion.div>

      {/* --- Terminal Footer & Loading Line --- */}
      <motion.div
        exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
        className="absolute bottom-10 w-full px-10 flex flex-col items-center gap-4 z-40 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.5em] animate-pulse">
            Initialize Sequence
          </div>
          <div className="w-[1px] h-8 bg-gradient-to-b from-cyan-400 to-transparent" />
        </div>
        
        <div className="w-full max-w-md h-[1px] bg-white/10 relative overflow-hidden">
          {/* Progress bar only animates when hasStarted is true */}
          <motion.div 
            className="absolute top-0 left-0 h-full bg-cyan-400"
            initial={{ width: "0%" }}
            animate={{ width: hasStarted ? "100%" : "0%" }}
            transition={{ duration: 3.5, ease: [0.76, 0, 0.24, 1] }}
          />
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255,255,255,1);
        }
      `}} />
    </motion.div>
  );
}