// scripts/getPartyCandidates.js
const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");

async function main() {
  // ⛳️  All candidate wallet addresses you registered (MNA & MPA)
  const candidateAddresses = [
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", // Bilawal (PPP, MNA)
    "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955", // Shazia Marri (PPP, MPA)
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", // Ali Khan (PTI, MNA)
    "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f", // Hammad Azhar (PTI, MPA)
    "0x976EA74026E726554dB657fA54763abd0C3a0aa9", // Maryam Nawaz (PML‑N, MNA)
    "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720", // Rana Sanaullah (PML‑N, MPA)
  ];

  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const [admin] = await hre.ethers.getSigners();

  console.log(
    "\n================ CANDIDATE DATA (PARTY‑BACKED) ================\n"
  );

  for (const addr of candidateAddresses) {
    try {
      // Change the function name below if your contract differs
      const c = await votingSystem.connect(admin).getCandidate(addr);

      console.log(`🔸 Candidate (${addr})`);
      console.log(`   Name           : ${c.name}`);
      console.log(`   CNIC           : ${c.cnic}`);
      console.log(`   Party          : ${c.partyName}`);
      console.log(`   Seat Type      : ${c.seatType}`);
      console.log(`   Constituency   : ${c.constituency}`);
      console.log(`   Profile Image  : ${c.profilePic || c.profileImage}`);
      console.log(`   Registered?    : ${c.isRegistered}`);
      console.log(`   Votes          : ${c.voteCount?.toString?.() || "0"}\n`);
    } catch (err) {
      console.error(
        `❌ Could not fetch candidate @ ${addr}:`,
        err.reason || err
      );
    }
  }
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exitCode = 1;
});
