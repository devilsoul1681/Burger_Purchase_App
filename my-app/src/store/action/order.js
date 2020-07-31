import * as actionType from "./actionType"
import axios from "axios";

const burgersuccess=(orderData)=>{
    return {
        type:actionType.purchaseBurgerSuccess,
        order:orderData,
    }
}

const burgerfailed=()=>{
    return{
        type:actionType.failedBurgerpurchase
    }
}

const burgerstartloading=()=>{
    return {
        type:actionType.burgerStartLoading
    }
}

export const burgerPurchaseStart=(data)=>{
    return dispatch=>{
        dispatch(burgerstartloading())
        axios.post("/orders",data)
        .then(res =>{
            dispatch(burgersuccess(res.data))
        })
        .catch(err =>{            
            dispatch(burgerfailed())
        });
    }
}

export const redirectInit=()=>{
    return {
        type:actionType.redirect
    }
}