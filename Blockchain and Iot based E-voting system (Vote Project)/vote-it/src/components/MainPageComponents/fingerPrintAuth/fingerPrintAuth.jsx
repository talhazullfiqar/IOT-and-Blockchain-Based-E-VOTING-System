"use client";
import React, { useState } from "react";
import { Fingerprint } from "lucide-react";
import styles from "./FingerPrintAuth.module.css";
import { startAuthentication } from "@simplewebauthn/browser";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import contractABI from "../../CONTRACT_ABI/VotingSystem.json";
import { CONTRACT_ADDRESS } from "../../CONTRACT_ABI/contractAddress";

export default function FingerPrintAuth() {
  const SERVER_URL = "http://localhost:3000";
  const [authenticated, isAuthenticated] = useState(false);
  const router = useRouter();

  async function handleVerifyClick() {
    try {
      if (!window.ethereum) {
        return console.error("MetaMask not detected");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      const initRes = await fetch(
        `${SERVER_URL}/init-auth?walletAddress=${walletAddress}`,
        { credentials: "include" }
      );
      const options = await initRes.json();

      if (!initRes.ok) {
        return console.error(options.error || "Failed to get auth options");
      }

      const authenticationResponse = await startAuthentication(options);

      const verifyRes = await fetch(`${SERVER_URL}/verify-auth`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authenticationResponse),
      });

      const verifyData = await verifyRes.json();

      console.log(verifyData);

      if (!verifyRes.ok || !verifyData.verified) {
        return console.error(verifyData.error || "Authentication failed");
      }

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractABI.abi,
        provider
      );
      const voter = await contract.getVoter(walletAddress);

      if (voter.fingerprint === authenticationResponse.id) {
        isAuthenticated(true);
        moveForward();
      } else {
        console.warn("❌ Fingerprint does NOT match with on-chain data");
        isAuthenticated(false);
        // moveForward();
      }
    } catch (err) {
      console.error("Error during fingerprint login:", err.message);
    }
  }
  function moveForward() {
    // if (authenticated === true) {
    router.push("./yourVote");
    console.log("Authenticated");
    // }
    // } else {
    //   router.push("./");
    //   console.log("Not Authenticated");
    // }
  }
  return (
    <button
      className={styles.fingerprintVerificationbutton}
      onClick={handleVerifyClick}
    >
      <span className={styles.fingerprintVerificationicon}>
        <Fingerprint />
      </span>
      Login Using Fingerprint
    </button>
  );
}
