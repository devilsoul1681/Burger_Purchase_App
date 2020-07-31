import * as actionType from "../action/actionType";


const initialStates={
    loading:false,
    order:[],
    error:false,
    redirect:false
}


const reducer=(state=initialStates,action) =>{
    switch (action.type) {
        case actionType.burgerStartLoading:
            return{
                ...state,
                loading:true
            }
        case actionType.purchaseBurgerSuccess:
            const neworder={...action.order}
            const id=neworder.customer.name;
            return{
                ...state,
                order:[...state.order,[neworder,id]],
                loading:false,
                error:false,
                redirect:true
            }
        case actionType.failedBurgerpurchase:
            return {
                ...state,
                loading:false,
                error:true,
                redirect:true
            }
        case actionType.redirect:
            return{
                ...state,
                redirect:false
            }        
        default:
            return state
    }
}

export default reducer