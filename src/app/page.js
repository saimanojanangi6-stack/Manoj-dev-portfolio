import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process"; 
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    /* Removed gap-y because the components now have their own precise 
      padding (py-24, py-32) and min-h-screen properties. 
      This allows the dark backgrounds and noise overlays to blend flawlessly.
    */
    <div className="bg-[#0a0a0a] w-full overflow-hidden flex flex-col"> 
      
      {/* 1. The Hook */}
      <Hero />

      {/* 2. The Designer (Linked to "About" in Navbar) */}
      <About />

      {/* 3. The Methodology (Flows naturally after About) */}
      <Process />

      {/* 4. The Technical Arsenal (Linked to "Skills" in Navbar) */}
      <Skills />

      {/* 5. The Proof (Linked to "Projects" in Navbar) */}
      <Projects />
      
    </div>
  );
}