import * as actionType from "../action/actionType"

const initialState={
    ingredient:null,
    totalprice:4,
    error:false
}

const price={
    salad:1,
    cheese:2,
    meat:3,
    bacon: 5
}



const reducer= (state=initialState,action)=>{
    switch (action.type) {
        case actionType.add:
            return{
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredient]:state.ingredient[action.ingredient]+1
                },
                totalprice:state.totalprice+price[action.ingredient]
            }

        case actionType.subtract:
            return{
                ...state,
                ingredient:{
                    ...state.ingredient,
                    [action.ingredient]:state.ingredient[action.ingredient]-1
                    },
                    totalprice:state.totalprice-price[action.ingredient]    
                }
        case actionType.set_ingredient:
            return{
                ...state,
                ingredient:action.ingredient,
                totalprice:4,
                error:false
            }   
        case actionType.fetch_error:
            return{
                ...state,
                error:true
            }                           
        default:
            return state
    }
}

export default reducer