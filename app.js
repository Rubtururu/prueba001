// Load web3.js and set up a provider
window.addEventListener('load', async () => {
  if (typeof window.ethereum !== 'undefined') {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (typeof window.web3 !== 'undefined') {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.log('No web3 provider detected');
  }
});

// Define the contract address and ABI for Binance Smart Chain
const contractAddress = '0xB8df7EEc5F3B4136D5BE3024d445A7493c274B26'; // Replace with actual contract address on Binance Smart Chain
const abi = [
	{
		"inputs": [],
		"name": "claimRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DISTRIBUTION_INTERVAL",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastDistribution",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "OWNER_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalDeposits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "TREASURY_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "treasuryPool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "users",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "deposit",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "lastClaim",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "WITHDRAWAL_FEE",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Replace with actual ABI for the contract on Binance Smart Chain

// Set up a contract instance
const contract = new web3.eth.Contract(abi, contractAddress);

// Define functions to interact with the contract
async function deposit() {
  const depositAmount = document.getElementById('deposit-amount').value;
  const tx = await contract.methods.deposit().send({
    value: depositAmount,
    from: web3.eth.defaultAccount
  });
  console.log('Deposit transaction:', tx);
}

async function withdraw() {
  const withdrawAmount = document.getElementById('withdraw-amount').value;
  const tx = await contract.methods.withdraw(withdrawAmount).send({
    from: web3.eth.defaultAccount
  });
  console.log('Withdraw transaction:', tx);
}

async function claimRewards() {
  const tx = await contract.methods.claimRewards().send({
    from: web3.eth.defaultAccount
  });
  console.log('Claim rewards transaction:', tx);
}

async function getTotalDeposits() {
  const totalDeposits = await contract.methods.totalDeposits().call();
  document.getElementById('total-deposits').textContent = web3.utils.fromWei(totalDeposits, 'ether');
}

// Update the total deposits every 10 seconds
setInterval(getTotalDeposits, 10000);

// Set the default account to the user's selected account
web3.eth.getAccounts((err, accounts) => {
  if (err) {
    console.log('Error getting accounts:', err);
  } else {
    web3.eth.defaultAccount = accounts[0];
  }
});
