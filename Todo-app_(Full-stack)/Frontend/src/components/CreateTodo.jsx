import { useState } from 'react';

export function CreateTodo(){
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")

    return <div>

        <input style={{padding:7, marginBottom:7, borderRadius:5}} type="text" placeholder="title"
         onChange={(e)=>{
            setTitle(e.target.value)
         }}/> <br />
        
        <input style={{padding:7, marginBottom:7, borderRadius:5}} type="text" placeholder="description"
        onChange={(e)=>{
            setDescription(e.target.value)
        }}/> <br />
        
        <button onClick={()=>{
            fetch('http://localhost:3000/create',{
                method: "POST",
                body: JSON.stringify({
                    title: title,
                    description: description
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(async (response)=>{
                const json = await response.json();
                alert("Todo added.")
            })
        }}>Add a todo.</button>
    
    </div>
}
