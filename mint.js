const { algosdk, algodClient } = require('./init')
const signAndWaitForTransaction = require('./sign-and-wait-transaction')

async function mint(from, params, total, unitName, assetName, url, frozen = false, note = undefined) {
  const creator = from.addr
  const enc = new TextEncoder()
  const encodedNote = note ? enc.encode(note) : note
  const defaultFrozen = frozen
  const decimals = 0
  const totalIssuance = total
  const assetURL = url
  const assetMetadataHash = new Uint8Array()
  const manager = undefined
  const reserve = undefined
  const freeze = undefined
  const clawback = undefined

  const txn = algosdk.makeAssetCreateTxnWithSuggestedParams(
    creator,
    encodedNote,
    totalIssuance,
    decimals,
    defaultFrozen,
    manager,
    reserve,
    freeze,
    clawback,
    unitName,
    assetName,
    assetURL,
    assetMetadataHash,
    params
  )

  const { xtx: signedTxn } = await signAndWaitForTransaction(txn, from)

  const ptx = await algodClient.pendingTransactionInformation(signedTxn.txId).do()
  const assetID = ptx['asset-index']
  return assetID
}

module.exports = mint
