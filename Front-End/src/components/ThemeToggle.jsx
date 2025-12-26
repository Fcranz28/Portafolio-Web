import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
   const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

   useEffect(() => {
      if (theme === 'dark') {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
   }, [theme]);

   const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
   };

   return (
      <button
         onClick={toggleTheme}
         className="p-2 border-2 border-current rounded-none hover:bg-black/5 dark:hover:bg-white/10 transition-colors font-pixel text-xl"
         aria-label="Toggle Theme"
      >
         {theme === 'light' ? '🌙' : '☀️'}
      </button>
   );
};

export default ThemeToggle;
