import React from "react";
import BurgerIndrigient from "./Burgeringrident/BurgerIndrigient";
import "./Burger.css"

function Burger(props){
    var object = Object.keys(props.ingredient).map(function (key) { 
        return [key, props.ingredient[key]]; 
    });
    let ingredients=[];
    for(var i=0;i<4;i++){
        let y=object[i][1];
        for(var j=0;j<y;j++){
            ingredients.push(object[i][0]);
        }
    }
    
    function show(ingredient,key){
        return <BurgerIndrigient key={key} type={ingredient} />
    }
    return (
        <div className="Burger">
            <BurgerIndrigient type="bread-top"/>
            {ingredients.length===0?<p>Please start adding ingredient!!</p>:ingredients.map(show)}
            <BurgerIndrigient type="bread-bottom"/>
        </div>
    )
}


export default Burger