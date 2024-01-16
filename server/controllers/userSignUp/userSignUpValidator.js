const userSignUpValidator = {}
const User = require("../../models/user");
const jwt = require('jsonwebtoken');

userSignUpValidator.userSignUp = (body) => { return new Promise(async (resolve, reject) => {

    // check for valid email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(body.email == undefined || body.userName == undefined || body.password == undefined) {
        reject("Invalid Data");
    }
    // check for valid Email
    if(!emailRegex.test(body.email)){
        return reject('Invalid email added')
    }

    // Checking valid Data
    if (Object.keys(body).length === 3 && (body['email'] &&typeof body.email === 'string' && body.email) &&
    (body['userName'] &&typeof body.userName === 'string' && body.userName && (body.userName.length >2 && body.userName.length <13))) {

    let user = await User.findOne({email:body.email,userName:body.userName});
    let result;
    const secretKey = 'my-secret';
    const expiresIn = '1d';

    // if user doees not exist
    if (!user) {
        const newUser= new User({ 
            userName: body.userName,
            email: body.email,
            password: body.password
        });
        await newUser.save();
        result = newUser;

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
        reject("Invalid User/User already exist. Please Try Again with Valid Data");
    }

   } else{
    reject("Invalid/Extra Params");
   }
 }) 
}

module.exports = userSignUpValidator;
