import React from "react";
import Aux from "../../hoc/Auxillary"
import './navigationitems.css'
import { NavLink } from "react-router-dom";
import {connect} from "react-redux";
import * as actionCreator from "../../store/action/index"
function Navigationitems(props){
    return(
        <Aux>
            <ul className="Navigationitems">
                <li className="Navigationitem"><NavLink to="/" exact activeClassName="active" >Burger Builder</NavLink></li>
                <li className="Navigationitem">{props.auth?<NavLink to="/orders" exact activeClassName="active">Orders</NavLink>:null}</li>
                {!props.auth?<li className="Navigationitem"><NavLink to="/login" exact activeClassName="active">Login</NavLink></li>:null}
                {props.auth?<li className="Navigationitem" onClick={props.onLogout}><NavLink to="/login" exact activeClassName="active">Logout</NavLink></li>:null}
            </ul>
        </Aux>
    )
    
}

const mapToProps =state=>{
    return{
      auth:state.auth.auth,
      err:state.auth.error
    }
  }

const mapToAction =dispatch=>{
    return{
        onLogout:() =>dispatch(actionCreator.logoutStart())
    }
} 


export default connect(mapToProps,mapToAction)(Navigationitems)