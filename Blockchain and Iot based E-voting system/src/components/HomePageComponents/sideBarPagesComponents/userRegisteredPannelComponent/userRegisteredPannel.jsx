import UserRegisteredSVG from "@/assets/svgs/registeredFormsSVGS/userRegisteredSVG";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import styles from "./UserRegisteredPannel.module.css";
export default function UserRegisteredPannel(props) {
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
              <IoMdCheckmarkCircleOutline
                className={styles.userRegisteredICON}
              />
              <h1 className={styles.userRegisteredHeadingText}>
                {props.registrationTitle} Registration Successful
              </h1>
            </div>
            <p className={styles.userRegisteredMessage}>
              Thank you for registering! Your {props.registrationTitle} account
              has been successfully created.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
