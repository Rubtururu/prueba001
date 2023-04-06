// Reemplaza los siguientes valores con los detalles de tu contrato
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"name": "bid",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimReward",
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
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "distributeAuctionRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_usdtToken",
				"type": "address"
			}
		],
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
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"name": "NewBid",
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
		"name": "Reward",
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
		"inputs": [],
		"name": "auctionEndTime",
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
		"name": "auctionPool",
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
		"name": "auctionStartTime",
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "auctionTopBidders",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastBid",
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
		"name": "lastRewardTime",
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
		"inputs": [],
		"name": "usdtToken",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
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
				"name": "lastRewardTime",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
] // Incluir el ABI del contrato aquí
const contractAddress = "0x2ba53e39A92E70c9f2e3ca53446f260A74047045"; // Incluir la dirección del contrato aquí

let web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
let contract = new web3.eth.Contract(contractABI, contractAddress);

async function updateStats() {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];

    // Balance del usuario
    const userBalance = await contract.methods.balanceOf(userAddress).call();
    document.getElementById('userBalance').innerText = `${web3.utils.fromWei(userBalance, 'ether')} USDT`;

    // Pool del Tesoro
    const treasuryPool = await contract.methods.getTreasuryPool().call();
    document.getElementById('treasuryPool').innerText = `${web3.utils.fromWei(treasuryPool, 'ether')} USDT`;

    // Pool de Subasta
    const auctionPool = await contract.methods.getAuctionPool().call();
    document.getElementById('auctionPool').innerText = `${web3.utils.fromWei(auctionPool, 'ether')} USDT`;
}

async function deposit() {
    const amount = document.getElementById('depositAmount').value;
    const accounts = await web3.eth.getAccounts();

    contract.methods.deposit(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log('Transacción enviada:', hash);
        })
        .on('receipt', (receipt) => {
            console.log('Transacción completada:', receipt);
            updateStats();
        })
        .on('error', (error) => {
            console.error('Error al depositar:', error);
        });
}

async function withdraw() {
    const amount = document.getElementById('withdrawAmount').value;
    const accounts = await web3.eth.getAccounts();

    contract.methods.withdraw(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log('Transacción enviada:', hash);
        })
        .on('receipt', (receipt) => {
            console.log('Transacción completada:', receipt);
            updateStats();
        })
        .on('error', (error) => {
            console.error('Error al retirar:', error);
        });
}

async function claimReward() {
    const accounts = await web3.eth.getAccounts();

    contract.methods.claimReward().send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log('Transacción enviada:', hash);
        })
        .on('receipt', (receipt) => {
            console.log('Transacción completada:', receipt);
            updateStats();
        })
        .on('error', (error) => {
            console.error('Error al reclamar recompensa:', error);
        });
}

async function bid() {
    const amount = document.getElementById('bidAmount').value;
    const accounts = await web3.eth.getAccounts();

    contract.methods.bid(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log('Transacción enviada:', hash);
        })
        .on('receipt', (receipt) => {
            console.log('Transacción completada:', receipt);
            updateStats();
        })
        .on('error', (error) => {
            console.error('Error al realizar oferta en subasta:', error);
        });
}

async function connectWallet() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        updateStats();
    } catch (error) {
        console.error('Error al conectar la cartera:', error);
    }
}

if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accounts) => {
        updateStats();
    });
} else {
    console.error('No se encontró un proveedor de Ethereum. Por favor, instale MetaMask o use un navegador compatible.');
}

connectWallet();
