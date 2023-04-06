window.addEventListener('load', async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      await ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const account = accounts[0];
        const contractAddress = '0xB8df7EEc5F3B4136D5BE3024d445A7493c274B26';
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
