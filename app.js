window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const account = accounts[0];
        const contractAddress = '0x4b8eE4A9D2bC11F4d4580d83F7b2C2B0C7c0C01B';
        const contract = new web3.eth.Contract(abi, contractAddress);
        document.getElementById('balance').textContent = await contract.methods.totalDeposits().call({ from: account });
        document.getElementById('treasury').textContent = await web3.eth.getBalance(contractAddress);
        document.getElementById('address').textContent = account;
      }
    } catch (error) {
      console.error(error);
    }
  }
});
