const userLoginValidator = require('./userLoginValidator');

const userLoginController = async (req, res) => {

    //for validations and data checking
    userLoginValidator.userLogin(req.body).then((data) => {
            res.status(200).json({
                success: true,
                isAuth: true,
                message: "Login Successfully",
                result: [data]
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

module.exports = userLoginController;