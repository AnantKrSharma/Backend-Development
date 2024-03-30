const jwt = require('jsonwebtoken')
const {jwtSecret} = require('../config')

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers (jwt) and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try{
        const token = req.headers.authorization;
        const wordsArr = token.split(" "); // array -> ["bearer", "<token>"]
        const AdminJwtToken = wordsArr[1];
    
        const verified = jwt.verify(AdminJwtToken, jwtSecret)
        if(verified.username){
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

module.exports = adminMiddleware;