const {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} = require("@simplewebauthn/server");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {
  getUserByWalletAddress,
  createUser,
  updateUserCounter,
  getUserById,
} = require("./db");

const app = express();
app.use(express.json());
app.use(cookieParser());

const CLIENT_URL = "http://localhost:3001";
const RP_ID = "localhost";

app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.get("/init-register", async (req, res) => {
  const walletAddress = req.query.walletAddress;
  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return res.status(400).json({ error: "Invalid wallet address format" });
  }

  if (getUserByWalletAddress(walletAddress) != null) {
    return res.status(400).json({ error: "User already exists" });
  }

  const options = await generateRegistrationOptions({
    rpID: RP_ID,
    rpName: "Web Dev Simplified",
    userName: walletAddress,
  });

  // Log the generated registration options
  console.log("Generated Registration Options:", options);

  res.cookie(
    "regInfo",
    JSON.stringify({
      userId: options.user.id,
      walletAddress,
      challenge: options.challenge,
    }),
    { httpOnly: true, maxAge: 60000, secure: false }
  );

  res.json(options);
});

app.post("/verify-register", async (req, res) => {
  const regInfo = JSON.parse(req.cookies.regInfo);

  if (!regInfo) {
    return res.status(400).json({ error: "Registration info not found" });
  }

  // Log the registration response received from the client
  console.log("Registration Response:", req.body);

  const verification = await verifyRegistrationResponse({
    response: req.body,
    expectedChallenge: regInfo.challenge,
    expectedOrigin: CLIENT_URL,
    expectedRPID: RP_ID,
  });

  // Log the verification result and passkey data
  console.log("Registration Verification Result:", verification);

  if (verification.verified) {
    createUser(regInfo.userId, regInfo.walletAddress, {
      id: verification.registrationInfo.credentialID,
      publicKey: verification.registrationInfo.credentialPublicKey,
      counter: verification.registrationInfo.counter,
      deviceType: verification.registrationInfo.credentialDeviceType,
      backedUp: verification.registrationInfo.credentialBackedUp,
      transport: req.body.transports,
    });
    res.clearCookie("regInfo");
    return res.json({ verified: verification.verified });
  } else {
    return res
      .status(400)
      .json({ verified: false, error: "Verification failed" });
  }
});

app.get("/init-auth", async (req, res) => {
  const walletAddress = req.query.walletAddress;
  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address is required" });
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
    return res.status(400).json({ error: "Invalid wallet address format" });
  }

  const user = getUserByWalletAddress(walletAddress);
  if (user == null) {
    return res.status(400).json({ error: "No user for this wallet address" });
  }

  const options = await generateAuthenticationOptions({
    rpID: RP_ID,
    allowCredentials: [
      {
        id: user.passKey.id,
        type: "public-key",
        transports: user.passKey.transports,
      },
    ],
  });

  // Log the generated authentication options
  console.log("Generated Authentication Options:", options);

  res.cookie(
    "authInfo",
    JSON.stringify({
      userId: user.id,
      challenge: options.challenge,
    }),
    { httpOnly: true, maxAge: 60000, secure: false }
  );

  res.json(options);
});

app.post("/verify-auth", async (req, res) => {
  const authInfo = JSON.parse(req.cookies.authInfo);

  if (!authInfo) {
    return res.status(400).json({ error: "Authentication info not found" });
  }

  const user = getUserById(authInfo.userId);
  if (user == null || user.passKey.id != req.body.id) {
    return res.status(400).json({ error: "Invalid user" });
  }

  // Log the authentication response received from the client
  console.log("Authentication Response:", req.body);

  const verification = await verifyAuthenticationResponse({
    response: req.body,
    expectedChallenge: authInfo.challenge,
    expectedOrigin: CLIENT_URL,
    expectedRPID: RP_ID,
    authenticator: {
      credentialID: user.passKey.id,
      credentialPublicKey: user.passKey.publicKey,
      counter: user.passKey.counter,
      transports: user.passKey.transports,
    },
  });

  // Log the verification result and passkey data
  console.log("Authentication Verification Result:", verification);

  if (verification.verified) {
    updateUserCounter(user.id, verification.authenticationInfo.newCounter);
    res.clearCookie("authInfo");
    return res.json({ verified: verification.verified });
  } else {
    return res
      .status(400)
      .json({ verified: false, error: "Verification failed" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
