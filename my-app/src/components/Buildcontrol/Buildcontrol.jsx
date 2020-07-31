import React from "react";

import "./buildcontrol.css"

function Buildcontrol(props){
    let disable=false
    if(props.disable===0){
        disable=true
    }
    return (
        <div className="BuildControl">
        <div className="Label">{props.label}</div>
        <button disabled={disable} name={props.name} onClick={() => props.remove(props.name)} className="Less">Less</button>
        <button name={props.name} onClick={() => props.add(props.name)} className="More">More</button>
        </div>
    )
}


export default Buildcontrol;