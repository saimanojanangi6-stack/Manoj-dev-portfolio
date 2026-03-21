"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useSpring, useTransform, useMotionValue, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // --- AUDIO REFS ---
  const scrambleSfx = useRef(null);
  const ambientSfx = useRef(null);
  const hasPlayedScramble = useRef(false);

  useEffect(() => {
    // 1. Initialize Audio Files with Full Volume
    scrambleSfx.current = new Audio("/sounds/about-scramble.mp3");
    ambientSfx.current = new Audio("/sounds/about-ambient.mp3");

    if (scrambleSfx.current) {
      scrambleSfx.current.volume = 1.0; // 100% Volume
      scrambleSfx.current.preservesPitch = false; // Makes it sound more "glitchy"
    }
    
    if (ambientSfx.current) {
      ambientSfx.current.loop = true;
      ambientSfx.current.volume = 0.15;
    }

    // "Pre-warm" the audio objects to bypass browser lock
    const warmAudio = () => {
      if (scrambleSfx.current) {
        scrambleSfx.current.play().then(() => {
          scrambleSfx.current.pause();
          scrambleSfx.current.currentTime = 0;
        }).catch(() => {});
      }
    };

    window.addEventListener("mousedown", warmAudio, { once: true });

    return () => {
      if (ambientSfx.current) ambientSfx.current.pause();
      window.removeEventListener("mousedown", warmAudio);
    };
  }, []);

  // Play ambient hum when component enters view
  useEffect(() => {
    if (isInView && ambientSfx.current) {
      ambientSfx.current.play().catch(() => {});
    }
  }, [isInView]);

  // ==========================================
  // 1. ADVANCED MOUSE TRACKING & PARALLAX
  // ==========================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25, mass: 0.8 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25, mass: 0.8 });

  const tiltX = useSpring(0, { stiffness: 80, damping: 25, mass: 0.5 });
  const tiltY = useSpring(0, { stiffness: 80, damping: 25, mass: 0.5 });

  const parallaxX = useSpring(0, { stiffness: 30, damping: 20 });
  const parallaxY = useSpring(0, { stiffness: 30, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    tiltX.set((relY - 0.5) * -8);
    tiltY.set((relX - 0.5) * 8);
    parallaxX.set((relX - 0.5) * 20);
    parallaxY.set((relY - 0.5) * 20);
  }, [mouseX, mouseY, tiltX, tiltY, parallaxX, parallaxY]);

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0);
    tiltY.set(0);
    parallaxX.set(0);
    parallaxY.set(0);
  }, [tiltX, tiltY, parallaxX, parallaxY]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // ==========================================
  // 2. ENHANCED PARTICLE SYSTEM
  // ==========================================
  const [particles, setParticles] = useState([]);
  const [glowOrbs, setGlowOrbs] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 12,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.6 + 0.2,
      drift: (Math.random() - 0.5) * 30,
    }));
    setParticles(newParticles);

    const orbs = Array.from({ length: 4 }).map((_, i) => ({
      id: i,
      size: Math.random() * 200 + 100,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      duration: Math.random() * 25 + 15,
      color: i % 2 === 0 ? "rgba(6,182,212,0.04)" : "rgba(99,102,241,0.03)",
    }));
    setGlowOrbs(orbs);
  }, []);

  // ==========================================
  // 3. TEXT SCRAMBLE EFFECT + SFX UNLOCK
  // ==========================================
  const [displayText, setDisplayText] = useState("");
  const targetText = "ENGINEER";

  useEffect(() => {
    if (!isInView) return;

    // FORCED SFX PLAYBACK AT 100%
    if (scrambleSfx.current && !hasPlayedScramble.current) {
      scrambleSfx.current.currentTime = 0;
      scrambleSfx.current.play().catch((e) => console.warn("Scramble SFX blocked by browser. Click page to unlock."));
      hasPlayedScramble.current = true;
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";
    let iteration = 0;
    const maxIterations = targetText.length * 4;

    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map((char, index) => {
            if (index < Math.floor(iteration / 4)) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iteration++;
      if (iteration > maxIterations) {
        setDisplayText(targetText);
        // Stop Scramble SFX smoothly when text resolves
        if (scrambleSfx.current) {
          let fadeOut = setInterval(() => {
            if (scrambleSfx.current.volume > 0.1) {
              scrambleSfx.current.volume -= 0.1;
            } else {
              scrambleSfx.current.pause();
              clearInterval(fadeOut);
            }
          }, 50);
        }
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [isInView]);

  const skills = [
    { name: "NEXT.JS", level: 95, color: "from-cyan-400 to-cyan-600" },
    { name: "TAILWIND", level: 90, color: "from-indigo-400 to-indigo-600" },
    { name: "FRAMER", level: 88, color: "from-purple-400 to-purple-600" },
    { name: "REACT", level: 92, color: "from-blue-400 to-blue-600" },
    { name: "TYPESCRIPT", level: 85, color: "from-emerald-400 to-emerald-600" },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const bgTextAnim = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 0.06,
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const portraitAnim = {
    hidden: { scale: 0.85, opacity: 0, y: 40, rotateY: -15 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 },
    },
  };

  const bioAnim = {
    hidden: { opacity: 0, x: 60, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 },
    },
  };

  const lineVariant = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.2 } },
  };

  const skillVariant = (i) => ({
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 1.4 + i * 0.1, ease: "easeOut" } },
  });

  const skillBarVariant = (level, i) => ({
    hidden: { width: "0%" },
    visible: { width: `${level}%`, transition: { duration: 1.2, delay: 1.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] } },
  });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full bg-[#020204] overflow-hidden flex items-center justify-center py-20 md:py-28"
      style={{ perspective: "2000px" }}
    >
      {/* Noise Texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }} />
      
      {/* Orbs */}
      {glowOrbs.map((orb) => (
        <motion.div key={orb.id} className="absolute rounded-full pointer-events-none z-[3]" style={{ width: orb.size, height: orb.size, left: `${orb.x}%`, top: `${orb.y}%`, background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`, filter: "blur(40px)" }} animate={{ x: [0, 50, -30, 0], y: [0, -40, 60, 0] }} transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }} />
      ))}

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        {particles.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full" style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%`, background: `radial-gradient(circle, rgba(6,182,212,${p.opacity}) 0%, transparent 100%)`, boxShadow: `0 0 ${p.size * 3}px rgba(6,182,212,${p.opacity * 0.5})` }} animate={{ y: [0, -1000], x: [0, p.drift], opacity: [0, p.opacity, p.opacity, 0] }} transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }} />
        ))}
      </div>

      {/* BACKGROUND TEXT */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={bgTextAnim} className="absolute inset-0 z-[6] flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[15vw] md:text-[18vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/5 leading-none tracking-[-0.05em] uppercase">
          {displayText || "ENGINEER"}
        </h1>
      </motion.div>

      {/* Main Content */}
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants} className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* PORTRAIT */}
        <motion.div variants={portraitAnim} style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }} className="relative z-[10] flex flex-col items-center w-[260px] md:w-[320px] flex-shrink-0 group">
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.08] bg-black/80 shadow-2xl group-hover:border-cyan-500/20 transition-all duration-700">
            <Image src="/manoj.jpg" alt="Manoj Dev" fill className="object-cover object-center contrast-[1.1] saturate-[0.6] group-hover:saturate-100 group-hover:scale-105 transition-all duration-1000" priority />
            <motion.div animate={{ y: ["-100%", "250%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }} className="absolute inset-x-0 h-[15%] bg-gradient-to-b from-transparent via-cyan-400/15 to-transparent pointer-events-none mix-blend-overlay" />
          </div>
        </motion.div>

        {/* BIO CARD */}
        <motion.div variants={bioAnim} className="relative z-[20] w-full max-w-lg">
          <div className="relative w-full bg-white/[0.02] backdrop-blur-xl border border-white/[0.06] rounded-2xl p-8 md:p-10 overflow-hidden group/card hover:border-white/[0.1] transition-all duration-700">
            <motion.div variants={lineVariant} className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent origin-left" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-[1.1]">Beyond the</h3>
            <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-[1.1]"><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Interface.</span></h3>
            
            <p className="text-white/50 text-sm leading-[1.8] font-light mb-8">
              I merge aesthetic design with precise engineering to craft high-performance <span className="text-cyan-400 font-medium">digital experiences</span>.
            </p>

            <div className="space-y-3 mb-8">
              {skills.map((skill, i) => (
                <motion.div key={skill.name} custom={i} variants={skillVariant(i)}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-white/40 tracking-[0.2em]">{skill.name}</span>
                    <span className="text-[10px] font-mono text-white/20">{skill.level}%</span>
                  </div>
                  <div className="w-full h-[2px] bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div variants={skillBarVariant(skill.level, i)} className={`h-full rounded-full bg-gradient-to-r ${skill.color}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}