const express = require('express');
const zod = require('zod')
const app = express();
app.use(express.json());

const schema = zod.array(zod.number()); // a schema that tells how or what the input should look like, or what it's type is.
// here, the input has to be an Array of Numbers.

app.post('/', function(req, res){
    const kidneys = req.body.kidneys;
    const userResponse = schema.safeParse(kidneys);
    if(!userResponse.success){
        res.status(411).json({msg: "Invalid input."})
    }
    else{
        res.send({
            userResponse
        })
    }
})

app.listen(3000, function(){
    console.log("Listening to 3000.");
})