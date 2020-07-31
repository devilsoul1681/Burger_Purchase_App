import * as actionType from "./actionType";
import axios from "axios";
export const addingredient=ingredient=>{
    return{
        type:actionType.add,
        ingredient:ingredient
    }
}

export const removeingredient=ingredient=>{
    return{
        type:actionType.subtract,
        ingredient:ingredient
    }
}

 const setingredient=ingredient=>{
    return {
        type:actionType.set_ingredient,
        ingredient:ingredient
    }
}

const fetchError=() =>{
    return {
        type:actionType.fetch_error
    }
}

export const initingredient=() =>{
    return dispatch=>{
        axios.get("http://localhost:5000/initial")
        .then(res=>{
            dispatch(setingredient(res.data));
        })
        .catch(err=>{
            dispatch(fetchError());
        })
    }
}