import React from 'react';
import { useSelector } from "react-redux"
import FileStorage from "./FileStorage"

const Files=()=>{
    const data = useSelector((state) => state.blockchain.value)
    const isConnected = data.account !== ""
    return(
        <>
            
            {isConnected ? (
                    <>
                        <FileStorage />
                    </>
                ) : null}
                
                    {isConnected ? (
                        <p>
                            Note: You are currently connected to the {data.network ? data.network : "unknown"} network
                        </p>
                    ) : (
                         
                            <p className="innerdivs">Please connect your wallet</p> 
                    )}
                
        </>
    );
}

export default Files;