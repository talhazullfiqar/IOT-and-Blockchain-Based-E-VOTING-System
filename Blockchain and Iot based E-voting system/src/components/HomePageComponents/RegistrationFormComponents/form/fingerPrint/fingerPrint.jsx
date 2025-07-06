"use client";
import { useCallback } from "react";
import styles from "./FingerprintVerification.module.css";
import { Fingerprint } from "lucide-react";
import { ethers } from "ethers";
import { startRegistration } from "@simplewebauthn/browser";

export default function FingerprintVerification({
  walletAddress,
  setFingerPrint,
}) {
  const logMessage = (msg) => console.log(msg); // Console log instead of modal

  const signup = async (address) => {
    const SERVER_URL = "http://localhost:3000";

    if (!address) return logMessage("Wallet address is required");
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      return logMessage("Invalid wallet address format");
    }

    try {
      const initRes = await fetch(
        `${SERVER_URL}/init-register?walletAddress=${address}`,
        { credentials: "include" }
      );
      const options = await initRes.json();

      if (!initRes.ok) {
        return logMessage(
          options.error || "Failed to get registration options"
        );
      }

      console.log("Registration Options:", options);

      const registrationJSON = await startRegistration(options);
      console.log("Generated Passkey Data:", registrationJSON);
      console.log("✅ Registered credential ID:", registrationJSON.id);
      setFingerPrint(registrationJSON.id);
      const verifyRes = await fetch(`${SERVER_URL}/verify-register`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationJSON),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) {
        return logMessage(verifyData.error || "Verification failed");
      }

      if (verifyData.verified) {
        logMessage(`Successfully registered ${address}`);
        const id = registrationJSON.id.toString();
        console.log(`this is the id ${id}`);
        setFingerPrint(id);
        console.log("setFingerPrint(id);");
      } else {
        logMessage("Failed to register");
      }
    } catch (err) {
      logMessage(`Error: ${err.message}`);
    }
  };

  const handleVerifyClick = useCallback(async () => {
    let address = walletAddress;

    try {
      if (!address) {
        if (!window.ethereum) {
          return logMessage("MetaMask not detected");
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        address = await signer.getAddress();
      }

      await signup(address);
    } catch (err) {
      logMessage(`Unable to get wallet address: ${err.message}`);
    }
  }, [walletAddress]);

  return (
    <div className={styles.fingerprintVerificationbuttoncontainer}>
      <div className={styles.fingerprintVerificationbuttoncard}>
        <h1 className={styles.fingerprintVerificationbuttontitle}>
          Fingerprint Verification
        </h1>
        <p className={styles.fingerprintVerificationbuttonsubtitle}>
          Set Fingerprint Verification using the fingerprint
        </p>
        <button
          className={styles.fingerprintVerificationbutton}
          onClick={handleVerifyClick}
        >
          <span className={styles.fingerprintVerificationicon}>
            <Fingerprint />
          </span>{" "}
          Verify Fingerprint
        </button>
      </div>
    </div>
  );
}
