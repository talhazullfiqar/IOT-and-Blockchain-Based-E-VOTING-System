// "use client";
// import { BrowserProvider, Contract } from "ethers";
// import contractABI from "../../CONTRACT_ABI/VotingSystem.json";
// import { CONTRACT_ADDRESS } from "../../CONTRACT_ABI/contractAddress";

// export const getCandidatesByPost = async (postType) => {
//   if (typeof window === "undefined" || !window.ethereum) {
//     console.warn("MetaMask not available.");
//     return [];
//   }

//   const provider = new BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();
//   const contract = new Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

//   try {
//     const [partyCandidates, independentCandidates] =
//       await contract.getCandidatesByConstituency();

//     const all = [...partyCandidates, ...independentCandidates];

//     const ipfsGateway = "https://gateway.pinata.cloud/ipfs/";

//     const filtered = all
//       .filter((c) => c[1] === (postType === 0 ? "MNA" : "MPA"))
//       .map((c) => ({
//         name: c[0],
//         post: c[1],
//         constituency: c[2],
//         wallet: c[3],
//         party: c[4] || "Independent",
//         cnic: c[5],
//         image: `${ipfsGateway}${c[6]}`,
//         partySymbol: `${ipfsGateway}${c[7]}`,
//         electionYear: c[8],
//         isRegistered: c[9],
//         voteCount: c[10],
//         partyId: c[11],
//       }));
//     console.log(filtered);
//     return filtered;
//   } catch (error) {
//     console.error("Error fetching candidates by constituency:", error);
//     return [];
//   }
// };

"use client";
import { BrowserProvider, Contract } from "ethers";
import contractABI from "../../CONTRACT_ABI/VotingSystem.json";
import { CONTRACT_ADDRESS } from "../../CONTRACT_ABI/contractAddress";

export const getCandidatesByPost = async (postType) => {
  if (typeof window === "undefined" || !window.ethereum) {
    console.warn("MetaMask not available.");
    return [];
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

  try {
    const [partyCandidates, independentCandidates] =
      await contract.getCandidatesByConstituency();

    const all = [...partyCandidates, ...independentCandidates];

    const filtered = all
      .filter((c) => c[1] === (postType === 0 ? "MNA" : "MPA"))
      .map((c) => ({
        name: c[0],
        post: c[1],
        constituency: c[2],
        wallet: c[3],
        party: c[4] || "Independent",
        cnic: c[5],
        image: c[6],
        partySymbol: c[7],
        electionYear: c[8],
        isRegistered: c[9],
        voteCount: c[10],
        partyId: c[11],
      }));
    console.log(filtered);
    return filtered;
  } catch (error) {
    console.error("Error fetching candidates by constituency:", error);
    return [];
  }
};
