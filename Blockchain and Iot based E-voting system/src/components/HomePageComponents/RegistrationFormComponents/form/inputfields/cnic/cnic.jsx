"use client";
import React, { useState } from "react";

import styles from "../InputFields.module.css";

export default function CnicComponent({ setCnicValid, setCnic }) {
  const [cnicValue, setCnicValue] = useState("");
  const [cnicIsTouched, setcnicIsTouched] = useState(false);
  const [cnicIsInvalid, setcnicIsInvalid] = useState(false);

  const handleCnicChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5);
    }
    if (value.length > 13) {
      value = value.slice(0, 13) + "-" + value.slice(13);
    }
    const formattedValue = value.slice(0, 15);
    setCnicValue(formattedValue);

    if (setCnic) {
      setCnic(formattedValue);
    }
  };
  function handleBlur() {
    setcnicIsTouched(true);
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
    if (!cnicPattern.test(cnicValue)) {
      setcnicIsInvalid(true);
      setCnicValid(false);
    } else {
      setcnicIsInvalid(false);
      setCnicValid(true);
    }
  }
  return (
    <div
      className={`${styles.userInputContainer} ${
        cnicIsInvalid ? styles.invalid : ""
      }`}
    >
      <input
        className={styles.userInput}
        type="text"
        id="cnicInput"
        required
        placeholder="99999-9999999-9"
        value={cnicValue}
        onChange={handleCnicChange}
        onBlur={handleBlur}
        pattern="\d{5}-\d{7}-\d{1}"
        title="Please enter a valid CNIC in the format 99999-9999999-9"
      />
      <div className={styles.tooltipContent}>
        <span className={styles.tooltipText}>Enter CNIC</span>
        <div className={styles.tooltipArrow}></div>
      </div>
      {cnicIsTouched && cnicIsInvalid && (
        <span className={styles.userErrorText}>Please Enter CNIC</span>
      )}
    </div>
  );
}
