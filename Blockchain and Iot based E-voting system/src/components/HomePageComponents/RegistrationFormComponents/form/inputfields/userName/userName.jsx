"use client";
import { useState } from "react";
import styles from "../InputFields.module.css";

export default function UserName({ name, setUserNameValidity, setUserName }) {
  const [userNameinputValue, setuserNameinputValue] = useState("");
  const [userNameinputIsTouched, setUserNameinputIsTouched] = useState(false);
  const [userNameinputIsInvalid, setUserNameinputIsInvalid] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");

  function handleChange(e) {
    let value = e.target.value;
    let newErrorMessage = "";

    if (/^[a-z]/.test(value)) {
      newErrorMessage = "The first letter should be capitalized.";
    } else if (/[^a-zA-Z0-9]/.test(value)) {
      newErrorMessage = "Special characters or spaces are not allowed.";
    }

    setUserNameErrorMessage(newErrorMessage);

    // Remove special characters and spaces (keep only letters and numbers)
    value = value.replace(/[^a-zA-Z0-9]/g, "");

    setuserNameinputValue(value);

    if (value.trim() === "") {
      setUserNameinputIsInvalid(true);
      setUserNameValidity(false);
    } else {
      setUserNameinputIsInvalid(false);
      setUserNameValidity(true);
    }

    if (setUserName) {
      setUserName(value);
    }
  }

  function handleBlur() {
    setUserNameinputIsTouched(true);
    if (userNameinputValue.trim() === "") {
      setUserNameinputIsInvalid(true);
      setUserNameErrorMessage("Please Enter a valid Input");
      setUserNameValidity(false);
    }
  }

  return (
    <>
      <div
        className={`${styles.userInputContainer} ${
          userNameinputIsInvalid || userNameErrorMessage ? styles.invalid : ""
        }`}
      >
        <input
          className={styles.userInput}
          type="text"
          id="input"
          required
          value={userNameinputValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label htmlFor="input" className={styles.label}>
          {name}
        </label>
        <div className={styles.tooltipContent}>
          <span className={styles.tooltipText}>{name}</span>
          <div className={styles.tooltipArrow}></div>
        </div>
        {userNameinputIsTouched &&
          (userNameinputIsInvalid || userNameErrorMessage) && (
            <span className={styles.userErrorText}>
              {userNameErrorMessage || "Please Enter a valid Input"}
            </span>
          )}
      </div>
    </>
  );
}
