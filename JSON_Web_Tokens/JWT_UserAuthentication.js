const express = require('express')

const jwt = require('jsonwebtoken')
const jwtPassword = "1234abc"

const app = express();
app.use(express.json());

// Memory database :
const ALLusers = [{
    username: "anant@gmail.com",
    password:"123",
    name:"Anant Kr Sharma"
},

{
    username: "naman@gmail.com",
    password:"456",
    name: "Naman Jain"
},

{
    username: "akshit@gmail.com",
    password: "789",
    name: "Akshit Kumar"
}]


function userExists(username, password){
    // checking if the user exists in the array or not.
    let exists = false;
    for(let i=0; i<ALLusers.length; i++){
        if(ALLusers[i].username===username && ALLusers[i].password===password){
            exists = true;
        }
    }
    return exists;
}


app.post('/signin', function(req, res){

    const username = req.body.username;
    const password = req.body.password;

    if(!userExists(username, password)){
        return res.status(403).json({
            msg: "User doesn't exist in our memory database."
        })
    }
    
    // creating a JSON Web Token.
    var token = jwt.sign({username: username}, jwtPassword)

    res.json({
        token
    });
})

app.get('/users', function(req, res){
    const token = req.headers.authorization;
    try{
        //Verifying a JSON Web Token for authorization.
        const decoded = jwt.verify(token, jwtPassword);
        // console.log(decoded);
        const username = decoded.username;

        // return a list of users other than this username !!
        const otherUsername = ALLusers.filter((item) => item.username!=username)

        res.json({otherUsername})
    }
    catch{
        res.status(403).json({msg: "Invalid token."})
    }
})

app.listen(3000, function(){
    console.log("Litening to 3000.");
})
