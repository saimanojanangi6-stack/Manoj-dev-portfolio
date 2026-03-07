"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ finishLoading }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // 1. Progress Counter Logic (Designer Detail)
    const interval = setInterval(() => {
      setCounter((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);

    const timeout = setTimeout(() => finishLoading(), 3000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [finishLoading]);

  const letters = "MANOJ".split("");

  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }} // "Liquid" lift-off effect
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A] overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        
        {/* 2. Staggered Letter Reveal */}
        <div className="flex overflow-hidden mb-4">
          {letters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ 
                delay: 0.1 * i, 
                duration: 0.8, 
                ease: [0.33, 1, 0.68, 1] 
              }}
              className="text-6xl md:text-9xl font-black text-white tracking-tighter"
            >
              {char}
            </motion.span>
          ))}
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-6xl md:text-9xl font-black text-indigo-500"
          >
            .
          </motion.span>
        </div>

        {/* 3. Loading Progress Bar & Percentage */}
        <div className="w-48 md:w-64 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-indigo-500"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 font-mono text-xs text-indigo-400 tracking-[0.3em] uppercase"
        >
          Initializing Portfolio {counter}%
        </motion.div>

        {/* 4. Background Pulse (Subtle UI/UX touch) */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -z-10 w-[400px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full"
        />
      </div>
    </motion.div>
  );
}