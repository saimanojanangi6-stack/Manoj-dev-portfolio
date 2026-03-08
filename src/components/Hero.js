"use client";
import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";

export default function Hero() {
  const containerRef = useRef(null);

  // --- 1. Mouse Tracking for Text Parallax ---
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Text moves slightly opposite to the mouse
  const textX = useTransform(smoothX, [0, 1], ["-2%", "2%"]);
  const textY = useTransform(smoothY, [0, 1], ["-2%", "2%"]);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // --- 2. Advanced Editorial Animation Variants ---
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  // Organic blur-mask reveal for the massive text
  const titleLine = {
    hidden: { y: "120%", rotate: 2, filter: "blur(10px)", opacity: 0 },
    show: { 
      y: 0, 
      rotate: 0, 
      filter: "blur(0px)", 
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Standard fade-up for secondary elements
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Premium Film Grain Overlay (Matches About.js) */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Floating Agency Ornament */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] text-slate-800 text-6xl md:text-9xl font-serif opacity-30 pointer-events-none select-none"
      >
        ✧
      </motion.div>

      <div className="container mx-auto px-6 z-10">
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Availability Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] mb-8 md:mb-12 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for UI/UX Projects
          </motion.div>
          
          {/* Massive Kinetic Typography */}
          <motion.div 
            style={{ x: textX, y: textY }}
            className="flex flex-col items-center mb-8"
          >
            {/* Line 1 */}
            <div className="overflow-hidden pb-2 -mb-4 md:-mb-8">
              <motion.h1 variants={titleLine} className="text-[15vw] md:text-[10rem] lg:text-[12rem] font-black tracking-tighter leading-none text-white">
                MANOJ
              </motion.h1>
            </div>
            
            {/* Line 2 with Gradient and overlapping styling */}
            <div className="overflow-hidden pb-4">
              <motion.h1 variants={titleLine} className="text-[15vw] md:text-[10rem] lg:text-[12rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-white pr-4">
                DEV.
              </motion.h1>
            </div>
          </motion.div>

          {/* Editorial Subtitle */}
          <div className="overflow-hidden mb-12">
            <motion.p variants={titleLine} className="text-slate-400 text-base md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed font-light">
              Designing <span className="text-white font-medium italic">User Experiences</span> and engineering <span className="text-white font-medium">Full Stack</span> platforms. I bridge the gap between human intuition and high-performance code.
            </motion.p>
          </div>

          {/* Magnetic Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto">
            <Magnetic>
              <Link href="/#projects" className="group relative overflow-hidden block w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-bold tracking-wide transition-all text-center">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">View My Work</span>
                {/* Button Hover Fill Effect */}
                <div className="absolute inset-0 h-full w-full bg-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className="block w-full sm:w-auto px-10 py-4 glass-card hover:bg-white/10 rounded-full font-bold tracking-wide transition-all text-center border border-white/10 text-white">
                Hire Me
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-slate-500">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-full h-1/2 bg-cyan-400"
          />
        </div>
      </motion.div>
    </section>
  );
}