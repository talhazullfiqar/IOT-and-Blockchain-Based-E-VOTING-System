"use client";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../../contractABI/contractAddress";
import ContractAbi from "../../../contractABI/VotingSystem.json";
import "./newStepperComponent.css";
import "primeicons/primeicons.css";
import VoterStep1 from "./voterRegistrationSteps/Step1/voterStep1";
import VoterStep2 from "./voterRegistrationSteps/Step2/voterStep2";
import VoterStep3 from "./voterRegistrationSteps/Step3/voterStep3";
import Toast from "../form/toast/toast";
export default function StepperComponent({
  voterRegistrationType,
  setVoterRegistrationFormVisibility,
  setCandidateRegistrationFormVisibility,
}) {
  // Component Functionalities
  const [currentStep, setCurrentStep] = useState(1);
  const [isStep1Invalid, setIsStep1Invalid] = useState(true); // should be true
  const [isStep2Invalid, setIsStep2Invalid] = useState(true); // should be true
  const [isStep3Invalid, setIsStep3Invalid] = useState(true); // should be true
  const [showToast, setShowToast] = useState(false);

  //  Registration States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cNIC, setCNIC] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthYear, setBirthYear] = useState(0);
  const [birthMonth, setBirthMonth] = useState(0);
  const [birthDay, setBirthDay] = useState(0);
  const [constituency, setConstituency] = useState("");
  const [gender, setGender] = useState("");
  const [cnicImage, setCinicImage] = useState("");
  const [fingerPrint, setFingerPrint] = useState("");
  const [address, setAddress] = useState("");
  const [flagSign, setFlagSign] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [seatType, setSeatType] = useState("");

  // Registration Functions
  async function registerVoter() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractAbi.abi,
        signer
      );

      const tx = await contract.registerVoter(
        firstName,
        lastName,
        cNIC,
        phoneNumber,
        birthYear,
        birthMonth,
        birthDay,
        constituency,
        gender,
        cnicImage,
        fingerPrint
      );
      await tx.wait();
      setVoterRegistrationFormVisibility(false);
      setShowToast(false);
    } catch (error) {
      console.error("Error registering Voter:", error);
    }
  }
  async function registerIndependentCandidate() {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        ContractAbi.abi,
        signer
      );

      const tx = await contract.registerIndependentCandidate(
        firstName,
        lastName,
        cNIC,
        phoneNumber,
        birthYear,
        birthMonth,
        birthDay,
        constituency,
        gender,
        cnicImage,
        fingerPrint,
        address,
        flagSign,
        profileImage,
        seatType
      );
      await tx.wait();
      setCandidateRegistrationFormVisibility(false);
      setShowToast(false);
    } catch (error) {
      console.error("Error registering Voter:", error);
    }
  }
  // Steps
  const steps = [
    {
      id: 1,
      label: "Step 1",
      content: (
        <VoterStep1
          registrationType={voterRegistrationType}
          setIsStep1Invalid={setIsStep1Invalid}
          setFirstName={setFirstName} // Pass setFirstName
          setLastName={setLastName} // Pass setLastName
          setCNIC={setCNIC} // Pass setCNIC
          setPhoneNumber={setPhoneNumber} // Pass setPhoneNumber
          setBirthYear={setBirthYear} // Pass setBirthYear
          setBirthMonth={setBirthMonth} // Pass setBirthMonth
          setBirthDay={setBirthDay} // Pass setBirthDay
          setConstituency={setConstituency} // Pass setConstituency
          setGender={setGender} // Pass setGender
          setAddress={setAddress}
          setFlagSign={setFlagSign}
          setSeatType={setSeatType}
        />
      ),
    },
    {
      id: 2,
      label: "Step 2",
      content: (
        <VoterStep2
          registrationType={voterRegistrationType}
          setIsStep2Invalid={setIsStep2Invalid}
          setCinicImage={setCinicImage}
          setProfileImage={setProfileImage}
          setFingerPrint={setFingerPrint}
        />
      ),
    },
    {
      id: 3,
      label: "Step 3",
      content: (
        <VoterStep3
          registrationType={voterRegistrationType}
          setIsStep3Invalid={setIsStep3Invalid}
        />
      ),
    },
  ];

  function handleRegisteration() {
    if (
      !isStep3Invalid &&
      voterRegistrationType === "normalVoterRegistration"
    ) {
      registerVoter();
    }

    if (!isStep3Invalid && voterRegistrationType === "candidateRegistration") {
      registerIndependentCandidate();
    } else {
      setShowToast(true);
    }
  }
  function handleNext(stepId) {
    if ((stepId === 1 && isStep1Invalid) || (stepId === 2 && isStep2Invalid)) {
      setShowToast(true);
      return;
    } else if (stepId < steps.length) {
      setShowToast(false);
      setCurrentStep(stepId + 1);
    } else {
      setShowToast(false);
      return;
    }
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }

  const getStepClass = (stepId) => {
    const isActive = stepId === currentStep;
    const isCompleted = stepId < currentStep;
    return {
      indicator: isActive ? "active" : "inactive",
      label: isCompleted || isActive ? "active" : "inactive",
      connector: stepId < currentStep ? "active" : "inactive",
    };
  };

  const renderStep = (step) => {
    const { indicator, label, connector } = getStepClass(step.id);
    return (
      <div key={step.id} className="step">
        {" "}
        <div className={`step-indicator ${indicator}`}>{step.id}</div>
        <div className={`step-label ${label}`}>{step.label}</div>
        {step.id < steps.length && (
          <div className={`connector-line ${connector}`}></div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="stepper-container">
        <div className="stepper">{steps.map(renderStep)}</div>

        <div className="step-content">
          {steps.find((step) => step.id === currentStep)?.content}
        </div>

        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button
              onClick={handleBack}
              className="button back"
              style={{ fontSize: "17px" }}
            >
              <i
                className="pi pi-chevron-left"
                style={{ paddingRight: "10px" }}
              ></i>
              Back
            </button>
          )}
          {currentStep === 1 && (
            <button
              onClick={() => handleNext(currentStep)}
              className="button next"
              style={{
                fontSize: "17px",
                marginLeft: "auto",
                display: "block",
              }}
            >
              Next
              <i
                className="pi pi-chevron-right"
                style={{ paddingLeft: "10px" }}
              ></i>
            </button>
          )}

          {currentStep === 2 && (
            <button
              onClick={() => {
                handleNext(currentStep);
              }}
              className="button next"
              style={{ fontSize: "17px" }}
            >
              Next
              <i
                className="pi pi-chevron-right"
                style={{ paddingLeft: "10px" }}
              ></i>
            </button>
          )}

          {currentStep === 3 && (
            <button
              onClick={handleRegisteration}
              className="button next"
              style={{ fontSize: "17px" }}
            >
              Register
              <i
                className="pi pi-check"
                style={{ paddingLeft: "10px", fontWeight: "bold" }}
              ></i>
            </button>
          )}
        </div>
      </div>

      <div className="Toast">
        {showToast && currentStep === 1 ? (
          <Toast
            message="Please enter all fields"
            type="Error"
            onClose={() => setShowToast(false)}
          />
        ) : null}
        {showToast && currentStep === 2 ? (
          <Toast
            message="Please Upload all images and Verify Fingerprint"
            type="Verification Error"
            onClose={() => setShowToast(false)}
          />
        ) : null}
        {showToast && currentStep === 3 ? (
          <Toast
            message="Please Accept all the terms and conditions"
            type="Terms Error"
            onClose={() => setShowToast(false)}
          />
        ) : null}
      </div>
    </>
  );
}
