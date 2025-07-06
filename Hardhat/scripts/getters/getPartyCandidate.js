const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");
async function main() {
  const candidateAddress = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with the specific candidate's address

  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const [admin] = await hre.ethers.getSigners();

  // Call the custom getCandidate function to fetch data for the specific candidate
  const candidate = await votingSystem
    .connect(admin)
    .getCandidate(candidateAddress);

  // Display the candidate data
  console.log(`\nCandidate Data:`);
  console.log(`  Name: ${candidate.name}`);
  console.log(`  Seat Type: ${candidate.seatType}`);
  console.log(`  Constituency: ${candidate.constituency}`);
  console.log(`  Wallet Address: ${candidate.walletAddress}`);
  console.log(`  Party Name: ${candidate.partyName}`);
  console.log(`  CNIC: ${candidate.cnic}`);
  console.log(`  Profile Pic: ${candidate.profilePic}`);
  console.log(`  Party Sign Image: ${candidate.partySignImage}`);
  console.log(`  Election Year: ${candidate.electionYear.toString()}`);
  console.log(`  Is Registered: ${candidate.isRegistered}`);
  console.log(`  Vote Count: ${candidate.voteCount.toString()}`);
}

main().catch((error) => {
  console.error("Error fetching candidate data:", error);
  process.exitCode = 1;
});
