"use client";
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import Magnetic from "./Magnetic"; // Ensure this path is correct

export default function Contact() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
    const SERVICE_ID = "service_kowf2ui";
    const TEMPLATE_ID = "template_p82enjn";
    const PUBLIC_KEY = "UML8YWbf24-wLdwIK";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        setStatus("success");
        setIsSending(false);
        form.current.reset();
        setTimeout(() => setStatus(null), 5000); // Reset after 5s
      }, (error) => {
        console.error(error.text);
        setStatus("error");
        setIsSending(false);
      });
  };

  // --- Animation Variants ---
  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="contact" className="py-24 md:py-40 relative overflow-hidden bg-[#0a0a0a]">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* --- Left Column: Massive Typography & Info --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-4 text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-8">
              <span>[07]</span>
              <div className="w-10 h-[1px] bg-cyan-400" />
              <span>Initiate</span>
            </div>

            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] mb-8">
              LET'S <br />
              START A <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 italic font-light">PROJECT.</span>
            </h2>

            <p className="text-slate-400 text-lg md:text-xl font-light max-w-md mb-12 leading-relaxed">
              Have an idea? I'm currently available for freelance work. Send me a message and I'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-400 group-hover:text-[#0a0a0a] transition-colors duration-500">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Direct Email</div>
                  <div className="text-lg font-medium text-white">yourname@email.com</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-500">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Location</div>
                  <div className="text-lg font-medium text-white">AP, India (Remote Worldwide)</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* --- Right Column: The Terminal Form --- */}
          <motion.div 
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                // SUCCESS STATE
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2rem]"
                >
                  <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                    <FaCheckCircle className="text-emerald-400 text-5xl" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tight">Transmission <br/> Successful.</h3>
                  <p className="text-slate-400 font-light">Your message has been received into the mainframe. I will establish contact shortly.</p>
                </motion.div>
              ) : (
                // FORM STATE
                <motion.form 
                  key="form"
                  ref={form} 
                  onSubmit={sendEmail} 
                  className="flex flex-col gap-6 bg-[#111]/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-2xl"
                >
                  <motion.div variants={itemVars}>
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block ml-2">Identifier</label>
                    <input 
                      type="text" 
                      name="from_name" 
                      required 
                      data-cursor="TYPE"
                      placeholder="John Doe"
                      className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white placeholder:text-slate-600 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all duration-300 font-light" 
                    />
                  </motion.div>

                  <motion.div variants={itemVars}>
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block ml-2">Comms Link</label>
                    <input 
                      type="email" 
                      name="reply_to" 
                      required 
                      data-cursor="TYPE"
                      placeholder="john@example.com"
                      className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white placeholder:text-slate-600 focus:border-indigo-400 focus:bg-white/10 outline-none transition-all duration-300 font-light" 
                    />
                  </motion.div>

                  <motion.div variants={itemVars}>
                    <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block ml-2">Data Payload</label>
                    <textarea 
                      name="message" 
                      rows="5" 
                      required 
                      data-cursor="TYPE"
                      placeholder="Tell me about your vision..."
                      className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white placeholder:text-slate-600 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all duration-300 font-light resize-none" 
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVars} className="mt-4 flex flex-col items-center">
                    <Magnetic strength={0.2}>
                      <button 
                        type="submit" 
                        disabled={isSending}
                        data-cursor="SEND"
                        className={`w-full py-5 rounded-2xl font-bold tracking-widest text-xs uppercase transition-all duration-500 flex items-center justify-center gap-3 ${
                          isSending 
                            ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5" 
                            : "bg-white text-[#0a0a0a] hover:bg-cyan-400 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                        }`}
                      >
                        {isSending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin" />
                            Transmitting...
                          </>
                        ) : "Initialize Sequence"}
                      </button>
                    </Magnetic>

                    {status === "error" && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-center text-xs font-mono mt-4">
                        Connection failed. Please verify your comms array.
                      </motion.p>
                    )}
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}