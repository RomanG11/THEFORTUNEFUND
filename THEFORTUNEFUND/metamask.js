window.addEventListener('load', function() {

  // if (typeof web3 !== 'undefined') {
  //   // Use Mist/MetaMask's provider
  //   web3js = new Web3(web3.currentProvider);
  // } else {
  //   console.log('No web3? You should consider trying MetaMask!')
  //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)

  //   //return a message that metamask is not present!!
  // }

  startApp();
})

function startApp() {
  web3.version.getNetwork((err, netId) => {
  if (netId) != "1" {
    console.log('This is not main network.')
  }
  })

  CrowdsaleContract = web3.eth.contract(crowdsaleAbi);
  CrowdsaleInstance = CrowdsaleContract.at("0x487C55DbA1d199EbECbb4843EFc270B85d1006C0");
}

var crowdsaleAbi = [
{
  "constant": true,
  "inputs": [],
  "name": "USD",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "_time",
      "type": "uint256"
    }
  ],
  "name": "getTokenPrice",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": true,
  "inputs": [
    {
      "name": "_value",
      "type": "uint256"
    },
    {
      "name": "_time",
      "type": "uint256"
    }
  ],
  "name": "tokenCalculate",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "view",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_address",
      "type": "address"
    },
    {
      "name": "_value",
      "type": "uint256"
    }
  ],
  "name": "manualSendEther",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "constant": false,
  "inputs": [
    {
      "name": "_address",
      "type": "address"
    },
    {
      "name": "_value",
      "type": "uint256"
    }
  ],
  "name": "manualSendTokens",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
},
]

/**
 *@dev function to get current ETH/USD rate in crowdsale smart contract
 */
function getCurrentRate() {
CrowdsaleInstance.USD(function (err,result) {
  if(!err){
    console.log(result.toString());
    return result
  }
  else
    console.log(err)
  })
}

/**
 *@dev function to get current token price in crowdsale smart contract
 */
function getCurrentPrice(){
CrowdsaleInstance.getTokenPrice(0, function (err, result) {
  if(!err){
    console.log(result.toString());
    return result
  }
  else
    console.log(err)
  })
}

/**
 *@dev function to calculate how many tokens
 *will recieve if contributor send 'value_in_wei' Ether
 *@param value_in_wei Ether in WEI (1ETH = 10^18 WEI)
 */
function tokenCalculate(value_in_wei){
CrowdsaleInstance.tokenCalculate(value_in_wei, 0, function (err, result) {
  if(!err){
    console.log(result.toString());
    return result
  }
  else
    console.log(err)
  })
}

/**
 *@dev function to buy token by investor (sending ether to crowdsale contract)
 *@param amount WEI, should be sended from web-page 
 */
function sendEtherTransaction(amount) {
  web3.eth.sendTransaction({
    to: CrowdsaleInstance.address,
    value: amount}, function (error, result) {
    if(!error){
      console.log(result.toString())
      return result.toString()
    }else
      console.log(error)
  })
}

/**
 *@dev function to simulate sending ether.
 *Must be sending by contract owner
 *@param address To whom will send tokens
 *@param value_in_wei Ether in WEI (1ETH = 10^18 WEI)
 */
function manualSendEther(address, value_in_wei){
CrowdsaleInstance.manualSendEther(address, value_in_wei, function (err, result) {
  if(!err)
    return result
  else
    console.log(err)
  })
}

/**
 *@dev function to send tokens to investor.
 *Must be sending by contract owner
 *@param address To whom will send tokens
 *@param tokens_with_decimals Tokens to send
 */
function manualSendTokens(address, tokens_with_decimals){
CrowdsaleInstance.manualSendTokens(address, tokens_with_decimals, function (err, result) {
  if(!err)
    return result
  else
    console.log(err)
  })
}