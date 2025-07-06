"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../contractABI/contractAddress";
import ContractAbi from "../../contractABI/VotingSystem.json";
import "./dashboardPagesComponents.css";
import StepperComponent from "../RegistrationFormComponents/stepper/stepper";
import UserRegisteredPannel from "./userRegisteredPannelComponent/userRegisteredPannel";
import RegistrationClosedPannel from "./userRegisteredPannelComponent/registrationClosedPannel";
export default function VoterRegistrationPage() {
  const [isVoterRegistrationFormVisible, setVoterRegistrationFormVisibility] =
    useState(true);
  const [isElectionYear, setIsElectionYear] = useState(true); // default to TRUE
  useEffect(() => {
    getVoterElectionYear();
    getVoterRegistered();
  }, []);
  const connectContract = async () => {
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ContractAbi.abi, signer);
  };
  const getVoterElectionYear = async () => {
    try {
      const contract = await connectContract();
      const currentYear = await contract.getElectionYear();
      const data = await contract.voterRegistrationPeriods(currentYear);
      const year = Number(data.startYear);
      // console.log(`current election year: ${currentYear}`);
      // Ensure response has expected structure
      if (year === 0) {
        setIsElectionYear(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch election year details.");
    }
  };
  const getVoterRegistered = async () => {
    try {
      const contract = await connectContract();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      const currentYear = await contract.getElectionYear();
      const voter = await contract.getVoter(signerAddress);

      if (
        voter.isRegistered &&
        Number(voter.electionYear) === Number(currentYear)
      ) {
        setVoterRegistrationFormVisibility(false);
      } else {
        return;
      }
    } catch (error) {
      if (
        error?.reason === "Voter not found" ||
        error?.revert?.args?.[0] === "Voter not found" ||
        error?.message?.includes("Voter not found")
      ) {
        console.log("Voter not registered. Exiting function.");
        // alert("Voter not registered Kindly Register Yourself");
        return;
      }
    }
  };
  if (!isElectionYear) {
    return (
      <>
        <RegistrationClosedPannel registrationTitle="Voter Registration Are Not Opened Yet" />
      </>
    );
  }
  return (
    <>
      {isVoterRegistrationFormVisible ? (
        <div className="dashboard-pages-components-container">
          <StepperComponent
            voterRegistrationType="normalVoterRegistration"
            setVoterRegistrationFormVisibility={
              setVoterRegistrationFormVisibility
            }
          />
        </div>
      ) : (
        <UserRegisteredPannel registrationTitle="Voter" />
      )}
    </>
  );
}
