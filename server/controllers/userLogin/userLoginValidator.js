const userLoginValidator = {}
const User = require("../../models/user");
const jwt = require('jsonwebtoken');

userLoginValidator.userLogin = (body) => { return new Promise(async (resolve, reject) => {

    // check for valid email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(body.email == undefined || body.password == undefined) {
        reject("Invalid Data");
    }
    // check for valid Email
    if(!emailRegex.test(body.email)){
        return reject('Invalid email added');
    }

    // Checking valid Data
    if (Object.keys(body).length === 2 && (body['email'] && typeof body.email === 'string' && body.email) && typeof body.password == "string" ) {

    let user = await User.findOne({email:body.email,password: body.password});
    let result;
    const secretKey = 'my-secret';
    const expiresIn = '1d';

    // if user doees not exist
    if (user) {
        result = user;

        // Generating token
        const payload = {  email: result.email, userName: result.userName };
        const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });

        // Final Result
        const data = {  userName:result.userName, 
            email:result.email,     
            token:{ accessToken:token,  expiry:expiresIn }
        };
    
        resolve(data);   
    } else {
        reject("Invalid User/User does not exist. Please Try Again with Valid Data");
    }

   } else{
    reject("Invalid/Extra Params");
   }
 }) 
}

module.exports = userLoginValidator;
