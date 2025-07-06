// pages/election.js
"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ElectionContract from "../../../../../../contractABI/VotingSystem.json";
import { CONTRACT_ADDRESS } from "../../../../../../contractABI/contractAddress";
import styles from "./ElectionControlCenter.module.css";
import { LuAlarmClock } from "react-icons/lu";
import { FaCheck } from "react-icons/fa";
export default function ElectionControlCenter() {
  useEffect(() => {
    getElectionYear();
  }, []);

  const [year, setYear] = useState("");
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

  const getElectionYear = async () => {
    try {
      const contract = await connectContract();
      const currentYear = await contract.getElectionYear();
      const data = await contract.electionYears(currentYear);

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
      alert("Failed to fetch election year details.");
    }
  };

  const setElectionYear = async () => {
    try {
      setLoading(true);
      const contract = await connectContract();
      const tx = await contract.setElectionYear(
        Number(timeFrame.startYear),
        ...Object.values(timeFrame).map(Number)
      );
      await tx.wait();
      alert("Election Time set successfully!");
      await getElectionYear();
    } catch (error) {
      console.error(error);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };
  const setYearForElection = async () => {
    try {
      const contract = await connectContract();
      const tx = await contract.setYear(parseInt(year));
      await tx.wait();
      alert("Election year set successfully!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed");
    }
  };
  // const getElectionYearbyAdmin()
  return (
    <div className={styles.container}>
      <div className={styles.titleRow}>
        <LuAlarmClock className={styles.icon} />
        <h2 className={styles.title}>Set Election Time</h2>
      </div>

      <div className={styles.inputGroup}>
        <h3 className={styles.subTitle}>Election Year</h3>
        <input
          type="number"
          placeholder="Election Year"
          className={styles.input}
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button className={styles.addYear} onClick={setYearForElection}>
          <FaCheck />
        </button>
      </div>

      <div className={styles.timeInputs}>
        <div className={styles.timeSection}>
          <h3 className={styles.subTitle}>Start Election</h3>
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
          <h3 className={styles.subTitle}>End Election</h3>
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
          onClick={setElectionYear}
          className={`${styles.button} ${styles.setTime}`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Set Election Year"}
        </button>
      </div>

      <h2 className={styles.secondaryTitle}>Election Year Details</h2>

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
