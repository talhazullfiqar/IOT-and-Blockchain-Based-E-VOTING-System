const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");

async function main() {
  const voterAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";

  // Impersonate voter address in Hardhat (works only in local/test networks)
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [voterAddress],
  });

  const voter = await hre.ethers.getSigner(voterAddress);

  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  console.log(
    "\n================ CANDIDATES IN YOUR CONSTITUENCY ================\n"
  );

  try {
    const [partyCandidates, independentCandidates] = await votingSystem
      .connect(voter)
      .getCandidatesByConstituency();

    console.log("✅ Party-backed Candidates:");
    for (const c of partyCandidates) {
      console.log(`🔸 Candidate`);
      console.log(`   Name           : ${c.name}`);
      console.log(`   CNIC           : ${c.cnic}`);
      console.log(`   Party          : ${c.partyName}`);
      console.log(`   Seat Type      : ${c.seatType}`);
      console.log(`   Constituency   : ${c.constituency}`);
      console.log(`   Profile Image  : ${c.profilePic || c.profileImage}`);
      console.log(`   Registered?    : ${c.isRegistered}`);
      console.log(`   Votes          : ${c.voteCount?.toString?.() || "0"}\n`);
    }

    console.log("✅ Independent Candidates:");
    for (const c of independentCandidates) {
      console.log(`🔸 Independent Candidate`);
      console.log(`   Name           : ${c.name}`);
      console.log(`   CNIC           : ${c.cnic}`);
      console.log(`   Seat Type      : ${c.seatType}`);
      console.log(`   Constituency   : ${c.constituency}`);
      console.log(`   Profile Image  : ${c.profilePic || c.profileImage}`);
      console.log(`   Registered?    : ${c.isRegistered}`);
      console.log(`   Votes          : ${c.voteCount?.toString?.() || "0"}\n`);
    }
  } catch (err) {
    console.error("❌ Error fetching candidates:", err.reason || err);
  }

  // Stop impersonating
  await hre.network.provider.request({
    method: "hardhat_stopImpersonatingAccount",
    params: [voterAddress],
  });
}

main().catch((error) => {
  console.error("Script failed:", error);
  process.exitCode = 1;
});
