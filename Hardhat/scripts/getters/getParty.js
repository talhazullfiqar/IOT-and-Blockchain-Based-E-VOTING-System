// const hre = require("hardhat");
// const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");
// async function main() {
//   const partyLeaderAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"; // Replace with the leader's address

//   const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
//   const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

//   // You must use an admin account to call getParty (due to onlyAdmin modifier)
//   const [admin] = await hre.ethers.getSigners();

//   const party = await votingSystem.connect(admin).getParty(partyLeaderAddress);

//   console.log("Party Data:");
//   console.log(`Name: ${party.name}`);
//   console.log(`Leader Name: ${party.leaderName}`);
//   console.log(`Leader Address: ${party.leaderAddress}`);
//   console.log(`Leader Cnic: ${party.leaderCnic}`);
//   console.log(`Leader flagSignImage: ${party.flagSignImage}`);
//   console.log(`Registered: ${party.isRegistered}`);
//   console.log(`Role: ${party.assignRole}`);
// }

// main().catch((error) => {
//   console.error("Error reading party data:", error);
//   process.exitCode = 1;
// });

// scripts/getParties.js
const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");

async function main() {
  // ⛳️  All party‑leader addresses you registered
  const leaderAddresses = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // PPP
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // PTI
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906", // PML‑N
  ];

  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const [admin] = await hre.ethers.getSigners(); // onlyAdmin modifier

  console.log("\n===================== PARTY DATA =====================\n");

  for (const addr of leaderAddresses) {
    try {
      const p = await votingSystem.connect(admin).getParty(addr);

      console.log(`🔹 Party (${addr})`);
      console.log(`   Name               : ${p.name}`);
      console.log(`   Leader Name        : ${p.leaderName}`);
      console.log(`   Leader Address     : ${p.leaderAddress}`);
      console.log(`   Leader CNIC        : ${p.leaderCnic}`);
      console.log(`   Flag Sign Image    : ${p.flagSignImage}`);
      console.log(`   Registered?        : ${p.isRegistered}`);
      console.log(`   Role               : ${p.assignRole}\n`);
    } catch (err) {
      console.error(`❌ Could not fetch party @ ${addr}:`, err.reason || err);
    }
  }
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exitCode = 1;
});
