// Web3 initialization
const web3 = new Web3(window.ethereum);

// Smart contract address and ABI
const contractAddress = '0xf8b126D789789dD44d2631D9b11B9cA4d1823B9b';
const contractABI = CONTRACT_ABI;

// Contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Main pool balance element
const mainPoolBalanceElement = document.getElementById('main-pool-balance');

// User balance and ranking elements
const userBalanceElement = document.getElementById('user-balance');
const userRankingElement = document.getElementById('user-ranking');

// Deposit and withdraw amount elements
const depositAmountElement = document.getElementById('deposit-amount');
const withdrawAmountElement = document.getElementById('withdraw-amount');

// Messages element
const messagesElement = document.getElementById('messages');

// Button elements
const depositButtonElement = document.getElementById('deposit-button');
const withdrawButtonElement = document.getElementById('withdraw-button');
const claimRewardButtonElement = document.getElementById('claim-reward-button');

// Get main pool balance
async function getMainPoolBalance() {
  const balance = await contract.methods.getMainPoolBalance().call();
  mainPoolBalanceElement.innerText = web3.utils.fromWei(balance, 'ether');
}

// Get user balance and ranking
async function getUserData() {
  const accounts = await web3.eth.getAccounts();
  const user = accounts[0];
  const balance = await contract.methods.getUserBalance(user).call();
  const ranking = await contract.methods.userRankings(user).call();
  userBalanceElement.innerText = web3.utils.fromWei(balance, 'ether');
  userRankingElement.innerText = web3.utils.fromWei(ranking, 'ether');
}

// Deposit function
async function deposit() {
  const amount = depositAmountElement.value;
  const weiAmount = web3.utils.toWei(amount, 'ether');

  // Send transaction
  await contract.methods.deposit().send({
    from: await web3.eth.getAccounts()[0],
    value: weiAmount
  });

  // Update user balance and main pool balance
  await getUserData();
  await getMainPoolBalance();

  // Show success message
  messagesElement.innerText = `Deposited ${amount} ETH successfully.`;
}

// Withdraw function
async function withdraw() {
  const amount = withdrawAmountElement.value;
  const weiAmount = web3.utils.toWei(amount, 'ether');

  // Send transaction
  await contract.methods.withdraw(weiAmount).send({
    from: await web3.eth.getAccounts()[0]
  });

  // Update user balance and main pool balance
  await getUserData();
  await getMainPoolBalance();

  // Show success message
  messagesElement.innerText = `Withdrew ${amount} ETH successfully.`;
}

// Claim ranking reward function
async function claimReward() {
  // Send transaction
  await contract.methods.claimRankingReward().send({
    from: await web3.eth.getAccounts()[0]
  });

  // Update user ranking and main pool balance
  await getUserData();
  await getMainPoolBalance();

  // Show success message
  messagesElement.innerText = `Claimed ranking reward successfully.`;
}

// Event listeners
depositButtonElement.addEventListener('click', deposit);
withdrawButtonElement.addEventListener('click', withdraw);
claimRewardButtonElement.addEventListener('click', claimReward);

// Initialization
window.addEventListener('load', async () => {
  // Check if MetaMask is installed
  if (typeof window.ethereum !== 'undefined') {
    // Request account access
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    messagesElement.innerText = 'Please install MetaMask to use this application.';
  }

  // Get main pool balance and user data
 
// Event listeners
depositButtonElement.addEventListener('click', deposit);
withdrawButtonElement.addEventListener('click', withdraw);
claimRewardButtonElement.addEventListener('click', claimReward);

// Functions
async function deposit() {
const amount = Number(depositInputElement.value);
if (!amount) {
alert('Amount must be greater than zero');
return;
}

const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

try {
const overrides = {
value: ethers.utils.parseEther(amount.toString())
};
const tx = await contract.deposit(overrides);
await tx.wait();
updateBalances();
alert('Deposit successful');
} catch (error) {
console.error(error);
alert('Deposit failed');
}
}

async function withdraw() {
const amount = Number(withdrawInputElement.value);
if (!amount) {
alert('Amount must be greater than zero');
return;
}

const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

try {
const tx = await contract.withdraw(ethers.utils.parseEther(amount.toString()));
await tx.wait();
updateBalances();
alert('Withdrawal successful');
} catch (error) {
console.error(error);
alert('Withdrawal failed');
}
}

async function claimReward() {
const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

try {
const tx = await contract.claimRankingReward();
await tx.wait();
updateBalances();
alert('Reward claimed');
} catch (error) {
console.error(error);
alert('Failed to claim reward');
}
}

async function updateBalances() {
const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const contract = new ethers.Contract(contractAddress, abi, provider);

const mainPoolBalance = await contract.getMainPoolBalance();
mainPoolBalanceElement.innerText = ethers.utils.formatEther(mainPoolBalance);

const userBalance = await contract.getUserBalance(currentAccount);
userBalanceElement.innerText = ethers.utils.formatEther(userBalance);
}

// Function to update the total pool balance statistic
async function updateTotalPoolBalance() {
    const balance = await contract.getMainPoolBalance();
    const formattedBalance = web3.utils.fromWei(balance.toString(), 'ether');
    document.getElementById('total-pool-balance').innerText = `${formattedBalance} ETH`;
}

// Function to update the user balance statistic
async function updateUserBalance() {
    const balance = await contract.getUserBalance(account);
    const formattedBalance = web3.utils.fromWei(balance.toString(), 'ether');
    document.getElementById('user-balance').innerText = `${formattedBalance} ETH`;
}

// Function to update the user ranking statistic
async function updateUserRanking() {
    const ranking = await contract.userRankings(account);
    const formattedRanking = web3.utils.fromWei(ranking.toString(), 'ether');
    document.getElementById('user-ranking').innerText = `${formattedRanking} ETH`;
}

// Function to update the ranking reward statistic
async function updateRankingReward() {
    const reward = await contract.calculateRankingReward();
    const formattedReward = web3.utils.fromWei(reward.toString(), 'ether');
    document.getElementById('ranking-reward').innerText = `${formattedReward} ETH`;
}

// Function to update all the statistics
async function updateStatistics() {
    await Promise.all([
        updateTotalPoolBalance(),
        updateUserBalance(),
        updateUserRanking(),
        updateRankingReward()
    ]);
}
