import DashboardPage from "@/components/HomePageComponents/sideBarPagesComponents/voteDetailPage/voteDetailsPage";
import CandidateRegistrationPage from "@/components/HomePageComponents/sideBarPagesComponents/candidateRegistrationPage";
import VoterRegistrationPage from "@/components/HomePageComponents/sideBarPagesComponents/voterRegistrationPage";
import BackgroundGradient from "@/components/MainBackgroundGradient/backgroundGradient";

import AdminDashboard from "@/components/HomePageComponents/sideBarPagesComponents/adminPage/adminDashboard";
import PartyRegistrationPage from "@/components/HomePageComponents/sideBarPagesComponents/adminPage/partyAndCandidateRegistrations/partyRegistrationPage";
import PartyCandidateRegistrationPage from "@/components/HomePageComponents/sideBarPagesComponents/adminPage/partyAndCandidateRegistrations/partyCandidateRegistrationPage";
import SubAdminDashboard from "@/components/HomePageComponents/sideBarPagesComponents/subAdminPage/subAdminDashboard";
export default async function dashboardPages({ params }) {
  const { dashboardPages } = await params;
  return (
    <>
      <BackgroundGradient>
        {dashboardPages === "votingDashboard" && <DashboardPage />}
        {dashboardPages === "voterRegistration" && <VoterRegistrationPage />}
        {dashboardPages === "candidateRegistration" && (
          <CandidateRegistrationPage />
        )}
        {dashboardPages === "partyCandidateRegistration" && (
          <PartyCandidateRegistrationPage />
        )}
        {dashboardPages === "partyRegistration" && <PartyRegistrationPage />}
        {dashboardPages === "adminDashboard" && <AdminDashboard />}
        {dashboardPages === "subAdminDashboard" && <SubAdminDashboard />}
      </BackgroundGradient>
    </>
  );
}
