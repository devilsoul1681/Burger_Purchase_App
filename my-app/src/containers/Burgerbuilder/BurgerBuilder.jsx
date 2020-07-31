import React from "react";
import Auxillary from '../../hoc/Auxillary';
import Burger from "../../components/Burger/Burger"
import Modal from "../../components/UI/Modal/Modal"
import Buildcontrols from "../../components/Buildcontrol/Buildcontrols";
import Ordersummary from "../../components/Ordersummary/Ordersummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as actionCreator from "../../store/action/index";

function BurgerBuilder(props){

    const [ordersummary,setordersummary]=React.useState(false);

    React.useEffect(()=>{
        props.onRedirect();
        props.fetchingredient();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    function orderSummary(){
        setordersummary(true);
    }
    function ordernow(x){
        if(x){
        const sum=x.bacon+x.cheese+x.salad+x.meat;
        if(sum>0){
            return true
        }
        return false
    }
    return false
    }
    
    function purchaseCancel(){
        setordersummary(false)
    }
    
    function purchaseDone(){
        const address="/checkout"
        props.history.push(address)
    }
    if(props.err===true){
        return <div onClick={() => props.history.push("/")}><h1 style={{marginTop:100,textAlign:"center"}} >Network Error!!!!</h1></div>
    }if(props.ingre){
    return(
         <Auxillary>
           {props.ingre?<div><Modal show={ordersummary} change={purchaseCancel} >
            <Ordersummary ingredient={props.ingre} clickedDanger={purchaseCancel} clickedSuccess={purchaseDone} price={props.price}/>
        </Modal>
         <Burger ingredient={props.ingre} />
         <h3 className="price">${props.price}</h3>
         <Buildcontrols add={props.onAdd} remove={props.onRemove} ingredient={props.ingre} purchasable={ordernow(props.ingre)} ordersummary={orderSummary} {...props}/></div>:null}
         </Auxillary>
    )
}
return <Spinner />
}
const mapToProps=state =>{
    return {
        ingre:state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalprice,
        err:state.burgerBuilder.error,
        auth:state.auth.auth
    }
}

const mapToAction =dispatch =>{
    return {
        onAdd:(ingredient)=>dispatch(actionCreator.addingredient(ingredient)),
        onRemove:(ingredient) =>dispatch(actionCreator.removeingredient(ingredient)),
        fetchingredient:() =>dispatch(actionCreator.initingredient()),
        onRedirect:() =>dispatch(actionCreator.redirectInit())
    }
}

export default connect(mapToProps,mapToAction)(BurgerBuilder);