"use client";
import { useState, useEffect } from "react";
import styles from "./PartyAndCandidateToast.module.css";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

export default function PartyAndCandidateToast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {" "}
      {/* Dynamically apply the type (success or error) */}
      <div className={styles.icon}>
        <IoCloseCircle />
      </div>
      <div className={styles.content}>
        <strong className={styles.title}>{type}</strong>
        <p>{message}</p>
      </div>
      <button className={styles.close} onClick={onClose}>
        <IoIosClose />
      </button>
    </div>
  );
}
