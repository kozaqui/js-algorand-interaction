const createAndFundAccount = require('./create-and-fund-account')
const mintIdentityAsset = require('./mint-identity-asset')

async function createAccountWithIdentityAsset() {
  const newAccount = await createAndFundAccount()
  const assetId = await mintIdentityAsset(newAccount.passphrase)
  console.log('mintIdentityAsset returned assetId: ', assetId)
}

createAccountWithIdentityAsset()
  .then(account => {
    console.log('createAccountWithIdentityAsset: successful')
  })
  .catch(err => {
    console.error('createAccountWithIdentityAsset: There was an error: ', err)
  });