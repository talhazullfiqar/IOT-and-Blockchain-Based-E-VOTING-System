// pages/election.js
"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ElectionContract from "../../../../../../contractABI/VotingSystem.json";
import { CONTRACT_ADDRESS } from "../../.../../../../../../contractABI/contractAddress";
import styles from "../electionControlCenter/ElectionControlCenter.module.css";
import { LuAlarmClock } from "react-icons/lu";

export default function CandidateRegistrationControlCenter() {
  useEffect(() => {
    getCandidateRegistrationYear();
  }, []);

  const [timeFrame, setTimeFrame] = useState({
    startDay: "",
    startMonth: "",
    startYear: "",
    startHour: "",
    endDay: "",
    endMonth: "",
    endYear: "",
    endHour: "",
  });
  const [fetchedTimeFrame, setFetchedTimeFrame] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTimeFrame({ ...timeFrame, [e.target.name]: e.target.value });
  };

  const connectContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ElectionContract.abi, signer);
  };

  const getCandidateRegistrationYear = async () => {
    try {
      const contract = await connectContract();
      const currentYear = await contract.getElectionYear();
      const data = await contract.candidateRegistrationPeriods(currentYear);

      // Ensure response has expected structure
      if (
        data &&
        data.startDay !== undefined &&
        data.startMonth !== undefined &&
        data.startYear !== undefined
      ) {
        setFetchedTimeFrame(data);
      } else {
        alert("No data found for the provided year.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch Registration details.");
    }
  };

  const setCandidateRegistrationYear = async () => {
    try {
      setLoading(true);
      const contract = await connectContract();
      const tx = await contract.setCandidateRegistrationPeriod(
        ...Object.values(timeFrame).map(Number)
      );
      await tx.wait();
      alert("Registration Time set successfully!");
      await getCandidateRegistrationYear();
    } catch (error) {
      console.error(error);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <LuAlarmClock className={styles.icon} />
        <h2 className={styles.title}>Candidate Registration Control Center</h2>
      </div>

      <div className={styles.timeInputs}>
        <div className={styles.timeSection}>
          <h3 className={styles.subTitle}>Start Registration</h3>
          <div className={styles.timeRow}>
            {["startDay", "startMonth", "startYear", "startHour"].map(
              (name) => (
                <div className={styles.timeGroup} key={name}>
                  <input
                    name={name}
                    type="number"
                    placeholder={name.replace("start", "Start ")}
                    className={styles.input}
                    value={timeFrame[name]}
                    onChange={handleChange}
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className={styles.timeSection}>
          <h3 className={styles.subTitle}>End Registration</h3>
          <div className={styles.timeRow}>
            {["endDay", "endMonth", "endYear", "endHour"].map((name) => (
              <div className={styles.timeGroup} key={name}>
                <input
                  name={name}
                  type="number"
                  placeholder={name.replace("end", "End ")}
                  className={styles.input}
                  value={timeFrame[name]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.statusControl}>
        <button
          onClick={setCandidateRegistrationYear}
          className={`${styles.button} ${styles.setTime}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      <h2 className={styles.secondaryTitle}>Registration Details</h2>

      {fetchedTimeFrame && (
        <div className={styles.status}>
          <p>
            <strong>Start:</strong> {fetchedTimeFrame.startDay}/
            {fetchedTimeFrame.startMonth}/{fetchedTimeFrame.startYear} at{" "}
            {fetchedTimeFrame.startHour}:00
          </p>
          <p>
            <strong>End:</strong> {fetchedTimeFrame.endDay}/
            {fetchedTimeFrame.endMonth}/{fetchedTimeFrame.endYear} at{" "}
            {fetchedTimeFrame.endHour}:00
          </p>
        </div>
      )}
    </div>
  );
}
