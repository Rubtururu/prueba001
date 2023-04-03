const contractAddress = "0x123abc..."; // Dirección del contrato
const contractABI = [
  // ABI del contrato
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "creatorBalance",
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
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCreatorBalance",
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
    "name": "getTreasuryBalance",
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
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "setMaxDeposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "setMinDeposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "lastClaimedTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Crea una instancia del contrato con web3.js
const provider = new ethers.providers.Web3Provider(web3.currentProvider);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);

// Actualiza el saldo de la pool del tesoro en el HTML
async function updateTreasuryBalance() {
  const balance = await contract.getTreasuryBalance();
  const balanceElement = document.getElementById("treasuryBalance");
  balanceElement.innerHTML = ethers.utils.formatEther(balance);
}

// Actualiza el saldo del usuario en el HTML
async function updateUserBalance() {
  const address = await signer.getAddress();
  const userBalance = await contract.users(address);
  const balanceElement = document.getElementById("userBalance");
  balanceElement.innerHTML = ethers.utils.formatEther(userBalance.balance);
}

// Deposit function
async function deposit(event) {
  event.preventDefault();
  const depositAmount = event.target.elements.depositAmount.value;
  const transaction = await contract.deposit({
    value: ethers.utils.parseEther(depositAmount)
  });
  await transaction.wait();
  updateUserBalance();
  updateTreasuryBalance();
}

// Withdraw function
async function withdraw(event) {
  event.preventDefault();
  const withdrawAmount = event.target.elements.withdrawAmount.value;
  const transaction = await contract.withdraw(
    ethers.utils.parseEther(withdrawAmount)
  );
  await transaction.wait();
  updateUserBalance();
  updateTreasuryBalance();
}

// Claim reward function
async function claimReward() {
  const transaction = await contract.claimReward();
  await transaction.wait();
  updateUserBalance();
  updateTreasuryBalance();
}

// Actualiza los saldos al cargar la página
window.onload = async function () {
  await updateTreasuryBalance();
  await updateUserBalance();

  // Agrega los event listeners para deposit y withdraw
  const depositForm = document.getElementById("depositForm");
  depositForm.addEventListener("submit", deposit);
  const withdrawForm = document.getElementById("withdrawForm");
  withdrawForm.addEventListener("submit", withdraw);

  // Agrega el event listener para el botón de claimReward
  const claimRewardButton = document.getElementById("claimRewardButton");
  claimRewardButton.addEventListener("click", claimReward);
};
