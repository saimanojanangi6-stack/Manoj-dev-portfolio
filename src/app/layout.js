"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import { Inter } from "next/font/google";
import { SiFigma } from "react-icons/si";

const inter = Inter({ subsets: ["latin"] });

// --- NEW: Custom Designer Cursor ---
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

    // Attach listeners to interactive elements
    const targets = document.querySelectorAll("a, button, .interactive");
    targets.forEach((target) => {
      target.addEventListener("mouseenter", handleHover);
      target.addEventListener("mouseleave", handleUnhover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", handleHover);
        target.removeEventListener("mouseleave", handleUnhover);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      {/* Outer Designer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-indigo-500/50 rounded-full pointer-events-none z-[9998]"
        style={{ x: cursorXSpring, y: cursorYSpring, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(99, 102, 241, 0.15)" : "transparent",
          borderColor: isHovered ? "rgba(99, 102, 241, 0.8)" : "rgba(99, 102, 241, 0.5)",
        }}
      />
    </>
  );
}

// --- Interactive Mesh Glow ---
function GlowCursor() {
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
      className="fixed pointer-events-none z-[-1] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-indigo-600/10 blur-[120px] rounded-full"
    />
  );
}

// --- Floating Figma Background Element ---
function FigmaBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none opacity-20">
      <motion.div
        animate={{ 
          y: [0, -40, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute top-[10%] right-[-5%] text-[25rem] md:text-[35rem] text-indigo-500/10 blur-[2px]"
      >
        <SiFigma />
      </motion.div>
    </div>
  );
}

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en" className="scroll-smooth">
      {/* Added 'cursor-none' to body to hide default pointer */}
      <body className={`${inter.className} bg-[#0F172A] text-white antialiased overflow-x-hidden cursor-none`}>
        <CustomCursor />
        <GlowCursor /> 
        <FigmaBackground />
        
        <AnimatePresence mode="wait">
          {isLoading ? (
            <SplashScreen key="splash" finishLoading={() => setIsLoading(false)} />
          ) : (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Navbar />
              <main className="relative z-10">{children}</main>
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}