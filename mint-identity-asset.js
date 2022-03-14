const { algosdk, algodClient } = require('./init')
const mint = require('./mint')

async function mintIdentityAsset(passphrase) {
  const from = algosdk.mnemonicToSecretKey(passphrase)
  const params = await algodClient.getTransactionParams().do()
  const total = 100000
  const unitName = 'cw-id'
  const assetName = 'CW Identity Token'
  const url = ''
  return await mint(from, params, total, unitName, assetName, url)
}

module.exports = mintIdentityAsset
