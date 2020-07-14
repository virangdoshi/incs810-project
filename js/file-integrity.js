$(document).ready(function() {

    const fileRegistryContractAddress = '0x1190f2D95D01cd254Ed89D8dE99A910aCF263A7a';

    // List of untrusted source addresses
    const denyList = ["0x2F79f2CAfF75020f3Db1CFDEDff3aa97f3c0CA68", "0x9683DD36a8c373fC7D85A0350FB4e5A77C0663CA"];

    const fileRegistryContractABI = [
    {"constant":false,"inputs":[{"name":"hash","type":"string"}], "name":"add","outputs":[], "payable":false, "stateMutability":"nonpayable", "type":"function"},

    {"constant":true,"inputs":[{"name":"hash","type":"string"}], "name":"verify","outputs":[{"name":"dateAdded","type":"uint256"}],
    "payable":false,"stateMutability":"view","type":"function"}
    ];



    $('#fileUploadButton').click(uploadFile);
    $('#fileVerifyButton').click(verifyFile);

    $('#contractLink').text(fileRegistryContractAddress);

    $('#error-msg').click(function() {$('#error-msg').hide();})
    $('#info-msg').click(function() {$('#info-msg').hide()})

    function showInfo(message) {
        $('#info-msg').text(message);
        var x = document.getElementById("info-msg");
        x.style.display = "block";
    }

    function showError(errorMsg) {
        $('#error-msg').text(errorMsg);
        var x = document.getElementById("error-msg");
        x.style.display = "block";
    }

    async function uploadFile() {
        $('#error-msg').hide();
        $('#info-msg').hide();

        if ($('#fileForUpload')[0].files.length == 0)
            return showError("Please select a file to upload.");
		if (window.ethereum)
			try {
				await window.ethereum.enable();
			} catch (err) {
                return showError("Access to your Ethereum account rejected.");
			}
        let fileReader = new FileReader();
        fileReader.onload = function() {
            let documentHash = sha256(fileReader.result);
            if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 injected API from your Web browser.");
            let contract = web3.eth.contract(fileRegistryContractABI).at(fileRegistryContractAddress);


            //Check if it is a duplicate file
            contract.verify(documentHash, function(err, result) {

                if (err)
                    return showError("Smart contract call failed: " + e);
                let contractPublishDate = result.toNumber(); // Take the output from the execution
                if (contractPublishDate > 0) {
                    let displayDate = new Date(contractPublishDate * 1000).toLocaleString();

                    return showError(`File ${documentHash} already exists in the registry, on ${displayDate}`);
                }

                 else {
                 contract.add(documentHash, function(err, result) {
                if (err)
                    return showError("Smart contract call failed: " + err);

                showInfo(`File ${documentHash} successfully added to the registry.`);
            });
               }
            });


        }
        fileReader.readAsBinaryString($('#fileForUpload')[0].files[0]);
    }

    function verifyFile() {
        $('#error-msg').hide();
        $('#info-msg').hide();
        if ($('#fileToVerify')[0].files.length == 0)
            return showError("Please select a file to verify.");
        let fileReader = new FileReader();
        fileReader.onload = function() {
            let documentHash = sha256(fileReader.result);
            if (typeof web3 === 'undefined')
                return showError("Please install MetaMask to access the Ethereum Web3 API from your Web browser.");
            let contract = web3.eth.contract(fileRegistryContractABI).at(fileRegistryContractAddress);

            contract.verify(documentHash, function(err, result) {

                if (err)
                    return showError("Smart contract call failed: " + e);
                let contractPublishDate = result.toNumber(); // Take the output from the execution

                checkSender(documentHash, contractPublishDate);
                if (contractPublishDate > 0) {
                    let displayDate = new Date(contractPublishDate * 1000).toLocaleString();
                    showInfo(`File ${documentHash} is valid, date published: ${displayDate}`);
                }
                else
                    return showError(`File ${documentHash} is invalid: not found in the registry.`);
            });
        }
        fileReader.readAsBinaryString($('#fileToVerify')[0].files[0]);
    }

    function checkSender(documentHash, timestamp){
        const web3 = new Web3();
        web3.setProvider("http://localhost:8545");

        var blockNumber = Promise.resolve(web3.eth.getBlockNumber());
blockNumber.then(function(v) {

//.log(timestamp);
//.log(new Date(timestamp * 1000).toLocaleString());
    for(var i = 0; i <= v; i++){
        var block = Promise.resolve(web3.eth.getBlock(i, true));

        block.then(function(v){

            var transactions = v.transactions;
            for(var j = 0; j < transactions.length; j++){

              if(transactions[j].to == fileRegistryContractAddress && v.timestamp == timestamp){
                found = ""
                for(var k = 0; k < denyList.length; k++){
                  if(denyList[k] == transactions[j].from){
                    $('#info-msg').hide();

                    return showError("File found in registy, added "
                    + new Date(timestamp * 1000).toLocaleString()
                    + ". The uploader address "
                    + transactions[j].from
                    + " is blacklisted");

                  }
                }

              }
            }
        })

    }
})


    }
});
