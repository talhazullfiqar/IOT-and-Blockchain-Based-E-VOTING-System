"use client";
import { useState } from "react";
import VoterDashboardTabBar from "./voterDashboardComponents/tabBar/voterDashboardTabBar";
import styles from "./VoterDashboard.module.css";
import PersonalConstituencyResultsDashboard from "./dashboardPages/personalConstituencyResultsDashboard/personalConstituencyResultsDashboard";
import OverallCountryResultsDashboard from "./dashboardPages/overallCountryResultsDashboard/overallCountryResultsDashboard";
import LiveVotingIndicator from "./voterDashboardComponents/liveIndicator/liveVotingIndicator";
export default function VoterDashboard() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className={styles.voterdashBoardContainer}>
      <div className={styles.voterDashboardHeaderContainer}>
        <div className={styles.tabbarWrapper}>
          <VoterDashboardTabBar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            firstTabName="Personal Constituency Results"
            secondTabName="Overall Country Results"
          />
        </div>
        <div className={styles.LiveVotingIndicator}>
          {" "}
          <LiveVotingIndicator />
        </div>
      </div>
      {activeTab === 1 && <PersonalConstituencyResultsDashboard year="2024" />}
      {activeTab === 2 && <OverallCountryResultsDashboard year="2024" />}
    </div>
  );
}
