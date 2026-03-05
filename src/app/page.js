import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
// import About from "@/components/About";
// import Experience from "@/components/Experience";

export default function Home() {
  return (
    /* CHANGE: Reduced gap-y on mobile (10) while keeping it large 
       on desktop (20) to fix the 'too much spacing' issue.
    */
    <div className="flex flex-col gap-y-10 md:gap-y-20 pb-12 md:pb-20"> 
      
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Note for UI/UX: Ensure your Hero component has a button 
          wrapped in <Link href="/contact"> to handle the redirect.
      */}

      {/* <section id="about">
        <About />
      </section> */}

      <section id="skills" className="scroll-mt-20">
        <Skills />
      </section>

      <section id="projects" className="scroll-mt-20">
        <Projects />
      </section>

      {/* <section id="experience">
        <Experience />
      </section> */}
      
    </div>
  );
}