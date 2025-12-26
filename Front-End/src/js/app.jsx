import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import SectionDivider from '../components/SectionDivider';
import ScrollReveal from '../components/ScrollReveal';
import '../css/app.css';

const App = () => {
   return (
      <main className="min-h-screen selection:bg-primary/30 selection:text-white">
         <Navbar />
         <section id="hero">
            <Hero />
         </section>

         <SectionDivider />

         <section id="about">
            <ScrollReveal>
               <About />
            </ScrollReveal>
         </section>

         <SectionDivider />

         <section id="projects">
            <ScrollReveal>
               <Projects />
            </ScrollReveal>
         </section>

         <SectionDivider />

         <section id="certifications">
            <ScrollReveal>
               <Certifications />
            </ScrollReveal>
         </section>

         <SectionDivider />

         <section id="contact">
            <ScrollReveal>
               <Contact />
            </ScrollReveal>
         </section>
      </main>
   );
};

export default App;