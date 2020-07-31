import React from "react";
import "./toolbar.css"
import Logo from "../../Logo/Logo";
import Navigationitems from "../../Navaginationitems/Navigationitems";
function Toolbar(props){
    return(
       <header className="Toolbar">
           <div style={{color:"white"}} onClick={props.click} className="menu">
               Menu
           </div>
           <Logo />
           <nav className="desktoponly">
           <Navigationitems />
           </nav>
       </header>
    )
}

export default Toolbar