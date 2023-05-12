# Helper functions for interacting with Algorand

## Initial setup

At first set the correct parameters _(if you're working on default algorand sandbox config they should be correct)_:

- algodToken
- algodServer
- algodPort
- kmdPort

## Set up an Algorand account

Run the following to create an account and print it to the console.

```bash
npm run create-account
```

## Set up an Algorand account with an identity asset

Run the following to create an account, fund it and create an identity asset. Note and save the address and the passphrase, as it will not be available afterwards. Also note the assetId.

```bash
npm run set-up
```
