// Initialize web3 object
var web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

// Initialize contract object
var contractAddress = "CONTRACT_ADDRESS";
var contractAbi = CONTRACT_ABI;
var contract = new web3.eth.Contract(contractAbi, contractAddress);

// Add event listener for the "Submit" button
document.getElementById("submit-button").addEventListener("click", function() {
  var input = document.getElementById("input-field").value;
  contract.methods.setMessage(input).send({ from: "YOUR_ADDRESS" })
    .on("receipt", function(receipt) {
      alert("Transaction successful! Check console for details.");
      console.log(receipt);
    })
    .on("error", function(error) {
      alert("Transaction failed. Check console for details.");
      console.error(error);
    });
});