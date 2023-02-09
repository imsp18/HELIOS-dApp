import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers, utils } from "ethers";
import { connect } from "../features/blockchain";
import QRCode from "react-qr-code";
import UploadFile from "./uploadfile";
import {
  button,
  Input,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { Folder } from "@mui/icons-material";

import { StoreContent } from "../utils/StoreContent";
import SmartContract from "../artifacts/contracts/FileStorage.json";
import contractsAddress from "../artifacts/deployments/map.json";
import networks from "../utils/networksMap.json";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// contract address on ganache network
// const ads = contractsAddress["5777"]["FileStorage"][0];
// contract address on polygon mumbai test network
const ads = contractsAddress["80001"]["FileStorage"][0]


function FileStorage() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setisSelected] = useState(false);
  const [name, setName] = useState("");
  const [size, setSize] = useState();
  const [userFiles, setUserFiles] = useState([]);
  const [visibleImage, setVisibleImage] = useState(Array(userFiles.length).fill(false));
  const [show, setShow] = useState(false);
  const [showuploadCard, setshowuploadCard] = useState(false);
  const [loading, setLoading] = useState(false);

  const data = useSelector((state) => state.blockchain.value);
  const dispatch = useDispatch();

  function HandleClick(i){
    setShow(!show)
    const showing= document.getElementById(i);
    showing.style.display = show ? "none": "";
  }
  // const upload = async () => {
  //   if (selectedFile !== undefined) {
  //     try {
  //       setLoading(true);

  //       const signer = await provider.getSigner();
  //       const storageContract = new ethers.Contract(
  //         ads,
  //         SmartContract.abi,
  //         signer
  //       );

  //       const cid = await StoreContent(selectedFile);
  //       const ipfsHash = `ipfs://${cid}/${name}`;

  //       const fee = await storageContract.getListingFee();

  //       const add_tx = await storageContract.uploadFile(name, size, ipfsHash, {
  //         value: fee,
  //       });
  //       await add_tx.wait();

  //       setLoading(false);

  //       getUserFiles();

  //       setName("");
  //       setSize(null);
  //       setisSelected(false);
  //       setSelectedFile(null);
  //       updateBalance();
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //     }
  //   } else {
  //     return;
  //   }
  // };
  const updateBalance = async () => {
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    dispatch(connect({ ...data, balance: utils.formatUnits(balance) }));
  };
  // read uploaded file using FileReader and buffer
  const getFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    setSelectedFile(file);
    setisSelected(true);
    setName(file.name);
    setSize(file.size);
  };

  // a function to convert file size to readable format ex: KB, MB...
  const niceBytes = (x) => {
    const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let l = 0,
      n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return String(n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l]);
  };

  const upload = async () => {
    if (selectedFile !== undefined) {
      try {
        setLoading(true);

        const signer = await provider.getSigner();
        const storageContract = new ethers.Contract(
          ads,
          SmartContract.abi,
          signer
        );

        const cid = await StoreContent(selectedFile);
        const ipfsHash = `ipfs://${cid}/${name}`;

        const fee = await storageContract.getListingFee();

        const add_tx = await storageContract.uploadFile(name, size, ipfsHash, {
          value: fee,
        });
        await add_tx.wait();

        setLoading(false);

        getUserFiles();

        setName("");
        setSize(null);
        setisSelected(false);
        setSelectedFile(null);
        updateBalance();
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      return;
    }
  };

 

  const getUserFiles = async () => {
    if (data.account !== "" && isGoodNet) {
      const signer = await provider.getSigner();
      const storageContract = new ethers.Contract(
        ads,
        SmartContract.abi,
        signer
      );

      const filesList = await storageContract.getUserFiles(data.account);

      setUserFiles(filesList);
    }
  };

  useEffect(() => {
    if (data.account !== "" && isGoodNet) {
      getUserFiles();
    }
  }, [userFiles, data.account, data.network]);
  
   
  // ganache network is used for testing purposes

  // const currentNetwork = networks["1337"];

  // switch to polygon mainnet/testnet for production

  const currentNetwork = networks["80001"]

  const isGoodNet = data.network === currentNetwork;
  // console.log("****",currentNetwork)
  const isConnected = data.account !== "";
  return (
    
    <>
    
      {isConnected ? (
        isGoodNet ? (
          <>
            <div>
              <Input
                type="file"
                name="file"
                onChange={(e) => {
                  getFile(e);
                }}
              />
            </div>
            <br />

            {isSelected ? (
              <div>
                <p>file name: {name}</p>
                <p>file size: {niceBytes(size)}</p>
              </div>
            ) : null}

<div style={{ paddingBottom: "30px" }}>
              <button
                variant="contained"
                color="primary"
                onClick={() => {
                  upload();
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="#fff" />
                ) : (
                  "upload"
                )}
              </button>
            </div>
            {userFiles.length !== 0 ? (
              <h1 c>You have {userFiles.length} files uploaded</h1>
            ) : (
              <h1>You didn't upload any file</h1>
            )}
            <div style={{ paddingLeft: "30%" }}>
              <List>
                {userFiles.map((fileData, i) => {
                  const uploadDate = new Date(
                    fileData.uploadDate.toNumber() * 1000
                  ).toLocaleString();
                  const uri = fileData.uri.replace(
                    "ipfs://",
                    "https://gateway.pinata.cloud/ipfs/"
                  );
                  // console.log(uri);
                  // console.log(userFiles)
                  
                  return (
                    <ListItem key={i} style={{display:"flex", }}>
                      <ListItemIcon >
                        <Folder />
                      </ListItemIcon>
                      
                      <button onClick={()=>{ HandleClick(i)}}  >QRCode</button>
                       
                        <ListItemText style={{color:"white"}}
                          primary={fileData.name}
                          secondary={
                            niceBytes(fileData.size) + "   ||   " + uploadDate
                          }
                          
                        />
                      
                      <QRCode value={uri} id={i} style={{display:"none"}}/>
                    </ListItem>
                    
                  );
                })}
                
              </List>
              
            </div>
          </>
        ) : (
          <p>You are on the wrong network switch to {currentNetwork} network</p>
        )
      ) : null}
    </>
  );
}

export default FileStorage;
