import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
// Import these once you create the files
// import About from "@/components/About";
// import Experience from "@/components/Experience";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-20 pb-20"> 
      {/* Hero doesn't usually need an ID if it's at the top, 
          but adding one helps the 'Home' link */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section - Add id="about" inside the component 
        or wrap it here 
      */}
      {/* <About /> */}

      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>

      {/* <Experience /> */}

      {/* Note: Contact is now a separate page (/contact), 
          so we don't need the <Contact /> component here anymore! */}
    </div>
  );
}