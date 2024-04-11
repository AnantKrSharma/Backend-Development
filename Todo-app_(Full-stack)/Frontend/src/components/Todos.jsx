
export function Todo({todoArr}){
    return <div>
        {
            todoArr.map((item)=>{
                return <div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    <button onClick={(e)=>{
                        e.target.innerHTML = "Completed"
                    }}>{item.completed == true ? "Completed": "Mark as done"}</button>
                </div>
            })
        }
    </div>
}
