import React,{useState} from 'react'
import { useSelector } from "react-redux"
import Account from "./Account"
import FileStorage from "./FileStorage"
import "./Dashboard.css";
import Files from "./files"
import { Nav, Title, Note } from "./NavbarElements"
import {Routes, Route ,Outlet,Link } from "react-router-dom";
import { Dashboard } from '@mui/icons-material';
import Homepage from './homepage';
import HELIOS from "./images/HELIOS.png";
// import 'boxicons';

function Main() {
  const [style, setStyle] = useState("aboutdivs");
        
    const data = useSelector((state) => state.blockchain.value)
    
    const isConnected = data.account !== ""
    const[show,setShow]=useState(false);
    function toggleShow() {
        setShow(true);
        setStyle("aboutdivs2");
    }
    function toggleHide(){
      setShow(false);
          setStyle("aboutdivs");
        
    }
    return (
        <>
        {/* <UploadFile/> */}
        <link rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"></link>
        <div className="dashboard">
          
        <Outlet/>
        
        {/* <Link to="/files">Files</Link> */}
            <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
              <div className="sidebar close" style={{width: show ? '260px' : '78px',
          }}>
            
                
    <div className="logo-details" onMouseOver={toggleShow} onMouseLeave={toggleHide}>
    <i class="bx bx-menu"></i>
      <span className="logo_name">HELIOS</span>
    </div>
    <ul className="nav-links" onMouseOver={toggleShow} onMouseLeave={toggleHide}>
      <li>
      <Link to="/">
        <a href="#">
        <i class='bx bx-home-alt-2'></i>
          <span className="link_name" style={{opacity: show ? '1' : '',
          }}>Homepage</span>
        </a></Link>
       
      </li>
      <li>
      <Link to="/files">
        <a href="#">
          <i className='bx bx-file-blank'></i>
          <span className="link_name" style={{opacity: show ? '1' : '',
          }}>Files</span>
        </a></Link>
        
      </li>
      <li>
        <a href="#">
          <i className='bx bx-cog' ></i>
          <span className="link_name" style={{opacity: show ? '1' : '',
          }}>Settings</span>
        </a>
      </li>
      <li>
        <a href="#">
        <i class='bx bx-question-mark' ></i>
          <span className="link_name" style={{opacity: show ? '1' : '',
          }}>FAQ's</span>
        </a>
      </li>
      <li>
  </li>
</ul>
  </div>
  <section className="home-section">
    <div className="home-content">
      <span className="text" style={{marginLeft: show ? '190px' : '0px'}} >HELIOS</span>
      <div className="home-button"><Account /></div>
    </div>
    
    
    
                <Routes>
        
        <Route exact path="/files"  element={<Files/>} />
        <Route exact path="/"  element={<Homepage style={style}/>}/>
      
    </Routes>
  </section>
            </div>
            
            
      
            
        </>
    )
}

export default Main