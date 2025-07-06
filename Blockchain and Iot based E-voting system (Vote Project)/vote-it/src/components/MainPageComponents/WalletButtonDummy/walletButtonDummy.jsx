"use client";
import { useState } from "react";
import DummyButtonSVG from "./walletButtonDummySVG";
import "./walletButtonDummy.css";
import FingerPrintAuth from "../fingerPrintAuth/fingerPrintAuth";

export default function WalletButtonDummy() {
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setModalOpen(true);
  };

  return (
    <div>
      <button
        className={`WalletButtonDummy ${isLoading ? "loading" : ""}`}
        onClick={handleClick}
        disabled={isLoading}
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <DummyButtonSVG />
          </div>
        </div>
        {isLoading ? (
          <span className="WalletButtonDummyLoader"></span>
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      {/* FingerPrintAuth Component with modalOpen state passed as prop */}
      <FingerPrintAuth
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setIsLoading={setIsLoading} // To stop loading and navigate after fingerprint is verified
      />
    </div>
  );
}
