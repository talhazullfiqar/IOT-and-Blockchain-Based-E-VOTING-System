import React, { useState, useEffect } from "react";
import UserRegisteredSVG from "@/assets/svgs/registeredFormsSVGS/userRegisteredSVG";
import VoteCastedCard from "@/components/voteCasted/voteCastedCard";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import styles from "./UserRegisteredPannel.module.css";
import { BrowserProvider } from "ethers"; // Ethers v6
export default function UserRegisteredPannel(props) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const handleModalToggle = () => {
    setModalOpen(!isModalOpen);
  };
  useEffect(() => {
    const getWalletAddress = async () => {
      try {
        if (typeof window !== "undefined" && window.ethereum) {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          setWalletAddress(address);
        }
      } catch (err) {
        console.error("Failed to fetch wallet address:", err);
      }
    };

    getWalletAddress();
  }, []);
  return (
    <>
      <div className={styles.userRegisteredPannelContainer}>
        <div className={styles.userRegisteredPannelCard}>
          <div className={styles.userRegisteredSVG}>
            <UserRegisteredSVG />
          </div>
          <div className={styles.userRegisteredMessageContainer}>
            <div className={styles.userRegisteredHeading}>
              <IoMdCheckmarkCircleOutline
                className={styles.userRegisteredICON}
              />
              <h1 className={styles.userRegisteredHeadingText}>
                {props.registrationTitle} Vote Casted Successfully
              </h1>
            </div>
            <p className={styles.userVoteMessage}>
              Thank you for your Vote. Your vote has been successfully casted.
            </p>
            <button
              className={styles.showDetailsButton}
              onClick={handleModalToggle}
            >
              Show Voting Details
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleModalToggle}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <button
                className={styles.closeButton}
                onClick={handleModalToggle}
              >
                &times;
              </button>
            </div>
            <VoteCastedCard
              metamaskAddress={walletAddress}
              IssuingAuthority="[Electoral Commission / Government Body]"
              Disclaimer="This receipt confirms that your vote has been recorded successfully. The content of your vote remains anonymous and securely stored using blockchain technology. For any inquiries, please contact the election commission."
            />
          </div>
        </div>
      )}
    </>
  );
}
