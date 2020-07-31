import React from "react";
import Order from "./Order/Order";
import axios from "axios";
import "./orders.css"
import Spinner from "../UI/Spinner/Spinner";
function Orders(){
    const [spinner,setspinner]=React.useState(false);
    const [error,seterror]=React.useState(false)
    const [data,setdata]=React.useState([]);
    React.useEffect(() =>{
         setspinner(true);
         axios.get("/orders")
         .then(res =>{
            setdata(prevalue =>{
                return [...prevalue,...res.data];
            })
             setspinner(false);
             seterror(false)
         })
         .catch(error =>{
             seterror(true);
             setspinner(false);
         })
    },[])
    if(spinner===true){
        return <Spinner />
    }
    if(error===true){
        return <h1 style={{marginTop:100,textAlign:"center"}}>Network Error !!!!</h1>
    }
    function shows(info,id){
        return <Order salad={info.salad} meat={info.meat} bacon={info.bacon} cheese={info.cheese} price={info.totalPrice} key={id} id={id} />
    }
    return (
        <div>
        {error?<p style={{marginTop:100}}>Network error please make sure you have internet connection !!!</p>:<div className="Orders">
        {data.length>0?data.map(shows):<h3  style={{marginTop:100,textAlign:"center"}}>Please start giving an Order!!!</h3>}
     </div>}
     </div>
    )
}

export default Orders