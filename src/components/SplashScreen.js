"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SplashScreen({ finishLoading }) {
  useEffect(() => {
    const timeout = setTimeout(() => finishLoading(), 2500); // Duration of splash
    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A]">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Logo Animation */}
        <motion.div
          initial={{ strokeDasharray: "0 100" }}
          animate={{ strokeDasharray: "100 0" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-white"
        >
          DEV<span className="text-indigo-500">.</span>
        </motion.div>

        {/* Decorative Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 border-2 border-dashed border-indigo-500/30 rounded-full"
        />
      </motion.div>
    </div>
  );
}