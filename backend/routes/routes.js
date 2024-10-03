const router = require('express').Router();

const {
    registerCustomer, loginCustomer,
} = require('../controllers/CustomerController');

const {
    registerSeller, loginSeller,
} = require("../controllers/SellerController");

const {
    productAdd,getPerticularProduct,getProduct,getSearchesProduct,getSearchedProduct
} = require("../controllers/ProductController");

const {
    getProductSeller,
}=require("../controllers/ProductOfSingleSeller")


//customer
router.post('/registerCustomer', registerCustomer);
router.post('/loginCustomer', loginCustomer);

//seller
router.post('/registerSeller', registerSeller);
router.post('/loginSeller', loginSeller);

//product
router.post('/productAdd', productAdd);
router.get('/getPerticularProduct',getPerticularProduct),
router.get('/getProduct',getProduct),
router.get('/getSearchesProduct',getSearchesProduct),
router.get('/getSearchedProduct',getSearchedProduct)

router.get('/getproduct/:id',getProductSeller);





module.exports = router;
