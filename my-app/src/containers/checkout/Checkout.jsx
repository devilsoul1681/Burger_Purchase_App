import React from "react"
import Checkoutsummary from "../../components/CheckoutSummary/Checkoutsummary";
import {Route, Redirect} from "react-router-dom"
import Contactdata from "../contact-data/Contactdata";
import {connect} from "react-redux"
function Checkout(props){
    function onCancel(){
        props.history.replace("/")
    }
    function onContinue(){
        props.history.push(props.match.path+"/contact-data");
    }
    if(props.ingre){
    return (
        <div>
        <Checkoutsummary ingredient={props.ingre}
        cancel={onCancel}
        continue={onContinue} />
        <Route path={props.match.path +"/contact-data"} render={(props) => <Contactdata ingredient={props.ingre} totalprice={props.price} {...props} />} />
        </div>
    );
}
return <Redirect to="/" />
}
const mapToProps=state =>{
    return {
        ingre:state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalprice
    }
}

export default connect(mapToProps)(Checkout);