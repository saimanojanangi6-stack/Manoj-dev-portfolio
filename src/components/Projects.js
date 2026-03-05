"use client";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image"; // Import the Next.js Image component

const projects = [
  {
    title: "Aqua pure",
    desc: "Developed a responsive and modern frontend web application using Next.js, focusing on clean UI, fast performance, and seamless user experience.",
    image: "/aquapure-screenshot.jpg", // Ensure this image is in your /public folder
    tags: ["Next.js", "Responsive Design", "TailwindCSS"],
    link: "https://aqua-tau-two.vercel.app/",
    github: "#"
  },
  {
    title: "Modern School Management Login",
    desc: "Designed a modern and responsive School Management System login interface that provides secure and user-friendly access for students, teachers, and administrators..",
    image: "/Screenshot 2026-03-05 150446.png", // Add an image path for this project too
    tags: ["Figma", "UI/UX Design", "Login Interface"],
    link: "https://serif-gecko-87752902.figma.site",
    github: "#"
  }
  
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 container mx-auto px-6">
      <h2 className="text-4xl font-bold mb-12">Featured <span className="text-gradient">Projects</span></h2>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -10 }}
            className="glass-card rounded-3xl overflow-hidden group"
          >
            {/* Project Image Section */}
            <div className="h-64 relative overflow-hidden bg-slate-800">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                /* Fallback if image path is missing */
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 group-hover:scale-110 transition-transform duration-500" />
              )}
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <div className="flex gap-4 text-xl">
                  <a href={project.github} className="hover:text-indigo-400" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                  <a href={project.link} className="hover:text-cyan-400" target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
              <p className="text-slate-400 mb-6">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}