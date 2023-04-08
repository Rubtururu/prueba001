const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual contract address
const ABI = [/* Insert contract ABI here */]; // Replace with actual contract ABI

let web3;
let poolContract;

window.addEventListener('load', async () => {
    // Load Web3.js
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
    } else if (typeof window.web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider);
    } else {
        console.log('No Web3 detected!');
        return;
    }

    // Load contract
    poolContract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);

    // Load balance
    updateBalance();

    // Load pool balance
    updatePoolBalance();

    // Load pool distribution
    updatePoolDistribution();

    // Handle deposit form submission
    document.getElementById('deposit-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = document.getElementById('deposit-amount').value;
        deposit(amount);
    });

    // Handle withdraw form submission
    document.getElementById('withdraw-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const amount = document.getElementById('withdraw-amount').value;
        withdraw(amount);
    });

    // Handle distribute button click
    document.getElementById('distribute-button').addEventListener('click', () => {
        distribute();
    });
});

async function updateBalance() {
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]);
    document.getElementById('balance').textContent = web3.utils.fromWei(balance);
}

async function updatePoolBalance() {
    const poolBalance = await poolContract.methods.getPoolBalance().call();
    document.getElementById('pool-balance').textContent = web3.utils.fromWei(poolBalance);
}

async function updatePoolDistribution() {
    const distributionList = document.getElementById('pool-distribution-list');
    const distribution = await poolContract.methods.getPoolDistribution().call();
    distributionList.innerHTML = '';
    for (let i = 0; i < distribution.length; i++) {
        const [address, share] = distribution[i];
        const listItem = document.createElement('li');
        listItem.textContent = `${address}: `;
        const shareSpan = document.createElement('span');
        shareSpan.classList.add('pool-share');
        shareSpan.textContent = share;
        listItem.appendChild(shareSpan);
        listItem.textContent += '%';
        distributionList.appendChild(listItem);
    }
}

async function deposit(amount) {
    const accounts = await web3.eth.getAccounts();
    const value = web3.utils.toWei(amount);
    await poolContract.methods.deposit().send({ from: accounts[0], value: value });
    updateBalance();
    updatePoolBalance();
    updatePoolDistribution();
}

async function withdraw(amount) {
    const accounts = await web3.eth.getAccounts();
    const value = web3.utils.toWei(amount);
    await poolContract.methods.withdraw(value).send({ from: accounts[0] });
    updateBalance();
    updatePoolBalance();
    updatePoolDistribution();
}

async function distribute() {
    const accounts = await web3.eth.getAccounts();
    await poolContract.methods.distribute().send({ from: accounts[0] });
    updatePoolBalance();
    updatePoolDistribution();
}
