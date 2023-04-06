// Importar la biblioteca Web3.js
import Web3 from 'web3';

// Crear una instancia de Web3 para conectarse a la red Ethereum o Binance Smart Chain
const web3 = new Web3('https://bsc-dataseed.binance.org');

// Definir la dirección del contrato inteligente BNBTreasury01 y su ABI (Application Binary Interface)
const contractAddress = '0xB8df7EEc5F3B4136D5BE3024d445A7493c274B26';
const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
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
}
];

// Crear una instancia del contrato inteligente BNBTreasury01 utilizando su dirección y ABI
const contract = new web3.eth.Contract(abi, contractAddress);

// Obtener la dirección del usuario actual de la red Ethereum o Binance Smart Chain
const userAddress = '0x123456789...';

// Obtener la información del contrato inteligente y actualizar la interfaz de usuario con los datos correspondientes
async function updateUI() {
const treasuryPool = await contract.methods.treasuryPool().call();
const userBalance = await contract.methods.users(userAddress).deposit().call();
const userRewards = await calculateRewards();
document.getElementById('treasury-pool').textContent = treasuryPool;
document.getElementById('user-balance').textContent = userBalance;
document.getElementById('user-rewards').textContent = userRewards;
}

// Calcular las recompensas pendientes del usuario actual
async function calculateRewards() {
const user = await contract.methods.users(userAddress).call();
const totalDeposits = await contract.methods.totalDeposits().call();
const timeSinceLastClaim = (Date.now() / 1000) - user.lastClaim;
const numIntervals = Math.floor(timeSinceLastClaim / (24 * 60 * 60));

const pendingRewards = (treasuryPool * 1) / 100 * user.deposit / totalDeposits * numIntervals;

return pendingRewards;
}

// Manejar el evento de depósito del formulario
document.getElementById('deposit-form').addEventListener('submit', async (event) => {
event.preventDefault();
const depositAmount = event.target.elements['deposit-amount'].value;
const tx = await contract.methods.deposit().send({
    from: userAddress,
    value: depositAmount
});

console.log('Depósito exitoso:', tx);
await updateUI();
});

// Manejar el evento de retiro del formulario
document.getElementById('withdraw-form').addEventListener('submit', async (event) => {
event.preventDefault();
const withdrawAmount = event.target.elements['withdraw-amount'].value;
const tx = await contract.methods.withdraw(withdrawAmount).send({
    from: userAddress
});

console.log('Retiro exitoso:', tx);
await updateUI();
});

// Manejar el evento de reclamo de recompensas
document.getElementById('claim-rewards-btn').addEventListener('click', async () => {
const tx = await contract.methods.claimRewards().send({
from: userAddress
});
console.log('Recompensas reclamadas exitosamente:', tx);
await updateUI();
});

// Actualizar la interfaz de usuario inicialmente
await updateUI();
