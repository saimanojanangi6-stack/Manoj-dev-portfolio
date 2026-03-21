"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useSpring, useTransform, useMotionValue, useInView, useMotionTemplate } from "framer-motion";
import Image from "next/image";

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // --- AUDIO ENGINE ---
  const scrambleSfx = useRef(null);
  const ambientSfx = useRef(null);
  const [displayText, setDisplayText] = useState("");
  const targetText = "SYSTEM_ARCHITECT";

  useEffect(() => {
    scrambleSfx.current = new Audio("/sounds/about-scramble.mp3");
    ambientSfx.current = new Audio("/sounds/about-ambient.mp3");
    if (scrambleSfx.current) scrambleSfx.current.volume = 0.9;
    if (ambientSfx.current) {
      ambientSfx.current.loop = true;
      ambientSfx.current.volume = 0.12;
    }

    const unlock = () => {
      if (ambientSfx.current && isInView) ambientSfx.current.play().catch(() => {});
    };
    window.addEventListener("mousedown", unlock, { once: true });
    return () => {
      ambientSfx.current?.pause();
      window.removeEventListener("mousedown", unlock);
    };
  }, [isInView]);

  // --- KINETIC MOUSE ENGINE ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // High-precision springs for a "liquid" feel
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(clientX - rect.left);
    mouseY.set(clientY - rect.top);
  }, [mouseX, mouseY]);

  // Orbiting HUD Logic
  const orbitX = useTransform(smoothX, [0, 2000], [-30, 30]);
  const orbitY = useTransform(smoothY, [0, 1000], [-30, 30]);
  const bioGlow = useMotionTemplate`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(34, 211, 238, 0.08), transparent 80%)`;

  // --- CHARACTER SCRAMBLE ---
  useEffect(() => {
    if (!isInView) return;
    scrambleSfx.current?.play().catch(() => {});
    
    const chars = "¡™£¢∞§¶•ªº–≠1234567890ABCDEF";
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(targetText.split("").map((char, index) => {
        if (index < Math.floor(iteration)) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      iteration += 1/5;
      if (iteration >= targetText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [isInView]);

  const skills = [
    { name: "FULLSTACK", level: 95, color: "from-cyan-400 via-blue-500 to-indigo-600" },
    { name: "MOTION ENGINE", level: 98, color: "from-fuchsia-500 via-purple-500 to-indigo-500" },
    { name: "UI ARCHITECTURE", level: 92, color: "from-emerald-400 via-teal-500 to-cyan-600" },
  ];

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove} 
      id="about" 
      className="relative min-h-screen w-full bg-[#020204] overflow-hidden flex items-center justify-center py-24"
    >
      {/* 1. LIQUID MOUSE GLOW */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ background: bioGlow }} />

      {/* 2. DYNAMIC BACKGROUND TEXT (WARPED) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <motion.h2 
          style={{ x: useTransform(smoothX, [0, 2000], [50, -50]) }}
          className="text-[20vw] font-black text-white whitespace-nowrap tracking-[-0.05em]"
        >
          {displayText}
        </motion.h2>
      </div>

      <div className="container relative z-10 mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        
        {/* 3. THE HUD PORTRAIT ASSEMBLY */}
        <div className="relative flex justify-center">
          <motion.div 
            style={{ rotateX: useTransform(smoothY, [0, 1000], [15, -15]), rotateY: useTransform(smoothX, [0, 2000], [-15, 15]), transformStyle: "preserve-3d" }}
            className="relative w-[300px] md:w-[450px] aspect-[4/5]"
          >
            {/* Main Portrait with Floating Clipping Mask */}
            <motion.div 
              style={{ translateZ: 50 }}
              className="absolute inset-0 rounded-[3rem] overflow-hidden border border-white/10 bg-black shadow-2xl"
            >
              <Image src="/manoj.jpg" alt="Manoj" fill className="object-cover contrast-125 saturate-[0.1] hover:saturate-100 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020204] via-transparent to-transparent" />
            </motion.div>

            {/* Orbiting Ring 01 */}
            <motion.div 
              style={{ translateZ: 120, x: orbitX, y: orbitY }}
              className="absolute -inset-10 border border-cyan-500/20 rounded-[4rem] pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Data Point */}
            <motion.div 
              style={{ translateZ: 180, x: useTransform(smoothX, [0, 2000], [40, -40]) }}
              className="absolute top-10 -right-10 px-6 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[8px] font-mono text-cyan-400 tracking-[0.4em] uppercase">Status</span>
                <span className="text-xs font-bold text-white">ENGINE_OPTIMIZED</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* 4. THE GLASS-MORPHIC BIO CARD */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative bg-white/[0.01] backdrop-blur-2xl border border-white/[0.05] rounded-[4rem] p-10 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Animated Corner Flare */}
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full" 
            />

            <h3 className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tight leading-[0.9]">
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 italic">Digital Gravity.</span>
            </h3>

            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed mb-14 max-w-lg">
              I break the boundaries of the viewport, creating <span className="text-white">cinematic interfaces</span> that respond to human presence with <span className="text-cyan-400">mathematical precision</span>.
            </p>

            {/* PERFORMANCE GAUGES */}
            <div className="grid gap-10">
              {skills.map((skill, i) => (
                <div key={skill.name} className="relative group/skill">
                  <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] font-mono text-white/30 tracking-[0.5em] group-hover/skill:text-cyan-400 transition-colors uppercase">{skill.name}</span>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-[10px] font-mono text-white/50"
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5 relative overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      whileInView={{ x: "0%" }}
                      transition={{ duration: 2, delay: 0.8 + (i * 0.1), ease: [0.8, 0, 0.2, 1] }}
                      className={`absolute inset-0 bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}