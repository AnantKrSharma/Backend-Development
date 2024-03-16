const express = require('express')

const app = express();

// const bodyParser = require('body-parser')
// app.use(bodyParser.json()); // middleware

app.use(express.json());

const Users = [
{
    name:"Anant",
    kidneys: [
     {
       healthy: false
     },
     {
        healthy: true
     },
     {
        healthy: true
     }
        ]   
}
];

app.get('/', function(req,res){
    // no. of kidneys, how many healthy and how many unhealthy
    const UserKidneys = Users[0].kidneys;
    const KidneyNo = UserKidneys.length;
    let HealthyKidneyNo = 0;
    
    for(let i=0; i<KidneyNo; i++){
        if(UserKidneys[i].healthy){
            HealthyKidneyNo++;
        }
    }
    // HealthyKidneyNo = UserKidneys.filter( (item) => item.healthy).length;
    const UnhealthyKidneyNo = KidneyNo - HealthyKidneyNo;

    res.json({
        KidneyNo,
        HealthyKidneyNo,
        UnhealthyKidneyNo
    })
})


// we send the data in body when in post method.
app.post('/', function(req,res){
    let kidneyHealth = req.body.kidneyHealth;
    Users[0].kidneys.push({
        "healthy": kidneyHealth
    }) 

    res.send("Post done.")
})


//it converts all the unhealthy kidneys to healthy kidneys.
app.put('/', function(req,res){
    for(let i=0; i<Users[0].kidneys.length; i++){
        Users[0].kidneys[i].healthy = true;
    }

    res.send("Put done.")
})


function isThereOneUnhealthy(kidneyArray){
    let unhealthy = false;

    for(let i=0; i<kidneyArray.length; i++){
        if(!kidneyArray[i].healthy){
            unhealthy =  true;
        }
    }
    return unhealthy;
}

// removing all the unhealthy kidneys.
app.delete('/', function(req,res){

    // only if there is a bad kidney present, then do this.

    if(isThereOneUnhealthy(Users[0].kidneys)){
    const healthyKidneysArr = [];
    for(let i=0; i<Users[0].kidneys.length; i++){
        if(Users[0].kidneys[i].healthy){
            healthyKidneysArr.push(Users[0].kidneys[i])
        }
    }
    res.send(healthyKidneysArr);
   }  
   
   else{
    res.status(411).json({
        msg: "You have no unhealthy kidneys."
    })
   }
   
})


app.listen(3010, function(){
    console.log("Listening to 3010");
})