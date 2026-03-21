"use client";
import { useRef, useEffect, useMemo } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate,
  useInView 
} from "framer-motion";
import { 
  HiOutlineMagnifyingGlass, 
  HiOutlinePencilSquare, 
  HiOutlineCodeBracket, 
  HiOutlineRocketLaunch 
} from "react-icons/hi2";

const steps = [
  {
    title: "Discovery",
    desc: "Market research and user needs for apps like 'Traden AI'.",
    icon: <HiOutlineMagnifyingGlass />,
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20"
  },
  {
    title: "UI/UX Design",
    desc: "High-fidelity Figma wireframes for medical apps like 'STAT Book'.",
    icon: <HiOutlinePencilSquare />,
    color: "from-indigo-500 to-purple-500",
    shadow: "shadow-indigo-500/20"
  },
  {
    title: "Development",
    desc: "Scalable front-ends with Next.js and robust Prisma back-ends.",
    icon: <HiOutlineCodeBracket />,
    color: "from-cyan-400 to-emerald-400",
    shadow: "shadow-cyan-500/20"
  },
  {
    title: "Deployment",
    desc: "Performance optimization and seamless Vercel launching.",
    icon: <HiOutlineRocketLaunch />,
    color: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/20"
  }
];

// --- 1. KINETIC MESH LAYER (VFX) ---
const KineticMesh = ({ mouseX, mouseY }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      <motion.div 
        className="absolute inset-[-10%]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          x: useTransform(mouseX, [0, 2000], [20, -20]),
          y: useTransform(mouseY, [0, 1000], [20, -20]),
        }}
      />
    </div>
  );
};

function ProcessCard({ step, index, onHoverSound }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  // Mouse Physics
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const springX = useSpring(mX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mY, { damping: 30, stiffness: 150 });

  // 3D Perspective Transforms
  const rotateX = useTransform(springY, [0, 400], [10, -10]);
  const rotateY = useTransform(springX, [0, 400], [-10, 10]);
  const glow = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, rgba(34, 211, 238, 0.15), transparent 80%)`;

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mX.set(e.clientX - rect.left);
    mY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHoverSound}
      initial={{ opacity: 0, y: 100, rotateX: 45, filter: "blur(20px)" }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.5, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full rounded-[2.5rem] p-[1px] group perspective-2000"
    >
      {/* Outer Border Glow */}
      <motion.div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: glow }} />

      <div className="relative h-full w-full bg-[#050505] backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-14 overflow-hidden z-10 flex flex-col justify-between border border-white/[0.08]">
        
        {/* Animated HUD Element */}
        <div className="absolute top-6 right-10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">Module_{index + 1}</span>
        </div>

        <div className="relative z-10" style={{ transform: "translateZ(60px)" }}>
          <div className="flex justify-between items-start mb-10">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)]`}
            >
              <div className="w-full h-full bg-[#050505] rounded-2xl flex items-center justify-center text-3xl text-white">
                {step.icon}
              </div>
            </motion.div>
          </div>

          <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-none group-hover:text-cyan-400 transition-colors duration-500">
            {step.title}
          </h3>
          
          <p className="text-base md:text-lg text-slate-500 font-light leading-relaxed max-w-[90%]">
            {step.desc}
          </p>
        </div>

        {/* Liquid Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            style={{ originX: 0 }}
            className={`h-full bg-gradient-to-r ${step.color}`} 
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef(null);
  const mX = useMotionValue(0);
  const mY = useMotionValue(0);
  const hoverSfx = useRef(null);

  useEffect(() => {
    hoverSfx.current = new Audio("/sounds/process-card-hover.mp3");
    if (hoverSfx.current) hoverSfx.current.volume = 0.2;
  }, []);

  const handleGlobalMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    mX.set(e.clientX - rect.left);
    mY.set(e.clientY - rect.top);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section 
      id="process" 
      ref={containerRef} 
      onMouseMove={handleGlobalMove}
      className="relative py-32 md:py-56 bg-[#020204] overflow-hidden"
    >
      <KineticMesh mouseX={mX} mouseY={mY} />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <div className="text-center mb-24 md:mb-48">
          <motion.div 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.6em" }}
            className="inline-flex items-center gap-4 text-[10px] font-mono text-cyan-500 uppercase mb-8"
          >
            <span>[02]</span>
            <div className="w-12 h-[1px] bg-cyan-500/30" />
            <span>Methodology</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            className="text-[clamp(2.5rem,9vw,6.5rem)] font-black text-white tracking-tighter leading-[0.85]"
          >
            Engineering <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 italic font-light pr-4">
              Excellence.
            </span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Central Liquid Timeline */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2">
            <motion.div 
              style={{ height: pathHeight }} 
              className="w-full bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-transparent shadow-[0_0_20px_#22d3ee]" 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-x-40 lg:gap-y-64 items-center">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`flex ${i % 2 === 0 ? "lg:justify-end" : "lg:justify-start lg:mt-64"} relative`}
              >
                {/* 3D Pulse Node */}
                <div className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 ${i % 2 === 0 ? "-right-[85px]" : "-left-[85px]"} z-20`}>
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="w-5 h-5 rounded-full bg-black border border-cyan-500 shadow-[0_0_15px_#22d3ee] flex items-center justify-center"
                  >
                    <div className="w-1 h-1 rounded-full bg-white animate-ping" />
                  </motion.div>
                </div>

                <div className="w-full lg:w-[100%]">
                  <ProcessCard step={step} index={i} onHoverSound={() => hoverSfx.current?.play()} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .perspective-2000 { perspective: 2000px; }
      `}} />
    </section>
  );
}