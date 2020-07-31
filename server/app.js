const express=require("express");
const bodyParser=require("body-parser");
const cors = require('cors'); // addition we make
const session = require('express-session')
const { v4: uuid } = require('uuid');
const fileUpload = require('express-fileupload'); //addition we make
const mongoose=require("mongoose");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); //addition we make
app.use(cors());
app.use(fileUpload());
app.use(session({
    name:"sid",
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:1000*60*60*2,
        sameSite:true,
        secure:false
    }
  }))

mongoose.connect("mongodb://localhost:27017/burgerDB",{ useNewUrlParser: true ,useUnifiedTopology: true, useFindAndModify: false  });

const orderSchema=new mongoose.Schema({
    salad:Number,
    cheese:Number,
    bacon:Number,
    meat:Number,
    totalPrice:Number,
    customer:{
        name:String,
        postalcode:String,
        address:String,
        email:String,
        deliverymethod:String
    }
})

const Order=new mongoose.model("order",orderSchema)
 const userSchema=new mongoose.Schema({
     email:String,
     password:String,
     orders:[orderSchema]
 })

 const User=new mongoose.model("user",userSchema)



app.get("/auth",function(rq,rs){
    if(rq.session.userID){
        return rs.send({
            id:rq.session.userID,
        })
    }
    else{
        return rs.send({
            id:false
        })
    }
})

app.get('/logout',function(rq,rs){
    rq.session.destroy(err =>{
        if(err){
            console.log("logout")
        }
        rs.clearCookie("sid")
        rs.send({data:true})
    }) 
})

app.post('/login',function(rq,rs){
    const email=rq.body.email
    const password=rq.body.password
    User.find(function(error,data){
        if(!error){
        for(var i=0;i<data.length;i++){
            if(email===data[i].email){
                if(password===data[i].password){
                rq.session.userID=uuid()
                rq.session.email=email
                return rs.send({
                    success:true
                })
            }
            else{
                return rs.send({
                    success:false,
                    message:"Wrong Password"
                })
            }
        }
    }
    return rs.send({
        success:false,
        message:"Email address not register"
    })
    }
    })

})


app.post("/register",function(rq,rs){
    const email=rq.body.email
    const password=rq.body.password
    User.find(function(error,data){
        if(!error){
        for(var i=0;i<data.length;i++){
            if(email===data[i].email){
                return rs.send({
                    success:false,
                    message:"User Already Exist"
                })
            }
        }
        const user=new User({
                email:email,
                password:password,
                order:[]
            })
            user.save()
            rq.session.userID=uuid()
            rq.session.email=email
            return rs.send({
                success:true
            })    
    }
    })
})


app.get('/',function(rq,rs){
    rs.send("server is running");
})

app.get("/initial",function(rq,rs){
    rs.send({
        salad:0,
        cheese:0,
        meat:0,
        bacon:0
    })
})

app.get("/orders",function(rq,rs){
    User.findOne({email:rq.session.email},function(error,value){
        if(!error){
            var info=[]
            for(var i=0;i<value.orders.length;i++){
                info.push({
                    salad:value.orders[i].salad,
                    meat:value.orders[i].meat,
                    bacon:value.orders[i].bacon,
                    cheese:value.orders[i].cheese,
                    totalPrice:value.orders[i].totalPrice,
                })
            }
            rs.send(info)
    }
    })
})

app.post("/orders",function(rq,rs){
    User.findOne({email:rq.session.email},function(err,data){
        if(!err){
                const order=new Order({
                    ...rq.body
                })
                User.updateOne({email:rq.session.email},{ $push: { orders: order } },function(err){
                    if(!err){
                        order.save()
                        rs.send(order);
                    }
                })
                }
            })
})



app.listen(5000,function(){
    console.log("server is running on port 5000")
})