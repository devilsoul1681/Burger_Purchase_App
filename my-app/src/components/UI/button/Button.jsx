import React from "react";
import "./button.css";
function Button(props){

    return (
        <button className={["Button",props.class].join(" ")} disabled={props.disabled} onClick={props.clicked}>{props.children}</button>
    )
}

export default Button