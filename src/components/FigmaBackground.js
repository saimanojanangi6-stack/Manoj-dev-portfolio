"use client";
import { motion } from "framer-motion";
import { SiFigma } from "react-icons/hi5"; // Install react-icons if not already done

export default function FigmaBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none opacity-20">
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[15%] right-[5%] text-[30rem] text-indigo-500/10 blur-sm"
      >
        <SiFigma />
      </motion.div>
    </div>
  );
}