"use client";
import React from "react";
import styles from "./CandidateCard.module.css";
import Image from "next/image";

export default function CandidateCard({
  candidateName,
  partyName,
  partySign,
  candidateImage,
  isSelected = false,
  onSelect,
}) {
  return (
    <div className={styles.CandidateCardInputs}>
      <label>
        <input
          className={styles.CandidateCardInput}
          type="radio"
          name="candidate"
          checked={isSelected}
          onChange={onSelect}
        />
        <span className={styles.CardTile}>
          <span className={styles.candidateName}>{candidateName}</span>
          <Image
            className={styles.CandidateProfileCard}
            src={
              candidateImage
                ? `https://gateway.pinata.cloud/ipfs/${candidateImage}`
                : "/fallback.jpg"
            }
            alt={candidateName}
            width={170}
            height={100}
            quality={100}
            priority
          />
          <div className={styles.partyDetails}>
            <span className={styles.partyName}>{partyName}</span>
            <Image
              className={styles.partySign}
              src={
                partySign
                  ? `https://gateway.pinata.cloud/ipfs/${partySign}`
                  : "/fallback.jpg"
              }
              alt={partySign}
              width={50}
              height={80}
              quality={100}
              priority
            />
          </div>
        </span>
      </label>
    </div>
  );
}
