// scripts/registerParties.js
const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");

async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const [admin] = await hre.ethers.getSigners(); // Must be the main admin

  /* -----------------------------------------------------------
   * 1)  Put each party’s details in this array.
   *     -  Feel free to change names, CNICs, images, etc.
   *     -  Only the address (leaderAddress) was fixed by you.
   * -----------------------------------------------------------
   */
  const parties = [
    {
      partyName: "PPP",
      leaderName: "Zardari",
      leaderAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      leaderCnic: "3130260772545",
      flagSignName: "Arrow",
      flagSignImage: "xyz",
      leaderFingerprint: "1234xyz",
      leaderProfilePic: "https://example.com/profile.jpg",
    },
    {
      partyName: "PTI",
      leaderName: "Imran Khan",
      leaderAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      leaderCnic: "3520171523451",
      flagSignName: "Bat",
      flagSignImage: "abc",
      leaderFingerprint: "5678abc",
      leaderProfilePic: "https://example.com/pti.jpg",
    },
    {
      partyName: "PML‑N",
      leaderName: "Nawaz Sharif",
      leaderAddress: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
      leaderCnic: "3520179876543",
      flagSignName: "Lion",
      flagSignImage: "def",
      leaderFingerprint: "9012def",
      leaderProfilePic: "https://example.com/pmln.jpg",
    },
  ];

  /* -----------------------------------------------------------
   * 2)  Loop over the array and register every party.
   * -----------------------------------------------------------
   */
  for (const p of parties) {
    const tx = await votingSystem
      .connect(admin)
      .registerParty(
        p.partyName,
        p.leaderName,
        p.leaderAddress,
        p.leaderCnic,
        p.flagSignName,
        p.flagSignImage,
        p.leaderFingerprint,
        p.leaderProfilePic
      );

    await tx.wait();
    console.log(
      `Party “${p.partyName}” registered successfully for leader ${p.leaderAddress}`
    );
  }
}

main().catch((error) => {
  console.error("Error registering parties:", error);
  process.exitCode = 1;
});
