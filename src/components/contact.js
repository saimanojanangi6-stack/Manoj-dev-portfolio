"use client";
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

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
        form.current.reset(); // Clear the form
        setTimeout(() => setStatus(null), 5000); // Hide success message after 5s
      }, (error) => {
        console.error(error.text);
        setStatus("error");
        setIsSending(false);
      });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's <span className="text-gradient">Connect</span></h2>
          <p className="text-slate-400">Send me a message and I'll get back to you within 24 hours.</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Info Side */}
          <div className="space-y-6">
            <div className="glass-card p-8 rounded-3xl border-l-4 border-indigo-500">
              <FaEnvelope className="text-indigo-500 text-3xl mb-4" />
              <h3 className="text-xl font-bold">Email Me</h3>
              <p className="text-slate-400">yourname@email.com</p>
            </div>
            <div className="glass-card p-8 rounded-3xl border-l-4 border-cyan-500">
              <FaMapMarkerAlt className="text-cyan-500 text-3xl mb-4" />
              <h3 className="text-xl font-bold">Location</h3>
              <p className="text-slate-400">Available for worldwide remote work</p>
            </div>
          </div>

          {/* Form Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-3xl relative"
          >
            {status === "success" ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
              >
                <FaCheckCircle className="text-green-500 text-6xl" />
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-slate-400">Thanks for reaching out. I'll be in touch soon.</p>
              </motion.div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-5">
                {/* EmailJS requires 'name' attributes to match your template keys */}
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">Full Name</label>
                  <input 
                    type="text" 
                    name="from_name" 
                    required 
                    placeholder="John Doe"
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">Email Address</label>
                  <input 
                    type="email" 
                    name="reply_to" 
                    required 
                    placeholder="john@example.com"
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-400 mb-2 block">Your Message</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    required 
                    placeholder="Tell me about your project..."
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-xl focus:border-indigo-500 outline-none transition-all" 
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSending}
                  className={`py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                    isSending ? "bg-slate-700 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
                  }`}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>

                {status === "error" && (
                  <p className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}