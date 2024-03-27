const express = require('express')

const app = express();

function addTwoNo(a,b){
    return a + b;
}

app.get("/", function(req,res){
    const a = req.query.a;
    const b = req.query.b;
    const ans = addTwoNo(a,b);
    res.send(ans.toString());
})

app.listen(3001, function(){
    console.log("Listening to 3001");
})