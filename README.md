# Helper functions for interacting with Algorand

## Initial setup

At first set the correct parameters *(if you're working on default algorand sandbox config they should be correct)*:

- algodToken
- algodServer
- algodPort
- kmdPort

## Set up an algorand account with an identity asset

Run the following to create an account, fund it and create an identity asset. Note and save the address and the passphrase, as it will not be available afterwards. Also note the assetId.

```bash
npm run set-up
```
