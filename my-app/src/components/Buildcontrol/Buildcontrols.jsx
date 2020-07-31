import React from "react";
import Buildcontrol from "./Buildcontrol";
import {connect} from "react-redux";
import "./buildcontrols.css"

const controls=[
    {label:"Salad",type:"salad"},
    {label:"Meat",type:"meat"},
    {label:"Cheese",type:"cheese"},
    {label:"Bacon",type:"bacon"}
];

function Buildcontrols(props){
    function onClick(events){
        if(props.auth){
            props.ordersummary()
        }
        else{
            props.history.push("/login");
        }
    }


    return (
        <div className="BuildControls">
         {controls.map(item =>{
             return <Buildcontrol key={item.label} label={item.label} disable={props.ingredient[item.type]} name={item.type} add={()=>props.add(item.type)} remove={() =>props.remove(item.type)}/>
         })}
         <button className="OrderButton" disabled={!props.purchasable} onClick={onClick}>{props.auth?"ORDER NOW":"SIGN IN FOR ORDER"}</button>   
        </div>
    )
}

const mapToProps=state =>{
    return {
        ingre:state.burgerBuilder.ingredient,
        auth:state.auth.auth
    }
}

export default connect(mapToProps)(Buildcontrols);