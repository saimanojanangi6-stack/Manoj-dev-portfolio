"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { 
  FaPaperPlane, FaEnvelope, FaPhoneAlt, 
  FaWhatsapp, FaCheckCircle, FaArrowRight 
} from "react-icons/fa";
import { 
  HiOutlineMagnifyingGlass, HiOutlinePencilSquare, 
  HiOutlineCodeBracket, HiOutlineRocketLaunch 
} from "react-icons/hi2";
import Magnetic from "@/components/Magnetic"; // Adjust path if needed

export default function ContactPage() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const WHATSAPP_NUMBER = "918919155463"; 
  const PHONE_NUMBER = "+91 8919155463";
  const EMAIL_ADDRESS = "saimanojanangi6@gmail.com";

  const steps = [
    { title: "Discovery", icon: <HiOutlineMagnifyingGlass />, color: "text-blue-400" },
    { title: "UI/UX Design", icon: <HiOutlinePencilSquare />, color: "text-indigo-400" },
    { title: "Development", icon: <HiOutlineCodeBracket />, color: "text-cyan-400" },
    { title: "Deployment", icon: <HiOutlineRocketLaunch />, color: "text-emerald-400" }
  ];

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    const SERVICE_ID = "service_kowf2ui";
    const TEMPLATE_ID = "template_p82enjn";
    const PUBLIC_KEY = "UML8YWbf24-wLdwIK";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(() => {
          setIsSuccess(true);
          setIsSending(false);
          form.current.reset();
      }, (error) => {
          console.error(error.text);
          alert("Email failed to send. Please use WhatsApp instead.");
          setIsSending(false);
      });
  };

  // --- Premium Animation Variants ---
  const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="mb-20 md:mb-32 flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div 
            variants={fadeUp} initial="hidden" animate="visible"
            className="inline-flex items-center gap-4 text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] mb-6"
          >
            <span>[07]</span>
            <div className="w-10 h-[1px] bg-cyan-400" />
            <span>Comms Link</span>
          </motion.div>
          <motion.h1 
            variants={fadeUp} initial="hidden" animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]"
          >
            LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 italic font-light">CONNECT.</span>
          </motion.h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* --- LEFT COLUMN: Direct Contact & Workflow (Spans 5 Cols) --- */}
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-5 flex flex-col gap-12">
            
            {/* Direct Contact Cards */}
            <div className="space-y-4">
              <Magnetic strength={0.1}>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
                  data-cursor="CHAT"
                  className="block relative overflow-hidden bg-[#111] border border-white/5 p-6 rounded-[2rem] group hover:border-green-500/50 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform duration-500">
                        <FaWhatsapp size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">WhatsApp</p>
                        <p className="text-white font-medium text-lg">Instant Chat</p>
                      </div>
                    </div>
                    <FaArrowRight className="text-slate-600 group-hover:text-green-500 -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </a>
              </Magnetic>

              <Magnetic strength={0.1}>
                <a 
                  href={`tel:${PHONE_NUMBER}`}
                  data-cursor="CALL"
                  className="block relative overflow-hidden bg-[#111] border border-white/5 p-6 rounded-[2rem] group hover:border-cyan-500/50 transition-all duration-500"
                >
                  <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform duration-500">
                        <FaPhoneAlt size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Direct Line</p>
                        <p className="text-white font-medium text-lg">{PHONE_NUMBER}</p>
                      </div>
                    </div>
                    <FaArrowRight className="text-slate-600 group-hover:text-cyan-400 -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  </div>
                </a>
              </Magnetic>
              
              <div className="bg-[#111] border border-white/5 p-6 rounded-[2rem] flex items-center gap-5">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Official Email</p>
                  <p className="text-white font-medium text-sm md:text-base break-all">{EMAIL_ADDRESS}</p>
                </div>
              </div>
            </div>

            {/* Micro Workflow Section */}
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Standard Operating Procedure</p>
              <div className="grid grid-cols-2 gap-4">
                {steps.map((step, i) => (
                  <motion.div variants={fadeUp} key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                    <div className={`text-2xl mb-3 ${step.color}`}>{step.icon}</div>
                    <p className="text-[10px] font-mono text-white uppercase tracking-widest">{step.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* --- RIGHT COLUMN: Terminal Form (Spans 7 Cols) --- */}
          <motion.div 
            variants={fadeUp} initial="hidden" animate="visible"
            className="lg:col-span-7"
          >
            <div className="bg-[#111]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative h-full">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }} 
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }} 
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#111]/90 rounded-[2.5rem] z-20"
                  >
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                      <FaCheckCircle className="text-emerald-400 text-5xl" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Transmission <br/> Successful.</h2>
                    <p className="text-slate-400 font-light mb-8 max-w-sm mx-auto">Your message has been received into the mainframe. I will establish contact shortly.</p>
                    <button 
                      onClick={() => setIsSuccess(false)} 
                      data-cursor="RESET"
                      className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest hover:text-white transition-colors border-b border-indigo-400/30 hover:border-white pb-1"
                    >
                      Initialize New Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" ref={form} onSubmit={sendEmail} className="flex flex-col gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block ml-2">Identifier</label>
                        <input 
                          type="text" name="from_name" required data-cursor="TYPE" placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white placeholder:text-slate-600 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all duration-300 font-light" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block ml-2">Comms Link</label>
                        <input 
                          type="email" name="reply_to" required data-cursor="TYPE" placeholder="john@example.com"
                          className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white placeholder:text-slate-600 focus:border-indigo-400 focus:bg-white/10 outline-none transition-all duration-300 font-light" 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3 block ml-2">Data Payload</label>
                      <textarea 
                        name="message" required rows="5" data-cursor="TYPE" placeholder="Tell me about your vision..."
                        className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white placeholder:text-slate-600 focus:border-cyan-400 focus:bg-white/10 outline-none transition-all duration-300 font-light resize-none" 
                      />
                    </div>
                    
                    <div className="mt-4">
                      <Magnetic strength={0.15}>
                        <button
                          type="submit"
                          disabled={isSending}
                          data-cursor="SEND"
                          className={`w-full py-5 rounded-2xl font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-3 transition-all duration-500 ${
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
                          ) : (
                            <>
                              <FaPaperPlane /> Initialize Sequence
                            </>
                          )}
                        </button>
                      </Magnetic>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}