import Hero from "@/components/Hero";
import About from "@/components/About"; // New import for your self-intro
import Process from "@/components/Process"; 
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    /* MOBILE GAPS: gap-y-6 keeps sections close on phones.
       DESKTOP GAPS: gap-y-20 provides premium spacing.
    */
    <div className="flex flex-col gap-y-6 md:gap-y-20 pb-12 md:pb-20"> 
      
      {/* 1. Hero: The Hook */}
      <section id="home">
        <Hero />
      </section>

      {/* 2. About: The Designer (Your Image & My Self)
          Positioned here so clients meet you immediately.
      */}
      <section id="about-me" className="scroll-mt-24">
        <About />
      </section>

      {/* 3. Process: The Methodology */}
      <section id="about" className="scroll-mt-24">
        <Process />
      </section>

      {/* 4. Skills: The Technical Toolkit */}
      <section id="skills" className="scroll-mt-24">
        <Skills />
      </section>

      {/* 5. Projects: The Proof */}
      <section id="projects" className="scroll-mt-24">
        <Projects />
      </section>
      
    </div>
  );
}