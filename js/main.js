import {ABI,smartContract} from "./config.js";
let btnConnect=document.getElementById("btnConnect");
let yourAddressEle=document.getElementById("yourAddressEle");
let balanceSpan=document.getElementById("balanceSpan");
let targetSpan=document.getElementById("targetSpan");
let valueDonation=document.getElementById("valueDonation");
let donateBtn=document.getElementById("donateBtn");

let web3;
let yourAdress;

btnConnect.addEventListener("click",async()=>{
    try{
    await window.ethereum.request({ method: "eth_requestAccounts" });
    console.log("User accepted");
    let yourAdress=await window.ethereum.request({method:"eth_accounts"})[0];
    yourAddressEle.innerText=yourAdress;

    web3=new web3(window.ethereum);
    let contract=new web3.eth.Contract(ABI,smartContract);

    let owner=await contract.methods.owner().call();
    let target=await contract.methods.seuil().call();
    let status=await contract.methods.status().call();

    targetSpan.innerText=target;
    balanceSpan.innerText=await web3.eth.getbalance(smartContract);

    donateBtn.addEventListener("click",async ()=>{
        try{
        let result=await contract.methods.donate().send(
            {
                from:yourAdress,
                value:valueDonation.value
            }
        )
        alert("Donation réussite")
    }
    catch(e){
        console.log("Error donation")
    }
    })
}
    catch(e){
        alert(e);
    }
})