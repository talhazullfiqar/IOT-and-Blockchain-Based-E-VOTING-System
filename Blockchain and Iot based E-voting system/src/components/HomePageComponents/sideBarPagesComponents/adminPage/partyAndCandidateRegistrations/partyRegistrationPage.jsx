"use client";
import { useState } from "react";
import { ethers } from "ethers";
import FileUploadComponent from "@/components/HomePageComponents/RegistrationFormComponents/form/fileUpload/fileUpload";
import CnicComponent from "@/components/HomePageComponents/RegistrationFormComponents/form/inputfields/cnic/cnic";
import UserName from "@/components/HomePageComponents/RegistrationFormComponents/form/inputfields/userName/userName";
import "./partyRegistrationPage.css";
import WalletAddress from "@/components/HomePageComponents/RegistrationFormComponents/form/inputfields/walletAddress/walletAddress";
import FingerprintVerification from "@/components/HomePageComponents/RegistrationFormComponents/form/fingerPrint/fingerPrint";
import PartyAndCandidateToast from "./partyAndCandidateToast/partyAndCandidateToast";
import { CONTRACT_ADDRESS } from "../../../../contractABI/contractAddress";
import ContractAbi from "../../../../contractABI/VotingSystem.json";

export default function PartyRegistrationPage() {
  const [isPartyNameValid, setPartyNameValid] = useState(false);
  const [isPartyLeaderNameValid, setPartyLeaderNameValid] = useState(false);
  const [isCnicValid, setCnicValid] = useState(false);
  const [isPartyFlagUploaded, setPartyFlagUploaded] = useState(false);
  const [isWalletAddressValid, setWalletAddressValidity] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Form input values
  const [partyName, setPartyName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [cnic, setCnic] = useState("");
  const [flagSignName, setFlagSignName] = useState("");
  const [fingerprint, setFingerprint] = useState(""); // Replace with actual input if needed

  const [flagImageHash, setFlagImageHash] = useState("");
  const [leaderImageHash, setLeaderImageHash] = useState("");

  const handleRegisterParty = async () => {
    if (
      isPartyNameValid &&
      isPartyLeaderNameValid &&
      isCnicValid &&
      isPartyFlagUploaded &&
      isWalletAddressValid
    ) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          ContractAbi.abi,
          signer
        );

        const tx = await contract.registerParty(
          partyName,
          leaderName,
          walletAddress,
          cnic,
          flagSignName,
          flagImageHash,
          fingerprint,
          leaderImageHash
        );
        await tx.wait();

        setToastMessage("Party successfully registered!");
        setToastType("success");
        setShowToast(true);
      } catch (error) {
        console.error("Error registering party:", error);
        setToastMessage("Error: " + error.message);
        setToastType("error");
        setShowToast(true);
      }
    } else {
      setToastMessage("Please fill all the required fields correctly.");
      setToastType("error");
      setShowToast(true);
    }
  };

  return (
    <>
      <div className="partyRegistration-container">
        <h1 className="partyRegistrationHeader">Party Registration</h1>
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
              Party and Party Leader Name with wallet Address:
            </h1>
            <div>
              <UserName
                name="Party Name"
                setUserNameValidity={setPartyNameValid}
                setUserName={setPartyName}
              />
              <UserName
                name="Party Leader Name"
                setUserNameValidity={setPartyLeaderNameValid}
                setUserName={setLeaderName}
              />
              <WalletAddress
                name="Enter Wallet Address"
                setWalletAddressValidity={setWalletAddressValidity}
                setWalletAddress={setWalletAddress}
              />
            </div>
          </div>
          <div>
            <h1 style={{ marginLeft: "10px", marginBottom: "20px" }}>
              Party Leader CNIC:
            </h1>
            <div>
              <CnicComponent setCnicValid={setCnicValid} setCnic={setCnic} />
            </div>
          </div>
          <div>
            <h1 style={{ marginLeft: "10px", marginBottom: "20px" }}>
              Party Voting Sign:
            </h1>
            <div>
              <UserName
                name="Party Sign Name"
                setUserNameValidity={() => {}}
                setUserName={setFlagSignName}
              />
              <FileUploadComponent
                imageHash={setFlagImageHash}
                fileUploaded={setPartyFlagUploaded}
                fileInputId="partyFlag"
                headings=" Upload Party Sign image for Verification by Clicking Choose Button"
              />
            </div>
          </div>
          <div style={{ marginTop: "40px", marginLeft: "-25px" }}>
            <FingerprintVerification
              walletAddress={walletAddress}
              setFingerPrint={setFingerprint}
            />
          </div>
          <div>
            <h1
              style={{
                marginTop: "20px",
                marginLeft: "10px",
                marginBottom: "20px",
              }}
            >
              Party Leader Profile Image:
            </h1>
            <div>
              <FileUploadComponent
                imageHash={setLeaderImageHash}
                fileUploaded={() => {}}
                fileInputId="partyLeaderImage"
                headings=" Upload Party Leader image for Verification by Clicking Choose Button"
              />
            </div>
          </div>
        </div>
        <button
          className="partyRegisterbutton registerParty"
          onClick={handleRegisterParty}
        >
          Register Party
        </button>
      </div>

      {showToast && (
        <PartyAndCandidateToast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
