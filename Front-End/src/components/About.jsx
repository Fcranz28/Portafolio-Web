import React from 'react';
import PixelBackground from './PixelBackground';

const About = () => {
   const skills = [
      "JavaScript", "PHP", "Laravel", "React.js",
      "TailwindCSS", "Node.js", "MySQL", "MongoDB", "Supabase",
      "Git", "GitHub", "GitLab", "Docker", "AWS", "Firebase"
   ];

   return (
      <section className="py-10 px-4 relative overflow-hidden">
         <PixelBackground />
         <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white font-pixel">
                  &lt; SOBRE MI /&gt;
               </h2>
               <div className="h-1 w-24 bg-primary mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-12 items-start">
               {/* Profile Image Column */}
               <div className="flex flex-col items-center space-y-6">
                  <div className="relative group">
                     <div className="absolute inset-0 bg-secondary translate-x-2 translate-y-2 pixel-card rounded-none" />
                     <div className="pixel-card relative bg-gray-200 w-64 h-64 overflow-hidden border-4 border-black dark:border-primary">
                        <img
                           src="/images/profile.jpg"
                           alt="Franz Aguilar"
                           className="w-full h-full object-cover pixelated hover:scale-110 transition-transform duration-500"
                        />
                     </div>
                  </div>
               </div>

               {/* Content Column */}
               <div className="space-y-8">
                  <div className="space-y-6">
                     <div className="pixel-card p-4 md:p-6 bg-white dark:bg-black/50">
                        <p className="text-base md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-pixel">
                           Ingeniero de Sistemas en formación y Desarrollador Web. Especializado en combinar la lógica del backend y la interactividad del frontend utilizando tecnologías como Laravel, React y Docker.
                        </p>
                     </div>

                     <div className="space-y-4">
                        <div className="flex items-center gap-4">
                           <span className="w-3 h-3 md:w-4 md:h-4 bg-primary pixel-btn"></span>
                           <span className="text-gray-700 dark:text-gray-300 font-pixel text-base md:text-xl">Universidad Continental - Ingeniero de Sistemas e Informatica</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="w-3 h-3 md:w-4 md:h-4 bg-secondary pixel-btn"></span>
                           <span className="text-gray-700 dark:text-gray-300 font-pixel text-base md:text-xl">Universidad Continental - Desarrollo Web Profesional</span>
                        </div>
                        <div className="flex items-center gap-4">
                           <span className="w-3 h-3 md:w-4 md:h-4 bg-accent pixel-btn"></span>
                           <span className="text-gray-700 dark:text-gray-300 font-pixel text-base md:text-xl">Universidad Continental - Full Stack Developer</span>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white font-pixel mb-6">
                        [ SKILLS ]
                     </h3>
                     <div className="flex flex-wrap gap-2 md:gap-3">
                        {skills.map((skill) => (
                           <span
                              key={skill}
                              className="px-3 py-2 md:px-5 md:py-2.5 bg-white/50 dark:bg-white/10 border-2 border-primary/30 rounded-none text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition-all duration-300 cursor-default font-pixel text-sm md:text-lg hover:shadow-[4px_4px_0px_rgba(139,92,246,0.3)]"
                           >
                              {skill}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default About;
