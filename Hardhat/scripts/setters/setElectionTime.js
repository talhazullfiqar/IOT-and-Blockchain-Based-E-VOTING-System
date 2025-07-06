const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");
async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const year = 2025;
  const startDay = 1;
  const startMonth = 6;
  const startYear = 2025;
  const startHour = 9;
  const endDay = 5;
  const endMonth = 6;
  const endYear = 2025;
  const endHour = 17;

  const tx = await votingSystem.setElectionYear(
    year,
    startDay,
    startMonth,
    startYear,
    startHour,
    endDay,
    endMonth,
    endYear,
    endHour
  );
  await tx.wait();

  console.log("Election year set successfully!");
}

main().catch((error) => {
  console.error("Error calling setElectionYear:", error);
  process.exitCode = 1;
});
