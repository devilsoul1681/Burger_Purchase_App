import React from "react";
import Aux from "../../hoc/Auxillary"
import Button from "../UI/button/Button";

function Ordersummary(props){
    var object = Object.keys(props.ingredient).map(function (key) { 
        return [key, props.ingredient[key]]; 
    });
    function show(ingredient,key){
        return <li key={key} style={{textTransform:"capitalize"}}>
            {ingredient[0]}:{ingredient[1]}
        </li>
    }
   return(
       <Aux>
        <h3>Your Order</h3>
        <p>Your burger with following ingredient</p>
        <ul>
            {object.map(show)}
        </ul>
        <p><strong>Total Price:{props.price}</strong></p>
        <p>Continue to checkout?</p>
        <Button class="Danger" clicked={props.clickedDanger}>CANCEL</Button>
        <Button class="Success" clicked={props.clickedSuccess}>CONTINUE</Button>
       </Aux>
   )
}


export default Ordersummary