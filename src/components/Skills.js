"use client";
import { motion } from "framer-motion";

const skills = [
  { category: "UI/UX Design", items: ["Figma", "Prototyping", "User Research"] },
  { category: "Frontend", items: ["React", "Next.js", "Tailwind", "Three.js"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "REST APIs"] },
];

export default function Skills() {
  return (
    <section className="py-20 container mx-auto px-6">
      <h2 className="text-4xl font-bold mb-12 text-center">Technical <span className="text-gradient">Expertise</span></h2>
      <div className="grid md:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className="glass-card p-8 rounded-2xl border-t-2 border-t-indigo-500/50"
          >
            <h3 className="text-2xl font-bold mb-6 text-cyan-400">{skill.category}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-slate-800/50 rounded-lg text-sm border border-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}