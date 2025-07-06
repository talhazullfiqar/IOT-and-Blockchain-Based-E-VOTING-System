import React from "react";
import styles from "./VotingStatusCards.module.css";
import { IoPeople } from "react-icons/io5";
import { LuVote } from "react-icons/lu";
import { TbPercentage30 } from "react-icons/tb";
import { MdTimelapse } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa";
import { FaCircleNodes } from "react-icons/fa6";
const data = [
  { title: "Total Registered Voters", value: "15,420", icon: <IoPeople /> },
  { title: "Votes Cast", value: "12,304", icon: <LuVote /> },
  { title: "Participation Rate", value: "79.8%", icon: <TbPercentage30 /> },
  { title: "Remaining Time", value: "2h 15m", icon: <MdTimelapse /> },
  { title: "Verified Blocks", value: "1205", icon: <FaShieldAlt /> },
  { title: "Pending Verifications", value: "24", icon: <IoWarning /> },
  { title: "Security Incidents", value: "0", icon: <FaUserLock /> },
  { title: "Active Nodes", value: "50", icon: <FaCircleNodes /> },
];

export default function VotingStatusCards() {
  return (
    <div className={styles.cardContainer}>
      {data.map((item, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.header}>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.icon}>{item.icon}</div>
          </div>
          <p className={styles.value}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
