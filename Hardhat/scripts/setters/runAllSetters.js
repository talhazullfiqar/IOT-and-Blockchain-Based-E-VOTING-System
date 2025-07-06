async function main() {
  // Import all scripts
  const setYear = require("./setYear.js");
  const setElectionTime = require("./setElectionTime.js");
  const setCandidateTime = require("./setCandidateTime.js");
  const setVoterTime = require("./setVoterTime.js");
  const registerParty = require("./registerParty.js");
  const registerCandidate = require("./registerCandidate.js");
  const registerVoter = require("./registerVoter.js");

  // Run each script's main function in sequence
  console.log("Setting Year...");
  await setYear.main();
  console.log("Setting Election Time...");
  await setElectionTime.main();
  console.log("Setting Candidate Time...");
  await setCandidateTime.main();
  console.log("Setting Voter Time...");
  await setVoterTime.main();

  console.log("Registering Party...");
  await registerParty.main();

  console.log("Registering Candidate...");
  await registerCandidate.main();

  console.log("Registering Voter...");
  await registerVoter.main();

  console.log("All scripts executed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
