"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";

const projects = [
  {
    title: "Aqua Pure",
    desc: "A responsive, modern frontend web application focusing on clean UI, fast performance, and a seamless user experience.",
    image: "/aquapure-screenshot.jpg", // Ensure this exists in public/
    tags: ["Next.js", "TailwindCSS", "UI/UX"],
    link: "https://aqua-tau-two.vercel.app/",
    github: "#"
  },
   {
    title: "civil-construction-booking",
    desc: "Developed a full-stack website featuring responsive UI, secure authentication, and efficient database management for seamless user interaction.",
    image: "/Screenshot 2026-03-08 214921.png", // Ensure this exists in public/
    tags: ["Next.js", "TailwindCSS","Full Stack Development", "Emailjs"],
    link: "https://civil-construction-booking.vercel.app//",
    github: "#"
  },
  {
    title: "Modern School",
    desc: "A high-fidelity School Management login interface providing secure and user-friendly access for students and teachers.",
    image: "/Screenshot 2026-03-05 150446.png", // Ensure this exists in public/
    tags: ["Figma", "Prototyping", "Auth UI"],
    link: "https://serif-gecko-87752902.figma.site",
    github: "#"
  }
];

// --- Ultimate 3D Project Card ---
function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Mouse coordinates for 3D Tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  // 2. Mouse coordinates for the "Follower" Button
  const followerX = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });
  const followerY = useSpring(useMotionValue(0), { damping: 20, stiffness: 150 });

  // Springs for 3D physics
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Deep Parallax Transforms
  const rotateX = useTransform(smoothY, [0, 1], ["8deg", "-8deg"]);
  const rotateY = useTransform(smoothX, [0, 1], ["-8deg", "8deg"]);
  const imageScale = useTransform(smoothX, [0, 1], [1.05, 1.15]); // Image breathes slightly
  
  // Lighting / Glare
  const glareX = useTransform(smoothX, [0, 1], ["-100%", "100%"]);
  const glareY = useTransform(smoothY, [0, 1], ["-100%", "100%"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized for tilt (0 to 1)
    mouseX.set(x / rect.width);
    mouseY.set(y / rect.height);

    // Exact pixels for follower button
    followerX.set(x);
    followerY.set(y);
  };

  const handleTouchMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    mouseX.set(x / rect.width);
    mouseY.set(y / rect.height);
  };

  const handleMouseEnter = () => setIsHovered(true);
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      // OFFSET GRID: Pushes every even item down on desktop for an editorial layout
      className={`relative w-full aspect-[4/5] md:aspect-auto md:h-[600px] rounded-[2rem] group cursor-none ${index % 2 !== 0 ? "md:mt-32" : ""}`}
    >
      {/* --- Floating "VIEW" Follower Button --- */}
      <motion.div 
        style={{ x: followerX, y: followerY, translateX: "-50%", translateY: "-50%", translateZ: "60px" }}
        animate={{ scale: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="absolute top-0 left-0 w-24 h-24 bg-cyan-400 text-[#0a0a0a] rounded-full flex items-center justify-center font-black text-sm tracking-widest pointer-events-none z-50 shadow-[0_0_30px_rgba(34,211,238,0.4)]"
      >
        VIEW <FiArrowUpRight className="ml-1 text-lg" />
      </motion.div>

      <a href={project.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-40" aria-label={`View ${project.title}`} />

      {/* --- Main Card Body --- */}
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-[#111] border border-white/5">
        
        {/* Parallax Image Background */}
        <motion.div 
          style={{ scale: imageScale, translateZ: "-30px" }} // Pushed back into the screen
          className="absolute inset-0 w-full h-full"
        >
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
          />
        </motion.div>

        {/* Dynamic Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Dynamic Glare Effect */}
        <motion.div 
          style={{ left: glareX, top: glareY }}
          className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none mix-blend-overlay"
        />

        {/* --- Content (Pushed Forward) --- */}
        <div 
          style={{ translateZ: "40px" }} // Pops out of the screen
          className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none"
        >
          {/* Top Info / Number */}
          <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
            <span className="text-5xl font-black text-transparent stroke-text-white opacity-30 group-hover:opacity-60 transition-opacity duration-500">
              0{index + 1}
            </span>
            
            {/* Interactive Links (Pointer events restored here) */}
            <div className="flex gap-4 pointer-events-auto">
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href={project.github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-indigo-400 hover:border-indigo-500/50 transition-colors">
                <FaGithub size={18} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1, y: -2 }} href={project.link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-white hover:text-cyan-400 hover:border-cyan-400/50 transition-colors">
                <FaExternalLinkAlt size={16} />
              </motion.a>
            </div>
          </div>

          {/* Title & Description */}
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
              {project.title}
            </h3>
            
            <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed max-w-md line-clamp-2 group-hover:line-clamp-none transition-all duration-500">
              {project.desc}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className="text-[10px] font-mono text-white bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-48 bg-[#0a0a0a] overflow-hidden">
      
      {/* Background Noise & Decor */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        
        {/* Editorial Section Header */}
        <div className="text-center md:text-left mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-6 justify-center md:justify-start"
            >
              <span>[04]</span>
              <div className="w-10 h-[1px] bg-cyan-400" />
              <span>The Portfolio</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white"
            >
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 italic font-light">Works.</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-slate-400 text-sm md:text-base max-w-xs font-light"
          >
            Showcasing high-fidelity UI/UX design integrated with modern full-stack performance.
          </motion.p>
        </div>

        {/* 3D Offset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
        
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
      `}} />
    </section>
  );
}