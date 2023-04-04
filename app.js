// Contrato inteligente

const contractAddress = '0x6AfaDfeFCA9adb30595713Fb6BF657C711d3e24d'; // Dirección del contrato
const contractABI = [
	{
		"inputs": [],
		"name": "claimDividend",
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
		"name": "payout",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "DividendClaimed",
		"type": "event"
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
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastDividendClaim",
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
		"name": "lastPayout",
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
		"name": "maticBalance",
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
		"name": "totalMatic",
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
	}
]
]; // ABI del contrato

// Web3.js inicialización

const web3 = new Web3(window.ethereum);

// Inicialización de la instancia del contrato

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Obtener la cuenta del usuario actual

async function getCurrentAccount() {
  const accounts = await ethereum.request({ method: 'eth_accounts' });
  return accounts.length !== 0 ? accounts[0] : null;
}

// Manejo de errores de la solicitud de la cuenta del usuario actual

async function handleAccountError() {
  const currentAccount = await getCurrentAccount();
  if (!currentAccount) {
    alert('Por favor conecta tu cuenta de Metamask.');
    return false;
  }
  return true;
}

// Obtener el balance de Matic de una cuenta

async function getMaticBalance(account) {
  const balance = await contract.methods.balanceOf(account).call();
  return web3.utils.fromWei(balance, 'ether');
}

// Obtener el balance del contrato

async function getContractBalance() {
  const balance = await web3.eth.getBalance(contractAddress);
  return web3.utils.fromWei(balance, 'ether');
}

// Obtener el total de dividendos acumulados en el contrato

async function getTotalDividends() {
  const totalDividends = await contract.methods.totalDividends().call();
  return web3.utils.fromWei(totalDividends, 'ether');
}

// Obtener los dividendos acumulados por un usuario

async function getUserDividends(account) {
  const dividends = await contract.methods.getUserDividends(account).call();
  return web3.utils.fromWei(dividends, 'ether');
}

// Depositar Matic en el contrato

async function depositMatic(amount) {
  const currentAccount = await getCurrentAccount();
  if (await handleAccountError()) {
    const weiAmount = web3.utils.toWei(amount, 'ether');
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await contract.methods.depositMatic().estimateGas({ value: weiAmount, from: currentAccount });
    await contract.methods.depositMatic().send({ value: weiAmount, from: currentAccount, gasPrice, gasLimit });
    alert('¡Tu depósito se ha realizado correctamente!');
    location.reload();
  }
}

// Retirar Matic del contrato

async function withdrawMatic(amount) {
  const currentAccount = await getCurrentAccount();
  if (await handleAccountError()) {
    const weiAmount = web3.utils.toWei(amount, 'ether');
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await contract.methods.withdrawMatic(weiAmount).estimateGas({ from: currentAccount });
    await contract.methods.withdrawMatic(weiAmount).send({ from: currentAccount, gasPrice, gasLimit });
    alert('¡Tu retiro se ha realizado correctamente!');
    location.reload();
  }
}

// Reclamar dividendos acumulados

async function claimDividends() {
  const currentAccount = await getCurrentAccount();
  if (await handleAccountError()) {
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = await contract.methods.claimDividends().estimateGas({ from: currentAccount });
    await contract.methods.claimDividends().send({ from: currentAccount, gasPrice, gasLimit });
    alert('¡Tus dividendos se han reclamado correctamente!');
    location.reload();
  }
}

// Función para actualizar el balance del usuario

async function updateBalance() {
  const currentAccount = await getCurrentAccount();
  const maticBalance = await getMaticBalance(currentAccount);
  const contractBalance = await getContractBalance();
  const totalDividends = await getTotalDividends();
  const userDividends = await getUserDividends(currentAccount);
  document.getElementById('matic-balance').textContent = maticBalance;
  document.getElementById('contract-balance').textContent = contractBalance;
  document.getElementById('total-dividends').textContent = totalDividends;
  document.getElementById('user-dividends').textContent = userDividends;
}

// Inicialización de la página

async function initializePage() {
  const currentAccount = await getCurrentAccount();
  if (currentAccount) {
    updateBalance();
  }
}

