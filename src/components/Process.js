"use client";
import { motion } from "framer-motion";
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
    color: "text-blue-400",
    glow: "shadow-blue-500/10"
  },
  {
    title: "UI/UX Design",
    desc: "High-fidelity Figma wireframes for medical apps like 'STAT Book'.",
    icon: <HiOutlinePencilSquare />,
    color: "text-indigo-400",
    glow: "shadow-indigo-500/10"
  },
  {
    title: "Development",
    desc: "Scalable front-ends with Next.js and robust Prisma back-ends.",
    icon: <HiOutlineCodeBracket />,
    color: "text-cyan-400",
    glow: "shadow-cyan-500/10"
  },
  {
    title: "Deployment",
    desc: "Performance optimization and seamless Vercel launching.",
    icon: <HiOutlineRocketLaunch />,
    color: "text-emerald-400",
    glow: "shadow-emerald-500/10"
  }
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each card starts 0.2s after the previous one
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function Process() {
  return (
    <section id="about" className="py-8 md:py-24 container mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          My <span className="text-gradient">Process</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base px-4">
          How I turn complex ideas into intuitive digital experiences.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8"
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className={`glass-card p-6 md:p-8 rounded-[2rem] relative overflow-hidden group border-t-2 border-t-slate-800 hover:border-t-indigo-500 transition-all duration-300 shadow-xl ${step.glow}`}
          >
            {/* Animated Icon */}
            <motion.div 
              whileHover={{ rotate: 10, scale: 1.1 }}
              className={`text-3xl md:text-4xl mb-4 md:mb-6 ${step.color} transition-transform duration-500`}
            >
              {step.icon}
            </motion.div>
            
            <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">
              {step.title}
            </h3>
            
            <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
              {step.desc}
            </p>
            
            {/* Visual Step Number (Designer Detail) */}
            <span className="absolute top-4 right-6 text-4xl font-black text-white/5 group-hover:text-white/10 transition-colors">
              0{i + 1}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}