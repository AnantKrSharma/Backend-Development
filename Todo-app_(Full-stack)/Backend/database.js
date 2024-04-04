const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:12348765@cluster0.vjcfw4z.mongodb.net/Todo-App')

/*
Todo{
    title: String,
    description: String,
    completed: Boolean
    }
*/
const todoSchema = new mongoose.Schema({
    title: String,
    description: String, 
    completed: Boolean
})

const Todos = mongoose.model("Todos", todoSchema);

module.exports = {
    Todos
}
