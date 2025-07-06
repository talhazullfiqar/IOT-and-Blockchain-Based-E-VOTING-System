const hre = require("hardhat");

async function main() {
  console.log("Deploying VotingSystem contract...");

  const subAdmin = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");

  const votingSystem = await VotingSystem.deploy(subAdmin); // Already deployed
  console.log(`VotingSystem deployed to: ${votingSystem.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
