"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import Magnetic from "./Magnetic"; // Ensure this path is correct

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // --- 1. Smart Scroll Hide/Show Logic ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Add glass background if scrolled past 50px
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    // Hide nav if scrolling down, show if scrolling up
    if (latest > 150 && latest > previous && !isOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" }, 
    { name: "Projects", href: "/#projects" },
  ];

  const closeMenu = () => setIsOpen(false);

  // --- 2. Mobile Menu Stagger Variants ---
  const menuVars = {
    initial: { scaleY: 0 },
    animate: { 
      scaleY: 1, 
      transition: { duration: 0.8, ease: [0.12, 0, 0.39, 0] } 
    },
    exit: { 
      scaleY: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 } 
    }
  };

  const linkContainerVars = {
    animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const linkVars = {
    initial: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } },
    animate: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
    exit: { y: "30vh", transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] } }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? "py-4" : "py-6 md:py-8"}`}
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className={`relative flex justify-between items-center px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-500 border ${
          scrolled 
            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-transparent"
        }`}>
          
          {/* --- Logo --- */}
          <Magnetic>
            <Link href="/" onClick={closeMenu} className="group flex items-center gap-1 z-50">
              <div className="text-xl md:text-2xl font-black tracking-tighter flex items-center cursor-none">
                <span className="text-white">MANOJ</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 ml-1 font-semibold text-lg md:text-xl">DEV</span>
                <span className="text-cyan-400">.</span>
              </div>
            </Link>
          </Magnetic>

          {/* --- Desktop Links --- */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === "/" && link.href === "/#home");
              
              return (
                <Magnetic key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative px-5 py-2 text-sm font-medium transition-colors cursor-none ${
                      isActive ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {/* Liquid Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          {/* --- Desktop CTA --- */}
          <div className="hidden md:block">
            <Magnetic>
              <Link
                href="/contact"
                className="relative group overflow-hidden bg-white text-[#0a0a0a] text-xs font-black tracking-widest uppercase px-6 py-3 rounded-full transition-all cursor-none flex items-center justify-center"
              >
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Let's Talk</span>
                <div className="absolute inset-0 h-full w-full bg-indigo-600 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
              </Link>
            </Magnetic>
          </div>

          {/* --- Mobile Menu Toggle --- */}
          <Magnetic>
            <button 
              className="md:hidden relative z-50 text-white text-2xl p-2 focus:outline-none mix-blend-difference"
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                {isOpen ? <HiX /> : <HiMenuAlt3 />}
              </motion.div>
            </button>
          </Magnetic>

        </div>
      </div>

      {/* --- Elite Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#0a0a0a] z-40 origin-top flex flex-col justify-center px-10"
          >
            {/* Background noise texture */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />

            <motion.div 
              variants={linkContainerVars}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-6"
            >
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-4">Navigation</div>
              
              {navLinks.map((link, i) => (
                <div key={link.name} className="overflow-hidden">
                  <motion.div variants={linkVars}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="text-5xl font-black text-slate-300 hover:text-white transition-colors tracking-tighter flex items-center gap-4 group"
                    >
                      <span className="text-sm font-mono text-slate-600 font-light group-hover:text-cyan-400 transition-colors">0{i + 1}</span>
                      {link.name}
                    </Link>
                  </motion.div>
                </div>
              ))}
              
              <div className="overflow-hidden mt-10">
                <motion.div variants={linkVars}>
                  <Link
                    href="/contact"
                    onClick={closeMenu}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-8 py-4 rounded-full font-bold tracking-widest text-xs uppercase"
                  >
                    Start a Project <span className="text-lg leading-none">↗</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Mobile Footer */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} exit={{ opacity: 0 }}
              className="absolute bottom-10 left-10 right-10 flex justify-between text-[10px] font-mono text-slate-600 uppercase tracking-widest border-t border-white/10 pt-6"
            >
              <span>AP, India</span>
              <span>Available</span>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}