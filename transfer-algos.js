const { algodClient, algosdk } = require('./init')
const { signTxn, waitForConfirmation } = require('./transaction-util')

async function transferAlgos(from, toAddress, amount) {
  const fromAccount = algosdk.mnemonicToSecretKey(from)
  const params = await algodClient.getTransactionParams().do()

  const txn = await addFundsToAccount(fromAccount.addr, toAddress, amount, params)

  const signedTxn = signTxn(txn, fromAccount)
  const txId = txn.txID().toString()

  await algodClient.sendRawTransaction(signedTxn).do()

  await waitForConfirmation(txId, 5)

  return txId
}

async function addFundsToAccount(fromAddress, toAddress, value, params, note) {
  const enc = new TextEncoder()
  const encodedNote = enc.encode(note || 'Initial funding')

  const txn = algosdk.makePaymentTxnWithSuggestedParams(fromAddress, toAddress, value, undefined, encodedNote, params)

  return txn
}

module.exports = { transferAlgos, addFundsToAccount }
