import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ethers, utils } from "ethers";
import { connect } from "../features/blockchain";
import SmartContract from "../artifacts/contracts/FileStorage.json";
import contractsAddress from "../artifacts/deployments/map.json";
import networks from "../utils/networksMap.json";
import { StoreContent } from "../utils/StoreContent";
function UploadFile() {

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// contract address on ganache network
// const ads = contractsAddress["5777"]["FileStorage"][0];
// contract address on polygon mumbai test network
const ads = contractsAddress["80001"]["FileStorage"][0]
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
  const currentNetwork = networks["80001"]
  const isGoodNet = data.network === currentNetwork;

  const updateBalance = async () => {
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    dispatch(connect({ ...data, balance: utils.formatUnits(balance) }));
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

  const getFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    setSelectedFile(file);
    setisSelected(true);
    setName(file.name);
    setSize(file.size);
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
  return (
    <div className="uploadCard">
    <form>
      {/* <input name="file" type="file" /> */}
      <input
              id="inputTag"
                type="file"
                name="file"
                onChange={(e) => {
                  getFile(e);
                }}
              />
              <label for="file">Choose a File</label>
              {/* {isSelected ? (
              <div>
                <p>file name: {name}</p>
                <p>file size: {niceBytes(size)}</p>
              </div>*/}
          
          <button
                variant="contained"
                color="primary"
                className="submitfile"
                onClick={() => {
                  upload();
                }}
              >Upload
                {/* {loading ? (
                  <CircularProgress size={24} color="#fff" />
                ) : (
                  "upload"
                )} */}
              </button>
      {/* <button type="submit" className="submitfile">Submit</button> */}
    </form>
    </div>
  );
}
export default UploadFile;