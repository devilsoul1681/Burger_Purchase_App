import React from "react";
import "./backdrop.css"
function Backdrop(props){
     if(props.show){
         return(
             <div className="Backdrop" onClick={props.change}></div>
         )
     }
     else{
         return(
             null
         )
     }
}

export default Backdrop