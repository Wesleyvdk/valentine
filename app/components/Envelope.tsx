"use client";

import { motion } from "framer-motion";
import styles from "./Envelope.module.css";

interface EnvelopeProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function Envelope({ isOpen, onClick }: EnvelopeProps) {
  return (
    <div className={styles.envelopeContainer}>
      <motion.div
        className={styles.letter}
        initial={{ y: 0, zIndex: 1 }}
        animate={
          isOpen
            ? {
                y: [-160, -140, -160],
                zIndex: 3,
                transition: {
                  y: { repeat: Number.POSITIVE_INFINITY, duration: 2 },
                  zIndex: { delay: 0.5 },
                },
              }
            : { y: 0, zIndex: 1 }
        }
      >
        <div className={styles.letterContent}>
          <span className={styles.letterEmoji}>❤️Linnea</span>
          <h1 className={styles.letterText}>Will you be my Valentine?</h1>
        </div>
      </motion.div>
      <div className={styles.envelope} onClick={onClick}>
        <motion.div
          className={styles.flap}
          initial={false}
          animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
          transition={{ duration: 0.5 }}
        />
        <div className={styles.body} />
      </div>
    </div>
  );
}
