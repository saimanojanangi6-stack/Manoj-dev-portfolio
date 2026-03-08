"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function About() {
  const sectionRef = useRef(null);

  // --- 1. Kinetic Scroll (Giant Background Text) ---
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Adjusted for mobile speeds
  const marqueeX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const marqueeX2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  // --- 2. Holographic 3D Hover & TOUCH Logic ---
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [0, 1], ["-15deg", "15deg"]);
  const rotateX = useTransform(smoothMouseY, [0, 1], ["15deg", "-15deg"]);
  
  const imageX = useTransform(smoothMouseX, [0, 1], ["10%", "-10%"]);
  const imageY = useTransform(smoothMouseY, [0, 1], ["10%", "-10%"]);
  
  const glareX = useTransform(smoothMouseX, [0, 1], ["-100%", "100%"]);
  const glareY = useTransform(smoothMouseY, [0, 1], ["-100%", "100%"]);

  // Handles Desktop Mouse
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Handles Mobile Touch / Swiping
  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = (touch.clientX - rect.left) / rect.width;
    const y = (touch.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleReset = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // --- 3. Text Reveal Animation ---
  const textReveal = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: custom * 0.1, duration: 1, ease: [0.25, 1, 0.5, 1] }
    })
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden bg-[#0a0a0a] flex items-center"
    >
      {/* Noise Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] mix-blend-overlay"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Kinetic Scroll Background (Adjusted text sizes for mobile) */}
      <div className="absolute inset-0 flex flex-col justify-center gap-6 md:gap-10 opacity-[0.02] pointer-events-none z-0 overflow-hidden text-white font-black whitespace-nowrap text-[20vw] md:text-[15vw] leading-none tracking-tighter select-none">
        <motion.div style={{ x: marqueeX1 }}>UI/UX DESIGNER FULL STACK ENGINEER</motion.div>
        <motion.div style={{ x: marqueeX2 }} className="text-transparent stroke-text">MANOJ DEV MANOJ DEV MANOJ DEV</motion.div>
        <motion.div style={{ x: marqueeX1 }}>NEXT.JS FIGMA PRISMA TAILWIND</motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 xl:gap-32">
          
          {/* --- The Holographic Window --- */}
          <div className="w-full lg:w-1/2 flex justify-center perspective-[2000px]">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleReset}
              onTouchMove={handleTouchMove}   // Mobile Touch Trigger
              onTouchEnd={handleReset}        // Mobile Touch Release
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              // Responsive sizing: fits mobile screens perfectly while staying large on desktop
              className="relative w-[85vw] max-w-[340px] aspect-[3/4] md:w-[400px] md:h-[500px] rounded-3xl cursor-none group touch-pan-y"
            >
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-3xl blur-2xl opacity-30 md:opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
              
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-[#111]">
                {/* Parallax Image */}
                <motion.div 
                  style={{ x: imageX, y: imageY, scale: 1.2 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image 
                    src="/manoj.jpg" 
                    alt="Manoj"
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                </motion.div>

                {/* Glare Effect */}
                <motion.div 
                  style={{ left: glareX, top: glareY }}
                  className="absolute w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-1/2 -translate-y-1/2 rotate-45 pointer-events-none"
                />
                
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
              </div>

              {/* Floating 3D Badge */}
              <motion.div 
                style={{ translateZ: "50px" }}
                className="absolute -bottom-5 -right-2 md:-right-10 glass-card px-4 py-3 md:px-6 md:py-4 rounded-2xl border border-white/10 backdrop-blur-xl flex items-center gap-3 shadow-2xl"
              >
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-xs md:text-sm font-mono text-white tracking-widest uppercase">Open to Work</span>
              </motion.div>
            </motion.div>
          </div>

          {/* --- Spatial Typography --- */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative pointer-events-none lg:pointer-events-auto text-center lg:text-left">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 z-20"
            >
              <motion.div custom={1} variants={textReveal}>I CRAFT</motion.div>
              <motion.div custom={2} variants={textReveal} className="text-cyan-400">DIGITAL</motion.div>
              <motion.div custom={3} variants={textReveal}>REALITIES.</motion.div>
            </motion.h2>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6 max-w-lg mx-auto lg:mx-0 z-10"
            >
              <motion.p custom={4} variants={textReveal} className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed">
                I am <b className="text-white font-semibold">Manoj</b>. Not just a developer, not just a designer. I am the bridge between hyper-aesthetic visual concepts and scalable, robust engineering.
              </motion.p>
              
              <motion.p custom={5} variants={textReveal} className="text-sm sm:text-base text-slate-400 font-light leading-relaxed">
                Leveraging <span className="text-cyan-400 border-b border-cyan-400/30 pb-1">Figma</span> for pixel-perfect intuition and <span className="text-indigo-400 border-b border-indigo-400/30 pb-1">Next.js</span> for uncompromised performance.
              </motion.p>

              <motion.div 
                custom={6} variants={textReveal}
                className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent lg:from-cyan-500/50 lg:via-cyan-500/50 lg:to-transparent my-8"
              />

              <div className="flex justify-center lg:justify-start gap-12">
                <motion.div custom={7} variants={textReveal}>
                  <div className="text-3xl font-black text-white">10<span className="text-cyan-400">+</span></div>
                  <div className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-widest mt-1">Projects</div>
                </motion.div>
                <motion.div custom={8} variants={textReveal}>
                  <div className="text-3xl font-black text-white">100<span className="text-indigo-400">%</span></div>
                  <div className="text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-widest mt-1">Delivery</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
        }
      `}} />
    </section>
  );
}