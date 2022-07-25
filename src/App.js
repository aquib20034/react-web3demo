import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import { useEffect } from 'react';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract/contract";

var account = null;
var contract = null;
console.log(contract);
async function connectWallet(){
  try{
    if(window.ethereum){
      var web3 = new Web3(window.ethereum);
      await window.ethereum.send('eth_requestAccounts');
      var accounts = await web3.eth.getAccounts();
      account = accounts[0];
      document.getElementById('wallet-address').textContent = "Wallet Address: " + account;
      contract =  new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    }
  }catch(ex){
    console.log(ex)
  }
}
async function mint(){
  try{
    if(window.ethereum){
        var _mintAmount = Number(document.querySelector("[name=amount").value);
        var _mintRate = Number(await contract.methods.PUBLIC_SALE_PRICE().call());
        console.log("mintRate", _mintRate);
        var totalAmount = _mintRate * _mintAmount;
        contract.methods.mint().send({
          from:account,
          value:String(totalAmount)
        })
    }
  }catch(ex){
    console.log(ex)
  }
}
function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row mt-3'>
          <div className='col-lg-12 p-3' style={{padding:"15px", borderRadius:"5px",boxShadow:"1px 1px 5px #C9C9C9"}}>
            <h3 style={{color: "#424242"}}>Web3 Demo React App</h3><hr />
            <label>It is a web3 demo react application which is connected with ethereum based contract developed on kovan network. This application has two main functions namely "public mint function" whose price is 0.00009 faucet ether wherease "whitelist mint function" whose price is 0.00002 faucet ethers. </label>
            {/* <h4 style={{color: "#424242"}}>Mint Portal</h4> */}
          </div>
        </div>
        {/* { (contract) ? "test" : "ok"} */}
        { contract ? "" :
        <>{
        <div className='row mt-3'>
          <div className='col-lg-12 p-3 ' style={{borderRadius:"5px", boxShadow:"1px 1px 5px #C9C9C9"}}>
            <h5>Please connect your wallet</h5>
            <Button onClick ={connectWallet} style={{marginBottom:"5px"}}>Connect Wallet</Button>
          </div>
        </div>
       }</>  }
        <div className='row mt-3'>
          <div className='col-lg-12 p-3' id="wallet-address" style={{borderRadius:"5px",boxShadow:"1px 1px 5px #C9C9C9"}}>
            <label for="floatingInput">Wallet Address: </label>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col p-5' style={{borderRadius:"5px", boxShadow:"1px 1px 5px #C9C9C9", marginRight:"6px"}}>
            <label>Public Mint Price 0.00009 Eth for each mint.</label> <br />
            <Button onClick ={mint} >Public Mint</Button>
          </div>
          <div className='col p-5' style={{borderRadius:"5px", boxShadow:"1px 1px 5px #C9C9C9", marginLeft:"6px"}}>
          <label>Whitelist Mint Price 0.00003 Eth for each mint.</label> <br />
            <Button onClick ={mint} >WhiteList Mint</Button><br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



{/* <form className='col p-5' style={{borderRadius:"5px", boxShadow:"1px 1px 6px #000000"}}>
    <div class="card"  style={{marginTop:"5px",padding:"15px", borderRadius:"5px",boxShadow:"1px 1px 3px #000000"}}>
      <input type="number" name ="amount" defaultValue="1" min="1" max="5" />
      <label>Please select the amount of NFTs to mint</label>
      <Button onClick ={mint} >Mint/Buy</Button>
    </div>
    <label>Price 0.00009 Eth each mint.</label>
  </form> 
*/}