import React, { useEffect, useState } from 'react';

const PixelBackground = () => {
   const [pixels, setPixels] = useState([]);

   useEffect(() => {
      // Generate random pixels
      const pixelCount = 20;
      const newPixels = [];
      for (let i = 0; i < pixelCount; i++) {
         newPixels.push({
            id: i,
            left: Math.random() * 100,
            animationDuration: 5 + Math.random() * 10,
            animationDelay: Math.random() * 5,
            size: 10 + Math.random() * 20,
            color: Math.random() > 0.5 ? 'bg-primary' : 'bg-secondary'
         });
      }
      setPixels(newPixels);
   }, []);

   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
         {pixels.map((pixel) => (
            <div
               key={pixel.id}
               className={`absolute ${pixel.color} opacity-20 dark:opacity-30`}
               style={{
                  left: `${pixel.left}%`,
                  bottom: '-50px',
                  width: `${pixel.size}px`,
                  height: `${pixel.size}px`,
                  animation: `float-pixel ${pixel.animationDuration}s linear infinite`,
                  animationDelay: `${pixel.animationDelay}s`
               }}
            />
         ))}
         <style jsx>{`
            @keyframes float-pixel {
               0% {
                  transform: translateY(0) rotate(0deg);
                  opacity: 0;
               }
               20% {
                  opacity: 0.5;
               }
               80% {
                  opacity: 0.5;
               }
               100% {
                  transform: translateY(-100vh) rotate(360deg);
                  opacity: 0;
               }
            }
         `}</style>
      </div>
   );
};

export default PixelBackground;
