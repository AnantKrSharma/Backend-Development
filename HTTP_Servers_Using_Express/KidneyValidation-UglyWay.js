/* This is the ugly way of authentication and checking the user input, 
   i.e without using middlewares.*/

const express = require('express')
const app = express();

app.get('/health-checkup', function(req,res){
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyID = req.query.kidneyID;

    if(username != "Harkirat" || password !=  "pass"){  // Authentication
        res.status(400).json({
            msg: "Enter correct input."
        })
        return;
    }
    if(kidneyID != 1 && kidneyID != 2){  // Input checking
        res.status(400).json({
            msg: "Enter valid no. of kidneys."
        })
        return;
    }
    //do something with kidneys after checks.
    res.json({
        msg: "Your kidney is fine."
    })
});

app.listen(3000, function(){
    console.log("Listening to 3000.");
})