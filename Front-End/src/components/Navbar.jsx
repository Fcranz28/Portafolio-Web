import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
   const [scrolled, setScrolled] = useState(false);
   const [menuOpen, setMenuOpen] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY > 50);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
   }, []);

   // Lock body scroll when menu is open
   useEffect(() => {
      if (menuOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'unset';
      }
      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [menuOpen]);

   const links = [
      { name: 'Inicio', href: '#hero' },
      { name: 'Sobre Mí', href: '#about' },
      { name: 'Proyectos', href: '#projects' },
      { name: 'Certificados', href: '#certifications' },
      { name: 'Contacto', href: '#contact' },
   ];

   return (
      <nav
         className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-4 ${scrolled
            ? 'bg-white/90 dark:bg-black/90 backdrop-blur-md py-2 border-black dark:border-primary'
            : 'bg-transparent py-4 border-transparent'
            } `}
      >
         <div className="max-w-6xl mx-auto px-4 flex justify-between md:justify-center items-center relative">
            {/* Mobile Menu Button - Visible on Mobile */}
            <button
               className="md:hidden text-gray-800 dark:text-white p-2"
               onClick={() => setMenuOpen(!menuOpen)}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
               </svg>
            </button>

            {/* Mobile Menu Overlay */}
            <div className={`
               fixed inset-0 bg-white dark:bg-black z-[100] flex flex-col items-center justify-center gap-8 transition-transform duration-300 md:hidden
               ${menuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
               <button
                  className="absolute top-6 right-6 text-gray-800 dark:text-white p-2"
                  onClick={() => setMenuOpen(false)}
               >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                     <line x1="18" y1="6" x2="6" y2="18"></line>
                     <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
               </button>
               <ul className="flex flex-col gap-8 text-center">
                  {links.map((link) => (
                     <li key={link.name}>
                        <a
                           href={link.href}
                           onClick={() => setMenuOpen(false)}
                           className="text-3xl font-pixel text-gray-800 dark:text-white hover:text-primary uppercase tracking-wider block"
                        >
                           {link.name}
                        </a>
                     </li>
                  ))}
               </ul>
            </div>

            {/* Desktop Menu */}
            <div className="flex items-center gap-8">
               <ul className="hidden md:flex gap-8">
                  {links.map((link) => (
                     <li key={link.name}>
                        <a
                           href={link.href}
                           className="text-xl font-pixel text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-secondary uppercase tracking-wider relative group"
                        >
                           {link.name}
                           <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full" />
                        </a>
                     </li>
                  ))}
               </ul>
               <ThemeToggle />
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
