"use client";
import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import styles from "./Calender.module.css";

export default function CalenderComponent({
  setDateSelected,
  setBirthYear,
  setBirthMonth,
  setBirthDay,
}) {
  const [date, setDate] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const currentDate = new Date();

  const handleDateChange = (e) => {
    const selectedDate = e.value;
    setDate(selectedDate);
    if (selectedDate) {
      setDateSelected(true);
      const year = selectedDate.getFullYear().toString(); // e.g., "2025"
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0"); // e.g., "05"
      const day = selectedDate.getDate().toString().padStart(2, "0"); // e.g., "15"
      setBirthYear(year);
      setBirthMonth(month);
      setBirthDay(day);
    } else {
      setDateSelected(false);
      setBirthYear("");
      setBirthMonth("");
      setBirthDay("");
    }
  };

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <div
        className={styles.calendarContainer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Calendar
          value={date}
          onChange={handleDateChange}
          maxDate={currentDate}
          className={styles.calendarInput}
        />
        {showTooltip && (
          <div className={styles.calendarTooltipContent}>
            <span className={styles.calendarTooltipText}>
              Enter your Date of Birth
            </span>
            <div className={styles.calendarTooltipArrow}></div>
          </div>
        )}
      </div>
    </>
  );
}
