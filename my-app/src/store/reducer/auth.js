import * as actionType from "../action/actionType"

const initialState={
    auth:false,
    error:false,
    spinner:true,
    errormessage:false,
    message:""
}

const reducer =(state=initialState,action) =>{
    switch (action.type) {
        case actionType.authenticationsuccess:
            return{
                ...state,
                auth:true,
                spinner:false
                
            }
        case actionType.authenticationfailed:
            return{
                ...state,
                error:true,
                spinner:false
            }
            
        case actionType.notauthenticated:
            return{
                ...state,
                auth:false,
                spinner:false
            }
        case actionType.logoutsuccess:
            return {
                ...state,
                auth:false
            }
         
        case actionType.logoutfailed:  
            return{
                ...state,
                error:false
            } 
        case actionType.registersuccess:
            return{
                ...state,
                auth:true
            }
        case actionType.loginsuccess:
            return{
                ...state,
                auth:true
            }    
        case actionType.errmessage:
            return{
                ...state,
                errormessage:true,
                message:action.message
            }
        case "OFF":
            return {
                ...state,
                errormessage:false,
                message:""
            }               
        default:
            return state
    }
}


export default reducer