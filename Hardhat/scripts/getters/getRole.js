const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");
async function main() {
  const address = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"; // Replace with the leader's address

  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  // You must use an admin account to call getParty (due to onlyAdmin modifier)
  const [admin] = await hre.ethers.getSigners();

  const role = await votingSystem.connect(admin).roles(address);

  console.log(`role Data:${role}`);
}

main().catch((error) => {
  console.error("Error reading party data:", error);
  process.exitCode = 1;
});
