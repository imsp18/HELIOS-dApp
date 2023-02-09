import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { connect, disconnect } from "../features/blockchain";
import { ethers, utils } from "ethers";
import { Modal } from "react-bootstrap";
// import { Button } from "@mui/material";
import Web3Modal from "web3modal";
import "./Dashboard.css";
import networks from "../utils/networksMap.json";

const eth = window.ethereum;
const web3Modal = new Web3Modal();

function Account() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.blockchain.value);

  const [injectedProvider, setInjectedProvider] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function fetchAccountData() {
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    setInjectedProvider(provider);

    const signer = await provider.getSigner();
    const chainId = await provider.getNetwork();
    const account = await signer.getAddress();
    const balance = await signer.getBalance();

    dispatch(
      connect({
        account: account,
        balance: utils.formatUnits(balance),
        network: networks[String(chainId.chainId)],
      })
    );
  }

  async function Disconnect() {
    web3Modal.clearCachedProvider();
    if (
      injectedProvider &&
      injectedProvider.provider &&
      typeof injectedProvider.provider.disconnect == "function"
    ) {
      await injectedProvider.provider.disconnect();
      setInjectedProvider(null);
    }

    dispatch(disconnect());
    setTimeout(() => {
      window.location.reload();
    }, 1);
  }

  useEffect(() => {
    if (eth) {
      eth.on("chainChanged", (chainId) => {
        fetchAccountData();
      });
      eth.on("accountsChanged", (accounts) => {
        fetchAccountData();
      });
    }
  }, []);

  const isConnected = data.account !== "";

  return (
    <>
      {isConnected ? (
        <div style={{ height: "10px", paddingTop: "10px" }}>
          {/* <span>{data.account}</span> */}
          <button className="button" variant="contained" color="primary" onClick={handleShow}>
            Account balance
            {/* {data.account &&
              `${data.account.slice(0, 6)}...${data.account.slice(
                data.account.length - 4,
                data.account.length
              )}`} */}
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Wallet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Account: {data.account}</p>
              <p>
                Balance: {data.balance && parseFloat(data.balance).toFixed(4)}{" "}
                Matic
              </p>
              <p>Network: {data.network}</p>
            </Modal.Body>
            <Modal.Footer>
              <button variant="contained" color="error" onClick={Disconnect}>
                Disconnect
              </button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div style={{ height: "10px", paddingTop: "10px" }}>
          <button
            variant="contained"
            color="primary"
            onClick={fetchAccountData}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </>
  );
}

export default Account;
