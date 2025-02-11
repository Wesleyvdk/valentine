"use client";

import { useState } from "react";
import Envelope from "./components/Envelope";
import styles from "./page.module.css";

export default function ValentinesProposal() {
  const [isOpen, setIsOpen] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleEnvelopeClick = () => {
    setIsOpen(true);
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  const submitReply = async (answer: string) => {
    try {
      const response = await fetch("/api/submit-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        console.error("Failed to submit reply");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  return (
    <main className={styles.main}>
      <Envelope isOpen={isOpen} onClick={handleEnvelopeClick} />
      {isOpen && !submitted && (
        <div className={styles.buttons}>
          <button
            className={styles.yesButton}
            style={{
              fontSize: `${1 + noCount * 0.1}rem`,
              width: `${100 + noCount * 10}px`,
              height: `${40 + noCount * 5}px`,
            }}
            onClick={() => submitReply("Yes")}
          >
            Yes
          </button>
          <button
            className={styles.noButton}
            onClick={() => {
              handleNoClick();
              if (noCount >= 5) {
                submitReply("No");
              }
            }}
            style={{ width: `${100 - noCount * 5}px` }}
          >
            No
          </button>
        </div>
      )}
      {submitted && (
        <div className={styles.confirmation}>
          <h2>Thank you for your reply!</h2>
        </div>
      )}
    </main>
  );
}
