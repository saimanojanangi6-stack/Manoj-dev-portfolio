"use client";
import { useRef, useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";

export default function Hero() {
  const containerRef = useRef(null);
  const revealSfx = useRef(null);

  useEffect(() => {
    revealSfx.current = new Audio("/sounds/hero-reveal.mp3");
    if (revealSfx.current) {
      revealSfx.current.volume = 0.6;
      revealSfx.current.play().catch(() => {});
    }
    return () => {
      if (revealSfx.current) {
        revealSfx.current.pause();
        revealSfx.current = null;
      }
    };
  }, []);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springConfig = { damping: 50, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const titleLine = {
    hidden: { y: "100%", filter: "blur(15px)", opacity: 0 },
    show: { 
      y: 0, 
      filter: "blur(0px)", 
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      /* UPDATED SPACING: 
         pt-32 on mobile (approx 128px) 
         md:pt-44 on desktop (approx 176px) 
         This ensures content starts below the Navbar 
      */
      className="relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-44 overflow-hidden bg-[#0a0a0a]"
    >
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center text-center">
          
          {/* Availability Badge */}
          <motion.div variants={item} className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-indigo-500/5 border border-indigo-500/20 text-indigo-400 text-[9px] md:text-xs font-mono uppercase tracking-[0.2em] mb-8 md:mb-12 shadow-[0_0_20px_rgba(99,102,241,0.1)]">
            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-cyan-500"></span>
            </span>
            Available for Projects
          </motion.div>
          
          {/* Massive Kinetic Typography */}
          <motion.div style={{ x: textX, y: textY }} className="flex flex-col items-center mb-6 md:mb-10 w-full">
            <div className="overflow-hidden pb-1 md:pb-2 -mb-4 md:-mb-8">
              <motion.h1 variants={titleLine} className="text-[18vw] sm:text-[15vw] md:text-[10rem] lg:text-[12rem] font-black tracking-tighter leading-none text-white">
                MANOJ
              </motion.h1>
            </div>
            
            <div className="overflow-hidden pb-2 md:pb-4">
              <motion.h1 variants={titleLine} className="text-[18vw] sm:text-[15vw] md:text-[10rem] lg:text-[12rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-white pr-2 md:pr-4">
                DEV.
              </motion.h1>
            </div>
          </motion.div>

          {/* Subtitle */}
          <div className="overflow-hidden mb-10 md:mb-14">
            <motion.p variants={titleLine} className="text-slate-400 text-sm sm:text-base md:text-xl lg:text-2xl max-w-[280px] sm:max-w-md md:max-w-2xl mx-auto leading-relaxed font-light">
              Designing <span className="text-white italic">User Experiences</span> and engineering <span className="text-white">Full Stack</span> platforms.
            </motion.p>
          </div>

          {/* Buttons */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto mb-20">
            <Magnetic>
              <Link href="/#projects" className="group relative overflow-hidden block px-8 md:px-10 py-3.5 md:py-4 bg-white text-black rounded-full font-bold text-sm md:text-base tracking-wide transition-all">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">View My Work</span>
                <div className="absolute inset-0 h-full w-full bg-indigo-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className="block px-8 md:px-10 py-3.5 md:py-4 glass-card hover:bg-white/10 rounded-full font-bold text-sm md:text-base tracking-wide transition-all border border-white/10 text-white text-center">
                Hire Me
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] md:text-[9px] font-mono tracking-[0.3em] uppercase text-slate-500">Scroll</span>
        <div className="w-[1px] h-8 md:h-12 bg-white/20 overflow-hidden relative">
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