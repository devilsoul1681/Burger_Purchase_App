import React from "react";
import "./input.css"

function Input(props){
    let inputelement=null
    let classes=["Inputelement"];
    let validator=null
    if(props.valid && props.shouldvalidate && props.touched){
        classes.push("Invalid")
        validator=<p className="Validateerror">Please enter a valid value !!!</p>
    }
    switch (props.elementtype) {
        case ("input"):
            inputelement=<input className={classes.join(" ")} {...props.elementconfig} value={props.value} onChange={props.onchange}/>
            break;
        case("textarea"):
            inputelement=<textarea className={classes.join(" ")} {...props.elementconfig} value={props.value} onChange={props.onchange} />
            break;
        case("select"):
        inputelement=(
            <select name={props.elementconfig.name} className={classes.join(" ")} onChange={props.onchange}>
                {props.elementconfig.option.map((option,key) =>{
                    return <option key={key} value={option}>{option}</option>
                })}
            </select>
        )
        break;
        default:
            inputelement=<input className={classes.join(" ")} {...props} onChange={props.onchange} />
            break;
    }

    return (
        <div className="Input">
            <label className="Label">{props.elementconfig.label}</label>
            {inputelement}
            {validator}
        </div>
    )
}

export default Input;