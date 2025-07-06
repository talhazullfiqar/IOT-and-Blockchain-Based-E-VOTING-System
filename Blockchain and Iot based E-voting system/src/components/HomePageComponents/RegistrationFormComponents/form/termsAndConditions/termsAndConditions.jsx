"use client";
import React, { useState, useEffect } from "react";
import { BlockUI } from "primereact/blockui";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import styles from "./TermsAndConditionsComponent.module.css";
import CandidateRegistrationsTermsAndConditions from "./candidateRegistrationTerms";
import VoterRegistrationsTermsAndConditions from "./voterRegistrationTerms";
import AdminRegistrationsTermsAndConditions from "./adminRegistrationTerms";
export default function TermsAndConditionsComponent({
  registrationType,
  setIsStep3Invalid,
}) {
  const [blocked, setBlocked] = useState(false);
  const buttonText = blocked ? "I Decline" : "I Accept";
  useEffect(() => {
    if (blocked) {
      setIsStep3Invalid(false);
    } else {
      setIsStep3Invalid(true); // should be true
    }
  }, [blocked, setIsStep3Invalid]);
  return (
    <>
      <div className={styles.termsCard}>
        <BlockUI
          blocked={blocked}
          template={<i className="pi pi-lock" style={{ fontSize: "3rem" }}></i>}
        >
          <Panel className={styles.customPanelHeader}>
            <p
              className={styles.customPanelContent}
              style={{ overflowY: "scroll", height: "250px" }}
            >
              {registrationType === "normalVoterRegistration" ? (
                <VoterRegistrationsTermsAndConditions />
              ) : null}
              {registrationType === "candidateRegistration" ? (
                <CandidateRegistrationsTermsAndConditions />
              ) : null}
              {registrationType === "adminVoterRegistration" ? (
                <AdminRegistrationsTermsAndConditions />
              ) : null}
            </p>
          </Panel>
        </BlockUI>
        <div className={styles.mt20 + " " + styles.flexColumnCenter}>
          <h3 className={styles.customHeading}>Accept Terms?</h3>
          <Button
            label={buttonText}
            className={styles.customButton}
            onClick={() => setBlocked((oldState) => !oldState)}
          ></Button>
        </div>
      </div>
    </>
  );
}
