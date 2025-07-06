"use client";
import { useState } from "react";
import styles from "./AdminDashboard.module.css";
import VoterDashboardTabBar from "../voteDetailPage/dashBoard/voterDashboard/voterDashboardComponents/tabBar/voterDashboardTabBar";
import ElectionsStats from "./adminDashboardPages/electionsStats";
import ElectionsControl from "./adminDashboardPages/electionsControl";
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={styles.admindashBoardContainer}>
      <div className={styles.admindashBoardHeaderContainer}>
        <div className={styles.tabbarWrapper}>
          <VoterDashboardTabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            firstTabName="Elections Control"
            secondTabName="Elections Stats"
          />
        </div>
      </div>{" "}
      {activeTab === 1 && <ElectionsControl />}
      {activeTab === 2 && <ElectionsStats />}
    </div>
  );
}
