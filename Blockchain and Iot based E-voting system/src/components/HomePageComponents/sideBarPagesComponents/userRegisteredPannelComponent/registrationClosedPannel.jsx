import UserRegisteredSVG from "@/assets/svgs/registeredFormsSVGS/userRegisteredSVG";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "./RegistrationClosedPannel.module.css";
export default function RegistrationClosedPannel({ registrationTitle }) {
  return (
    <>
      <div className={styles.userRegisteredPannelContainer}>
        <div className={styles.userRegisteredPannelCard}>
          <div className={styles.userRegisteredSVG}>
            {" "}
            <UserRegisteredSVG />
          </div>
          <div className={styles.userRegisteredMessageContainer}>
            <div className={styles.userRegisteredHeading}>
              <IoIosCloseCircle className={styles.userRegisteredICON} />
              <h1 className={styles.userRegisteredHeadingText}>
                {registrationTitle}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
