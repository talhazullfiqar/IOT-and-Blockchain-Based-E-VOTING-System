"use client";
import { useEffect, useState } from "react";
import styles from "./PersonalConstituencyResultsDashboard.module.css";
import TotalVotersCount from "./totalVotersCount/totalVotersCount";
import { DashboardPieChart } from "../../voterDashboardComponents/charts/pieChart/pieChart";
import { DashboardLineChart } from "../../voterDashboardComponents/charts/lineChart/lineChart";
import CandidatesLists from "../../voterDashboardComponents/lists/dashboardCandidatesLists";
import { FaVoteYea } from "react-icons/fa";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../../../../../../contractABI/contractAddress";
import ContractAbi from "../../../../../../../contractABI/VotingSystem.json";
import {
  getCurrentDayOfYear,
  getCurrentMonth,
  getCurrentYear,
  getCurrentHour12,
  getCurrentMinute,
  getCurrentAMPM,
  getCurrentDayOfMonth,
} from "../../../../../../../Check_Of_Time/timeCheck";

export default function PersonalConstituencyResultsDashboard() {
  const [year, setYear] = useState(null);
  const [totalVoters, setTotalVoters] = useState(0);
  const [maleVoters, setMaleVoters] = useState(0);
  const [femaleVoters, setFemaleVoters] = useState(0);
  const [constituency, setConstituency] = useState("");
  const [mnaVotesByParty, setMnaVotesByParty] = useState([]);
  const [mpaVotesByParty, setMpaVotesByParty] = useState([]);
  const [allCandidates, setAllCandidates] = useState([]);

  function getRandomColor() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const currentYear = getCurrentYear();
      const currentMonth = getCurrentMonth();
      const currentDayOfYear = getCurrentDayOfMonth();
      const currentHour = getCurrentHour12();
      const currentMinute = getCurrentMinute();
      const AMorPM = getCurrentAMPM();
      console.log(
        `Current year: ${currentYear} 
        and current day of Month: ${currentDayOfYear}
        and current month:${currentMonth}
        and current Hour: ${currentHour}
        and current Minute: ${currentMinute}
        and AM OR PM: ${AMorPM}`
      );

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ContractAbi.abi,
          signer
        );

        const electionYear = await contract.getElectionYear();
        const voter = await contract.getVoter(userAddress);
        const voterConstituency = voter.constituency;

        setYear(electionYear.toString());
        setConstituency(voterConstituency);

        const male = await contract.getVoterCountByConstituency(
          voterConstituency,
          "male"
        );
        const female = await contract.getVoterCountByConstituency(
          voterConstituency,
          "female"
        );
        const total = Number(male) + Number(female);
        setMaleVoters(male.toString());
        setFemaleVoters(female.toString());
        setTotalVoters(total.toString());

        const [partyCandidates, independentCandidates] =
          await contract.getCandidatesByConstituency();

        const all = [...partyCandidates, ...independentCandidates];
        setAllCandidates(all);

        const groupVotesByParty = (candidates, seatType) => {
          const grouped = {};
          candidates.forEach((c) => {
            if (c.seatType !== seatType) return;
            const party = c.partyName || "Independent";
            if (!grouped[party]) {
              grouped[party] = { votes: 0, color: getRandomColor() };
            }
            grouped[party].votes += Number(c.voteCount);
          });

          return Object.entries(grouped).map(([party, data]) => ({
            candidates: party,
            votes: data.votes,
            fill: data.color,
          }));
        };

        setMnaVotesByParty(groupVotesByParty(all, "MNA"));
        setMpaVotesByParty(groupVotesByParty(all, "MPA"));
      } catch (error) {
        console.error("Error:", error);
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
          heading={`Total Voters (${constituency})`}
          count={totalVoters}
          subheading={`Total Registered Voters in ${constituency}`}
        />
        <TotalVotersCount
          heading={`Total Male Voters (${constituency})`}
          count={maleVoters}
          subheading={`Registered Male Voters in ${constituency}`}
        />
        <TotalVotersCount
          heading={`Total Female Voters (${constituency})`}
          count={femaleVoters}
          subheading={`Registered Female Voters in ${constituency}`}
        />
      </div>

      <div className={styles.totalCountsContainer}>
        <DashboardPieChart cardTtile="MNA" data={mnaVotesByParty} />
        <DashboardLineChart title="MNA Votes Count" data={mnaVotesByParty} />
      </div>

      <div className={styles.totalCountsContainer}>
        <DashboardLineChart title="MPA Votes Count" data={mpaVotesByParty} />
        <DashboardPieChart cardTtile="MPA" data={mpaVotesByParty} />
      </div>

      <div className={styles.totalCountsContainer}>
        <CandidatesLists candidates={allCandidates} />
      </div>
    </>
  );
}
