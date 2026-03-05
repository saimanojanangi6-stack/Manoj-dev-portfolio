"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-600/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 text-sm font-medium mb-6 inline-block">
            Available for new opportunities
          </span>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-6">
            Designing the <br />
            <span className="text-gradient">Future of Web.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            I'm a <span className="text-white font-medium">UI/UX Designer & Full Stack Developer</span> specializing in 
            building exceptional digital experiences that are fast, accessible, and visually stunning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Smooth Scroll Links */}
            <a 
              href="#projects" 
              className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-bold transition-all hover:translate-y-[-2px] shadow-lg shadow-indigo-500/20 text-center"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto px-10 py-4 border border-slate-700 hover:border-indigo-500 hover:bg-indigo-500/5 rounded-full font-bold transition-all text-center"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}