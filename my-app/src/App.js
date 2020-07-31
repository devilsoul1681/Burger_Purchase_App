import React from 'react';
import Outer from "./components/outer/Outer"
import BurgerBuilder from "./containers/Burgerbuilder/BurgerBuilder"
import Checkout from './containers/checkout/Checkout';
import {Switch,Route, Redirect} from "react-router-dom"
import Orders from './components/Orders/Orders';
import {connect} from "react-redux"
import * as actionCreator from "./store/action/index"
import LoginRegister from "./containers/LoginRegister/LoginRegsiter" 
import Spinner from './components/UI/Spinner/Spinner';


function App(props){

  React.useEffect(()=>{
    props.onStart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  function pageNotFound(){
    return <h1 style={{marginTop:100}}>Page Not Found!!!!</h1>
  }
  if(props.spinner===true){
    return <Spinner />
  }

  if(props.err===true){
    return(
      <h1 style={{marginTop:100,textAlign:"center"}}>Network Error!!!</h1>
    )
  }



  return (
    <div>
    <Outer>
    <Switch>
    <Route path="/checkout" component={Checkout} />
    <Route path="/orders"  component={Orders} />
    <Route path="/login" component={LoginRegister} />
    <Route path="/" exact component={BurgerBuilder} />
    {!props.auth?<Redirect from="/orders" to="/login" />:null}
    {(props.auth && props.ingre)?<Redirect from ="/" to="/checkout" />:null}
    <Route component={pageNotFound} />
    </Switch>
    </Outer>
    </div>
  )
}


const mapToProps =state=>{
  return{
    ingre:state.burgerBuilder.ingredient,
    auth:state.auth.auth,
    err:state.auth.error,
    spinner:state.auth.spinner
  }
}

const mapToAction=dispatch=>{
  return{
    onStart:() =>dispatch(actionCreator.startAuth())
  }
}


export default connect(mapToProps,mapToAction)(App);
