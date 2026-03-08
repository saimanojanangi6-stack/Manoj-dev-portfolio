"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import Magnetic from "./Magnetic"; // Ensure this path is correct

export default function Footer() {
  const containerRef = useRef(null);
  
  // Parallax effect: The footer moves slightly slower than the scroll, giving it a heavy "grounded" feel.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <motion.footer 
      ref={containerRef}
      style={{ y }}
      className="relative bg-[#050505] pt-32 pb-8 overflow-hidden rounded-t-[3rem] border-t border-white/5"
    >
      {/* 1. Global Film Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* 2. Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- 3. The Massive CTA --- */}
        <div className="flex flex-col items-center text-center mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-4 text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-12"
          >
            <span>[06]</span>
            <div className="w-10 h-[1px] bg-cyan-400" />
            <span>What's Next?</span>
          </motion.div>

          {/* Liquid Lens Cursor Trigger applied here! */}
          <a 
            href="mailto:your.email@example.com" // Update with your actual email
            data-cursor="SEND EMAIL"
            className="group block overflow-hidden"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="text-[12vw] md:text-[10vw] font-black leading-[0.85] tracking-tighter text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-500"
            >
              LET'S <br /> COLLABORATE.
            </motion.h2>
          </a>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Magnetic strength={0.4}>
              <a 
                href="mailto:your.email@example.com" // Update with your actual email
                className="relative flex items-center justify-center w-40 h-40 bg-indigo-600 rounded-full text-white font-bold tracking-widest text-xs uppercase hover:bg-cyan-500 transition-colors duration-500 shadow-[0_0_40px_rgba(79,70,229,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.4)]"
              >
                Get In Touch
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* --- 4. The Terminal Status Bar --- */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          
          {/* Status & Location */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              <span>Available for Work</span>
            </div>
            <div className="hidden md:block w-4 h-[1px] bg-slate-800" />
            <div>Based in AP, India</div>
          </div>

          {/* Magnetic Socials */}
          <div className="flex gap-4">
            <Magnetic>
              <a 
                href="https://github.com/" // Update with your GitHub
                target="_blank" 
                rel="noopener noreferrer"
                data-cursor="GITHUB"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/5 bg-white/5 hover:bg-white hover:text-[#0a0a0a] transition-colors duration-300"
              >
                <FaGithub size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="https://www.linkedin.com/in/sai-manoj-anangi-4158972a9?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank" 
                rel="noopener noreferrer"
                data-cursor="LINKEDIN"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/5 bg-white/5 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-colors duration-300"
              >
                <FaLinkedinIn size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a 
                href="https://twitter.com/" // Update with your X/Twitter
                target="_blank" 
                rel="noopener noreferrer"
                data-cursor="TWITTER"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/5 bg-white/5 hover:bg-cyan-400 hover:text-[#0a0a0a] hover:border-cyan-400 transition-colors duration-300"
              >
                <FaTwitter size={18} />
              </a>
            </Magnetic>
          </div>

          {/* Copyright */}
          <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-center md:text-right">
            © {new Date().getFullYear()} MANOJ DEV.<br />
            <span className="text-slate-700">All Rights Reserved.</span>
          </div>

        </div>
      </div>
    </motion.footer>
  );
}