import React, { useState, useEffect } from 'react';
import PixelBackground from './PixelBackground';

const Projects = () => {
   const [repos, setRepos] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      fetch('https://api.github.com/users/Fcranz28/repos')
         .then(response => response.json())
         .then(data => {
            // Sort by most recently updated
            const sorted = Array.isArray(data)
               ? data.filter(repo => repo.name !== 'CV').sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
               : [];
            setRepos(sorted);
            setLoading(false);
         })
         .catch(error => {
            console.error('Error fetching repos:', error);
            setLoading(false);
         });
   }, []);

   return (
      <section className="py-10 px-4 relative overflow-hidden">
         <PixelBackground />
         <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white font-pixel">
                  &lt; PROYECTOS /&gt;
               </h2>
               <div className="h-1 w-24 bg-primary mx-auto" />
            </div>

            {loading ? (
               <div className="text-center font-pixel text-xl animate-pulse text-gray-600 dark:text-gray-300">
                  LOADING_DATA...
               </div>
            ) : (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {repos.map((repo) => (
                     <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-card p-6 md:p-8 bg-white dark:bg-black/40 flex flex-col h-full group no-underline"
                     >
                        <div className="flex justify-between items-start mb-4 md:mb-6 border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-3 md:pb-4">
                           <h3 className="text-xl md:text-2xl font-bold text-primary font-pixel truncate w-full">
                              {repo.name.toUpperCase()}
                           </h3>
                           <span className="text-xs md:text-sm font-pixel text-gray-500 bg-gray-200 dark:bg-gray-800 px-2 md:px-3 py-1 ml-2">
                              public
                           </span>
                        </div>

                        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6 md:mb-8 flex-grow font-pixel leading-relaxed">
                           {repo.description || "NO_DESCRIPTION_AVAILABLE"}
                        </p>

                        <div className="flex justify-between items-center text-sm md:text-base font-pixel text-gray-500 dark:text-gray-400">
                           <span className="flex items-center gap-2 md:gap-3">
                              <span className="w-2 h-2 md:w-3 md:h-3 bg-secondary block"></span>
                              {repo.language || "N/A"}
                           </span>
                           <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                        </div>
                     </a>
                  ))}
               </div>
            )}
         </div>
      </section>
   );
};

export default Projects;
