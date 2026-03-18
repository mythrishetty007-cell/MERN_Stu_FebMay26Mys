const wallet = {
  owner: "Alice",
  balance: 1000,
  lastTransaction: null,

  deposit: function(amount) { 
  },
  withdraw: function(amount) {
  }
};
wallet.deposit(500);
wallet.withdraw(200);

console.log(wallet);