import React from "react";
import styles from "./RadioButtons.module.css";
import { FaMale, FaFemale } from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";

export default function RadioButtons({ setGenderSelected, setGender }) {
  function handleGenderChange(event) {
    setGenderSelected(true);
    const gender = event.target.value;
    console.log(`Gender is = ${gender} with Type of ${typeof gender}`);
    setGender(gender);
  }

  return (
    <div className={styles.genderRadioInputs}>
      <label>
        <input
          className={styles.genderRadioInput}
          type="radio"
          name="gender"
          value="male"
          onChange={handleGenderChange}
        />
        <span className={styles.radioTile}>
          <span className={styles.radioIcon}>
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
          value="female"
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
          value="Prefer not to say"
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
