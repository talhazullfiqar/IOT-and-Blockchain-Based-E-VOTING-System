const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");
async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const year = 2025;

  const timeFrame = await votingSystem.electionYears(year);

  console.log(`Election TimeFrame for ${year}:`);
  console.log(
    `Start: ${timeFrame.startDay}/${timeFrame.startMonth}/${timeFrame.startYear} at ${timeFrame.startHour}:00`
  );
  console.log(
    `End:   ${timeFrame.endDay}/${timeFrame.endMonth}/${timeFrame.endYear} at ${timeFrame.endHour}:00`
  );
}

main().catch((error) => {
  console.error("Error reading election year data:", error);
  process.exitCode = 1;
});
