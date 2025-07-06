import styles from "./TotalVotersCount.module.css";
import { LuUsers } from "react-icons/lu";
export default function TotalVotersCount(props) {
  return (
    <>
      <div className={styles.totalVotersCountCard}>
        <div className={styles.totalVotersCountCardComponents}>
          <h1 className={styles.totalVotersCountHeading}>{props.heading}</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div className={styles.voterCountIconContainer}>
              <LuUsers className={styles.voterCountIcon} />
            </div>
            <h2 className={styles.voterCount}>{props.count}</h2>
          </div>
          <p className={styles.totalVotersSubHeading}>{props.subheading}</p>
        </div>
      </div>
    </>
  );
}
