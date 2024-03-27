const express = require("express")

const app = express();

function calculateSum(n){
    let sum = 0;
    for(let i=0; i<=n; i++){
        sum+=i;
    }
    return sum;
}

app.get('/', function(req, res){
    let n = req.query.n;       // query parameter
    const ans = calculateSum(n)
    res.send(ans.toString());
})

app.listen(3000, function(){
    console.log("Listening to 3000 bro..");
});