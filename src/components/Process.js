"use client";
import { useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring, 
  useMotionTemplate 
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

// --- Ultimate Spotlight & 3D Card Component ---
function ProcessCard({ step, index }) {
  const cardRef = useRef(null);
  
  // Spotlight coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt physics
  const tiltX = useSpring(useMotionValue(0), { damping: 20, stiffness: 100 });
  const tiltY = useSpring(useMotionValue(0), { damping: 20, stiffness: 100 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update Spotlight
    mouseX.set(x);
    mouseY.set(y);

    // Update 3D Tilt
    const rotateX = ((y / rect.height) - 0.5) * -15; // Max 15 deg
    const rotateY = ((x / rect.width) - 0.5) * 15;
    tiltX.set(rotateX);
    tiltY.set(rotateY);
  };

  const handleMouseLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Mobile touch equivalent
  const handleTouchMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
    tiltX.set(((y / rect.height) - 0.5) * -15);
    tiltY.set(((x / rect.width) - 0.5) * 15);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
      className={`relative w-full rounded-[2rem] p-[1px] group perspective-1000 ${step.shadow} hover:shadow-2xl transition-shadow duration-500 z-10`}
    >
      {/* 1. Mouse-Tracking Glowing Border */}
      <motion.div
        className="absolute inset-0 rounded-[2rem] z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`
            radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.4), transparent 40%)
          `,
        }}
      />
      
      {/* 2. Main Glass Card Body */}
      <div className="relative h-full w-full bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 overflow-hidden z-10 flex flex-col justify-between border border-white/5">
        
        {/* Mouse-Tracking Inner Glow */}
        <motion.div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: useMotionTemplate`
              radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.03), transparent 40%)
            `,
          }}
        />

        {/* 3. Massive Background Number */}
        <div 
          className="absolute -right-6 -bottom-10 text-[12rem] md:text-[14rem] font-black z-0 pointer-events-none select-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ transform: "translateZ(10px)" }}
        >
          <span className="text-transparent stroke-text-white">0{index + 1}</span>
        </div>

        {/* 4. Card Content */}
        <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start mb-8">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] flex items-center justify-center`}
            >
              <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center text-3xl text-white">
                {step.icon}
              </div>
            </motion.div>
            <span className={`text-[10px] font-mono tracking-widest uppercase bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
              Phase 0{index + 1}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
            {step.title}
          </h3>
          
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-[85%]">
            {step.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef(null);
  
  // --- Dynamic Central Timeline Scroll Logic ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Premium Film Grain Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Massive Background Typography */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none flex justify-center opacity-[0.02] z-0 select-none">
        <h2 className="text-[20vw] font-black text-transparent stroke-text-white whitespace-nowrap leading-none mt-20">
          METHODOLOGY
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-6"
          >
            <span>[02]</span>
            <div className="w-10 h-[1px] bg-cyan-400" />
            <span>The Blueprint</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 italic font-light pr-2">Excellence.</span>
          </motion.h2>
        </div>

        {/* --- The Zig-Zag Spatial Grid --- */}
        <div className="relative">
          
          {/* Animated Central Timeline Line (Desktop Only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2">
            <motion.div 
              style={{ height: pathHeight }}
              className="w-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-24 md:gap-y-32">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`flex ${i % 2 === 0 ? "md:justify-end" : "md:justify-start md:mt-32"} relative`}
              >
                {/* Timeline Nodes (Desktop Only) */}
                <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${i % 2 === 0 ? "-right-12 translate-x-1/2" : "-left-12 -translate-x-1/2"} w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-slate-700 items-center justify-center z-20 transition-colors duration-500 group-hover:border-cyan-400`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-cyan-400 transition-colors duration-500" />
                </div>

                <div className="w-full xl:w-[90%]">
                  <ProcessCard step={step} index={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.05);
        }
      `}} />
    </section>
  );
}