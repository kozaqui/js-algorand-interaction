const { algodClient } = require('./init')

function signTxn(txn, myAccount) {
  const signedTxn = txn.signTxn(myAccount.sk)
  return signedTxn
}

async function waitForConfirmation(txId, timeout) {
  if (algodClient == null || txId == null || timeout < 0) {
    throw new Error('Bad arguments')
  }

  const status = await algodClient.status().do()
  if (status === undefined) {
    throw new Error('Unable to get node status')
  }

  const startround = status['last-round'] + 1
  let currentround = startround

  while (currentround < startround + timeout) {
    const pendingInfo = await algodClient.pendingTransactionInformation(txId).do()
    if (pendingInfo !== undefined) {
      if (pendingInfo['confirmed-round'] !== null && pendingInfo['confirmed-round'] > 0) {
        // Got the completed Transaction
        return pendingInfo
      } else if (pendingInfo['pool-error'] != null && pendingInfo['pool-error'].length > 0) {
        // If there was a pool error, then the transaction has been rejected!
        throw new Error('Transaction ' + txId + ' rejected - pool error: ' + pendingInfo['pool-error'])
      }
    }
    await algodClient.statusAfterBlock(currentround).do()
    currentround++
  }

  throw new Error('Transaction ' + txId + ' not confirmed after ' + timeout + ' rounds!')
}

module.exports = { signTxn, waitForConfirmation }
