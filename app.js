// Configuración de la conexión con la red de Binance Smart Chain
const web3 = new Web3("https://bsc-dataseed.binance.org/");
const contractAddress = "0x..."; // Dirección del contrato
const contractABI = [ ... ]; // ABI del contrato

// Creación de una instancia del contrato
const myContract = new web3.eth.Contract(contractABI, contractAddress);

// Función para depositar tokens en el contrato
async function deposit(amount) {
  try {
    const accounts = await web3.eth.getAccounts();
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000; // Límite de gas para la transacción
    const tx = await myContract.methods.deposit().send({
      from: accounts[0],
      value: amount,
      gasPrice: gasPrice,
      gasLimit: gasLimit
    });
    console.log("Transacción enviada: ", tx);
  } catch (error) {
    console.error(error);
  }
}

// Función para retirar tokens del contrato
async function withdraw(amount) {
  try {
    const accounts = await web3.eth.getAccounts();
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000; // Límite de gas para la transacción
    const tx = await myContract.methods.withdraw(amount).send({
      from: accounts[0],
      gasPrice: gasPrice,
      gasLimit: gasLimit
    });
    console.log("Transacción enviada: ", tx);
  } catch (error) {
    console.error(error);
  }
}

// Función para reclamar recompensas del contrato
async function claimRewards() {
  try {
    const accounts = await web3.eth.getAccounts();
    const gasPrice = await web3.eth.getGasPrice();
    const gasLimit = 300000; // Límite de gas para la transacción
    const tx = await myContract.methods.claimRewards().send({
      from: accounts[0],
      gasPrice: gasPrice,
      gasLimit: gasLimit
    });
    console.log("Transacción enviada: ", tx);
  } catch (error) {
    console.error(error);
  }
}

// Función para obtener el total de depósitos en el contrato
async function totalDeposits() {
  try {
    const result = await myContract.methods.totalDeposits().call();
    console.log("Total de depósitos: ", result);
  } catch (error) {
    console.error(error);
  }
}

// Escuchar eventos emitidos por el contrato
myContract.events.Deposit({
  fromBlock: "latest"
}, (error, event) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("Evento de depósito recibido: ", event);
});

myContract.events.Withdraw({
  fromBlock: "latest"
}, (error, event) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("Evento de retiro recibido: ", event);
});

myContract.events.RewardClaimed({
  fromBlock: "latest"
}, (error, event) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("Evento de reclamo de recompensa recibido: ", event);
});
