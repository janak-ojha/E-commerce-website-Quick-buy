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


//for perticular product
const getPerticularProduct = async(req,res)=>{
    try {
        const productId = req.body._id; // Accessing the _id from the request body
        console.log(productId);
        let result = await Product.findById(productId);
        console.log(result);
        res.send({
            _id: result._id,
            productName: result.productName,
            cost: result.cost,
            discountPercent: result.discountPercent,
            category: result.category,
            quantity:result.quantity,
            description:result.description,
            seller: result.seller,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
        
    }
}

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

};
