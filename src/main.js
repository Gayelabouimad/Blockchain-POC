const { Blockchain } = require("./blockchain");
const { Transaction } = require("./Transaction");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "424e27bab20af2282f7c25eff1a6bc72b6157ed7cd4aeacb8285a7a3df1c741c"
);
const myWalletAddress = myKey.getPublic("hex");

const myCoin = new Blockchain();
// Mine first block
myCoin.minePendingTransactions(myWalletAddress);
// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, "address2", 100);
tx1.signTransaction(myKey);
myCoin.addTransaction(tx1);
// Mine a second block
myCoin.minePendingTransactions(myWalletAddress);
// Create second transaction
const tx2 = new Transaction(myWalletAddress, "address1", 50);
tx2.signTransaction(myKey);
myCoin.addTransaction(tx2);
// Mine a third block
myCoin.minePendingTransactions(myWalletAddress);
console.log();
console.log(
  `Balance of Gayel is ${myCoin.getBalanceOfAddress(myWalletAddress)}`
);
// Check if the chain is valid
console.log();
console.log("Blockchain valid?", myCoin.isChainValid() ? "Yes" : "No");
