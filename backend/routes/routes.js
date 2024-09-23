const router = require('express').Router();

const{
    registerCustomer,loginCustomer,
}=require('../controllers/CustomerController');

const{
    registerSeller,loginSeller,
}=require("../controllers/SellerController");

//customer
router.post('/registerCustomer',registerCustomer);
router.post('/loginCustomer',loginCustomer);

//seller
router.post('/registerSeller',registerSeller);
router.post('/loginSeller',loginSeller);


module.exports=router;