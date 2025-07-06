"use client";
import React, { useState, useEffect } from "react";
import TotalVotersCount from "../personalConstituencyResultsDashboard/totalVotersCount/totalVotersCount";
import styles from "./OverallCountryResultsDashboard.module.css";
import { FaVoteYea } from "react-icons/fa";
import NationalAssemblyResults from "./assemblyTavs/nationalAssemblyResults";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../../../../../../contractABI/contractAddress";
import ContractAbi from "../../../../../../../contractABI/VotingSystem.json";

export default function OverallCountryResultsDashboard() {
  const [year, setYear] = useState(null);
  const [totalMNA, setTotalMNA] = useState(0);
  const [totalMPA, setTotalMPA] = useState(0);
  const [voterTurnOut, setVoterTurnOut] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ContractAbi.abi,
          signer
        );

        // Get current election year
        const electionYear = await contract.getElectionYear();
        setYear(electionYear.toString());

        // Fetch all candidate addresses
        const allCandidateAddresses = await contract.getAllCandidates();

        let mnaCount = 0;
        let mpaCount = 0;

        // Loop through all candidates and count MNA / MPA
        for (const address of allCandidateAddresses) {
          const candidate = await contract.getCandidate(address);
          if (candidate.seatType === "MNA") {
            mnaCount++;
          } else if (candidate.seatType === "MPA") {
            mpaCount++;
          }
        }

        setTotalMNA(mnaCount);
        setTotalMPA(mpaCount);

        // Get turnout ratio and clamp to 100%
        let turnout = await contract.getTurnoutRatio(electionYear);
        turnout = Number(turnout);
        if (turnout > 100) turnout = 100;
        setVoterTurnOut(turnout);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className={styles.votingYearContainer}>
        <FaVoteYea className={styles.votingYearIcon} />
        <p className={styles.votingYearMessage}>Pakistan Elections {year}</p>
      </div>

      <div className={styles.totalCountsContainer}>
        <TotalVotersCount
          heading="Total MNA Candidates"
          count={totalMNA}
          subheading="Total MNA Candidates all over Country"
        />
        <TotalVotersCount
          heading="Total MPA Candidates"
          count={totalMPA}
          subheading="Total MPA Candidates all over Country"
        />
        <TotalVotersCount
          heading="Voter Turnout"
          count={`${voterTurnOut}%`}
          subheading="Total Registered Voters this year in Country"
        />
      </div>

      <div>
        <NationalAssemblyResults />
      </div>
    </>
  );
}
