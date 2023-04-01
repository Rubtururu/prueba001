// Connect to the deployed contract
const contractAddress = "0x123456...";
const abi = []; // insert contract ABI here
const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

// Deposit function
async function deposit(amount) {
  const tx = await contract.deposit(amount);
  const receipt = await tx.wait();
  console.log(receipt);
}

// Withdraw function
async function withdraw() {
  const tx = await contract.withdraw();
  const receipt = await tx.wait();
  console.log(receipt);
}

// Update dividends function
async function updateDividends() {
  const tx = await contract.updateDividends();
  const receipt = await tx.wait();
  console.log(receipt);
}

// Update dividend percentage function
async function updateDividendPercentage(percentage) {
  const tx = await contract.updateDividendPercentage(percentage);
  const receipt = await tx.wait();
  console.log(receipt);
}

// Update prize percentage function
async function updatePrizePercentage(percentage) {
  const tx = await contract.updatePrizePercentage(percentage);
  const receipt = await tx.wait();
  console.log(receipt);
}

// Update owner percentage function
async function updateOwnerPercentage(percentage) {
  const tx = await contract.updateOwnerPercentage(percentage);
  const receipt = await tx.wait();
  console.log(receipt);
}

// Withdraw prize pool function
async function withdrawPrizePool() {
  const tx = await contract.withdrawPrizePool();
  const receipt = await tx.wait();
  console.log(receipt);
}
