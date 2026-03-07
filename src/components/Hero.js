"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Magnetic from "./Magnetic";

export default function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for UI/UX Projects
          </motion.div>
          
          <motion.h1 variants={item} className="text-5xl md:text-8xl font-black tracking-tight mb-6 leading-[1.1]">
            MANOJ <span className="text-gradient">DEV.</span> <br />
            <span className="text-2xl md:text-5xl font-light text-slate-400 block mt-2">
              Designing <span className="text-white font-semibold italic">User Experiences</span>
            </span>
          </motion.h1>
          
          <motion.p variants={item} className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Expert in <span className="text-white font-medium">UI/UX Design</span> and <span className="text-white font-medium">Full Stack Development</span>. 
            I bridge the gap between human-centered design and high-performance code.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Magnetic>
              <Link href="/#projects" className="block w-full sm:w-auto px-12 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-bold transition-all shadow-xl shadow-indigo-500/20 text-center">
                View My Work
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/contact" className="block w-full sm:w-auto px-12 py-4 glass-card hover:bg-white/5 rounded-full font-bold transition-all text-center">
                Hire Me
              </Link>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}