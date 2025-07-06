import ElectionControlCenter from "./electionControlComponents/electionControlCenter/electionControlCenter.jsx";
import CandidateRegistrationControlCenter from "./electionControlComponents/voterAndCandidateRegistrationControlCnter/candidateRegistrationControlCnter.jsx";
import VoterRegistrationControlCenter from "./electionControlComponents/voterAndCandidateRegistrationControlCnter/voterRegistrationControlCnter.jsx";
import RegistrationControlCenter from "./electionControlComponents/voterAndCandidateRegistrationControlCnter/voterRegistrationControlCnter.jsx";

export default function ElectionsControl() {
  return (
    <div>
      <ElectionControlCenter />
      <CandidateRegistrationControlCenter />
      <VoterRegistrationControlCenter />
    </div>
  );
}
