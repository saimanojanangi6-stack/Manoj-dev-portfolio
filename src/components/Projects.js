"use client";
import { useRef, useState, useMemo } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useScroll,
  useMotionTemplate 
} from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";

const projects = [
  {
    title: "Aqua Pure",
    desc: "A responsive, modern frontend web application focusing on clean UI, fast performance, and a seamless user experience.",
    image: "/aquapure-screenshot.jpg",
    tags: ["Next.js", "TailwindCSS", "UI/UX"],
    link: "https://aqua-tau-two.vercel.app/",
    color: "#22d3ee"
  },
  {
    title: "Doseas Admin",
    desc: "Medical management suite featuring secure authentication, patient tracking, and high-fidelity dashboard interfaces.",
    image: "/Screenshot 2026-03-08 214921.png",
    tags: ["Next.js", "Prisma", "Medical UI"],
    link: "https://civil-construction-booking.vercel.app//",
    color: "#818cf8"
  },
  {
    title: "Modern School",
    desc: "A high-fidelity School Management login interface providing secure and user-friendly access for students and teachers.",
    image: "/Screenshot 2026-03-05 150446.png",
    tags: ["Figma", "Prototyping", "Auth UI"],
    link: "https://serif-gecko-87752902.figma.site",
    color: "#f472b6"
  }
];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // --- Scroll Parallax Logic ---
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.3, 1, 1.3]);

  // --- Interaction Physics ---
  const mX = useMotionValue(0.5);
  const mY = useMotionValue(0.5);
  const springX = useSpring(mX, { damping: 30, stiffness: 150 });
  const springY = useSpring(mY, { damping: 30, stiffness: 150 });

  const rotateX = useTransform(springY, [0, 1], ["12deg", "-12deg"]);
  const rotateY = useTransform(springX, [0, 1], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    mX.set((e.clientX - rect.left) / rect.width);
    mY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mX.set(0.5);
        mY.set(0.5);
      }}
      // entrance animation with a "Glitch" feel
      initial={{ opacity: 0, scale: 0.9, y: 100 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full aspect-[4/5] md:h-[750px] rounded-[3.5rem] group cursor-none mb-24 md:mb-0 ${index % 2 !== 0 ? "md:mt-52" : ""}`}
    >
      {/* 1. MAGNETIC CURSOR OVERLAY */}
      <motion.div 
        animate={{ 
            scale: isHovered ? 1 : 0, 
            opacity: isHovered ? 1 : 0,
            rotate: isHovered ? 0 : -45 
        }}
        className="fixed top-0 left-0 w-32 h-32 bg-white rounded-full pointer-events-none z-[100] flex flex-col items-center justify-center mix-blend-difference"
        style={{ x: useSpring(useMotionValue(0), {stiffness: 1000}), y: useSpring(useMotionValue(0), {stiffness: 1000}), translateX: "-50%", translateY: "-50%" }}
      >
        <span className="text-black font-black text-[10px] tracking-[0.3em] uppercase">View</span>
        <FiArrowUpRight className="text-black text-2xl" />
      </motion.div>

      {/* 2. MAIN VISUAL WRAPPER */}
      <div className="absolute inset-0 rounded-[3.5rem] overflow-hidden bg-[#080808] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Parallax Image Content */}
        <motion.div 
          style={{ scale: imageScale, y: yParallax }} 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover grayscale group-hover:grayscale-0 contrast-[1.1] transition-all duration-1000" 
          />
          {/* Dynamic Color Flash */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundColor: project.color }} />
        </motion.div>

        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

        {/* 3. FLOATING CONTENT LAYER (3D) */}
        <div 
          style={{ transform: "translateZ(100px)" }}
          className="absolute inset-0 p-10 md:p-16 flex flex-col justify-end pointer-events-none"
        >
          {/* Index Stagger Reveal */}
          <motion.div 
            style={{ transform: "translateZ(50px)" }}
            className="absolute top-12 left-12 overflow-hidden"
          >
            <motion.span 
              animate={{ y: isHovered ? 0 : 100 }}
              className="block text-7xl md:text-9xl font-black text-white/10 leading-none"
            >
              0{index + 1}
            </motion.span>
          </motion.div>

          <div className="relative z-10">
            {/* Title Split Reveal */}
            <h3 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none group-hover:skew-x-[-4deg] transition-transform duration-500">
              {project.title}
            </h3>
            
            <p className="text-slate-400 text-sm md:text-xl font-light leading-relaxed max-w-sm mb-12 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
              {project.desc}
            </p>

            {/* Kinetic Pill Tags */}
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, i) => (
                <motion.span 
                  key={tag} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl text-[10px] font-mono text-white tracking-[0.2em] uppercase"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Full Card Interactive Overlay */}
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-50 cursor-none" />
      </div>

      {/* 4. UNDER-GLOW PHYSICS */}
      <motion.div 
        className="absolute inset-[-20px] -z-10 blur-[100px] rounded-[4rem] opacity-0 group-hover:opacity-40 transition-opacity duration-1000"
        style={{ backgroundColor: project.color }}
      />
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 md:py-64 bg-[#050505] overflow-hidden">
      
      {/* Dynamic Background Noise Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Editorial Header Architecture */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-16 mb-32 md:mb-56">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex items-center gap-6 text-cyan-400 font-mono text-[11px] tracking-[0.8em] uppercase mb-10"
            >
              <div className="w-16 h-px bg-cyan-900" />
              Selected_Folio_v4
            </motion.div>

            <h2 className="text-[clamp(3rem,12vw,8rem)] font-black text-white tracking-tighter leading-[0.8] mb-4">
              Building <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-500 italic font-light pr-6">
                Legacies.
              </span>
            </h2>
          </div>
          
          <div className="md:w-1/3 border-l border-white/10 pl-10">
             <p className="text-slate-500 text-lg md:text-2xl font-extralight leading-relaxed italic">
                “Turning complex <span className="text-white">back-end systems</span> into effortless <span className="text-white">front-end experiences</span>.”
             </p>
          </div>
        </div>

        {/* 3D Offset Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 md:gap-x-24 lg:gap-x-40 items-start">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
        
      </div>
    </section>
  );
}