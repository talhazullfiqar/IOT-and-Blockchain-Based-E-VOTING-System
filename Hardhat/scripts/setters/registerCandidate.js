const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");

async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  const provider = hre.ethers.provider;

  const candidates = [
    // === PPP Candidates ==========================================
    {
      partyPrivateKey:
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
      name: "Bilawal",
      seatType: "MNA",
      constituency: "NA51",
      walletAddress: "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
      partyName: "PPP",
      cnic: "4210176543211",
      profilePic: "QmQuQy8uPxgyXiy4h2BBK9UzjsYBSpBqCXeUyScvS69yD7",
      partySignImage: "xyz",
    },
    {
      partyPrivateKey:
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
      name: "Shazia Marri",
      seatType: "MPA",
      constituency: "NA51",
      walletAddress: "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc",
      partyName: "PPP",
      cnic: "4210188899991",
      profilePic: "QmQuQy8uPxgyXiy4h2BBK9UzjsYBSpBqCXeUyScvS69yD7",
      partySignImage: "xyz",
    },

    // === PTI Candidates ==========================================
    {
      partyPrivateKey:
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
      name: "Ali Khan",
      seatType: "MNA",
      constituency: "NA51",
      walletAddress: "0x976EA74026E726554dB657fA54763abd0C3a0aa9",
      partyName: "PTI",
      cnic: "3520171234567",
      profilePic: "QmQuQy8uPxgyXiy4h2BBK9UzjsYBSpBqCXeUyScvS69yD7",
      partySignImage: "abc",
    },
    {
      partyPrivateKey:
        "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
      name: "Hammad Azhar",
      seatType: "MPA",
      constituency: "NA51",
      walletAddress: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955",
      partyName: "PTI",
      cnic: "3520199990001",
      profilePic: "QmQuQy8uPxgyXiy4h2BBK9UzjsYBSpBqCXeUyScvS69yD7",
      partySignImage: "abc",
    },

    // === PML-N Candidates ========================================
    {
      partyPrivateKey:
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
      name: "Maryam Nawaz",
      seatType: "MNA",
      constituency: "NA51",
      walletAddress: "0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f",
      partyName: "PML‑N",
      cnic: "3520179876541",
      profilePic: "QmQuQy8uPxgyXiy4h2BBK9UzjsYBSpBqCXeUyScvS69yD7",
      partySignImage: "def",
    },
    {
      partyPrivateKey:
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
      name: "Rana Sanaullah",
      seatType: "MPA",
      constituency: "NA51",
      walletAddress: "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720",
      partyName: "PML‑N",
      cnic: "3520100000001",
      profilePic: "QmQuQy8uPxgyXiy4h2BBK9UzjsYBSpBqCXeUyScvS69yD7",
      partySignImage: "def",
    },
  ];

  for (const c of candidates) {
    const partySigner = new hre.ethers.Wallet(c.partyPrivateKey, provider);

    const tx = await votingSystem
      .connect(partySigner)
      .registerCandidate(
        c.name,
        c.seatType,
        c.constituency,
        c.walletAddress,
        c.partyName,
        c.cnic,
        c.profilePic,
        c.partySignImage
      );

    await tx.wait();
    console.log(
      `✅ Registered "${c.name}" for seat ${c.seatType} (${c.constituency}) under ${c.partyName}`
    );
  }
}

main().catch((error) => {
  console.error("❌ Error registering candidates:", error);
  process.exitCode = 1;
});
