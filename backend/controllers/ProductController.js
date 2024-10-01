const Product = require("../models/ProductSchema");

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

const getProduct =async(req,res) =>{
    try {
        const results=await Product.find();
        res.status(200).send(results);
    } catch (error) {
        console.log(error);
        res.status(500).send(error); 
    }
}

const getPerticularProduct = async(req,res)=>{
    try {
        const productId= req.body.productId;
        let result = await Product.findById(productId);
        res.send({
            _id: result._id,
            name: result.productName,
            cost: result.price,
            discount: result.discount,
            category: result.category,
            quantity:result.quantity,
            description:result.description,
            seller: result.seller,
        })
    } catch (error) {
        
    }
}

module.exports = {
    productAdd
};
