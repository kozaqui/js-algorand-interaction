const algosdk = require('algosdk')

// SANDBOX
const algodToken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const algodServer = 'http://localhost'
const algodPort = 4001
const kmdPort = 4002

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)
const kmdClient = new algosdk.Kmd(algodToken, algodServer, kmdPort)

module.exports = { algosdk, algodClient, kmdClient }
