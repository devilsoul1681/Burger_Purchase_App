import React from "react";
import {connect} from "react-redux"
import { Redirect } from "react-router-dom";
import "./login.css"
import * as actionCreator from "../../store/action/index"
import Button from "../../components/UI/button/Button"
import Input from "../contact-data/Input/Input"

function LoginRegister(props){
   
   const [loginregister,setloginregister]=React.useState(true)

   const [logindata,setlogindata]=React.useState({
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
             required:true,
             minlength:6
         },
         valid:false,
         touched:false
     },
     password:{
      elementType:"input",
      elementConfig:{
          type:"password",
          placeholder:"Password",
          name:"password",
          label:"Password"
      },
      value:"",
      validation:{
          required:true,
          minlength:6
      },
      valid:false,
      touched:false
  }
   })
   
   const [loginformvalidation,setloginformvalidation]=React.useState(false)

   function onchange(event){
      if(props.lrerror){
                 props.errmessageoff()
            }
      const name=event.target.name
      const value=event.target.value
      const info={
          ...logindata
      }
      const update={
          ...logindata[name]
      }
      update.value=value
      info[name]=update;
      if(!loginregister){
      update.touched=true;
      update.valid=checkvalidity(update.value,logindata[name].validation)
      info[name]=update;
      let formvalidate=true
      for(let key in info){
          formvalidate=info[key].valid && formvalidate
      }
      setloginformvalidation(formvalidate)
   }
      setlogindata((prevalue) =>{
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


   let array=[];
   for(let key in logindata){
       array.push({
           id:key,
           config:logindata[key]
       })
   }

  if(props.auth && (props.ingre.salad ||props.ingre.meat ||props.ingre.bacon || props.ingre.cheese)){
      return <Redirect to="/checkout" />
  }

   if(props.auth){
      return <Redirect to="/" />
   }

   function onclick(events){
      events.preventDefault()
      const data={
         ...logindata
      }
      const info={
         email:data.email.value,
         password:data.password.value
      }
      if(loginregister){
         props.onLogin(info)
      }
      else{
      props.onRegister(info);
      }
      setlogindata({
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
                required:true,
                minlength:6
            },
            valid:false,
            touched:false
        },
        password:{
         elementType:"input",
         elementConfig:{
             type:"password",
             placeholder:"Password",
             name:"password",
             label:"Password"
         },
         value:"",
         validation:{
             required:true,
             minlength:6
         },
         valid:false,
         touched:false
     }
      })
     
   }
   function lrchange(events){
      events.preventDefault()
      if(loginregister===true){
         setloginregister(false)
      }
      else{
         setloginregister(true);
      }
      if(props.lrerror){
         props.errmessageoff()
    }
   }


   return (
      <div className="Login">
      <form  >
              <h3 style={{textAlign:"center"}}>{loginregister?"SIGN IN":"SIGN UP"}</h3>
              {props.lrerror?<p style={{color:"red"}}>{props.message}</p>:null}
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
              <div className="Toggle"><Button class="Danger" disabled={loginregister} clicked={lrchange}>SIGN IN</Button><Button disabled={!loginregister} class="Danger" clicked={lrchange}>SIGN UP</Button></div>
              {loginregister?<Button class="Success"  clicked={onclick} >LOGIN</Button>:<Button class="Success" disabled={!loginformvalidation} clicked={onclick} >REGISTER</Button>}
          </form>
      </div>
  )
}

const mapToProps =state=>{
   return{
    ingre:state.burgerBuilder.ingredient,
     auth:state.auth.auth,
     err:state.auth.error,
     lrerror:state.auth.errormessage,
     message:state.auth.message
   }
 }

 const mapToAction=dispatch=>{
    return {
       onRegister:(info) =>dispatch(actionCreator.registerStart(info)),
       errmessageoff:()=>dispatch({type:"OFF"}),
       onLogin:(info) => dispatch(actionCreator.loginStart(info))
    }
 }

export default connect(mapToProps,mapToAction)(LoginRegister)