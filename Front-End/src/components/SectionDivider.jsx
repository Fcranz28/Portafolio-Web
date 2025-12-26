import React from 'react';

const SectionDivider = () => {
   return (
      <div className="w-full py-8 flex items-center justify-center pointer-events-none">
         <div className="w-full max-w-4xl px-4 flex items-center gap-4 opacity-50">
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
            <div className="flex gap-2">
               <div className="w-2 h-2 bg-primary animate-pulse"></div>
               <div className="w-2 h-2 bg-secondary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
               <div className="w-2 h-2 bg-accent animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <div className="h-[2px] flex-grow bg-gradient-to-r from-transparent via-gray-400 dark:via-gray-600 to-transparent"></div>
         </div>
      </div>
   );
};

export default SectionDivider;
