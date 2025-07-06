import { useState, useEffect } from "react";
import styles from "./FingerprintVerificationModal.module.css";

export default function FingerprintVerificationModal({ isOpen, onClose }) {
  const [showVerified, setShowVerified] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowVerified(true);
        const closeTimer = setTimeout(() => {
          onClose();
        }, 2000);
        return () => clearTimeout(closeTimer);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {showVerified ? (
          <h2 className={styles.verifiedText}>Verified</h2>
        ) : (
          <div className={styles.iconContainer}>🔒</div>
        )}
      </div>
    </div>
  );
}
