"use client";
import { useRef, useEffect, useMemo, useState } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate, 
  animate, 
  useInView,
  useTransform 
} from "framer-motion";
import { 
  SiFigma, SiFramer, SiReact, SiNextdotjs, 
  SiTailwindcss, SiTypescript, SiPrisma, SiNodedotjs
} from "react-icons/si";

const skills = [
  { 
    category: "Design", 
    items: [
      { name: "Figma", level: 95, icon: <SiFigma /> },
      { name: "Motion", level: 90, icon: <SiFramer /> },
      { name: "UI Arch", level: 85, icon: <SiFigma /> } 
    ],
    highlight: true,
    accent: "from-indigo-500 to-purple-500",
    glow: "rgba(99, 102, 241, 0.15)"
  },
  { 
    category: "Frontend", 
    items: [
      { name: "Next.js", level: 90, icon: <SiNextdotjs /> },
      { name: "React", level: 92, icon: <SiReact /> },
      { name: "Tailwind", level: 95, icon: <SiTailwindcss /> }
    ],
    highlight: false,
    accent: "from-cyan-400 to-blue-500",
    glow: "rgba(34, 211, 238, 0.12)"
  },
  { 
    category: "Backend", 
    items: [
      { name: "TypeScript", level: 85, icon: <SiTypescript /> },
      { name: "Node.js", level: 80, icon: <SiNodedotjs /> }, 
      { name: "Prisma", level: 82, icon: <SiPrisma /> }
    ],
    highlight: false,
    accent: "from-emerald-400 to-teal-500",
    glow: "rgba(16, 185, 129, 0.12)"
  },
];

// --- 1. VFX SHARD COMPONENT ---
const Shard = ({ data, mouseX, mouseY }) => {
  const x = useTransform(mouseX, (v) => (v - 1000) * data.speed);
  const y = useTransform(mouseY, (v) => (v - 500) * data.speed);
  return (
    <motion.div
      style={{
        left: `${data.x}%`, top: `${data.y}%`, width: data.size, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
        x, y,
      }}
      className="absolute"
    />
  );
};

const SkillShards = ({ mouseX, mouseY }) => {
  const shards = useMemo(() => Array.from({ length: 10 }).map((_, i) => ({
    id: i, size: Math.random() * 100 + 50, x: Math.random() * 100,
    y: Math.random() * 100, speed: Math.random() * 0.02 + 0.01
  })), []);
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      {shards.map((s) => <Shard key={s.id} data={s} mouseX={mouseX} mouseY={mouseY} />)}
    </div>
  );
};

// --- 2. HUD CIRCULAR DIAL ---
const CircularHUD = ({ level, icon, name, index, onHover }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = useMotionValue(circumference);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      animate(progress, circumference - (level / 100) * circumference, {
        duration: 2, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1]
      });
    }
  }, [isInView, level, circumference, progress, index]);

  return (
    <div onMouseEnter={onHover} className="flex flex-col items-center gap-2 group/item relative" ref={nodeRef}>
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full rotate-[-90deg]">
          <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="transparent" />
          <motion.circle
            cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="3"
            strokeLinecap="round" fill="transparent" strokeDasharray={circumference}
            style={{ strokeDashoffset: progress }} className="text-cyan-400"
          />
        </svg>
        <div className="text-lg sm:text-xl md:text-2xl text-white/50 group-hover/item:text-white transition-all duration-500 group-hover/item:scale-110">
          {icon}
        </div>
      </div>
      <div className="text-center">
        <div className="text-[8px] sm:text-[10px] font-mono text-white/30 uppercase tracking-tighter group-hover/item:text-cyan-400 transition-colors truncate max-w-[60px] sm:max-w-none">{name}</div>
        <div className="text-[8px] font-mono text-white/10">{level}%</div>
      </div>
    </div>
  );
};

// --- 3. MASTER SKILL CARD ---
function SkillCard({ skill, index, onIconHover }) {
  const cardRef = useRef(null);
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const springX = useSpring(mX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mY, { damping: 30, stiffness: 150 });
  const rotateX = useTransform(springY, [0, 400], [8, -8]);
  const rotateY = useTransform(springX, [0, 400], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mX.set(e.clientX - rect.left);
    mY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef} onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 60, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full group perspective-1000"
    >
      <div className="relative h-full w-full bg-[#050505]/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 border border-white/5 overflow-hidden transition-colors duration-500 group-hover:border-white/10 shadow-2xl">
        <motion.div 
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, ${skill.glow}, transparent 80%)` }}
        />
        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${skill.accent} animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]`} />
            <h3 className="text-lg md:text-2xl font-black text-white uppercase tracking-widest">{skill.category}</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {skill.items.map((item, i) => (
              <CircularHUD key={i} index={i} name={item.name} level={item.level} icon={item.icon} onHover={onIconHover} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // --- AUDIO ENGINE ---
  const hoverSfx = useRef(null);
  const revealSfx = useRef(null);

  useEffect(() => {
    // 1. Initialize Audio files
    hoverSfx.current = new Audio("/sounds/skills-hover.mp3");
    revealSfx.current = new Audio("/sounds/skills-reveal.mp3");

    if (hoverSfx.current) hoverSfx.current.volume = 0.4;
    if (revealSfx.current) revealSfx.current.volume = 0.6;

    // 2. Browser Audio Unlock Hack
    const unlockAudio = () => {
        if (hoverSfx.current) {
            hoverSfx.current.play().then(() => {
                hoverSfx.current.pause();
                hoverSfx.current.currentTime = 0;
            }).catch(() => {});
        }
        window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);

    return () => window.removeEventListener('click', unlockAudio);
  }, []);

  // 3. Trigger Reveal Sound when scrolled into view
  useEffect(() => {
    if (isInView && revealSfx.current) {
        revealSfx.current.play().catch(() => console.log("Audio waiting for user interaction"));
    }
  }, [isInView]);

  const handleGlobalMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const playHover = () => {
    if (hoverSfx.current) {
        hoverSfx.current.currentTime = 0;
        hoverSfx.current.play().catch(() => {});
    }
  };

  return (
    <section 
      ref={sectionRef} id="skills" onMouseMove={handleGlobalMove}
      className="py-16 md:py-40 bg-[#020204] relative overflow-hidden"
    >
      <SkillShards mouseX={mouseX} mouseY={mouseY} />
      
      <div className="container mx-auto px-5 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-16 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 text-[9px] md:text-[10px] font-mono text-cyan-400 uppercase mb-6"
          >
            <span>[03]</span>
            <div className="w-10 h-px bg-cyan-400/30" />
            <span>Capability Deck</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            className="text-[clamp(2.2rem,10vw,7rem)] font-black text-white tracking-tighter leading-[0.85]"
          >
            Technical <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 italic font-light pr-4">
              Ecosystem.
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} onIconHover={playHover} />
          ))}
        </div>
      </div>
    </section>
  );
}