const express = require('express');
const z = require('zod')
const app = express();
app.use(express.json());

/*   This is how the input should look like: 
   
{
    email: string => email
    password: atleast 8 letters
    country: "IN" or "US"
    familyAge: [36, 13, 34]
}                                          

*/

const schema = z.object({
    email : z.string(),
    password: z.string().min(8),
    country: z.literal("IN").or(z.literal("US")),
    familyAge: z.array(z.number())
})

// const validateSchema = schema.safeParse({
//     email: "anantkrsharma.work@gmail.com",
//     password: "baraca69420",
//     country: "IN",
//     familyAge: [21, 47, 45]
// })

app.post('/', function(req, res){
    const userData = req.body.userData;
    console.log(userData);

    const validateData = schema.safeParse(userData);
    res.send(validateData);
})

app.listen(3000, function(){
    console.log("Listening to 3000.");
})