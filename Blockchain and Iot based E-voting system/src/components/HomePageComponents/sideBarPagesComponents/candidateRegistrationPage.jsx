"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../contractABI/contractAddress";
import ContractAbi from "../../contractABI/VotingSystem.json";
import "./dashboardPagesComponents.css";
import StepperComponent from "../RegistrationFormComponents/stepper/stepper";
import UserRegisteredPannel from "./userRegisteredPannelComponent/userRegisteredPannel";
import RegistrationClosedPannel from "./userRegisteredPannelComponent/registrationClosedPannel";
export default function CandidateRegistrationPage() {
  // STATES
  const [
    isCandidateRegistrationFormVisible,
    setCandidateRegistrationFormVisibility,
  ] = useState(true);
  const [isElectionYear, setIsElectionYear] = useState(true);
  // USEEFFECT STATE
  useEffect(() => {
    getCandidateElectionYear();
    getIndependentCandidateRegistered();
  }, []);

  // FUNCTIONALITIES

  const connectContract = async () => {
    console.log("connectcontract");
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ContractAbi.abi, signer);
  };
  const getCandidateElectionYear = async () => {
    try {
      const contract = await connectContract();
      const currentYear = await contract.getElectionYear();

      const data = await contract.candidateRegistrationPeriods(currentYear);

      const year = Number(data.startYear);

      // Ensure response has expected structure
      if (year === 0) {
        setIsElectionYear(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch election year details.");
    }
  };
  const getIndependentCandidateRegistered = async () => {
    try {
      const contract = await connectContract();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const signerAddress = await signer.getAddress();
      const currentYear = await contract.getElectionYear();
      const i_Candidate = await contract.getIndependentCandidate(signerAddress);

      console.log("getIndependentCandidateRegistered");
      console.log(`Signer = ${signer}`);
      console.log(`Signer Address = ${signerAddress}`);
      console.log(`Current Year = ${currentYear}`);
      console.log(`Candidate = ${i_Candidate}`);

      console.log(`is registered? = ${i_Candidate.isRegistered}
                  candidate year = ${i_Candidate.electionYear}
        `);
      if (
        i_Candidate.isRegistered &&
        Number(i_Candidate.electionYear) === Number(currentYear)
      ) {
        console.log("IF CHECK WORKED");
        setCandidateRegistrationFormVisibility(false);
      } else {
        return;
      }
    } catch (error) {
      if (
        error?.reason === "Independent Candidate not found" ||
        error?.revert?.args?.[0] === "Independent Candidate not found" ||
        error?.message?.includes("Independent Candidate not found")
      ) {
        console.log("I_Candidate not registered. Exiting function.");
        // alert("Voter not registered Kindly Register Yourself");
        return;
      }
    }
  };
  if (!isElectionYear) {
    return (
      <>
        <RegistrationClosedPannel registrationTitle="Registrations for Candidate are not opened yet" />
      </>
    );
  }

  // CONTENT
  return (
    <>
      {isCandidateRegistrationFormVisible ? (
        <div className="dashboard-pages-components-container">
          <StepperComponent
            voterRegistrationType="candidateRegistration"
            setCandidateRegistrationFormVisibility={
              setCandidateRegistrationFormVisibility
            }
          />
        </div>
      ) : (
        <UserRegisteredPannel registrationTitle="Candidate" />
      )}
    </>
  );
}
