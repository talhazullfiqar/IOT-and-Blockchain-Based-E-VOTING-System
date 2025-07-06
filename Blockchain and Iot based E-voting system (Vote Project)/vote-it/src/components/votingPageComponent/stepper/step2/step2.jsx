"use client";
import React, { useEffect, useState } from "react";
import CandidateCard from "../../candidateCard/candidateCard";
import styles from "../StepsStyling.module.css";
import { getCandidatesByPost } from "../getCandidatesbypost";

export default function Step2({ selected, onSelect }) {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const result = await getCandidatesByPost(1); // 1 = MPA
      setCandidates(result);
    };
    fetchCandidates();
  }, []);

  return (
    <div>
      <h1 className={styles.CandidateHeader}>Select your Candidate for MPA</h1>
      <div className={styles.CandidateCardContainer}>
        {candidates.map((cand) => (
          <CandidateCard
            key={cand.wallet}
            candidateName={cand.name}
            partyName={cand.party}
            candidateImage={cand.image}
            partySign={cand.partySymbol}
            isSelected={selected?.wallet === cand.wallet}
            onSelect={() => onSelect(cand)}
          />
        ))}
      </div>
    </div>
  );
}
