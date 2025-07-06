import React from "react";
import styles from "./BlockChainStatus.module.css";
import { IoIosPulse } from "react-icons/io";
import { SiHiveBlockchain } from "react-icons/si";
import { HiMiniCpuChip } from "react-icons/hi2";
import { IoGitNetwork } from "react-icons/io5";
import { FaEthereum } from "react-icons/fa6";

export default function BlockchainStatus() {
  return (
    <div className={styles.container}>
      <div className={styles.ethHeader}>
        <FaEthereum className={styles.ethIcon} />
        <h2 className={styles.title}>Blockchain Network Status</h2>
      </div>
      <div className={styles.statusItem}>
        <div className={styles.iconWithLabel}>
          <span className={styles.icon}>
            <HiMiniCpuChip />
          </span>
          <span className={styles.label}>Consensus Health</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: "100%" }} />
          <span className={styles.value}>100%</span>
        </div>
      </div>
      <div className={styles.statusRow}>
        <div className={styles.statusItem}>
          <div className={styles.iconWithLabel}>
            <IoIosPulse className={styles.icon} />
            <span className={styles.label}>Network Status</span>
          </div>
          <div>
            <span className={`${styles.indicator} ${styles.active}`} />
            <span className={styles.value}>Active</span>
          </div>
        </div>
        <div className={styles.statusItem}>
          <div className={styles.iconWithLabel}>
            <span className={styles.icon}>
              <SiHiveBlockchain />
            </span>
            <span className={styles.label}>Last Block</span>
          </div>
          <span className={styles.value}>2 seconds ago</span>
        </div>
        <div className={styles.statusItem}>
          <div className={styles.iconWithLabel}>
            <span className={styles.icon}>
              <IoGitNetwork />
            </span>
            <span className={styles.label}>Network Latency</span>
          </div>
          <span className={styles.value}>45ms</span>
        </div>
      </div>
    </div>
  );
}
