import "./App.css";
import { providers, Contract } from "ethers";
import { useEffect, useState } from "react";
import { withEth } from "./lib/eth";
import epicNFT from "./lib/epicNFT.json";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletConnected = withEth(async (ethereum) => {
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      console.log(`Found authorized account ${accounts[0]}`);
      setCurrentAccount(accounts[0]);
    }
  });

  const connectWallet = withEth(async (ethereum) => {
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(`connected to ${accounts[0]}`);
    setCurrentAccount(accounts[0]);
  });

  const mintNFT = withEth(async (ethereum) => {
    const contractAddress = process.env.REACT_APP_STAGING_CONTRACT_ADDRESS;
    const contractABI = epicNFT.abi;
    
    const signer = new providers.Web3Provider(ethereum).getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);

    const txn = await contract.mint();
    console.log(`Mining ${txn.hash}…`);
    await txn.wait();
    console.log(`Minted. See transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);
  });

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">EpicNFTs Collection</p>
          <p className="sub-text">Each unique. Each beautiful. Discover your NFT today.</p>
          {currentAccount ? (
            <button onClick={mintNFT} className="cta-button mint-button">
              Mint your EpicNFT
            </button>
          ) : (
            <button className="cta-button connect-wallet-button" onClick={connectWallet}>
              Connect with Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
