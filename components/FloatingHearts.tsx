import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: 0, opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 0],
            x: [0, Math.random() * 50 - 25, 0]
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
          }}
        >
          <Heart 
            className="text-pink-300 opacity-30" 
            size={Math.random() * 30 + 10} 
            fill="currentColor" 
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;