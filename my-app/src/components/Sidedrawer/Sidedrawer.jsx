import React from "react";
import Logo from "../Logo/Logo";
import Navigationitems from "../Navaginationitems/Navigationitems";
import Aux from "../../hoc/Auxillary";
import "./sidedrawer.css";
import Backdrop from "../UI/Backdrop/Backdrop";
function Sidedrawer(props){
    var classe=null
    if(props.open){
         classe="Sidedrawer Open";
    }
    else{
         classe="Sidedrawer Close";
    }
    return(
        <Aux>
        <Backdrop show={props.open} change={props.click}/>
        <div className={classe} onClick={props.click}>
            <Logo height="11%" />
            <nav>
                <Navigationitems />
            </nav>
        </div>
        </Aux>
    )
}

export default Sidedrawer;