import { useEffect, useState } from "react";
import {
  getCurrentWalletConnected,
  mintNFT
} from "./util/interact";

import {useContract, useContractRead} from 'wagmi';

const mintContract = require('./post-contract-abi.json');

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  const [receiver, setReceiver] = useState("");

  const contractConfig = {
    addressOrName : mintContract.address,
    contractInterface: mintContract.abi
  }

  const {data: tokenURI} = useContractRead({
    ...contractConfig,
    functionName:'tokenURI'
  })

  function mintPost (tokenURI) {
    const { data, isLoading, isSuccess, write } = useContractWrite({
      ...contractConfig,
      args: [tokenURI],
      functionName: 'publicMint',
    })
 
    return (
      <div>
        <button onClick={() => write()}>Feed</button>
        {isLoading && <div>Check Wallet</div>}
        {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
      </div>
    )
    
  }

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

//   const connectWalletPressed = async () => {
//     const walletResponse = await connectWallet();
//     setStatus(walletResponse.status);
//     setWallet(walletResponse.address);
//   };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(receiver, description);
    setStatus(status);
    if (success) {
      setReceiver("");
      setDescription("");
    }
  };

  return (
    <div className="Minter">
      {/* <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
            <span>Connect Wallet</span>
          )}
      </button> */}

      <br></br>
      <h1 id="title"></h1>
      <p>
        Check if an address has been KYC'ed through Owny
      </p>
      <form>
        <h2>Wallet Address: </h2>
        <input
          type="text"
          placeholder="Address"
          onChange={(event) => setReceiver(event.target.value)}
        />
      </form>
      <button id="kycButton">Get KYC</button>
      <button id="mintButton" onClick={onMintPressed}>  []
        Mint NFT
      </button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  );
};

export default Minter;