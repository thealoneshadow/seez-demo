const productDataValidator = require('./productDataValidator');

const productDataController = async (req, res) => {

    //for validations and data checking
    productDataValidator.productData().then((data) => {
            res.status(200).json({
                success: true,
                isAuth: true,
                message: "Fetched Data Successfully",
                result: data
            })
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                isAuth: false,
                errorCode: 500,
                message: err,
                result: [],
              });
        })
}

module.exports = productDataController;