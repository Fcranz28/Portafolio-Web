import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, className = '' }) => {
   const [isVisible, setIsVisible] = useState(false);
   const ref = useRef(null);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               setIsVisible(true);
               observer.unobserve(entry.target);
            }
         },
         {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully in view
         }
      );

      if (ref.current) {
         observer.observe(ref.current);
      }

      return () => {
         if (ref.current) {
            observer.unobserve(ref.current);
         }
      };
   }, []);

   return (
      <div
         ref={ref}
         className={`${className} transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
      >
         {children}
      </div>
   );
};

export default ScrollReveal;
