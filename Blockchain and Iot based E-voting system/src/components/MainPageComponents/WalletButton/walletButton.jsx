"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  connectWallet,
  checkAccount,
} from "./walletConnection/walletConnection";
import ButtonSVG from "./buttonSVG";
import "./walletButton.css";

export default function WalletButton() {
  const [walletaccount, setWalletAccount] = useState("");
  const router = useRouter();

  useEffect(() => {
    checkAccount(setWalletAccount);
    const handleAccountsChanged = (walletaccount) => {
      setWalletAccount(walletaccount[0] || "");
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

  // Navigate when wallet is connected
  useEffect(() => {
    if (walletaccount) {
      router.push("/home");
    }
  }, [walletaccount, router]);

  return (
    <>
      {!walletaccount && (
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
      )}
    </>
  );
}
