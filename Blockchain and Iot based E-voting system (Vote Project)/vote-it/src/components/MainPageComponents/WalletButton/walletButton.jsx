"use client";
import { useState, useEffect } from "react";
import {
  connectWallet,
  checkAccount,
} from "./walletConnection/walletConnection";
import ButtonSVG from "./buttonSVG";
import "./walletButton.css";
import FingerPrintAuth from "../fingerPrintAuth/fingerPrintAuth";

export default function WalletButton() {
  const [walletaccount, setWalletAccount] = useState("");

  useEffect(() => {
    checkAccount(setWalletAccount);

    const handleAccountsChanged = (accounts) => {
      setWalletAccount(accounts[0] || "");
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);

  return (
    <>
      {!walletaccount ? (
        <button
          className="walletButton"
          onClick={() => connectWallet(setWalletAccount)}
        >
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <ButtonSVG />
            </div>
          </div>
          <span>Connect Wallet</span>
        </button>
      ) : (
        <FingerPrintAuth />
      )}
    </>
  );
}
