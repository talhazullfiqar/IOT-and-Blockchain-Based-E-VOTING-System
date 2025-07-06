const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");

async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const [admin] = await hre.ethers.getSigners();

  try {
    const voters = await votingSystem.connect(admin).getAllVoters();

    console.log(`\nTotal Voters: ${voters.length}\n`);

    voters.forEach((voter, index) => {
      console.log(`Voter #${index + 1}`);
      console.log(`  First Name: ${voter.firstName}`);
      console.log(`  Last Name: ${voter.lastName}`);
      console.log(`  CNIC: ${voter.cnic}`);
      console.log(`  Phone Number: ${voter.phoneNumber}`);
      console.log(
        `  Date of Birth: ${voter.birthYear}-${voter.birthMonth}-${voter.birthDay}`
      );
      console.log(`  Constituency: ${voter.constituency}`);
      console.log(`  Gender: ${voter.gender}`);
      console.log(`  CNIC Image: ${voter.cnicImage}`);
      console.log(`  Fingerprint: ${voter.fingerprint}`);
      console.log(`  Accepted Voting Term: ${voter.acceptedVotingTerm}`);
      console.log(`  Election Year: ${voter.electionYear.toString()}`);
      console.log(`  Is Registered: ${voter.isRegistered}`);
      console.log("--------------------------------------------------");
    });
  } catch (error) {
    console.error("Error fetching all voters:", error);
  }
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exitCode = 1;
});
