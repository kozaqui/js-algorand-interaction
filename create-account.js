const { algosdk } = require('./init')

function createAccount() {
  var account = algosdk.generateAccount()
  var passphrase = algosdk.secretKeyToMnemonic(account.sk)
  console.log("My address: " + account.addr);
  console.log("My passphrase: " + passphrase);
  return { account, passphrase }
}

module.exports = createAccount
