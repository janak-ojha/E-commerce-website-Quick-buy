const router = require("express").Router();
const Product = require("../models/ProductSchema");
const mongoose = require('mongoose');

const getProductSeller = async (req, res) => {
    try {
        const { id } = req.params;

        // Create a new ObjectId instance
        const sellerId = new mongoose.Types.ObjectId(id);

        let result = await Product.find({ seller: sellerId });

        if (result && result.length > 0) {
            res.status(200).send(result);
        } else {
            res.status(200).json({ message: "No products found for this seller" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch products of the seller" });
    }
};
module.exports=getProductSeller;
