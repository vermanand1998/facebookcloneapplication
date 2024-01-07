import React from "react";
import Navbar from "../Navbar"
import './comming.css'
import PageisUnder from '../../Images/PngItem_6437916.png'
import { useEffect } from "react";

function Commingsoon(){

    useEffect(()=>{
console.log("comming soon");
    },[])
    return(
        <div className="commingsoon-div">
        <Navbar/>
        {/* <img src={PageisUnder} alt=".." className="under-con-png"
        /> */}
        <h1>Comming soon</h1>
       
        </div>
    )
}
export default Commingsoon;