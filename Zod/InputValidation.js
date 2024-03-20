const express = require('express')
const app = express();

app.use(express.json())

app.post('/kidney-checkup', function(req, res){
    const kidneys = req.body.kidneys;
    // console.log(req.body);
    const kidneyLength = kidneys.length;

    res.send(`Your kidney length is ${kidneyLength}`);
})

// Global Catches -- Another middleware which executes whenever there is an exception or an error in any routes present above it.
app.use(function(err, req, res, next){
    res.json("Sorry, we have a problem in our server.")
})

app.listen(3000, function(){
    console.log("Listening to 3000");
});