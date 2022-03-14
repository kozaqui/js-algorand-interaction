const { algodClient } = require('./init')

async function accountInfo(address) {
  return await algodClient.accountInformation(address).do()
}

accountInfo('JHDKT3W4RASRJVUBXSE67OEGP6OZWSZKP5HQIOL4RFSU32HD42OQP53DDU')
  .then(accountInfo => {
    console.log('accountInfo: ', accountInfo)
  })
  .catch(err => {
    console.error('There was an error: ', err)
  });
