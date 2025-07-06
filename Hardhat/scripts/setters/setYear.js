const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");

async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const electionYear = 2025;

  const tx = await votingSystem.setYear(electionYear);
  await tx.wait();

  console.log(`Election year ${electionYear} set successfully!`);
}

main().catch((error) => {
  console.error("Error calling setYear:", error);
  process.exitCode = 1;
});
