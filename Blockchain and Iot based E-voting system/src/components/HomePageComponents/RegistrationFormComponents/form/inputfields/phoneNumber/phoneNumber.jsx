"use client";
import React, { useState } from "react";
import styles from "../InputFields.module.css";

export default function PhoneNumber({ setPhoneNumberValid, setPhoneNumber }) {
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [phoneNumberIsTouched, setPhoneNumberIsTouched] = useState(false);
  const [phoneNumberIsInvalid, setPhoneNumberIsInvalid] = useState(false);

  const handlePhoneNumberValueChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4);
    }
    const formatedValue = value.slice(0, 12);
    setPhoneNumberValue(formatedValue);
    setPhoneNumber(formatedValue);
  };

  function handleBlur() {
    setPhoneNumberIsTouched(true);
    const phonePattern = /^\d{4}-\d{7}$/;
    if (!phonePattern.test(phoneNumberValue)) {
      setPhoneNumberIsInvalid(true);
      setPhoneNumberValid(false);
    } else {
      setPhoneNumberIsInvalid(false);
      setPhoneNumberValid(true);
    }
  }

  return (
    <div
      className={`${styles.userInputContainer} ${
        phoneNumberIsInvalid ? styles.invalid : ""
      }`}
    >
      <input
        className={styles.userInput}
        type="text"
        id="phoneNumberInput"
        required
        placeholder="9999-9999999"
        value={phoneNumberValue}
        onChange={handlePhoneNumberValueChange}
        onBlur={handleBlur}
        pattern="\d{4}-\d{7}"
        title="Please enter a valid phone number in the format 9999-9999999"
      />
      <div className={styles.tooltipContent}>
        <span className={styles.tooltipText}>Enter Number</span>
        <div className={styles.tooltipArrow}></div>
      </div>
      {phoneNumberIsTouched && phoneNumberIsInvalid && (
        <span className={styles.userErrorText}>
          Please Enter Your Phone Number
        </span>
      )}
    </div>
  );
}
