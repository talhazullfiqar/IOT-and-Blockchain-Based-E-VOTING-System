import CandidateCard from "@/components/votingPageComponent/candidateCard/candidateCard";
import image from "../../assets/images/profile1.jpg";
import avatar from "../../assets/images/avatar.jpg";
export default function Page() {
  return (
    <>
      <CandidateCard
        candidateName="Muhammad Talha"
        partyName="PMLN"
        partySign={avatar}
        candidateImage={image}
      />
    </>
  );
}
