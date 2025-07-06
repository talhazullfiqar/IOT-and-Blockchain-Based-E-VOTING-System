"use client";
import { useState } from "react";
import styles from "../InputFields.module.css";

export default function WalletAddress({
  name,
  setWalletAddressValidity,
  setWalletAddress,
}) {
  const [walletInputValue, setWalletInputValue] = useState("");
  const [walletInputIsTouched, setWalletInputIsTouched] = useState(false);
  const [walletInputIsInvalid, setWalletInputIsInvalid] = useState(false);
  const [walletErrorMessage, setWalletErrorMessage] = useState("");

  function validateWalletAddress(address) {
    const regex = /^(0x)?[0-9a-fA-F]{40}$/;
    return regex.test(address);
  }

  function handleChange(e) {
    const rawValue = e.target.value;
    const value = rawValue.replace(/\s+/g, "");

    let newErrorMessage = "";

    if (!/^0x/.test(value)) {
      newErrorMessage = "Address must start with '0x'.";
    } else if (!validateWalletAddress(value)) {
      newErrorMessage = "Invalid Ethereum address format.";
    }

    setWalletErrorMessage(newErrorMessage);
    setWalletInputValue(value);

    if (newErrorMessage || value.trim() === "") {
      setWalletInputIsInvalid(true);
      setWalletAddressValidity(false);
    } else {
      setWalletInputIsInvalid(false);
      setWalletAddressValidity(true);
    }
    if (setWalletAddress) {
      setWalletAddress(value);
    }
  }

  function handleBlur() {
    setWalletInputIsTouched(true);
    if (walletInputValue.trim() === "") {
      setWalletInputIsInvalid(true);
      setWalletErrorMessage("Please enter a wallet address.");
      setWalletAddressValidity(false);
    }
  }

  return (
    <>
      <div
        className={`${styles.userInputContainer} ${
          walletInputIsInvalid || walletErrorMessage ? styles.invalid : ""
        }`}
      >
        <input
          className={styles.userInput}
          type="text"
          id="walletInput"
          required
          value={walletInputValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label htmlFor="walletInput" className={styles.label}>
          {name}
        </label>
        <div className={styles.tooltipContent}>
          <span className={styles.tooltipText}>{name}</span>
          <div className={styles.tooltipArrow}></div>
        </div>
        {walletInputIsTouched &&
          (walletInputIsInvalid || walletErrorMessage) && (
            <span className={styles.userErrorText}>
              {walletErrorMessage || "Please enter a valid wallet address."}
            </span>
          )}
      </div>
    </>
  );
}
