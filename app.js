// Conectar a la red Ethereum usando Web3.js
var web3 = new Web3(Web3.givenProvider);

// Obtener la instancia del contrato
var contract = new web3.eth.Contract([
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
], 0xB8df7EEc5F3B4136D5BE3024d445A7493c274B26);

// Función para obtener y mostrar la dirección del propietario del contrato
function getOwner() {
  contract.methods.owner().call().then(function(result) {
    console.log("Owner: " + result);
  });
}

// Función para depositar en el contrato
function deposit(amount) {
  contract.methods.deposit().send({value: amount}).then(function() {
    console.log("Deposited " + amount + " wei");
  });
}

// Función para retirar del contrato
function withdraw(amount) {
  contract.methods.withdraw(amount).send().then(function() {
    console.log("Withdrew " + amount + " wei");
  });
}

// Función para reclamar recompensas del fondo de tesorería
function claimRewards() {
  contract.methods.claimRewards().send().then(function() {
    console.log("Rewards claimed");
  });
}
// Obtener el botón de conectar y el contenedor de estado
const connectButton = document.getElementById('connectButton');
const status = document.getElementById('status');

// Función para actualizar el estado
function setStatus(message, isSuccess) {
  status.innerText = message;
  status.className = isSuccess ? 'success' : 'error';
}

// Función que se ejecuta al hacer clic en el botón de conectar
async function connect() {
  try {
    // Solicitar acceso a la cuenta del usuario
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Actualizar el estado
    setStatus(`Connected to ${accounts[0]}`, true);

  } catch (error) {
    // Actualizar el estado en caso de error
    setStatus(error.message, false);
  }
}

// Asignar el evento clic al botón de conectar
connectButton.addEventListener('click', connect);


// Función para obtener el saldo actual del fondo de tesorería
function getTreasuryPool() {
  contract.methods.treasuryPool().call().then(function(result) {
    console.log("Treasury pool balance: " + result);
  });
}

// Función para obtener la suma total de depósitos realizados por todos los usuarios
function getTotalDeposits() {
  contract.methods.totalDeposits().call().then(function(result) {
    console.log("Total deposits: " + result);
  });
}
