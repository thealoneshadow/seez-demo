const productDataValidator = {}
const Product = require("../../models/product");
const data1 = require("../products");
productDataValidator.productData = () => { return new Promise(async (resolve, reject) => {

    // for(let i=0;i<data1.length;i++){
    //     const newProduct= new Product({ 
    //         brand: data1[i].brand,
    //         model: data1[i].model,
    //         description: data1[i].description,
    //         dealership: data1[i].dealership,
    //         price: data1[i].price,
    //         images: data1[i].images
    //     });
    //     await newProduct.save();
    // }
    //await Product.deleteMany({});

    const data = await Product.find().lean();
    if (data) {
        resolve(data);   
    } else {
        reject("No Products");
    }

 }) 
}

module.exports = productDataValidator;
