"use client";
import { useEffect, useState } from "react";
import FileUploadComponent from "../../../form/fileUpload/fileUpload";
import "primereact/resources/themes/lara-light-purple/theme.css";
import FingerprintVerification from "../../../form/fingerPrint/fingerPrint";
import styles from "../StepperStepsScrollbar.module.css";
import { RiScrollToBottomLine } from "react-icons/ri";
export default function VoterStep2({
  registrationType,
  setIsStep2Invalid,
  setCinicImage,
  setProfileImage,
  setFingerPrint,
}) {
  const [isCnicImageUploaded, setCnicImageUploaded] = useState(false);
  const [isProfileImageUploaded, setProfileImageUploaded] = useState(false);

  useEffect(() => {
    if (registrationType === "candidateRegistration") {
      if (isCnicImageUploaded && isProfileImageUploaded) {
        setIsStep2Invalid(false);
      } else {
        setIsStep2Invalid(true); // should be true
      }
    } else {
      if (isCnicImageUploaded) {
        setIsStep2Invalid(false);
      } else {
        setIsStep2Invalid(true); // should be true
      }
    }
  }, [isCnicImageUploaded, isProfileImageUploaded]);
  return (
    <>
      <div style={{ height: "410px" }} className={styles.stepperScrollBar}>
        {" "}
        <div>
          <FileUploadComponent
            fileUploaded={setCnicImageUploaded}
            imageHash={setCinicImage}
            fileInputId="fileInputCnic"
            headings=" Upload Your CNIC image for Verification by Clicking Button"
          />
        </div>
        <span
          style={{
            alignItems: "center",
            display: "flex",
            flexFlow: "column",
            marginTop: "4.3rem",
            marginBottom: "4.3rem",
          }}
        >
          {" "}
          <RiScrollToBottomLine style={{ fontSize: "35px" }} />
          <span>Scroll</span>
        </span>
        {registrationType === "candidateRegistration" ? (
          <>
            <div>
              <FileUploadComponent
                fileUploaded={setProfileImageUploaded}
                imageHash={setProfileImage}
                fileInputId="fileInputProfile"
                headings=" Upload Your Profile image for Verification by Clicking Button"
              />
            </div>
            <span
              style={{
                alignItems: "center",
                display: "flex",
                flexFlow: "column",
                marginTop: "4.3rem",
                marginBottom: "4.3rem",
              }}
            >
              <RiScrollToBottomLine style={{ fontSize: "35px" }} />
              <span>Scroll</span>
            </span>
          </>
        ) : null}
        <div>
          <FingerprintVerification setFingerPrint={setFingerPrint} />
        </div>
      </div>
    </>
  );
}
