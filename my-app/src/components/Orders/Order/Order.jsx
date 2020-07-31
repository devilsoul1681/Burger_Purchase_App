import React from "react";
import "./order.css"
function Order(props){
    return (
        <div className="Order">
            <p style={{display:"inline-block",marginBottom:"0"}}>Order {props.id+1}</p>
            <h6 className="h61">salad:{props.salad}</h6>
            <h6 className="h61">meat:{props.meat}</h6>
            <h6 className="h61">bacon:{props.bacon}</h6>
            <h6 className="h61">cheese:{props.cheese}</h6>
            <p>Price:<strong>${props.price}</strong></p>
        </div>
    )
}

export default Order