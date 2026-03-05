"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenuAlt3, HiX } from "react-icons/hi";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Skills", href: "/#skills" }, 
    { name: "Projects", href: "/#projects" },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        isScrolled ? "py-2 md:py-4" : "py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={`flex justify-between items-center p-2 md:p-3 px-5 md:px-8 rounded-full transition-all border ${
          isScrolled 
            ? "bg-slate-900/90 backdrop-blur-md border-white/10 shadow-xl" 
            : "bg-transparent border-transparent"
        }`}>
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="group flex items-center gap-1">
            <div className="text-xl md:text-2xl font-black tracking-tighter flex items-center">
              <span className="text-white">MANOJ</span>
              <span className="text-indigo-500 ml-1 font-semibold text-lg md:text-xl">DEV</span>
              <span className="text-cyan-400">.</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-indigo-400" : "text-slate-400 hover:text-indigo-400"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              CONTACT ME
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-slate-950 z-[-1] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="text-2xl font-bold text-slate-300 hover:text-indigo-400"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold shadow-xl shadow-indigo-500/20"
            >
              CONTACT ME
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}