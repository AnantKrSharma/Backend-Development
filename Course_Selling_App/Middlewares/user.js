const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config')

function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    try{
        const token = req.headers.authorization;
        const wordsArr = token.split(" "); // array -> ["bearer", "<token>"]
        const UserJwtToken = wordsArr[1];
    
        const verified = jwt.verify(UserJwtToken, jwtSecret)
        if(verified.username){
            req.username = verified.username;
            next(); 
        }
        else{
            res.status(403).json({
                msg: "You are not authenticated."
            })
        }
    }
    catch{
        res.status(403).json({
            msg:"Error occured"
        })
    }

}

module.exports = userMiddleware;