const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");

async function main() {
  const voterAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const [admin] = await hre.ethers.getSigners();

  try {
    const voter = await votingSystem.connect(admin).getVoter(voterAddress);

    console.log(`\nVoter Data:`);
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
  } catch (error) {
    console.error("Error fetching voter data:", error);
  }
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exitCode = 1;
});
