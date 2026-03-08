"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { SiFigma } from "react-icons/si"; // Corrected Import

export default function FigmaBackground() {
  // --- Scroll Parallax Engine ---
  // The logo will physically sink and rotate as the user scrolls down the page
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 250]);
  const parallaxRotate = useTransform(scrollY, [0, 1000], [0, 20]);

  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none flex items-center justify-center select-none">
      
      {/* Outer Wrapper handles the physical scroll Parallax */}
      <motion.div
        style={{ y: parallaxY, rotate: parallaxRotate }}
        className="absolute top-0 -right-[40%] md:-right-[10%]"
      >
        
        {/* Inner Wrapper handles the infinite organic floating */}
        <motion.div
          animate={{ 
            y: [0, -50, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 18, // Slowed down for a more massive, premium feel
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          // Premium blend mode: Looks like a watermark etched into the dark background
          className="text-[50rem] md:text-[70rem] text-white opacity-[0.03] mix-blend-overlay blur-[2px]"
        >
          <SiFigma />
        </motion.div>

      </motion.div>
    </div>
  );
}