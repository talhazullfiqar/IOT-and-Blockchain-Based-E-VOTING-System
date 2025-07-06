import "primereact/resources/themes/lara-light-purple/theme.css";
import TermsAndConditionsComponent from "../../../form/termsAndConditions/termsAndConditions";
export default function VoterStep3({ registrationType, setIsStep3Invalid }) {
  return (
    <>
      <div>
        <TermsAndConditionsComponent
          registrationType={registrationType}
          setIsStep3Invalid={setIsStep3Invalid}
        />
      </div>
    </>
  );
}
