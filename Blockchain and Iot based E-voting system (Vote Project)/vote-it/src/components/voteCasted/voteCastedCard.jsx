import React from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import styles from "./VoteCastedCard.module.css";
import { LuPrinter } from "react-icons/lu";
const VoteCastedCard = ({ metamaskAddress, IssuingAuthority, Disclaimer }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Vote Confirmation</h2>
      </div>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <strong>Wallet Address:</strong>
          <span className={styles.address}>{metamaskAddress}</span>
        </div>
        <div className={styles.infoItem}>
          <strong>Issuing Authority:</strong>
          <span>{IssuingAuthority}</span>
        </div>
        <div className={styles.infoItem}>
          <strong>Disclaimer:</strong>
          <span>{Disclaimer}</span>
        </div>
      </div>
      <div className={styles.footer}>
        <button className={styles.printButton} onClick={handlePrint}>
          <LuPrinter style={{ fontSize: "1.35rem", fontWeight: "bold" }} />
        </button>
        <div className={styles.securityNote}>
          <RiSecurePaymentLine
            style={{
              marginRight: "5px",
              marginTop: "-1px",
              fontSize: "1.5rem",
            }}
          />
          <span>Secured by Blockchain</span>
        </div>
      </div>
    </div>
  );
};

export default VoteCastedCard;
