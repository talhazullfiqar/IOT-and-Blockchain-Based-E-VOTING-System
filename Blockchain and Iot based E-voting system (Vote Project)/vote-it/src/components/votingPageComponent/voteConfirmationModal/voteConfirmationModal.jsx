"use client";
import React from "react";
import styles from "./VoteConfirmationModal.module.css";
import {
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";

export default function VoteConfirmationModal({
  name,
  isOpen,
  handleConfirm,
  handleCancel,
}) {
  return (
    <>
      <div
        className={`${styles.overlay} ${
          isOpen ? styles.visible : styles.invisible
        }`}
      >
        <div
          className={`${styles.modal} ${
            isOpen ? styles.active : styles.inactive
          }`}
        >
          <div className={styles.content}>
            <h2 className={styles.modalTitle}>
              Are you sure to cast vote to the selected {name}?
            </h2>
            <div className={styles.buttonGroup}>
              <button
                onClick={handleCancel}
                className={`${styles.button} ${styles.cancelButton}`}
              >
                <IoCloseCircleOutline className={styles.icon} />
                No
              </button>
              <button
                onClick={handleConfirm}
                className={`${styles.button} ${styles.confirmButton}`}
              >
                <IoCheckmarkCircleOutline className={styles.icon} />
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
