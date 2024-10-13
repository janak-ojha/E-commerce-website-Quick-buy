const Product = require("../models/ProductSchema");
const Cart = require("../models/Cart");

const productAdd = async (req, res) => {
    try {
        const product = new Product(req.body);

        let result = await product.save(); // Await the save operatio

        res.status(201).json(result); // Respond with the created product
    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ message: "Internal Server Error", error: err.message }); // Send a more informative error response
    }
};


// for getting all product detail
const getProduct =async(req,res) =>{
    try {
        const results=await Product.find();
        res.status(200).send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send(error); 
    }
}




const mongoose = require('mongoose');

const getPerticularProduct = async (req, res) => {
    try {
        // Assuming you pass the ID as a URL parameter (e.g., /product/:id)
        const productId = req.params.id; 

        // Validate if the product ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).send({ message: "Invalid product ID format" });
        }

        // Log the product ID for debugging
        console.log("Fetching product with ID:", productId);

        // Fetch the product from MongoDB using findById
        const result = await Product.findById(productId);

        // If the product is not found, return 404
        if (!result) {
            return res.status(404).send({ message: "Product not found" });
        }

        // Return the product details if found
        res.status(200).send({
            _id: result._id,
            name: result.productName,
            cost: result.cost,
            discount: result.discountPercent,
            category: result.category,
            quantity: result.quantity,
            description: result.description,
            seller: result.seller,
        });

    } catch (error) {
        // Log the error details for debugging
        console.error("Error fetching product:", error);

        // Return 500 in case of server error
        res.status(500).send({ message: "Server error", error });
    }
};








//for searching according to category
const getSearchedProduct =async(req,res)=>{
    try {
        const category = req.body.key;
        let result = await Product.find({category:category});
        if(result?.length>0)
        {
            res.status(200).send(result);
        }else{
            res.status(200).send({message:"no product found"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

//for searching the product with name or category
const getSearchesProduct = async(req,res) =>{
    try {
        const searchedKey = req.body.key;
        let result = await Product.find({
            $or:[
                {name: { $regex: searchedKey,$options:'i'}},
                {category: { $regex: searchedKey,$options:'i'}},
            ]
        });
        if(result?.length>0){
            res.status(200).send(result);
        }else{
            res.status(200).send({message:"no product found"})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
        
    }
}

// save to cart
const saveToCart=async(req,res) =>{
    const{customer,product,quantity} = req.body.fields;
    try {
        let result = new Cart(
            {
                customer,
                product,
                quantity,
            }
        );
        result=await result.save();
        if(result?.customer){
            res.status(200).send({message:"Successfully added to the cart."})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}


module.exports = {
    productAdd,
    getProduct,
    getSearchedProduct,
    getSearchesProduct,
    getPerticularProduct,
    saveToCart,

};
