import "./App.css";
import { providers, Contract } from "ethers";
import { useEffect, useState } from "react";
import { withEth } from "./lib/eth";
import epicNFT from "./lib/epicNFT.json";

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [mintedNFT, setMintedNFT] = useState(0);
  const [maxNFT, setMaxNFT] = useState(0);

  const contractAddress = process.env.REACT_APP_STAGING_CONTRACT_ADDRESS;
  const contractABI = epicNFT.abi;

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
    const signer = new providers.Web3Provider(ethereum).getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);

    const txn = await contract.mint();
    console.log(`Mining ${txn.hash}…`);
    await txn.wait();
    console.log(`Minted. See transaction: https://rinkeby.etherscan.io/tx/${txn.hash}`);
  });

  const getNFTCount = withEth(async (ethereum) => {
    const signer = new providers.Web3Provider(ethereum).getSigner();
    const contract = new Contract(contractAddress, contractABI, signer);

    const count = await contract.nftMintedCount();
    setMintedNFT(count.toNumber());
    const max = await contract.getMaxNFTAllowed();
    setMaxNFT(max.toNumber());
  });

  useEffect(() => {
    checkIfWalletConnected();
  }, [checkIfWalletConnected]);

  useEffect(() => {
    getNFTCount();
  }, [getNFTCount]);

  useEffect(() => {
    let contract;
    const handleNewEpicNFT = (from, tokenID) => {
      console.log(from, tokenID.toNumber());
      setMintedNFT(tokenID + 1);
      alert(
        `Hey there! We've minted your NFT. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: <https://testnets.opensea.io/assets/${contractAddress}/${tokenID.toNumber()}>`
      );
    };

    if (window.ethereum) {
      const signer = new providers.Web3Provider(window.ethereum).getSigner();
      contract = new Contract(contractAddress, contractABI, signer);
      contract.on("NewEpicNFTMinted", handleNewEpicNFT);
    }
    return () => {
      if (contract) {
        contract.off("NewEpicNFTMinted", handleNewEpicNFT);
      }
    };
  }, [contractABI, contractAddress]);

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
          <p className="sub-text">
            {mintedNFT} EpicNFTs on {maxNFT} already minted
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
