// ✅ StepperComponent.jsx
"use client";
import React, { useState } from "react";
import "./newStepperComponent.css";
import { BrowserProvider, Contract } from "ethers";
import { FaVoteYea } from "react-icons/fa";
import contractABI from "../../CONTRACT_ABI/VotingSystem.json";
import { CONTRACT_ADDRESS } from "../../CONTRACT_ABI/contractAddress";
import Step1 from "./step1/step1";
import Step2 from "./step2/step2";
import VoteConfirmationModal from "../voteConfirmationModal/voteConfirmationModal";
import UserRegisteredPannel from "../userRegisteredPannelComponent/userRegisteredPannel";

export default function StepperComponent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selected, setSelected] = useState({ MNA: null, MPA: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoteCasted, setIsVoteCasted] = useState(false);
  const [txError, setTxError] = useState("");

  const steps = [
    {
      id: 1,
      label: "Vote MNA",
      content: (
        <Step1
          selected={selected.MNA}
          onSelect={(cand) => setSelected((s) => ({ ...s, MNA: cand }))}
        />
      ),
    },
    {
      id: 2,
      label: "Vote MPA",
      content: (
        <Step2
          selected={selected.MPA}
          onSelect={(cand) => setSelected((s) => ({ ...s, MPA: cand }))}
        />
      ),
    },
  ];

  const handleNext = (stepId) => {
    if (stepId < steps.length) {
      setCurrentStep(stepId + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = async () => {
    if (currentStep === 1) {
      handleNext(currentStep);
      setIsModalOpen(false);
    } else if (currentStep === 2) {
      if (!selected.MNA || !selected.MPA) {
        setTxError("Please select both MNA and MPA candidates.");
        setIsModalOpen(false);
        return;
      }

      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(
          CONTRACT_ADDRESS,
          contractABI.abi,
          signer
        );

        const tx1 = await contract.vote(selected.MNA.wallet, "MNA");
        await tx1.wait();
        const tx2 = await contract.vote(selected.MPA.wallet, "MPA");
        await tx2.wait();

        setIsVoteCasted(true);
        setIsModalOpen(false);
      } catch (err) {
        console.error(err);
        setTxError(err?.reason || "Voting transaction failed");
        setIsModalOpen(false);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getStepClass = (stepId) => {
    const isActive = stepId === currentStep;
    const isCompleted = stepId < currentStep;
    return {
      indicator: isActive ? "active" : "inactive",
      label: isCompleted || isActive ? "active" : "inactive",
    };
  };

  const renderStep = (step) => {
    const { indicator, label } = getStepClass(step.id);
    return (
      <div key={step.id} className="step">
        <div className={`step-indicator ${indicator}`}>{step.id}</div>
        <div className={`step-label ${label}`}>{step.label}</div>
      </div>
    );
  };

  if (isVoteCasted) return <UserRegisteredPannel />;

  return (
    <>
      <div className="stepper-container">
        <div className="stepper">
          <div
            className={`connector-line ${
              currentStep > 1 ? "active" : "inactive"
            }`}
          />
          {steps.map(renderStep)}
        </div>

        <div className="step-content">
          {steps.find((step) => step.id === currentStep)?.content}
        </div>

        <div className="navigation-buttons">
          {currentStep > 1 && (
            <button onClick={handleBack} className="button back">
              <i
                className="pi pi-chevron-left"
                style={{ paddingRight: "10px" }}
              />
              Back
            </button>
          )}
          <button onClick={openModal} className="button next">
            <span className="button-content">
              Vote
              <FaVoteYea />
            </span>
          </button>
        </div>
      </div>

      <VoteConfirmationModal
        name={currentStep === 1 ? "MNA" : "MPA"}
        isOpen={isModalOpen}
        handleConfirm={handleConfirm}
        handleCancel={closeModal}
      />
      {txError && <p style={{ color: "red" }}>{txError}</p>}
    </>
  );
}
