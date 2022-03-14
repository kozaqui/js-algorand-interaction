const algosdk = require('algosdk');

const kmdtoken = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
const kmdserver = 'http://localhost'
const kmdport = 4002
const kmdclient = new algosdk.Kmd(kmdtoken, kmdserver, kmdport);

(async () => {
    let walletid = null;
    let wallets = (await kmdclient.listWallets()).wallets;
    wallets.forEach(function (arrayItem) {
        if( arrayItem.name === 'MyTestWallet2'){
            walletid = arrayItem.id;
        }
    });
    console.log("Got wallet id: ", walletid);
    let wallethandle = (await kmdclient.initWalletHandle(walletid, "testpassword")).wallet_handle_token;
    console.log("Got wallet handle.", wallethandle);

    let account = algosdk.generateAccount();
    console.log("Account: ", account.addr);
    let mn = algosdk.secretKeyToMnemonic(account.sk);
    console.log("Account Mnemonic: ", mn);
    let importedAccount = (await kmdclient.importKey(wallethandle, account.sk));
    console.log("Account successfully imported: ", importedAccount);
})().catch(e => {
    console.log(e.text);
})
