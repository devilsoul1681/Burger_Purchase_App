import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";
import "./logo.css"

function Logo(props){
   return (
       <div className="Logo" style={{height:props.height}}>
           <img src={burgerLogo} alt="MyBurger"></img>
       </div>
   )
}

export default Logo