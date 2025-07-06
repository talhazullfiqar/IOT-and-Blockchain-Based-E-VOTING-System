import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../../../../../../contractABI/contractAddress";
import ContractAbi from "../../../../../../../contractABI/VotingSystem.json";
import "./liveVotingIndicator.css";

export default function LiveVotingIndicator() {
  const [isElectionYear, setIsElectionYear] = useState(true); // default to TRUE
  useEffect(() => {
    getCandidateElectionYear();
  }, []);
  const connectContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ContractAbi.abi, signer);
  };
  const getCandidateElectionYear = async () => {
    try {
      const contract = await connectContract();
      const currentYear = await contract.getElectionYear();
      console.log(currentYear);
      const data = await contract.electionYears(currentYear);
      const year = Number(data.startYear);
      const timeFrame = await contract.getElectionYearTimeFrame(year);
      const [
        startDay,
        startMonth,
        startYear,
        startHour,
        endDay,
        endMonth,
        endYear,
        endHour,
      ] = timeFrame.map((v) => Number(v));

      console.log("Election Time Frame:", {
        startDay,
        startMonth,
        startYear,
        startHour,
        endDay,
        endMonth,
        endYear,
        endHour,
      });
      // Ensure response has expected structure
      if (year === 0 && startMonth === 0 && startYear === 0) {
        setIsElectionYear(false);
      }
      if (year !== 0 && startMonth !== 0 && startYear !== 0) {
        setIsElectionYear(true);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch election year details.");
    }
  };
  return (
    <>
      {isElectionYear ? (
        <div className="live-card">
          <div className="live-content">
            <div>
              <div className="live-loader">
                <div className="live-circle live-red">
                  <div className="live-dot"></div>
                  <div className="live-outline"></div>
                </div>
              </div>
            </div>
            <h1 className="live-heading">Voting Live</h1>
          </div>
        </div>
      ) : null}
    </>
  );
}
