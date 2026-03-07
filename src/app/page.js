import Hero from "@/components/Hero";
import Process from "@/components/Process"; // ADDED IMPORT
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    /* CHANGE: Reduced mobile gap-y to 6 (approx 24px) for a tighter look.
       Desktop remains gap-y-20 (80px) for premium spacing.
    */
    <div className="flex flex-col gap-y-6 md:gap-y-20 pb-12 md:pb-20"> 
      
      {/* 1. Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* 2. Process Section (REPLACING ABOUT) 
          This will now appear correctly between Hero and Skills.
      */}
      <section id="about" className="scroll-mt-24">
        <Process />
      </section>

      {/* 3. Skills Section */}
      <section id="skills" className="scroll-mt-24">
        <Skills />
      </section>

      {/* 4. Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <Projects />
      </section>
      
    </div>
  );
}