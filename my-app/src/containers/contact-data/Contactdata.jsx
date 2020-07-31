import React from "react"
import "./contactdata.css"
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "./Input/Input";
import Button from "../../components/UI/button/Button";
import {connect} from "react-redux";
import * as actionCreator from "../../store/action/index"
import { Redirect } from "react-router-dom";

function Contactdata(props){
    const [orderform,setorderform]=React.useState({
        name:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Username",
                name:"name",
                label:"Username"
            },
            value:"",
            validation:{
                required:true,
                minlength:2,
                maxlength:10
            },
            valid:false,
            touched:false
        },
        email:{
            elementType:"input",
            elementConfig:{
                type:"email",
                placeholder:"Email",
                name:"email",
                label:"Email"
            },
            value:"",
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        address:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"Address",
                name:"address",
                label:"Address"
            },
            value:"",
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        postalcode:{
            elementType:"input",
            elementConfig:{
                type:"text",
                placeholder:"PostalCode",
                name:"postalcode",
                label:"PostalCode"
            },
            value:"",
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        deliverymethod:{
            elementType:"select",
            elementConfig:{
                name:"deliverymethod",
                option:["Cheapest","Fastest"]
            },
            value:"Cheapest",
            validation:{},
            valid:true
        }
    })
    const [formvalidation,setformvalidation]=React.useState(false)

    function onchange(event){
        const name=event.target.name
        const value=event.target.value
        const info={
            ...orderform
        }
        const update={
            ...orderform[name]
        }

        update.value=value
        update.touched=true;
        update.valid=checkvalidity(update.value,orderform[name].validation)
        info[name]=update;
        let formvalidate=true
        for(let key in info){
            formvalidate=info[key].valid && formvalidate
        }
        setformvalidation(formvalidate)
        setorderform((prevalue) =>{
            return{
                ...info
            }
        } )
    }

    function checkvalidity(value,rule){
        let isvalid=true
        if(rule.required){
            isvalid=value.trim()!=="" && isvalid
        }

        if(rule.maxlength){
            isvalid=value.length<=rule.maxlength && isvalid
        }

        if(rule.minlength){
            isvalid=value.length>=rule.minlength && isvalid
        }

        return isvalid
    }

    function onclick(event){
        event.preventDefault();
        let info={}
        for(let key in orderform){
            info[key]=orderform[key].value
        }
        const data={
            ...props.ingre,
            totalPrice:props.price,
            customer:{
                ...info
            }
        }
        props.onBurgerPurchase(data);
    }

    let array=[];
    for(let key in orderform){
        array.push({
            id:key,
            config:orderform[key]
        })
    }
    if(props.redirect===true){
        return <Redirect to="/" />
    }
    return (
        <div className="Contact">
        {props.spinner?<Spinner />:<form  >
                <h3 style={{textAlign:"center"}}>Enter Your Contact Detail</h3>
                {array.map(value =>{
                    return <Input key={value.id} 
                    elementtype={value.config.elementType} 
                    elementconfig={value.config.elementConfig} 
                    value={value.config.value}
                    onchange={onchange}
                    valid={!value.config.valid}
                    shouldvalidate={value.config.validation}
                    touched={value.config.touched}  />
                })}
                <Button class="Success" disabled={!formvalidation} clicked={onclick} >ORDER</Button>
            </form>}
        </div>
    )
}

const mapToProps=state =>{
    return {
        ingre:state.burgerBuilder.ingredient,
        price:state.burgerBuilder.totalprice,
        spinner:state.order.loading,
        error:state.order.error,
        redirect:state.order.redirect
    }
}

const mapToActions=dispatch=>{
    return{
        onBurgerPurchase:(orderdata)=>dispatch(actionCreator.burgerPurchaseStart(orderdata)),
        onRedirect:() =>dispatch(actionCreator.redirectInit())
    }
}


export default connect(mapToProps,mapToActions)(Contactdata);