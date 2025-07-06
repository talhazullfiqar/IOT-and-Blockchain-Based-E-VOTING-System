import ElectionsStats from "../adminPage/adminDashboardPages/electionsStats";
import styles from "./SubAdminDashboard.module.css";
export default function SubAdminDashboard() {
  return (
    <div className={styles.admindashBoardContainer}>
      <ElectionsStats />
    </div>
  );
}
