const express = require('express')
const app = express();

const { createTodo, updateTodo } = require('./input_zod')  // Zod input schemas
const { Todos } = require('./database')  // 'Todos' database collection

const cors = require('cors')
app.use(cors());

app.use(express.json());

// body {
//     title: string;
//     description: string;
// }
app.post('/create',async function(req, res){

    const createPayload = req.body

    const parsePayload = createTodo.safeParse(createPayload);

    if(!parsePayload.success){
        res.status(411).json({
            msg: "Enter valid input."
        })
    }
    else{
        const todo = await Todos.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false
        })
        res.json({
            msg: "Todo created.",
            todo
        })
    }
})


app.get('/todos',async function(req, res){
    const todos =await Todos.find({})

    res.json({
        todos
    })
})


app.post('/completed', async function(req, res){
    const createPayload = req.body;

    const parsePayload = updateTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg:"Enter valid id."
        })
    }
    else{
        const completeTodo = await Todos.updateOne({_id: createPayload.id}, {completed: true})

        res.json({
            msg: "Updated as completed.",
            completeTodo
        })
    }
})

app.listen(3000, function(){
    console.log("Listening to 3000 port.");
})