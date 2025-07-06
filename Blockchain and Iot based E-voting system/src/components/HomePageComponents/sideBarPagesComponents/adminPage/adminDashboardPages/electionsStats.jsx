import BlockchainStatus from "./electionStatsComponents/blockChainStatus/blockChainStatus";
import RegisteredUsersLists from "./electionStatsComponents/registeredUsersList/registeredUserLists";
import VotingStatusCards from "./electionStatsComponents/statusCards/votingStatusCards";

export default function ElectionsStats() {
  return (
    <div>
      <BlockchainStatus />
      <VotingStatusCards />
      <RegisteredUsersLists />
    </div>
  );
}
