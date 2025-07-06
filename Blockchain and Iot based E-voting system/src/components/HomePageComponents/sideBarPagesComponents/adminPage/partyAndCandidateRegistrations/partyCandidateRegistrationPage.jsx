"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../../../contractABI/contractAddress";
import ContractAbi from "../../../../contractABI/VotingSystem.json";
import FileUploadComponent from "@/components/HomePageComponents/RegistrationFormComponents/form/fileUpload/fileUpload";
import CnicComponent from "@/components/HomePageComponents/RegistrationFormComponents/form/inputfields/cnic/cnic";
import UserName from "@/components/HomePageComponents/RegistrationFormComponents/form/inputfields/userName/userName";
import WalletAddress from "@/components/HomePageComponents/RegistrationFormComponents/form/inputfields/walletAddress/walletAddress";
import PartyAndCandidateToast from "./partyAndCandidateToast/partyAndCandidateToast";
import "./partyRegistrationPage.css";
import RegistrationClosedPannel from "../../userRegisteredPannelComponent/registrationClosedPannel";

export default function PartyCandidateRegistrationPage() {
  console.log("party page");
  useEffect(() => {
    getCandidateElectionYear();
  }, []);
  const [isCandidateNameValid, setCandidateNameValid] = useState(false);
  const [isCandidateSeatTypeValid, setCandidateSeatTypeValid] = useState(false);
  const [isCnicValid, setCnicValid] = useState(false);
  const [isWalletAddressValid, setWalletAddressValidity] = useState(false);
  const [isCandidateConstituencyValid, setCandidateConstituencyValid] =
    useState(false);
  const [isCandidatePartyNameValid, setCandidatePartyNameValid] =
    useState(false);
  const [isCandidateProfileImage, setCandidateProfileImageUploaded] =
    useState(false);
  const [isPartyFlagUploaded, setPartyFlagUploaded] = useState(false);

  // Form input values
  const [candidateName, setCandidateName] = useState("");
  const [seatType, setSeatType] = useState("");
  const [candidateConstituency, setCandidateConstituency] = useState("");
  const [candidateWalletAddress, setCandidateWalletAddress] = useState("");
  const [candidatePartyName, setCandidatePartyName] = useState("");
  const [candidateCnic, setCandidateCnic] = useState("");
  const [candidateImageHash, setCandidateImageHash] = useState("");
  const [flagImageHash, setFlagImageHash] = useState("");

  const [isElectionYear, setIsElectionYear] = useState(true); // default to TRUE
  //TOAST MESSAGES
  const [showToast, setShowToast] = useState(false); // To control the toast visibility
  const [toastMessage, setToastMessage] = useState(""); // Toast message
  const [toastType, setToastType] = useState(""); // Success or error type

  const handleRegisterCandidate = async () => {
    if (
      isCandidateNameValid &&
      isCandidateSeatTypeValid &&
      isCnicValid &&
      isWalletAddressValid &&
      isCandidateConstituencyValid &&
      isCandidatePartyNameValid &&
      isCandidateProfileImage &&
      isPartyFlagUploaded
    ) {
      try {
        // Connect to MetaMask
        if (!window.ethereum) {
          setToastMessage("MetaMask not detected!");
          setToastType("error");
          setShowToast(true);
          return;
        }

        // await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ContractAbi.abi,
          signer
        );

        // Call the registerCandidate function
        const tx = await contract.registerCandidate(
          candidateName,
          seatType,
          candidateConstituency,
          candidateWalletAddress,
          candidatePartyName,
          candidateCnic,
          candidateImageHash,
          flagImageHash
        );

        await tx.wait();
        setToastMessage("Transaction submitted. Waiting for confirmation...");
        setToastType("success");
        setShowToast(true);

        setToastMessage("Candidate registered successfully!");
        setToastType("success");
        setShowToast(true);

        // Reset all fields
        setCandidateNameValid(false);
        setCandidateSeatTypeValid(false);
        setCnicValid(false);
        setWalletAddressValidity(false);
        setCandidateConstituencyValid(false);
        setCandidatePartyNameValid(false);
        setCandidateProfileImageUploaded(false);
        setPartyFlagUploaded(false);
      } catch (error) {
        console.error("Registration Error:", error);
        setToastMessage(
          "Registration failed: " + (error.reason || error.message)
        );
        setToastType("error");
        setShowToast(true);
      }
    } else {
      setToastMessage("Please fill all the required fields!");
      setToastType("error");
      setShowToast(true);
    }
  };
  const connectContract = async () => {
    console.log("connectcontract");
    if (!window.ethereum) throw new Error("MetaMask is not installed");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ContractAbi.abi, signer);
  };
  const getCandidateElectionYear = async () => {
    try {
      console.log("start");
      const contract = await connectContract();
      const currentYear = await contract.getElectionYear();
      console.log(currentYear);
      const data = await contract.candidateRegistrationPeriods(currentYear);
      console.log(data);
      const year = Number(data.startYear);
      console.log(`year: ${year}`);
      // Ensure response has expected structure
      if (year === 0) {
        setIsElectionYear(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch election year details.");
    }
  };

  if (!isElectionYear) {
    return (
      <>
        <RegistrationClosedPannel registrationTitle="Candidate Registration Are Not Opened Yet" />
      </>
    );
  }
  return (
    <>
      {showToast && (
        <PartyAndCandidateToast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      <div className="partyRegistration-container">
        <h1 className="partyRegistrationHeader">
          Party Candidate Registration
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "start",
            height: "500px",
            overflowY: "scroll",
          }}
        >
          <div>
            <h1 style={{ marginLeft: "10px", marginBottom: "20px" }}>
              Enter Candidate Details:
            </h1>
            <div>
              <UserName
                name="Candidate Name"
                setUserNameValidity={setCandidateNameValid}
                setUserName={setCandidateName}
              />
              <UserName
                name="Seat Type"
                setUserNameValidity={setCandidateSeatTypeValid}
                setUserName={setSeatType}
              />
              <UserName
                name="Candidate Constituency"
                setUserNameValidity={setCandidateConstituencyValid}
                setUserName={setCandidateConstituency}
              />
              <WalletAddress
                name="Enter Wallet Address"
                setWalletAddressValidity={setWalletAddressValidity}
                setWalletAddress={setCandidateWalletAddress}
              />
              <UserName
                name="Candidate Party Name"
                setUserNameValidity={setCandidatePartyNameValid}
                setUserName={setCandidatePartyName}
              />
            </div>
          </div>
          <div>
            <h1 style={{ marginLeft: "10px", marginBottom: "20px" }}>
              Candidate CNIC:
            </h1>
            <div>
              <CnicComponent
                setCnicValid={setCnicValid}
                setCnic={setCandidateCnic}
              />
            </div>
          </div>

          <div>
            <h1 style={{ marginLeft: "10px", marginBottom: "20px" }}>
              Candidate Profile Picture:
            </h1>
            <div>
              <FileUploadComponent
                fileUploaded={setCandidateProfileImageUploaded}
                imageHash={setCandidateImageHash}
                fileInputId=" CandidateProfilePicture"
                headings=" Upload Candidate Profile Picture for Verification by Clicking Button"
              />
            </div>
          </div>
          <div>
            <h1
              style={{
                marginTop: "30px",
                marginLeft: "10px",
                marginBottom: "20px",
              }}
            >
              Party Sign:
            </h1>
            <div>
              <FileUploadComponent
                fileUploaded={setPartyFlagUploaded}
                imageHash={setFlagImageHash}
                fileInputId="partyFlag"
                headings=" Upload Party Sign image for Verification by Clicking Button"
              />
            </div>
          </div>
        </div>{" "}
        <button
          className="partyRegisterbutton registerParty"
          onClick={handleRegisterCandidate}
        >
          Register Candidate
        </button>
      </div>
    </>
  );
}
