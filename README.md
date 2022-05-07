# ELENE6883_Final-Project
Columbia ELENE6883 Final Project
1. Operate on top of ganache and Metamask
  i. Condfigure RPC on Metamask
    - Open Metamask and choose "Add Network"
    - Open Ganache and copy the RPC server
    - Configure the network with Name: {your choice}, RPC URL: {RPC server from Ganache}, Chain ID: 1337, Currency Symbol: ETH
    - Save the network configuration
  ii. Import ethereum account from ganache
    - Open Ganache and choose one {key symbol} from any address
    - Copy the {private key}
    - Open Metamask and choose {Import Account}
    - Paste the Private Key to create a new account
    - You will see the number of ETH the account holds on Metamask
2. Connect your Metamask account to the website
  - Click the 3-dots button on the upper-right corner
  - Choose "connect site"
3. Lottery
  - truffle compile
  - truffle migrate --reset
  - truffle network 
  - Your will see addresses for each contract 
    - Copy the address of LotLottery to $blockchain/build/lottery.js
4. Migrate to Huygens
  - install HD Wallet Provider: npm install @truffle/hdwallet-provider
  - Export your private key from AleWallet and change the privateKey in truffle-config.js into your own and 
    - Click the 3-dots symbol on the upper right and click "export Private Key"
  - Open Postman and choose "POST" operation, pasting http://18.182.45.18:8765 into the blank on the right
  - Import account from Alewallet
    - Click the 3-dots symbol on the upper right and click "Export Key Store"
    - A json file will be downloaded, paste the content of the file to the json field in Postman
    - Add backward slash to each field then click "send"
{
    "action": "account_import",
    "json": "{\"account\":\"0x3c52AB7a405E90BA3B4800e75DFEBC19259639a0\",\"kdf_salt\":\"38E1E1F3AA03B7D15D7926577928CC9E\",\"iv\":\"51D3140525A5DE5A17FCEBFB16D98890\",\"ciphertext\":\"9FCB3D81D11199926B155359228366DF4901547A69AFBF1F0E554DDA94346FA2\"}"
}

# Error Handling
1. npm run dev shows error - failed to load SWC binary
 - Delete the package-lock.json file and the node_modules directory in your project and then run npm install on your terminal 

