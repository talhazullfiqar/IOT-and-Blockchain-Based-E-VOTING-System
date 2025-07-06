"use client";
import { useState } from "react";
import Timer from "./timer/timer";
import VotingClockSVG from "@/assets/svgs/voteDetailsPageSVGS/votingClockSVG";
import styles from "./VoteDetails.module.css";
import VoterDashboard from "./dashBoard/voterDashboard/voterDashboard";
export default function VoteDetailsDashboardPage() {
  const [timerEnded, setTimerEnded] = useState(true);
  const handleTimerEnd = () => {
    setTimerEnded(true);
  };

  return (
    <>
      {!timerEnded ? (
        <div className={styles.timerContainer}>
          <div className={styles.timerCard}>
            <div className={styles.votingClockSVG}>
              <VotingClockSVG />
            </div>
            <div>
              <div className={styles.timerTextContainer}>
                <h1 className={styles.timerText}>
                  Get Ready<span style={{ color: "#17b4d3" }}> Voting </span>
                  will begin in
                </h1>
              </div>
              <div className={styles.timerComponent}>
                <Timer onEnd={handleTimerEnd} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <VoterDashboard />
      )}
    </>
  );
}
