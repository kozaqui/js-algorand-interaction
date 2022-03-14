const createAccount = require('./create-account')
const getFundingAccount = require('./get-funding-account')
const { transferAlgos } = require('./transfer-algos')

async function createAndFundAccount() {
  const newAccount = await createAccount()
  const fundingAccount = await getFundingAccount()

  await transferAlgos(fundingAccount.passphrase, newAccount.account.addr, 10000000)
  return newAccount
}

module.exports = createAndFundAccount
