


const contractAddress = '0x6C2Feb64E664604d70ed0566F1D2E34ffa54ec2D'; 

const abi =   [ 
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "feedback",
          "type": "string"
        }
      ],
      "name": "FeedbackAdded",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_feedback",
          "type": "string"
        }
      ],
      "name": "addFeedback",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "feedbacks",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "feedback",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_index",
          "type": "uint256"
        }
      ],
      "name": "getFeedback",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getFeedbackCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }];

    let provider;
    let signer;
    let contract;

    async function initApp() {
        // Connect to MetaMask
        await connectMetaMask();

        // Load contract
        loadContract();

        // Display existing feedback
        displayFeedback();
    }

   //function to connect wallet to App
    async function connectMetaMask() {
        if (typeof window.ethereum !== "undefined"){
            try{
                provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                signer = provider.getSigner();
            } catch (error){
                console.log(error)
            }
            console.log("Connected")
            document.getElementById("connectWallet").innerText = "Connected"
        } else {
            console.log("No Metamask exist")
        }
          
        }

    async function loadContract() {
        contract = new ethers.Contract(contractAddress, abi, signer);
        await displayFeedback();
    }

    async function displayFeedback() {
        const feedbackCount = await contract.getFeedbackCount();
        const feedbackItems = document.getElementById('feedbackItems');
        feedbackItems.innerHTML = '';
        for (let i = 0; i < feedbackCount; i++) {
            const [user, feedback] = await contract.getFeedback(i);
            const listItem = document.createElement('li');
            listItem.textContent = `User: ${user}, Feedback: ${feedback}`;
            feedbackItems.appendChild(listItem);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('connectWallet').addEventListener('click', connectMetaMask);
        document.getElementById('feedbackSubmitForm').addEventListener('submit', submitFeedback);
        initApp();
    });

async function submitFeedback(event){
    event.preventDefault();

    const feedbackInput = document.getElementById("feedbackInput").value;

    const submitButton = document.getElementById("feedbackSubmitForm").querySelector("button");
    submitButton.textContent = "Submitting Transactioin...";

    try {
        await contract.addFeedback(feedbackInput);

        console.log("Transaction successful");
        displayFeedback();
        submitButton.textContent = "Submit";
    } catch (error){
        console.error("Transaction failed:", error);
        alert("Transaction failed. Please try again.");
        submitButton.textContent = "Submit"
    }



}

        // async function submitFeedback(event) {
        // event.preventDefault();
        // const feedbackInput = document.getElementById('feedbackInput').value;
        // await contract.addFeedback(feedbackInput);
        // displayFeedback();
        // }