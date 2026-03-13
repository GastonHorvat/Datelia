"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function Starfield() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate stars only on the client to prevent hydration mismatch
    const generatedStars = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      // Random blink duration between 2s and 5s
      duration: Math.random() * 3 + 2,
      // Random delay to offset the blinking
      delay: Math.random() * 5,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.1, 0.9, 0.1],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars/Comets */}
      
      {/* Comet 1: Izq a Der, alto en la atmosfera */}
      <motion.div
        className="absolute w-64 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent"
        style={{
          boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.4)",
          transformOrigin: "left center"
        }}
        initial={{ top: "15%", left: "-30%", rotate: 8 }}
        animate={{
          left: "130%",
          top: "40%",
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatDelay: 15,
          ease: "linear",
          delay: 2,
        }}
      />
      
      {/* Comet 2: Der a Izq, altitud media */}
      <motion.div
        className="absolute w-80 h-[2px] bg-gradient-to-l from-transparent via-blue-300 to-transparent"
        style={{
          boxShadow: "0 0 30px 4px rgba(100, 150, 255, 0.5)",
          transformOrigin: "right center"
        }}
        initial={{ top: "35%", right: "-40%", rotate: 5 }}
        animate={{
          right: "130%",
          top: "45%",
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatDelay: 22,
          ease: "linear",
          delay: 8,
        }}
      />
      
      {/* Comet 3: Izq a Der, baja altitud/casi en el horizonte */}
      <motion.div
        className="absolute w-56 h-[2px] bg-gradient-to-r from-transparent via-purple-300 to-transparent"
        style={{
          boxShadow: "0 0 15px 2px rgba(200, 100, 255, 0.4)",
          transformOrigin: "left center"
        }}
        initial={{ top: "60%", left: "-20%", rotate: 2 }}
        animate={{
          left: "120%",
          top: "65%",
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 18,
          ease: "linear",
          delay: 14,
        }}
      />
    </div>
  );
}
