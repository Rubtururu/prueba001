const contractABI = [...] // Incluir el ABI del contrato aquí
const contractAddress = "0x..."; // Incluir la dirección del contrato aquí

let web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
let contract = new web3.eth.Contract(contractABI, contractAddress);

async function deposit() {
    const amount = document.getElementById('depositAmount').value;
    const accounts = await web3.eth.getAccounts();

    contract.methods.deposit(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] })
        .on('transactionHash', (hash) => {
            console.log('Transacción enviada:', hash);
        })
        .on('receipt', (receipt) => {
            console.log('Transacción completada:', receipt);
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
       
