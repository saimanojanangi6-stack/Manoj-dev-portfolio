"use client";
import { motion } from "framer-motion";
import { 
  SiFigma, 
  SiFramer, 
  SiReact, 
  SiNextdotjs, 
  SiTailwindcss,
  SiTypescript,
  SiPrisma,
  SiNodedotjs
} from "react-icons/si";

const skills = [
  { 
    category: "UI/UX Design", 
    items: [
      { name: "Figma", level: 95, icon: <SiFigma /> },
      { name: "Prototyping", level: 90, icon: <SiFramer /> },
      { name: "User Experience", level: 85, icon: <SiFigma /> } 
    ],
    highlight: true 
  },
  { 
    category: "Frontend", 
    items: [
      { name: "React", level: 90, icon: <SiReact /> },
      { name: "Next.js", level: 88, icon: <SiNextdotjs /> },
      { name: "Tailwind", level: 95, icon: <SiTailwindcss /> }
    ] 
  },
  { 
    category: "Full Stack & Tools", 
    items: [
      { name: "TypeScript", level: 85, icon: <SiTypescript /> },
      { name: "Prisma", level: 80, icon: <SiPrisma /> }, 
      { name: "Node.js", level: 80, icon: <SiNodedotjs /> }
    ] 
  },
];

// Parent container variants for staggered children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, rotateX: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    rotateX: 0,
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

export default function Skills() {
  return (
    <section id="skills" className="py-12 md:py-24 container mx-auto px-6 overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Technical <span className="text-gradient">Expertise</span>
        </motion.h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
          Bridging the gap between high-fidelity design and scalable full-stack code.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid lg:grid-cols-3 gap-8 items-start perspective-1000"
      >
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            variants={cardVariants}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)" 
            }}
            className={`glass-card p-8 rounded-[2.5rem] border-t-2 transition-all duration-500 relative group ${
              skill.highlight 
                ? "border-t-indigo-500 shadow-2xl shadow-indigo-500/10 lg:scale-105 z-10" 
                : "border-t-slate-800"
            }`}
          >
            {/* Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className={`text-2xl font-bold ${skill.highlight ? "text-white" : "text-slate-300"}`}>
                {skill.category}
              </h3>
              {skill.highlight && (
                <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-500/20"
                >
                  Specialized
                </motion.span>
              )}
            </div>

            <div className="space-y-6 relative z-10">
              {skill.items.map((item, i) => (
                <div key={i} className="group/item">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <motion.span 
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        className="text-xl text-slate-400 group-hover/item:text-cyan-400 transition-colors"
                      >
                        {item.icon}
                      </motion.span>
                      <span className="text-sm font-medium text-slate-200">{item.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{item.level}%</span>
                  </div>
                  
                  {/* Progress Bar with Staggered Fill */}
                  <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ 
                        duration: 1.5, 
                        delay: 0.5 + (i * 0.1),
                        ease: [0.34, 1.56, 0.64, 1] // Bouncy easing
                      }}
                      className={`h-full rounded-full ${
                        skill.highlight 
                          ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" 
                          : "bg-slate-600"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}