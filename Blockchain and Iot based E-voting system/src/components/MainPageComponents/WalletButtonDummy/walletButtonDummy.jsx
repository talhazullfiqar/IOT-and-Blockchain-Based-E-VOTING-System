"use client";
import { useState } from "react";
import DummyButtonSVG from "./walletButtonDummySVG";
import "./walletButtonDummy.css";
export default function WalletButtonDummy() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      window.location.href = "/home";
    }, 5000);
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
    </div>
  );
}
