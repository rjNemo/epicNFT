import "./App.css";
import {} from "ethers";
import { useEffect, useState } from "react";
import { withEth } from "./lib/eth";

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

  const mintNFT = withEth(async (ethereum) => {});

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
