import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/button/Button";
import {connect} from "react-redux";
import "./checkoutsummary.css"
import { Redirect } from "react-router-dom";
function Checkoutsummary(props){
    if(!props.auth){
        return <Redirect to="/login"></Redirect>
    }

    return (
        <div className="Checkoutsummary">
           <h1>Your Tasty Burger!!!</h1>
            <Burger ingredient={props.ingredient} />
            <Button class="Success" clicked={props.continue}>CONTINUE</Button>
            <Button class="Danger" clicked={props.cancel}>CANCEL</Button>
        </div>
    )
}

const mapToProps=state =>{
    return {
        auth:state.auth.auth
    }
}

export default connect(mapToProps)(Checkoutsummary);