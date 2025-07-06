import React from "react";
import styles from "../radio/RadioButtons.module.css";
import { FaMale, FaFemale } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";
export default function CascadeSelectComponent() {
  function handleGenderChange() {
    setGenderSelected(true);
  }
  return (
    <div className={styles.genderRadioInputs}>
      <label>
        <input
          className={styles.genderRadioInput}
          type="radio"
          name="gender"
          onChange={handleGenderChange}
        />
        <span className={styles.radioTile}>
          <span className={styles.radioIcon}>
            {" "}
            <FaMale
              style={{
                fontSize: "1.5rem",
                marginTop: "5px",
                marginLeft: "3px",
              }}
            />
          </span>
          <span className={styles.radioLabel}>Male</span>
        </span>
      </label>
      <label>
        <input
          className={styles.genderRadioInput}
          type="radio"
          name="gender"
          onChange={handleGenderChange}
        />
        <span className={styles.radioTile}>
          <span className={styles.radioIcon}>
            <FaFemale
              style={{
                fontSize: "1.5rem",
                marginTop: "5px",
                marginLeft: "3px",
              }}
            />
          </span>
          <span className={styles.radioLabel}>Female</span>
        </span>
      </label>
      <label>
        <input
          className={styles.genderRadioInput}
          type="radio"
          name="gender"
          onChange={handleGenderChange}
        />
        <span className={styles.radioTile}>
          <span className={styles.radioIcon}>
            <BiMaleFemale
              style={{
                fontSize: "1.5rem",
                marginTop: "5px",
                marginLeft: "3px",
              }}
            />
          </span>
          <span className={styles.radioLabel}>Prefer not to say</span>
        </span>
      </label>
    </div>
  );
}
