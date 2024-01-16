const productDataValidator = {}
const Product = require("../../models/product");

productDataValidator.productData = () => { return new Promise(async (resolve, reject) => {

    const data = await Product.find();
    if (data) {
        resolve(data);   
    } else {
        reject("No Products");
    }

 }) 
}

module.exports = productDataValidator;
