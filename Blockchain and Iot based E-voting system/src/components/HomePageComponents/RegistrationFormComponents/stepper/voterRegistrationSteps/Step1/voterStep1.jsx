"use cleint";
import { useEffect, useState } from "react";
import UserName from "../../../form/inputfields/userName/userName";
import CnicComponent from "../../../form/inputfields/cnic/cnic";
import CalenderComponent from "../../../form/calender/calender";
import AddressComponent from "../../../form/address/address";
import PhoneNumber from "../../../form/inputfields/phoneNumber/phoneNumber";
import RadioComponent from "../../../form/radio/radio";
import "primereact/resources/themes/lara-light-purple/theme.css";
import voterStyles from "./VoterStep1.module.css";
import styles from "../StepperStepsScrollbar.module.css";
import DropDown from "../../../form/dropdown/dropDown";
export default function VoterStep1({
  registrationType,
  setIsStep1Invalid,
  setFirstName, // Added setFirstName from parent state
  setLastName, // Added setLastName from parent state
  setCNIC, // Added setCNIC from parent state
  setPhoneNumber, // Added setPhoneNumber from parent state
  setBirthYear, // Added setBirthYear from parent state
  setBirthMonth, // Added setBirthMonth from parent state
  setBirthDay, // Added setBirthDay from parent state
  setConstituency, // Added setConstituency from parent state
  setGender, // Added setGender from parent state
  setAddress,
  setFlagSign,
  setSeatType,
}) {
  const [isFirstNameValid, setFirstNameValid] = useState(false);
  const [isLastNameValid, setLastNameValid] = useState(false);
  const [isCandidateSeatTypeValid, setCandidateSeatTypeValid] = useState(false);
  const [isCnicValid, setCnicValid] = useState(false);
  const [isPhoneNumberValid, setPhoneNumberValid] = useState(false);
  const [isGenderSelected, setGenderSelected] = useState(false);
  const [isDateSelected, setDateSelected] = useState(false);
  useEffect(() => {
    if (registrationType === "candidateRegistration") {
      if (
        isFirstNameValid &&
        isLastNameValid &&
        isCnicValid &&
        isPhoneNumberValid &&
        isGenderSelected &&
        isDateSelected &&
        isCandidateSeatTypeValid
      ) {
        setIsStep1Invalid(false);
      } else {
        setIsStep1Invalid(true); //should be true
      }
    } else {
      if (
        isFirstNameValid &&
        isLastNameValid &&
        isCnicValid &&
        isPhoneNumberValid &&
        isGenderSelected &&
        isDateSelected
      ) {
        setIsStep1Invalid(false);
      } else {
        setIsStep1Invalid(true); //should be true
      }
    }
  }, [
    isFirstNameValid,
    isLastNameValid,
    isCnicValid,
    isPhoneNumberValid,
    isGenderSelected,
    isDateSelected,
    setIsStep1Invalid,
  ]);

  return (
    <>
      <div
        className={`${styles.stepperScrollBar} ${voterStyles.voterRegistrationStep1}`}
      >
        <div>
          <h1 className={voterStyles.subheadings}>
            Enter Your Full Name (As per CNIC):
          </h1>
          <div>
            <UserName
              name="First Name"
              setUserNameValidity={setFirstNameValid}
              setUserName={setFirstName}
            />
            <UserName
              name="Last Name"
              setUserNameValidity={setLastNameValid}
              setUserName={setLastName}
            />
          </div>
        </div>
        {registrationType === "candidateRegistration" ? (
          <>
            <div>
              <h1 className={voterStyles.otherSubheadings}>
                Enter your Seat Type:
              </h1>
              <div>
                <UserName
                  name="Seat Type"
                  setUserNameValidity={setCandidateSeatTypeValid}
                  setUserName={setSeatType}
                />
              </div>
            </div>
          </>
        ) : null}
        <div>
          <h1 className={voterStyles.otherSubheadings}>Enter Your CNIC:</h1>
          <div>
            <CnicComponent setCnicValid={setCnicValid} setCnic={setCNIC} />
          </div>
        </div>
        <div>
          <h1 className={voterStyles.otherSubheadings}>
            Enter Your Phone Number:
          </h1>
          <div>
            <PhoneNumber
              setPhoneNumberValid={setPhoneNumberValid}
              setPhoneNumber={setPhoneNumber}
            />
          </div>
        </div>
        <div>
          <h1 className={voterStyles.otherSubheadings}>
            Enter Your Date of Birth:
          </h1>
          <div>
            <CalenderComponent
              setDateSelected={setDateSelected}
              setBirthYear={setBirthYear}
              setBirthMonth={setBirthMonth}
              setBirthDay={setBirthDay}
            />
          </div>
        </div>
        <div>
          <h1 className={voterStyles.otherSubheadings}>Select Your address:</h1>
          <div>
            <AddressComponent
              selections="Address"
              setConstituency={setConstituency}
            />
          </div>
        </div>
        {registrationType === "candidateRegistration" ? (
          <>
            <div>
              <h1 className={voterStyles.otherSubheadings}>
                Select Your Constituency:
              </h1>
              <div>
                <AddressComponent
                  selections="Constituency"
                  setConstituency={setAddress}
                />
              </div>
            </div>
          </>
        ) : null}
        {registrationType === "candidateRegistration" ? (
          <>
            <div>
              <h1 className={voterStyles.otherSubheadings}>
                Select Your Sign:
              </h1>
              <div style={{ marginLeft: "10px", marginTop: "20px" }}>
                <DropDown setFlagSign={setFlagSign} />
              </div>
            </div>
          </>
        ) : null}

        <div>
          <h1 className={voterStyles.otherSubheadings}>Select Your Gender:</h1>
          <div>
            <RadioComponent
              setGenderSelected={setGenderSelected}
              setGender={setGender}
            />
          </div>
        </div>
      </div>
    </>
  );
}
