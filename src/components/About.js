"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  // Animation variants for the container to stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  // Animation for individual lines/blocks of text
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] } 
    },
  };

  return (
    <section id="about" className="py-12 md:py-24 container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* 1. Image Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative group w-64 h-64 md:w-80 md:h-80"
        >
          <div className="absolute -inset-4 border border-indigo-500/20 rounded-[3rem] animate-[spin_10s_linear_infinite]" />
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-2 border-white/10 glass-card">
            <Image 
              src="/manoj.jpg" 
              alt="Manoj"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
          </div>
        </motion.div>

        {/* 2. Self/Bio Section with Staggered Text */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex-1 text-center md:text-left"
        >
          {/* Animated Headline */}
          <div className="overflow-hidden mb-6">
            <motion.h2 
              variants={textVariants}
              className="text-4xl md:text-5xl font-bold"
            >
              Designing with <span className="text-gradient">Purpose.</span>
            </motion.h2>
          </div>
          
          <div className="space-y-4 text-slate-400 text-base md:text-lg leading-relaxed">
            <div className="overflow-hidden">
              <motion.p variants={textVariants}>
                Hi, I'm <span className="text-white font-semibold">Manoj</span>, a UI/UX Designer and Full Stack Developer dedicated to crafting seamless digital experiences.
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.p variants={textVariants}>
                With expertise in <span className="text-indigo-400">Figma</span> and <span className="text-cyan-400">Next.js</span>, I specialize in transforming complex requirements into intuitive, high-performance interfaces.
              </motion.p>
            </div>

            <div className="overflow-hidden">
              <motion.p 
                variants={textVariants}
                className="text-sm border-l-2 border-indigo-500 pl-4 italic"
              >
                "I don't just build websites; I solve user problems through strategic design and clean code."
              </motion.p>
            </div>
          </div>

          {/* Staggered Badges */}
          <motion.div 
            className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"
          >
            <motion.div variants={textVariants} className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-mono">
              📍 Based in AP, India
            </motion.div>
            <motion.div variants={textVariants} className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-xs font-mono">
              🚀 10+ Projects Delivered
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}