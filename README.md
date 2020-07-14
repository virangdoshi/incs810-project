# incs810-project
Group project for 810 Blockchain course

### Deployment steps
* Install Ganache (https://www.trufflesuite.com/ganache)
* Install npm and nodejs (https://nodejs.org/en/)
* Install truffle package through CLI
```bash
$ npm install -g truffle
```
* Start Ganache -> Create new workspace -> Give project name and click "Add project". Point to truffle-config.js file and click "Save Workspace"

* Compile contracts
```bash
$ truffle compile
```

* Deploy contract
```bash
$ truffle migrate
(You should expect an output similar to this)
Summary
=======
> Total deployments:   2
> Final cost:          0.00848086 ETH

```

* Open the Ganache workspace and click on Contracts -> Click on "FileRegistry" (The name of deployed contract). Copy it's address and use it your front-end code.
* Install the MetaMask plugin on your browser and setup a wallet. Switch to the local:8545 network and import your account from ganache
* Next, start the front-end web appplication
```bash
$ npm install
$ npm start
```
