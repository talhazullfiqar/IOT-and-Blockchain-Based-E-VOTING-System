export async function connectWallet(setWalletAccount) {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const address = accounts[0];
      setWalletAccount(address);
      console.log("connected to MetaMask: ", address);
      setTimeout(() => {
        // console.log()
        alert("Connected to MetaMask");
      }, 1000);
    } catch (error) {
      alert(`Error connecting to MetaMask: ${error?.message ?? error}`);
    }
  }
}

export async function checkAccount(setWalletAccount) {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];
    setWalletAccount(address);
  }
}
