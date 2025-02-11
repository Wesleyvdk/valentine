"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Hearts.module.css";

interface Heart {
  id: number;
  size: number;
  left: number;
  delay: number;
  angle: number;
}

export function Hearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const numberOfHearts = 500;
    const newHearts = Array.from({ length: numberOfHearts }, (_, i) => ({
      id: i,
      // Random size between 10px and 30px
      size: Math.random() * 20 + 10,
      // Random starting position along the width of the screen
      left: Math.random() * 100,
      // Random delay for staggered animation
      delay: Math.random() * 20,
      // Random angle between 45° and 135° (upward directions)
      angle: Math.random() * 90 + 45,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className={styles.heartsContainer}>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={styles.heart}
          initial={{
            bottom: -100,
            left: `${heart.left}%`,
            width: heart.size,
            height: heart.size,
          }}
          animate={{
            bottom: "100vh",
            x: Math.tan((heart.angle * Math.PI) / 180) * 300, // Convert angle to movement
          }}
          transition={{
            duration: 4,
            delay: heart.delay,
            ease: "linear",
          }}
          style={{
            fontSize: heart.size,
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}
