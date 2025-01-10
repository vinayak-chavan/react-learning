import { useState } from "react";

function Postapi(){
    
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[gender,setGender]=useState("");
    const[status,setStatus]=useState("");
   
    

    function saveuser(){
        console.warn({name,email,gender,status})
        let data={name,email,gender,status}
        fetch("https://gorest.co.in/public/v2/users",{
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
                <input type="text" placeholder="Name" name="name" value={name} onChange={(e)=>setName(e.target.value)}/><br/><br/>
                <input type="text" placeholder="Email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/><br/><br/>
                <input type="text" placeholder="Gender" name="gender" value={gender} onChange={(e)=>setGender(e.target.value)}/><br/><br/>
                <input type="text" placeholder="Status" name="status" value={status} onChange={(e)=>setStatus(e.target.value)}/><br/><br/>
               
                 <button type="submit" onClick={saveuser}>SUBMIT</button>
        </div>
    )
}
export default Postapi;