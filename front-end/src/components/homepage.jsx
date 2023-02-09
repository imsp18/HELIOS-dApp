import { QrCode } from "@mui/icons-material";
import DappImg from "./images/Dappimg.png";

const Homepage=({style})=>{
    function HandleClick(){
        return(
          <div>hey</div>
        )
      }        
    return(
        <div className="homepage">
            
            <div className={style}>
                <img src={DappImg} alt="DappImg"/>
                <div className="innerdiv">
                    <h2>What is HELIOS?</h2>
                    <p>HELIOS stores data on decentralized networks to ensure security and prevent alteration by a single entity using IPFS in order to ensure that the data is secure and cannot be altered by a single entity.</p>
                    {/* <button onClick={HandleClick}>heylo</button> */}
                    </div>
                    </div>
           <div className={style}>
                
                    <div className="innerdiv">
                        <h2>ABSTRACT</h2>
                        <p>HELIOS aims to provide a secure and decentralized way for DApps to store data. The project involves the development of a decentralized storage solution, such as Inter Planetary File System (IPFS) or Swarm, or the use of smart contracts on a blockchain to store data. The goal of a DApp storage project is to ensure that data stored by DApps is secure and resistant to tampering or censorship. By using decentralized storage solutions and blockchain technology, DApp storage projects aim to provide a more secure and reliable alternative to traditional centralized storage systems.</p>
            
                    </div>
                    <img src={DappImg} alt="DappImg"/>
                </div>
                <div className={style}>
                <img src={DappImg} alt="DappImg"/>
                    <div className="innerdiv">
                    <h2>ABOUT HELIOS</h2>
                    <p>Helios is depicted as a powerful and fierce god but also as a benevolent and kind god who brings life and vitality to the world.<br></br>
Our project is always strongly secured and protected but also easy enough to access for people</p>
           
                    </div>
                </div>
                <div className={style}>
               
                    <div className="innerdiv">
                    <h2>VISION & MISSION</h2>
                    <p><b>Our Vision:</b>Our vision is to create a DApp that provides grouping access control and a secure software to store data for MNCs .</p>
                    <p><b>Our Mision:</b>OOur mission is to provide decentralization and security by using bloackchain technology and multiple node networks.</p>           
                    </div>
                    <img src={DappImg} alt="DappImg"/>
                </div>
                <div className={style}>
                <img src={DappImg} alt="DappImg"/>
                    <div className="innerdiv">
                    <h2>Features of the HELIOS</h2>
                    <p>End-to-end encryption



Decentralized storage



Interoperability with other web 3 apps and services



Access control 



Grouping access control (future feature)</p>
           
                    </div>
                </div> 
            {/* <li>
                <div className="about-helios">
      <img src={DappImg} alt="DappImg"/>
      <h2>What is HELIOS?</h2>
      <p>HELIOS stores data on decentralized networks to ensure security and prevent alteration by a single entity using IPFS in order to ensure that the data is secure and cannot be altered by a single entity.</p>
    </div>
            </li> */}
        </div>
        
    );
}

export default Homepage;