"use client";
import { useRef, useEffect, useMemo } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useMotionTemplate 
} from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";

// --- 1. Enhanced Fire Sparkle System ---
const FireSparkles = ({ mouseX, mouseY }) => {
  const particles = useMemo(() => 
    Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      baseX: Math.random() * 100,
      baseY: Math.random() * 100,
      duration: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 2,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div 
        style={{ x: mouseX, y: mouseY }}
        className="absolute w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500/20 to-blue-600/10 blur-[100px] rounded-full mix-blend-screen"
      />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_12px_#22d3ee]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.baseX}%`,
            top: `${p.baseY}%`,
          }}
          animate={{
            y: [0, -400],
            x: [0, (Math.random() - 0.5) * 200],
            scale: [1, 2, 0],
            rotate: [0, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  const revealSfx = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 150 });

  useEffect(() => {
    revealSfx.current = new Audio("/sounds/hero-reveal.mp3");
    if (revealSfx.current) {
      revealSfx.current.volume = 0.7;
      revealSfx.current.play().catch(() => {});
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const letterAnim = {
    hidden: { y: 100, opacity: 0, rotateX: -90, filter: "blur(20px)" },
    show: (i) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        delay: 0.4 + i * 0.05,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      // Fixed: min-h-screen with flex-center and large bottom padding
      className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-32 md:pb-40 overflow-hidden bg-[#020204]"
    >
      <FireSparkles mouseX={springX} mouseY={springY} />
      
      <motion.div 
        className="absolute inset-0 opacity-[0.05] z-0"
        style={{
          backgroundImage: `linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          skewY: useTransform(springY, [0, 1000], [1, -1]),
        }}
      />

      <div className="container mx-auto px-6 z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 px-4 py-2 rounded-full border border-cyan-500/30 bg-black/50 backdrop-blur-md"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase">
              Ignition_Protocol: Active
            </span>
          </motion.div>
          
          <div className="flex flex-col items-center mb-10 select-none">
            {/* MANOJ - Fluid Scalable Size */}
            <div className="flex overflow-hidden pb-4 -mb-6 md:-mb-14">
              {"MANOJ".split("").map((char, i) => (
                <motion.h1
                  key={i}
                  custom={i}
                  variants={letterAnim}
                  initial="hidden"
                  animate="show"
                  className="text-[20vw] md:text-[clamp(8rem,15vw,16rem)] font-black tracking-tighter leading-none text-white"
                >
                  {char}
                </motion.h1>
              ))}
            </div>
            
            {/* DEV. - BURNING EFFECT with clamp */}
            <div className="flex overflow-hidden pb-4">
              {"DEV.".split("").map((char, i) => (
                <motion.h1
                  key={i}
                  custom={i + 5}
                  variants={letterAnim}
                  initial="hidden"
                  animate="show"
                  className="text-[20vw] md:text-[clamp(8rem,15vw,16rem)] font-black tracking-tighter leading-none burning-text"
                >
                  {char}
                </motion.h1>
              ))}
            </div>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-slate-400 text-sm md:text-2xl max-w-2xl mx-auto font-light mb-12 md:mb-16 leading-relaxed"
          >
            Converting <span className="text-white">Raw Logic</span> into 
            <span className="text-cyan-400 italic font-medium"> Digital Inferno</span>.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-10">
            <Magnetic strength={0.4}>
              <Link href="/#projects" className="group relative px-12 py-5 md:px-20 md:py-8 bg-white text-black rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]">
                <span className="relative z-10 font-black uppercase text-[10px] md:text-xs tracking-widest transition-colors duration-500 group-hover:text-white">
                  View Repository
                </span>
                <div className="absolute inset-0 bg-[#0a0a0a] translate-y-full group-hover:translate-y-0 transition-transform duration-600 ease-[0.16,1,0.3,1]" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .burning-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(34, 211, 238, 0.5);
          background: linear-gradient(
            to top,
            #22d3ee 0%,
            #0891b2 40%,
            #ef4444 70%,
            #b91c1c 100%
          );
          background-size: 100% 200%;
          -webkit-background-clip: text;
          animation: fire-movement 4s infinite alternate ease-in-out;
          filter: drop-shadow(0 0 15px rgba(34, 211, 238, 0.3));
        }

        @keyframes fire-movement {
          0% { background-position: 0% 0%; filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.4)); }
          100% { background-position: 0% 100%; filter: drop-shadow(0 -5px 20px rgba(239, 68, 68, 0.6)); }
        }

        @media (max-width: 768px) {
          .burning-text { -webkit-text-stroke: 0.5px rgba(255,255,255,0.5); }
        }
      `}</style>
    </section>
  );
}