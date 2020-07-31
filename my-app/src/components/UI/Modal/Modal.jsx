import React from "react";
import Aux from "../../../hoc/Auxillary";
import "./Modal.css"
import Backdrop from "../Backdrop/Backdrop";
function Modal(props){
    return(
        <Aux>
        <Backdrop show={props.show} change={props.change}/>
        <div 
        className="Modal"
        style={{transform:props.show? "translateY(0)":"translatey(-100vh)",
        opacity:props.show?"1":"0"}}>
            {props.children}
        </div>
        </Aux>
    )
}


export default Modal