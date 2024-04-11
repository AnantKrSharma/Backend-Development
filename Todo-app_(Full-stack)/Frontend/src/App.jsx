import { useState } from 'react'
import { CreateTodo } from './components/CreateTodo'
import { Todo } from './components/Todos'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

  // getting todos from the backend.
  fetch('http://localhost:3000/todos').then(async (response)=>{
    const json = await response.json();
    setTodos(json.todos);
  })
  
  return (
    <div>

    <CreateTodo></CreateTodo>
    
    <Todo todoArr={todos}></Todo>
    
    </div>
  )
}

export default App
