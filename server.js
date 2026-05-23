const express=require("express")
const bcrypt=require("bcrypt")

const morgan=require("morgan")
require("dotenv").config();
const ejs=require("ejs")
const productmodel=require("./model/product")


const usermodel = require("./model/user")

const connection=require("./config/db")
const app=express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")

const auth=(req,res,next)=>{
    const islogin=true
    if(islogin){
        next()
    }
    else{
        res.send("Access denied")
    }
}

app.get('/',auth,(req,res)=>{
    res.render("signin")
})

app.get('/signup',(req,res)=>{
    res.render("signup")
})

app.get('/home',(req,res)=>{
    res.render("home")
})

app.post('/signin',async(req,res)=>{
    const{username,password}=req.body
    console.log(req.body)
    const user = await usermodel.findOne({username:username})
    if(!user){
        return res.send("No user found . Create an account");
    }
    
    const match = await bcrypt.compare(password,user.password)

    if(match){
        res.redirect('/home')
    }
    else{
        res.send("Password incorrect");
    }

})

app.post('/signup',async(req,res)=>{
    const{username,email,password,dob,age,branch}=req.body
    console.log(req.body)
    const ishash=await bcrypt.hash(password,10)
    await usermodel.create({
        username:username,
        email:email,
        password:ishash,
        dob:dob,
        age:age,
        branch:branch

    })
    res.send("account is created")
})

app.post("/product",async(req,res)=>{
    const{prodId,prodName,prodPrice,prodQuantity}=req.body
    console.log(req.body)
    await productmodel.create({
        prodId:prodId,
        prodName:prodName,
        prodPrice:prodPrice,
        prodQuantity:prodQuantity
    })
    res.send("Product created")
})

app.get('/display',async(req,res)=>{
    const product= await productmodel.find()
    res.send(product)

})

app.delete('/product',async(req,res)=>{
    const{prodName} = req.body;
    await productmodel.findOneAndDelete({prodName:prodName})
    res.send("deleted")
})




app.listen(process.env.PORT)