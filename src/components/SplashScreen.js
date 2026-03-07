"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SplashScreen({ finishLoading }) {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);

    const timeout = setTimeout(() => finishLoading(), 3500);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [finishLoading]);

  const brand = "MANOJ".split("");

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      /* EXIT: Instead of sliding up, we use a clip-path to reveal from the center 
         and a scale-up to make it feel like we are zooming into the portfolio. */
      exit={{ 
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712] overflow-hidden"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
    >
      {/* Background Ambience */}
      <motion.div 
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 to-transparent"
      />

      <div className="relative flex flex-col items-center">
        {/* Designer Reveal with No Movement */}
        <div className="flex items-center justify-center mb-4">
          {brand.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ 
                delay: 0.2 + (i * 0.1), 
                duration: 0.8, 
                ease: "easeOut" 
              }}
              className="text-7xl md:text-9xl font-black text-white tracking-tighter"
            >
              {char}
            </motion.span>
          ))}
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-7xl md:text-9xl font-black text-indigo-500"
          >
            .
          </motion.span>
        </div>

        {/* Technical Subtext */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.2 }}
          className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.5em] mb-10"
        >
          Initializing Interface
        </motion.div>

        {/* Circular Loader */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <svg className="w-full h-full rotate-[-90deg]">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              strokeDasharray="175.93"
              initial={{ strokeDashoffset: 175.93 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="text-indigo-500"
            />
          </svg>
          <span className="absolute font-mono text-[10px] text-white">
            {percent}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}