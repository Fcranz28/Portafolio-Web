
import React, { useState } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import PixelBackground from './PixelBackground';

// Import CSS for custom dark mode support if needed, though we can wrap it
// Worker version must match pdfjs-dist version
const WORKER_URL = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

const Certifications = () => {
   const [selectedCert, setSelectedCert] = useState(null);
   const defaultLayoutPluginInstance = defaultLayoutPlugin();

   const certs = [
      {
         title: "Desarrollo Web Profesional",
         issuer: "Universidad Continental Post-Grado",
         date: "2025",
         file: "/certificates/DesarrolloWeb.pdf"
      },
      {
         title: "Full Stack Developer",
         issuer: "Universidad Continental Post-Grado",
         date: "2025",
         file: "/certificates/FullStackPHP.pdf"
      }
   ];

   return (
      <section className="py-10 px-4 relative overflow-hidden">
         <PixelBackground />
         <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white font-pixel">
                  &lt; CERTIFICACIONES /&gt;
               </h2>
               <div className="h-1 w-24 bg-primary mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {certs.map((cert) => (
                  <div key={cert.title} className="pixel-card p-6 md:p-8 bg-white dark:bg-black/40 flex flex-col items-center text-center gap-4 md:gap-6 group">
                     <div className="p-4 md:p-6 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-2 group-hover:scale-110 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" class="md:w-10 md:h-10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                           <path d="M12 15l-2 5l2 2l2 -2l-2 -5" />
                           <circle cx="12" cy="9" r="7" />
                           <path d="M12 9h-2" />
                           <path d="M12 9v3" />
                           <path d="M12 9h.01" />
                        </svg>
                     </div>

                     <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white font-pixel">
                        {cert.title}
                     </h3>

                     <div className="text-base md:text-lg font-pixel text-gray-600 dark:text-gray-400">
                        <p>{cert.issuer}</p>
                        <p>{cert.date}</p>
                     </div>

                     <button
                        onClick={() => setSelectedCert(cert)}
                        className="mt-4 pixel-btn px-6 py-2 md:px-8 md:py-3 bg-secondary text-white font-pixel text-base md:text-lg hover:bg-secondary/90 no-underline cursor-pointer"
                     >
                        VER CERTIFICACIÓN
                     </button>
                  </div>
               ))}
            </div>
         </div>

         {/* PDF Modal */}
         {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedCert(null)}>
               <div className="bg-white dark:bg-gray-900 w-full max-w-5xl h-[85vh] pixel-card p-2 relative flex flex-col" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center p-2 mb-2 border-b-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black/20">
                     <h3 className="text-lg font-pixel font-bold text-gray-800 dark:text-white px-2">{selectedCert.title}</h3>
                     <button
                        onClick={() => setSelectedCert(null)}
                        className="p-2 hover:bg-red-500 hover:text-white transition-colors border-2 border-transparent hover:border-black dark:hover:border-white"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                           <line x1="18" y1="6" x2="6" y2="18"></line>
                           <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                     </button>
                  </div>

                  <div className="flex-1 overflow-hidden relative bg-gray-100 dark:bg-gray-800">
                     <Worker workerUrl={WORKER_URL}>
                        <Viewer
                           fileUrl={selectedCert.file}
                           plugins={[defaultLayoutPluginInstance]}
                           theme={{
                              theme: 'auto', // Auto-detect theme or use explicit 'dark'/'light'? Sticky with light for PDF readability usually better, but let's try.
                           }}
                        />
                     </Worker>
                  </div>
               </div>
            </div>
         )}
      </section>
   );
};

export default Certifications;
