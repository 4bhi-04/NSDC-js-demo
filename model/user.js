const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    dob:Date,
    age:Number,
    branch:String
})

const usermodel=mongoose.model("User",userSchema)

module.exports=usermodel;