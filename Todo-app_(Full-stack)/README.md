# Todo App

This project contains a simple TODO application.
It has the following features-

- A user can create a todo.
- A user can see their existing todos.
- A user can mark a todo as done.


## Backend: 

1. Express route handlers.
2. Zod for input validation.
3. MongoDB as the database. 
4. Mongoose libarary for MongoDB implementation.
5. Github as the place to push the code.

## Frontend: 

1. A main App.jsx file which renders two components.
2. CreateTodo.jsx - this component takes the user input, and creates a Todo and sends the request to the backend, ultimately storing it in the database.
3. Todos.jsx - this component renders all the todos that are present in the database.