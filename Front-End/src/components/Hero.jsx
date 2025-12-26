import React from 'react';
import PixelBackground from './PixelBackground';

const Hero = () => {
   return (
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
         {/* Background Elements */}
         <PixelBackground />
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none animate-[float_6s_ease-in-out_infinite]" />
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none animate-[float_8s_ease-in-out_infinite_reverse]" />

         <div className="max-w-4xl w-full text-center relative z-10 space-y-8 animate-fade-in">
            <div className="space-y-4">
               <div className="space-y-4">
                  <h2 className="text-primary font-pixel text-2xl tracking-widest animate-slide-up">
                     &lt; PORTFOLIO /&gt;
                  </h2>
                  <h1 className="text-5xl md:text-8xl font-bold tracking-tight animate-slide-up font-pixel" style={{ animationDelay: '0.2s' }}>
                     FRANZ KENNEDY <br />
                     <span className="text-secondary dark:text-accent animate-pulse">AGUILAR CERNA</span>
                  </h1>
                  <p className="text-2xl font-pixel text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-slide-up tracking-wider" style={{ animationDelay: '0.3s' }}>
                     SOFTWARE ENGINEER | FULL STACK DEV
                  </p>
                  <div className="flex gap-3 justify-center text-lg font-pixel text-gray-500 dark:text-gray-400 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                     <span>[ JS ]</span>
                     <span>[ PHP ]</span>
                     <span>[ REACT ]</span>
                     <span>[ NODE ]</span>
                  </div>
               </div>

               <div className="flex gap-6 justify-center animate-slide-up pt-8" style={{ animationDelay: '0.5s' }}>
                  <a
                     href="https://github.com/Fcranz28"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="pixel-btn px-8 py-3 bg-white dark:bg-black text-black dark:text-primary font-pixel text-xl hover:bg-gray-100 dark:hover:bg-gray-900"
                  >
                     GITHUB
                  </a>
                  <a
                     href="https://www.linkedin.com/in/franz-kennedy-aguilar-cerna-5ab72226a/"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="pixel-btn px-8 py-3 bg-primary text-white font-pixel text-xl hover:bg-primary/90"
                  >
                     LINKEDIN
                  </a>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Hero;
