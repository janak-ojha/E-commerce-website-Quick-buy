const Product = require("../models/ProductSchema");

const ProductAdd=async(req,res) =>{
    try{
        const product = new Product(req.body)
        let result = new product.save();
        res.send(result);
    }catch(err){
      res.status(500).json(err);
    }
};      
module.exports ={
    ProductAdd
};