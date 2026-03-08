"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";

const experiences = [
  {
    year: "2024 - Present",
    role: "Full Stack Engineer & UI/UX Designer",
    company: "Independent / Freelance",
    desc: "Architecting high-performance digital products, including 'Doseas' for the medical field and algorithmic prediction platforms like 'Traden AI' and 'Twillar'. Merging pixel-perfect Figma prototypes with scalable Next.js infrastructure.",
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-500/20"
  },
  {
    year: "2022 - 2024",
    role: "Lead Frontend Developer",
    company: "Creative Agency",
    desc: "Spearheaded the transition from legacy codebases to modern React/Next.js architectures. Engineered reusable component libraries and optimized Web Vitals for enterprise clients.",
    color: "from-indigo-500 to-purple-500",
    shadow: "shadow-indigo-500/20"
  },
  {
    year: "2021 - 2022",
    role: "Product Designer",
    company: "Tech Startup",
    desc: "Designed end-to-end user experiences. Conducted UX research, built interactive prototypes, and handed off high-fidelity design systems to engineering teams.",
    color: "from-emerald-400 to-cyan-500",
    shadow: "shadow-emerald-500/20"
  }
];

function TimelineCard({ exp, index }) {
  // 3D Hover Physics
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(y, [-50, 50], ["5deg", "-5deg"]);
  const rotateY = useTransform(x, [-50, 50], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Check if it's an even or odd index for left/right placement on desktop
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full ${isEven ? "" : "md:flex-row"}`}>
      
      {/* --- Desktop Timeline Node --- */}
      <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0a0a0a] bg-slate-800 z-20 absolute left-1/2 -translate-x-1/2 group-hover:bg-cyan-400 transition-colors duration-500 shadow-[0_0_0_2px_rgba(255,255,255,0.05)]">
        <div className="w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform duration-500" />
      </div>

      {/* --- Mobile Timeline Node --- */}
      <div className="md:hidden absolute left-0 w-4 h-4 rounded-full border-2 border-[#0a0a0a] bg-slate-800 z-20 group-hover:bg-cyan-400 transition-colors duration-500" />

      {/* --- Empty Space for Alternating Grid --- */}
      <div className="hidden md:block w-5/12" />

      {/* --- The Card --- */}
      <motion.div 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pl-8 md:pl-0 md:w-5/12 perspective-1000"
      >
        <div 
          className="relative p-[1px] rounded-[2rem] overflow-hidden bg-gradient-to-b from-white/10 to-transparent"
        >
          {/* Animated Gradient Border Hover */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative h-full w-full bg-[#111]/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-white/5 flex flex-col justify-center">
            
            {/* Ambient Background Glow */}
            <div className={`absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br ${exp.color} rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />

            {/* Content pushed into 3D space */}
            <div style={{ transform: "translateZ(30px)" }}>
              <span className={`inline-block px-3 py-1 mb-6 text-[10px] font-mono tracking-widest uppercase rounded-full border border-white/10 bg-white/5 text-slate-300`}>
                {exp.year}
              </span>
              
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                {exp.role}
              </h3>
              
              <p className="text-cyan-400 font-mono text-sm mb-6 uppercase tracking-wider">
                {exp.company}
              </p>
              
              <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed">
                {exp.desc}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default function Experience() {
  const containerRef = useRef(null);

  // --- Dynamic Scroll Laser Logic ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const laserHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Premium Film Grain Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Massive Background Watermark */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none flex justify-center opacity-[0.02] z-0 select-none">
        <h2 className="text-[20vw] font-black text-transparent stroke-text-white whitespace-nowrap leading-none mt-20">
          HISTORY
        </h2>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Editorial Section Header */}
        <div className="text-center mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-6"
          >
            <span>[05]</span>
            <div className="w-10 h-[1px] bg-cyan-400" />
            <span>The Journey</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter"
          >
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 italic font-light pr-2">Evolution.</span>
          </motion.h2>
        </div>

        {/* --- The Central Laser Timeline --- */}
        <div className="relative">
          
          {/* Background Track */}
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Laser Fill */}
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 flex justify-center">
            <motion.div 
              style={{ height: laserHeight }}
              className="w-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)] rounded-full"
            />
          </div>

          {/* Experience Cards */}
          <div className="flex flex-col gap-12 md:gap-24 relative z-10">
            {experiences.map((exp, index) => (
              <TimelineCard key={index} exp={exp} index={index} />
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