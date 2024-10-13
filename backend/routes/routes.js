const router = require('express').Router();

const {
    registerCustomer, loginCustomer,
} = require('../controllers/CustomerController');

const {
    registerSeller, loginSeller,
} = require("../controllers/SellerController");

const {
    productAdd,getPerticularProduct,getProduct,getSearchesProduct,getSearchedProduct,saveToCart,
} = require("../controllers/ProductController");

const getProductOfSeller =require("../controllers/ProductOfSingleSeller");


//customer
router.post('/registerCustomer', registerCustomer);
router.post('/loginCustomer', loginCustomer);

//seller
router.post('/registerSeller', registerSeller);
router.post('/loginSeller', loginSeller);

//product
router.post('/productAdd', productAdd);
router.get('/getPerticularProduct/:id',getPerticularProduct),
router.get('/getProduct',getProduct),
router.get('/getSearchesProduct',getSearchesProduct),
router.get('/getSearchedProduct',getSearchedProduct),
router.post('/saveToCart',saveToCart),

router.get('/getproducts/:id',getProductOfSeller);





module.exports = router;
