"use client";
import "./globals.css";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useScroll, useVelocity } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplashScreen from "@/components/SplashScreen";
import SmoothScroll from "@/components/SmoothScroll";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// --- 1. Global Audio Controller (Max Volume Scroll + Music) ---
function GlobalAudio({ isLoading }) {
  const audioRef = useRef(null);
  const scrollSfx = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const audioUnlocked = useRef(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const lastScrollPos = useRef(0);

  useEffect(() => {
    // Initialize Audio Objects
    audioRef.current = new Audio("/sounds/global-bg.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0; 

    scrollSfx.current = new Audio("/sounds/scroll-tick.mp3");
    if (scrollSfx.current) {
      scrollSfx.current.volume = 1.0; 
      scrollSfx.current.playbackRate = 1.6; // Snappier response
    }

    // --- Stealth Audio Unlocker ---
    const unlock = () => {
      if (!audioUnlocked.current && audioRef.current) {
        // Play and immediately pause/mute to "warm up" the audio context
        audioRef.current.play().then(() => {
          audioUnlocked.current = true;
          // If loading is already done, start music fade-in
          if (!isLoading) startMusicFadeIn();
        }).catch(() => {});
      }
    };

    window.addEventListener("mousedown", unlock);
    window.addEventListener("mousemove", unlock);
    window.addEventListener("touchstart", unlock);

    return () => {
      window.removeEventListener("mousedown", unlock);
      window.removeEventListener("mousemove", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [isLoading]);

  const startMusicFadeIn = () => {
    if (!audioRef.current) return;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setShowToggle(true);
      let volumeInterval = setInterval(() => {
        if (audioRef.current.volume < 0.9) {
          audioRef.current.volume += 0.1;
        } else {
          audioRef.current.volume = 1.0;
          clearInterval(volumeInterval);
        }
      }, 100);
    });
  };

  useEffect(() => {
    if (!isLoading && audioUnlocked.current) {
      const timer = setTimeout(startMusicFadeIn, 2500); 
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // --- 100% Rapid Scroll Logic ---
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const distance = Math.abs(latest - lastScrollPos.current);
      const velocity = Math.abs(scrollVelocity.get());

      if (distance > 60 && velocity > 20) {
        if (scrollSfx.current && audioUnlocked.current) {
          scrollSfx.current.currentTime = 0;
          scrollSfx.current.play().catch(() => {});
          lastScrollPos.current = latest;
        }
      }
    });
    return () => unsubscribe();
  }, [scrollY, scrollVelocity]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!showToggle) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex items-center gap-3">
      <AnimatePresence>
        {isPlaying && (
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="text-[9px] font-mono text-cyan-400 uppercase tracking-[0.3em] hidden md:block"
          >
            Atmosphere Active
          </motion.span>
        )}
      </AnimatePresence>
      <button 
        onClick={toggleMusic}
        className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:border-cyan-500/50 transition-all duration-500 group"
      >
        <div className="flex items-end gap-[2px] h-3">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ height: isPlaying ? [4, 12, 7, 11, 5][i] : 2 }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
              className={`w-[2px] ${isPlaying ? 'bg-cyan-400' : 'bg-white/20'}`}
            />
          ))}
        </div>
      </button>
    </div>
  );
}

// --- 2. Custom Designer Cursor (MAX VOLUME) ---
function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const hoverSfx = useRef(null);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    hoverSfx.current = new Audio("/sounds/cursor-hover.mp3");
    if (hoverSfx.current) hoverSfx.current.volume = 1.0; 

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const isInteractive = e.target.closest("a, button, .interactive, [role='button']");
      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isHovered && hoverSfx.current) {
      hoverSfx.current.currentTime = 0;
      hoverSfx.current.play().catch(() => {});
    }
  }, [isHovered]);

  return (
    <div className="hidden md:block">
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/40 rounded-full pointer-events-none z-[9999] mix-blend-difference"
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

// --- 3. Interactive Ambient Light ---
function AmbientLight() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 120 };
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
      className="fixed pointer-events-none z-[-1] w-[80vw] h-[80vw] max-w-[900px] max-h-[900px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-tr from-indigo-500/10 via-cyan-500/5 to-transparent blur-[140px] rounded-full hidden md:block"
    />
  );
}

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <html lang="en" className="selection:bg-cyan-400 selection:text-black">
      <body className={`${inter.className} bg-[#0a0a0a] text-white antialiased overflow-x-hidden md:cursor-none`}>
        
        <div 
          className="pointer-events-none fixed inset-0 z-[10001] opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        <GlobalAudio isLoading={isLoading} />

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
                transition={{ duration: 1.2, ease: "easeOut" }}
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