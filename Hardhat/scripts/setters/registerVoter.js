const hre = require("hardhat");
const { CONTRACT_ADDRESS } = require("../CONTRACT_ADDRESS");

async function main() {
  const VotingSystem = await hre.ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.attach(CONTRACT_ADDRESS);

  // Voter's private key (the account that will call registerVoter)
  const voterPrivateKey =
    "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e"; // Replace with actual voter's private key

  const provider = hre.ethers.provider;
  const voterSigner = new hre.ethers.Wallet(voterPrivateKey, provider);

  // Voter details
  const firstName = "Ali";
  const lastName = "Raza";
  const cnic = "4210199999999";
  const phoneNumber = "03121234567";
  const birthYear = 1995;
  const birthMonth = 7;
  const birthDay = 15;
  const constituency = "NA10";
  const gender = "male";
  const cnicImage = "https://example.com/cnic.jpg";
  const fingerprint = "fingerprint_hash_or_string";

  const tx = await votingSystem
    .connect(voterSigner)
    .registerVoter(
      firstName,
      lastName,
      cnic,
      phoneNumber,
      birthYear,
      birthMonth,
      birthDay,
      constituency,
      gender,
      cnicImage,
      fingerprint
    );

  await tx.wait();
  console.log(
    `✅ Voter "${firstName} ${lastName}" registered successfully with address ${await voterSigner.getAddress()}`
  );
}

main().catch((error) => {
  console.error("❌ Error registering voter:", error);
  process.exitCode = 1;
});
