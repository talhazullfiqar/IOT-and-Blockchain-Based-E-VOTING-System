export default async function disconnectWallet(setWalletAccount) {
  if (typeof window.ethereum !== "undefined") {
    try {
      setWalletAccount("");
      console.log("Disconnected from MetaMask");

      window.ethereum.removeAllListeners?.("accountsChanged");

      alert("Disconnected from MetaMask");
    } catch (error) {
      alert(`Error disconnecting: ${error?.message ?? error}`);
    }
  } else {
    alert("MetaMask is not installed");
  }
}
