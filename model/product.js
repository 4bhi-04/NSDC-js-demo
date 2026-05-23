const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    prodId:String,
    prodName:String,
    prodPrice:String,
    prodQuantity:String
})

const productmodel=mongoose.model("Product",productSchema)

module.exports=productmodel;