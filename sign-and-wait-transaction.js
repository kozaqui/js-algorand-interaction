const { signTxn, waitForConfirmation } = require('./transaction-util')
const { algodClient } = require('./init')

async function signAndWaitForTransaction(txn, from) {
  const signedTxn = signTxn(txn, from)
  const txId = txn.txID().toString()

  const xtx = await algodClient.sendRawTransaction(signedTxn).do()
  const record = await waitForConfirmation(txId, 5)
  const appId = record['application-index']

  return { xtx, appId }
}

module.exports = signAndWaitForTransaction