initializePage();

// Event listeners para los botones de depósito, retiro y reclamación de dividendos

document.getElementById('deposit-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = event.target[0].value;
  depositMatic(amount);
});

document.getElementById('withdraw-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const amount = event.target[0].value;
  withdrawMatic(amount);
});

document.getElementById('claim-button').addEventListener('click', () => {
  claimDividends();
}); 
// Función para verificar la red de Ethereum

async function checkNetwork() {
  const chainId = await ethereum.request({ method: 'eth_chainId' });
  switch (chainId) {
    case '0x1':
      return 'mainnet';
    case '0x3':
      return 'ropsten';
    case '0x4':
      return 'rinkeby';
    case '0x5':
      return 'goerli';
    case '0x2a':
      return 'kovan';
    default:
      return 'unknown';
  }
}

// Event listener para el cambio de red de Ethereum

ethereum.on('chainChanged', () => {
  location.reload();
});

// Event listener para la desconexión de Metamask

ethereum.on('disconnect', () => {
  location.reload();
});

// Event listener para la conexión de Metamask

ethereum.on('accountsChanged', (accounts) => {
  location.reload();
});

// Función para verificar la versión de Metamask

async function checkMetamaskVersion() {
  const version = await ethereum.request({ method: 'eth_version' });
  return version;
}

// Función para verificar si Metamask está instalado

async function checkMetamaskInstalled() {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: 'eth_accounts' });
      return true;
    } catch (error) {
      return false;
    }
  }
  return false;
}

// Inicialización de la página

async function initializePage() {
  const currentAccount = await getCurrentAccount();
  if (currentAccount) {
    const network = await checkNetwork();
    const version = await checkMetamaskVersion();
    document.getElementById('network').textContent = network;
    document.getElementById('metamask-version').textContent = version;
    updateBalance();
  }
}

initializePage();

// Event listener para el botón de conexión de Metamask

document.getElementById('connect-button').addEventListener('click', async () => {
  if (await checkMetamaskInstalled()) {
    try {
      await ethereum.request({ method: 'eth_requestAccounts' });
      location.reload();
    } catch (error) {
      alert('La conexión con Metamask ha sido rechazada.');
    }
  } else {
    alert('Por favor instala Metamask para conectarte a la red de Ethereum.');
  }
}); 
// Función para formatear el número con decimales

function formatNumber(number) {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 4 }).format(number);
}

// Event listener para actualizar el balance del usuario

ethereum.on('accountsChanged', async () => {
  const currentAccount = await getCurrentAccount();
  if (currentAccount) {
    const network = await checkNetwork();
    const version = await checkMetamaskVersion();
    document.getElementById('network').textContent = network;
    document.getElementById('metamask-version').textContent = version;
    updateBalance();
  }
});

// Event listener para el botón de desconexión de Metamask

document.getElementById('disconnect-button').addEventListener('click', async () => {
  await ethereum.request({ method: 'eth_logout' });
  location.reload();
});

// Event listener para el botón de cambiar la red de Ethereum

document.getElementById('change-network-button').addEventListener('click', async () => {
  await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] });
});

// Event listener para el botón de copiar la dirección del contrato

document.getElementById('copy-contract-address-button').addEventListener('click', () => {
  navigator.clipboard.writeText(contractAddress);
  alert('La dirección del contrato se ha copiado correctamente.');
});

// Event listener para el botón de copiar la dirección de la pool del tesoro

document.getElementById('copy-treasury-pool-address-button').addEventListener('click', async () => {
  const treasuryPoolAddress = await contract.methods.treasuryPool().call();
  navigator.clipboard.writeText(treasuryPoolAddress);
  alert('La dirección de la pool del tesoro se ha copiado correctamente.');
}); 
// Función para mostrar el botón de cambio de red de Ethereum si la red actual no es la correcta

async function showChangeNetworkButton() {
  const network = await checkNetwork();
  const currentAccount = await getCurrentAccount();
  if (currentAccount && network !== 'mainnet') {
    document.getElementById('change-network-button').style.display = 'inline-block';
  }
}

showChangeNetworkButton(); 
