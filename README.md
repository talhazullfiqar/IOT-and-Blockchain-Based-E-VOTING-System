
# 🗳️ IoT-Based Blockchain E-Voting System

An end-to-end secure, transparent, and decentralized electronic voting system that leverages **blockchain**, **biometric authentication via WebAuthn**, and **IoT fingerprint validation using Windows Hello**.

Built with modern web technologies including **Next.js**, **Solidity (Ethereum)**, and **zkSync Era Layer 2** for scalability.

---

## 📌 Features

- ✅ **Fingerprint-based Voter Authentication** using WebAuthn and Windows Hello  
- 🔐 **Biometric Identity Bound Voting** – ensures one vote per verified user  
- 🧠 **Smart Contracts** for tamper-proof vote recording and verification  
- ⚡ **zkSync Era Layer 2** deployment for fast and low-cost blockchain interactions  
- 📊 Transparent and immutable voting results stored on Ethereum blockchain  
- 🌐 Modern, user-friendly frontend using **Next.js + CSS**

---

## 🧱 Tech Stack

| Layer             | Tech Used                                 |
|------------------|--------------------------------------------|
| Frontend         | Next.js, CSS                               |
| Backend          | Node.js, Express.js                        |
| Biometric Auth   | WebAuthn API, Windows Hello                |
| Blockchain       | Ethereum, Solidity, Hardhat, zkSync Era    |
| Testing          | Hardhat (unit tests for smart contracts)   |

---


---

## 🚀 How It Works

1. **User Registration**
   - Uses **Windows Hello** + WebAuthn to register a fingerprint credential
   - Stores public credential on the backend (Node.js)

2. **Voting Process**
   - Voter authenticates via fingerprint
   - On success, voter can cast vote through the frontend
   - Vote is signed and submitted to the **zkSync smart contract**

3. **Smart Contract**
   - Each vote is validated and stored immutably on Ethereum Layer 2
   - Voting logic and voter uniqueness are enforced by Solidity

---


---

## 🛡️ Security & Privacy

- No biometric data (fingerprint) is stored on the server.
- All authentication is handled via WebAuthn public-key cryptography.
- Blockchain ensures transparency, traceability, and immutability of votes.

---

## 🧪 Testing

- Solidity smart contracts are tested using **Hardhat**.
- WebAuthn flows can be tested using **Chrome with Windows Hello** support.

---

