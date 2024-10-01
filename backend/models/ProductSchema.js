const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName:{
            type:String,
            required:true,
        },
        cost:{
            type:Number,
            required:true,
        },
        quantity:{
            type:Number,
            required:true
        },
        productImage:{
            type:String,

        },
        discountPercent:{
           type:Number,
           required:true,
        },
        category:{
            type:String,
        },
        description: {
            type: String,
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller'
        },

    }
    , { timestamps: true });

module.exports =  new mongoose.model("Product",productSchema);    