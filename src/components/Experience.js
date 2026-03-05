"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    year: "2023 - Present",
    role: "Senior Full Stack Developer",
    company: "Tech Solutions Inc.",
    desc: "Leading the frontend transition to Next.js and mentoring junior devs."
  },
  {
    year: "2021 - 2023",
    role: "UI/UX Designer",
    company: "Creative Agency",
    desc: "Designed high-fidelity wireframes and design systems in Figma."
  }
];

export default function Experience() {
  return (
    <section className="py-20 container mx-auto px-6">
      <h2 className="text-4xl font-bold mb-16 text-center">My <span className="text-gradient">Journey</span></h2>
      <div className="relative border-l-2 border-slate-800 ml-4 md:mx-auto md:max-w-4xl">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-12 ml-8 relative"
          >
            {/* The Glowing Dot */}
            <div className="absolute -left-[41px] top-1 w-5 h-5 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]" />
            
            <div className="glass-card p-6 rounded-2xl hover:border-indigo-500/50 transition-colors">
              <span className="text-cyan-400 font-mono text-sm">{exp.year}</span>
              <h3 className="text-xl font-bold mt-1">{exp.role}</h3>
              <p className="text-slate-400 mb-2">{exp.company}</p>
              <p className="text-slate-300 leading-relaxed">{exp.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}