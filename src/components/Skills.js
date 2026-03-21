"use client";
import { useRef, useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate, 
  animate, 
  useInView 
} from "framer-motion";
import { 
  SiFigma, SiFramer, SiReact, SiNextdotjs, 
  SiTailwindcss, SiTypescript, SiPrisma, SiNodedotjs
} from "react-icons/si";

const skills = [
  { 
    category: "UI/UX Design", 
    items: [
      { name: "Figma", level: 95, icon: <SiFigma /> },
      { name: "Prototyping", level: 90, icon: <SiFramer /> },
      { name: "UX Research", level: 85, icon: <SiFigma /> } 
    ],
    highlight: true,
    glow: "shadow-indigo-500/20",
    border: "border-indigo-500/50"
  },
  { 
    category: "Frontend", 
    items: [
      { name: "React", level: 90, icon: <SiReact /> },
      { name: "Next.js", level: 88, icon: <SiNextdotjs /> },
      { name: "Tailwind", level: 95, icon: <SiTailwindcss /> }
    ],
    highlight: false,
    glow: "shadow-cyan-500/10",
    border: "border-slate-800"
  },
  { 
    category: "Full Stack", 
    items: [
      { name: "TypeScript", level: 85, icon: <SiTypescript /> },
      { name: "Prisma", level: 80, icon: <SiPrisma /> }, 
      { name: "Node.js", level: 80, icon: <SiNodedotjs /> }
    ],
    highlight: false,
    glow: "shadow-emerald-500/10",
    border: "border-slate-800"
  },
];

// --- 1. Dynamic Animated Counter ---
function AnimatedCounter({ from, to, delay }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], 
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value) + "%";
          }
        },
      });
      return () => controls.stop();
    }
  }, [from, to, delay, inView]);

  return <span ref={nodeRef} className="font-mono text-[10px] md:text-xs text-slate-500 tracking-wider" />;
}

// --- 2. Responsive HUD Dial Component ---
const CircularHUD = ({ level, icon, name, isHighlighted, index, onHover }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius; 
  const delay = 0.3 + (index * 0.15);

  return (
    <div 
      onMouseEnter={onHover}
      className="flex flex-col items-center gap-3 md:gap-4 group/item relative z-20 w-full" 
      style={{ transform: "translateZ(40px)" }}
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 rounded-full border border-dashed ${isHighlighted ? "border-indigo-500/30" : "border-white/10"}`}
        />

        <svg viewBox="0 0 100 100" className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] rotate-[-90deg] drop-shadow-2xl">
          <circle cx="50" cy="50" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
          <motion.circle
            cx="50" cy="50" r={radius}
            stroke={`url(#gradient-${name.replace(/\s+/g, '')})`}
            strokeWidth="6"
            strokeLinecap="round"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference - (level / 100) * circumference }}
            transition={{ duration: 2, delay: delay, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ filter: isHighlighted ? "drop-shadow(0 0 4px rgba(99,102,241,0.5))" : "none" }}
          />
          <defs>
            <linearGradient id={`gradient-${name.replace(/\s+/g, '')}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isHighlighted ? "#818cf8" : "#06b6d4"} />
              <stop offset="100%" stopColor={isHighlighted ? "#2dd4bf" : "#3b82f6"} />
            </linearGradient>
          </defs>
        </svg>
        
        <motion.div 
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
          whileHover={{ rotate: 360, scale: 1.2, y: 0, transition: { duration: 0.5 } }}
          className={`text-lg sm:text-xl md:text-2xl z-10 ${isHighlighted ? "text-indigo-400" : "text-slate-400 group-hover/item:text-cyan-400"} transition-colors`}
        >
          {icon}
        </motion.div>
      </div>
      
      <div className="text-center w-full">
        <div className="text-[10px] sm:text-xs md:text-sm font-bold text-slate-200 group-hover/item:text-white transition-colors tracking-wide truncate px-1">
          {name}
        </div>
        <AnimatedCounter from={0} to={level} delay={delay} />
      </div>
    </div>
  );
};

// --- 3. 3D Spotlight Card ---
function SkillCard({ skill, index, onIconHover }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltX = useSpring(useMotionValue(0), { damping: 20, stiffness: 100 });
  const tiltY = useSpring(useMotionValue(0), { damping: 20, stiffness: 100 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    tiltX.set(((e.clientY - rect.top) / rect.height - 0.5) * -10);
    tiltY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
  };

  const handleReset = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleReset}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
      className={`relative w-full rounded-[2.5rem] p-[1px] group perspective-1000 touch-pan-y ${skill.highlight ? "z-20 lg:scale-105" : "z-10"}`}
    >
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${skill.highlight ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.3)"}, transparent 40%)`,
        }}
      />

      <div className={`relative h-full w-full bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-[2.5rem] p-6 md:p-10 z-10 border-t-2 ${skill.border} shadow-2xl ${skill.glow}`}>
        <div className="flex justify-between items-center mb-10 md:mb-12" style={{ transform: "translateZ(20px)" }}>
          <h3 className={`text-xl md:text-2xl font-black tracking-tight ${skill.highlight ? "text-white" : "text-slate-300"}`}>
            {skill.category}
          </h3>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 place-items-center w-full">
          {skill.items.map((item, i) => (
            <CircularHUD 
              key={i} index={i} name={item.name} level={item.level} icon={item.icon} isHighlighted={skill.highlight} 
              onHover={onIconHover}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  // Audio Refs
  const revealSfx = useRef(null);
  const hoverSfx = useRef(null);

  useEffect(() => {
    // Initialize SFX
    revealSfx.current = new Audio("/sounds/skills-reveal.mp3");
    hoverSfx.current = new Audio("/sounds/skills-hover.mp3");

    if (revealSfx.current) revealSfx.current.volume = 0.5;
    if (hoverSfx.current) hoverSfx.current.volume = 0.3;

    // Play reveal sound when section is scrolled into view
    if (isInView && revealSfx.current) {
      revealSfx.current.play().catch(() => {});
    }
  }, [isInView]);

  const playHoverSound = () => {
    if (hoverSfx.current) {
      hoverSfx.current.currentTime = 0;
      hoverSfx.current.play().catch(() => {});
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="py-24 md:py-40 bg-[#0a0a0a] relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 text-[10px] font-mono text-indigo-400 uppercase tracking-[0.3em] mb-6"
          >
            <span>[03]</span>
            <div className="w-10 h-[1px] bg-indigo-400" />
            <span>The Arsenal</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white"
          >
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-light">Ecosystem.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} index={index} onIconHover={playHoverSound} />
          ))}
        </div>
      </div>
    </section>
  );
}