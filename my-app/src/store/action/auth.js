import * as actionType from "../action/actionType"
import axios from "axios"
///////// authnentication ///////////////
export const startAuth=()=>{
    return dispatch =>{
        axios.get('/auth')
        .then(res=>{
            if(res.data.id){
                dispatch(authSuccess())
            }
            else{
                dispatch(notAuth())
            }
        })
        .catch(error =>{
            dispatch(authFailed())
        })
    }
}

const authSuccess=() =>{
    return{
        type:actionType.authenticationsuccess
    }
}

const notAuth=() =>{
    return {
        type:actionType.notauthenticated
    }
}

const authFailed =() =>{
    return{
        type:actionType.authenticationfailed
    }
}

////////////////////////////////////////
/////////// Logout /////////////////////

const logoutSuccess=() =>{
    return {
        type:actionType.logoutsuccess
    }
}

const logoutFailed=() =>{
    return {
        type:actionType.logoutfailed
    }
}

export const logoutStart=() =>{
    return dispatch =>{
        axios.get("/logout")
        .then(res=>{
        dispatch(logoutSuccess())
        })
        .catch(err =>{
            dispatch(logoutFailed())
        })
    }
}
///////////////////////////////////////

///Register/////////////////////////////
const regsiterSuccess=(success,message) =>{
    if(success){
    return {
        type:actionType.registersuccess
    }
}
return {
    type:actionType.errmessage,
    message:message
}
}

export const registerStart=(data) =>{
    return dispatch=>{
        axios.post("/register",data)
        .then(res =>{
            dispatch(regsiterSuccess(res.data.success,res.data.message))
        })
        .catch(err =>{
            dispatch(authFailed())
        })
    }
}

/////////////////////////////////////////////////


const loginSuccess=(success,message) =>{
    if(success){
        return {
            type:actionType.loginsuccess
        }
    }
    else{
        return {
            type:actionType.errmessage,
            message:message
        }      
    }
}

export const loginStart=(data) =>{
    return dispatch=>{
        axios.post("/login",data)
        .then(res =>{
            dispatch(loginSuccess(res.data.success,res.data.message))
        })
        .catch(err =>{
            dispatch(authFailed())
        })
    }
}