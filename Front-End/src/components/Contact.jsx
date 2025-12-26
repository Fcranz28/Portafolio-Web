import React from 'react';
import PixelBackground from './PixelBackground';

const Contact = () => {
   return (
      <section className="py-10 px-4 relative overflow-hidden">
         <PixelBackground />
         {/* Decorative background */}
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />

         <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
               <h2 className="text-3xl font-bold text-gray-800 dark:text-white font-pixel">&lt; CONTACT_ME /&gt;</h2>
               <div className="h-1 w-24 bg-primary mx-auto" />
               <p className="text-gray-600 dark:text-gray-300 font-pixel text-xl">
                  [ START_NEW_PROJECT ]
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {/* Email */}
               <a
                  href="mailto:franzaguilar28@gmail.com"
                  className="pixel-card p-6 md:p-8 flex flex-col items-center gap-4 md:gap-6 bg-white dark:bg-black/50 group no-underline"
               >
                  <div className="p-4 md:p-6 border-2 border-primary bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="md:w-8 md:h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                        <rect width="20" height="16" x="2" y="4" rx="0" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                     </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white font-pixel text-xl md:text-2xl">GMAIL</h3>
                  <span className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-pixel break-all">franzaguilar28@gmail.com</span>
               </a>

               {/* LinkedIn */}
               <a
                  href="https://www.linkedin.com/in/franz-kennedy-aguilar-cerna-5ab72226a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-card p-6 md:p-8 flex flex-col items-center gap-4 md:gap-6 bg-white dark:bg-black/50 group no-underline"
               >
                  <div className="p-4 md:p-6 border-2 border-secondary bg-secondary/5 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="md:w-8 md:h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><path d="M2 9h4v12H2z" /><circle cx="4" cy="4" r="2" />
                     </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white font-pixel text-xl md:text-2xl">LINKEDIN</h3>
                  <span className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-pixel">Franz Aguilar</span>
               </a>

               {/* Phone */}
               <a
                  href="tel:+51941451076"
                  className="pixel-card p-6 md:p-8 flex flex-col items-center gap-4 md:gap-6 bg-white dark:bg-black/50 group no-underline"
               >
                  <div className="p-4 md:p-6 border-2 border-accent bg-accent/5 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" class="md:w-8 md:h-8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                     </svg>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-white font-pixel text-xl md:text-2xl">N° de Contacto</h3>
                  <span className="text-base md:text-lg text-gray-600 dark:text-gray-400 font-pixel">+51 941 451 076</span>
               </a>
            </div>

            <footer className="pt-12 text-center text-gray-500 text-sm border-t border-gray-200 mt-12">
               <p>&copy; {new Date().getFullYear()} Franz Kennedy Aguilar Cerna. Todos los derechos reservados.</p>
            </footer>
         </div>
      </section>
   );
};

export default Contact;
