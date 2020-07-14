const Web3 = require('web3')

const fileregistry = async (hash, contractOwner) => {
  const web3 = new Web3(__API__)
  var myContract = new web3.eth.Contract(__ABI__.abi, __CONTRACT__, {
    from: contractOwner, 
    gasPrice: '20000000000' 
  })

  return await myContract.methods.add(hash).send();
}

export default fileregistry