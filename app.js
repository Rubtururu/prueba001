const web3 = new Web3(window.ethereum);

const contractAddress = "<contract_address>";
const contractABI = <contract_abi>;

const maticPool = new web3.eth.Contract(contractABI, contractAddress);

async function depositMatic(event) {
  event.preventDefault();
  const depositAmount = document.getElementById("deposit-amount").value;
  if (depositAmount <= 0) {
    return alert("Amount should be greater than 0");
  }
  const accounts = await web3.eth.requestAccounts();
  const from = accounts[0];
  const value = web3.utils.toWei(depositAmount, "ether");
  try {
    await maticPool.methods.deposit().send({ from, value });
    alert("Deposit successful!");
    location.reload();
  } catch (error) {
    console.error(error);
    alert("Deposit failed");
  }
}

async function withdrawMatic(event) {
  event.preventDefault();
  const withdrawAmount = document.getElementById("withdraw-amount").value;
  if (withdrawAmount <= 0) {
    return alert("Amount should be greater than 0");
  }
  const accounts = await web3.eth.requestAccounts();
  const from = accounts[0];
  const value = web3.utils.toWei(withdrawAmount, "ether");
  try {
    await maticPool.methods.withdraw(value).send({ from });
    alert("Withdrawal successful!");
    location.reload();
  } catch (error) {
    console.error(error);
    alert("Withdrawal failed");
  }
}

async function claimDividend() {
  const accounts =
