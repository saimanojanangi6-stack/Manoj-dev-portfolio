"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className={`flex justify-between items-center p-3 px-8 rounded-full transition-all border ${
          isScrolled 
            ? "bg-slate-900/80 backdrop-blur-md border-white/10 shadow-xl" 
            : "bg-transparent border-transparent"
        }`}>
          
          {/* Updated Logo with your name: MANOJ DEV. */}
          <Link href="/" className="group flex items-center gap-1">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-black tracking-tighter flex items-center"
            >
              <span className="text-white">MANOJ</span>
              <span className="text-indigo-500 ml-1.5 font-semibold">DEV</span>
              <span className="text-cyan-400">.</span>
            </motion.div>
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

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex flex-col gap-1 cursor-pointer">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}