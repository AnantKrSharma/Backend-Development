const mongoose = require('mongoose')

mongoose.connect('<connection-string>')

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
