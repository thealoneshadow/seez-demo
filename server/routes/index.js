const express = require("express");
const router = express.Router()

const userSignUpController = require('../controllers/userSignUp/userSignUpController');
const userLoginController = require('../controllers/userLogin/userLoginController');
const productData = require("../controllers/productData/productDataController");

router.post("/signup",userSignUpController);
router.post("/login",userLoginController);
router.get("/productData",productData);

module.exports = router;