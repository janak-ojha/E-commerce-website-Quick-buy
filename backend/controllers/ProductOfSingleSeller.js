const router = require("express").Router();
const Product = require("../models/ProductSchema");
const mongoose = require('mongoose');

const getProductSeller=async(req,res) =>{
    try{
        const id = req.params;
        const sellerId= mongoose.Types.ObjectId(id);
        let result = await Product.find({seller:sellerId});
        if(result){
            res.status(200).send(result);
        }else{
            res.status({message:"Failed to fetch the product of the seller"})
        }

    }catch(error)
    {
        console.log(error);
        res.status(500).json(error);
    }
};

// const updateProductSeller = async(req,res) =>{
//     try {
//         const {name,cost,discountPerceent,description,quantity,}
//     } catch (error) {
        
//     }
// }

module.exports = {
    getProductSeller
};