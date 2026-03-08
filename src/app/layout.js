"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import SmoothScroll from "@/components/SmoothScroll";
import { Inter } from "next/font/google";
import { SiFigma } from "react-icons/si";

const inter = Inter({ subsets: ["latin"] });

// --- 1. Custom Designer Cursor ---
function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = () => setIsHovered(true);
    const handleUnhover = () => setIsHovered(false);

    window.addEventListener("mousemove", moveCursor);

    // Re-attach listeners when DOM changes (useful for Next.js routing)
    const attachListeners = () => {
      const targets = document.querySelectorAll("a, button, .interactive");
      targets.forEach((target) => {
        target.addEventListener("mouseenter", handleHover);
        target.addEventListener("mouseleave", handleUnhover);
      });
    };

    attachListeners();
    // Small delay to ensure elements are rendered
    setTimeout(attachListeners, 500); 

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      const targets = document.querySelectorAll("a, button, .interactive");
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleHover);
        target.removeEventListener("mouseleave", handleUnhover);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <div className="hidden md:block">
      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Outer Designer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.1)" : "transparent",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
        }}
      />
    </div>
  );
}

// --- 2. Interactive Ambient Light (Upgraded) ---
function AmbientLight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{ left: smoothX, top: smoothY }}
      className="fixed pointer-events-none z-[-1] w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-indigo-900/10 to-cyan-900/10 blur-[120px] rounded-full hidden md:block"
    />
  );
}

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en">
      {/* CHANGED: Background is now #0a0a0a to match all our new components perfectly */}
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased overflow-x-hidden md:cursor-none`}>
        
        {/* --- GLOBAL FILM GRAIN OVERLAY --- 
            By putting this here, it covers the entire app seamlessly! 
        */}
        <div 
          className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        <SmoothScroll>
          <CustomCursor />
          <AmbientLight /> 
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <SplashScreen key="splash" finishLoading={() => setIsLoading(false)} />
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10"
              >
                <Navbar />
                <main>{children}</main>
                <Footer />
              </motion.div>
            )}
          </AnimatePresence>
        </SmoothScroll>
      </body>
    </html>
  );
}