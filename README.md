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

# Error Handling
1. npm run dev shows error - failed to load SWC binary
 - Delete the package-lock.json file and the node_modules directory in your project and then run npm install on your terminal 

