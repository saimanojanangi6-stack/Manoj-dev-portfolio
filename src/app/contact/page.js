"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { 
  FaPaperPlane, FaEnvelope, FaPhoneAlt, 
  FaWhatsapp, FaCheckCircle, FaArrowRight 
} from "react-icons/fa";
import { 
  HiOutlineMagnifyingGlass, HiOutlinePencilSquare, 
  HiOutlineCodeBracket, HiOutlineRocketLaunch 
} from "react-icons/hi2";

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

  return (
    <div className="min-h-screen bg-[#0F172A] pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h1>
          <p className="text-slate-400 text-lg">Choose your preferred way to reach out.</p>
        </motion.div>

        {/* --- NEW: Process Section Integrated --- */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 text-center text-slate-300 uppercase tracking-widest">My Workflow</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-4 rounded-2xl flex flex-col items-center text-center border-t-2 border-t-slate-800 hover:border-t-indigo-500 transition-all"
              >
                <div className={`text-2xl mb-2 ${step.color}`}>{step.icon}</div>
                <p className="text-xs font-bold text-white uppercase tracking-tight">{step.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
        {/* --- End of Process Section --- */}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Direct Contact Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <motion.a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-3xl flex items-center justify-between group border-l-4 border-green-500 hover:bg-green-500/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                  <FaWhatsapp size={24} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">WhatsApp</p>
                  <p className="text-white font-medium">Chat Now</p>
                </div>
              </div>
              <FaArrowRight className="text-slate-600 group-hover:text-green-500 transition-colors" />
            </motion.a>

            <motion.a 
              href={`tel:${PHONE_NUMBER}`}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-3xl flex items-center justify-between group border-l-4 border-cyan-500 hover:bg-cyan-500/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
                  <FaPhoneAlt size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Call Me</p>
                  <p className="text-white font-medium">{PHONE_NUMBER}</p>
                </div>
              </div>
              <FaArrowRight className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
            </motion.a>

            <div className="glass-card p-6 rounded-3xl flex items-center gap-4 border-l-4 border-indigo-500">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                <FaEnvelope size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold">Official Email</p>
                <p className="text-white font-medium break-all">{EMAIL_ADDRESS}</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <motion.div className="lg:col-span-2 glass-card p-8 md:p-12 rounded-[2.5rem] border-t border-white/5">
            {isSuccess ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-10">
                <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                <h2 className="text-2xl font-bold">Email Sent!</h2>
                <p className="text-slate-400 mt-2">I'll get back to you soon.</p>
                <button onClick={() => setIsSuccess(false)} className="mt-6 text-indigo-400 font-bold hover:underline">Send another</button>
              </motion.div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1">Your Name</label>
                    <input type="text" name="from_name" required className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400 ml-1">Email Address</label>
                    <input type="email" name="reply_to" required className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 ml-1">Message</label>
                  <textarea name="message" required rows="4" className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl p-4 text-white focus:border-indigo-500 outline-none transition-all resize-none" placeholder="How can I help you?" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSending}
                  type="submit"
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                    isSending ? "bg-slate-800 text-slate-500" : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20"
                  }`}
                >
                  <FaPaperPlane />
                  {isSending ? "Processing..." : "Submit Inquiry"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}