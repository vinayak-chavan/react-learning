import { useState } from "react";

function Postapi1(){
    
    const[title,settitle]=useState("")
    const[completed,setbody]=useState("")
   

    function saveuser(){
        console.warn({title,completed})
        let data={title,completed}
        fetch("https://jsonplaceholder.typicode.com/todos",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            console.warn(result)
        })
    }

    return( 
        <div className="Postapi">
             <h1>Post method in API</h1>
                <input type="text" placeholder="title" name="title" value={title} onChange={(e)=>settitle(e.target.value)}/><br/><br/>
                <input type="text" placeholder="completed" name="completed" value={completed} onChange={(e)=>setbody(e.target.value)}/><br/><br/>
                 <button type="submit" onClick={saveuser}>SUBMIT</button>
        </div>
    )
}
export default Postapi1;