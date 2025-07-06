const USERS = [];

function getUserByWalletAddress(walletAddress) {
  return USERS.find((user) => user.walletAddress === walletAddress);
}

function getUserById(id) {
  return USERS.find((user) => user.id === id);
}

function createUser(id, walletAddress, passKey) {
  USERS.push({ id, walletAddress, passKey });
}

function updateUserCounter(id, counter) {
  const user = USERS.find((user) => user.id === id);
  user.passKey.counter = counter;
}

module.exports = {
  getUserByWalletAddress,
  getUserById,
  createUser,
  updateUserCounter,
};
