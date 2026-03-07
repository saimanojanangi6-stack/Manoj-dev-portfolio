"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

const projects = [
  {
    title: "Aqua pure",
    desc: "Developed a responsive and modern frontend web application using Next.js, focusing on clean UI, fast performance, and seamless user experience.",
    image: "/aquapure-screenshot.jpg",
    tags: ["Next.js", "Responsive Design", "TailwindCSS"],
    link: "https://aqua-tau-two.vercel.app/",
    github: "#"
  },
  {
    title: "Modern School Login",
    desc: "Designed a responsive School Management login interface providing secure and user-friendly access for students and teachers.",
    image: "/Screenshot 2026-03-05 150446.png",
    tags: ["Figma", "UI/UX Design", "Login Interface"],
    link: "https://serif-gecko-87752902.figma.site",
    github: "#"
  }
];

// 1. Animation Variants for the staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time between each card appearing
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } // Custom quint ease-out
  },
};

function ProjectCard({ project }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // 3D Rotation based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Internal Parallax (Layering effect)
  const imageZ = useTransform(mouseXSpring, [-0.5, 0.5], ["25px", "-25px"]);
  const titleZ = useTransform(mouseYSpring, [-0.5, 0.5], ["-35px", "35px"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX / rect.width - 0.5);
    y.set(e.clientY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="glass-card rounded-[2.5rem] overflow-hidden group relative hover:border-indigo-500/40 transition-colors duration-500"
    >
      {/* Background Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] -z-10" />

      {/* Image Container */}
      <motion.div 
        className="h-64 relative overflow-hidden bg-slate-800"
        style={{ translateZ: imageZ }}
      >
        <Image 
          src={project.image} 
          alt={project.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110" 
        />
      </motion.div>

      {/* Content Container */}
      <motion.div 
        className="p-8" 
        style={{ translateZ: titleZ }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-4 text-xl">
            <motion.a 
              whileHover={{ scale: 1.2, y: -2 }} 
              href={project.github} 
              className="hover:text-indigo-400 text-slate-500" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.2, y: -2 }} 
              href={project.link} 
              className="hover:text-cyan-400 text-slate-500" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FaExternalLinkAlt />
            </motion.a>
          </div>
        </div>
        
        <p className="text-slate-400 mb-6 text-sm leading-relaxed">
          {project.desc}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span 
              key={tag} 
              className="text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20 uppercase tracking-widest font-bold"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-12 md:py-24 container mx-auto px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Showcasing high-fidelity UI/UX design integrated with modern full-stack performance.
        </p>
      </motion.div>

      {/* Parent Grid with Viewport Trigger */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
      >
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </motion.div>
    </section>
  );
}