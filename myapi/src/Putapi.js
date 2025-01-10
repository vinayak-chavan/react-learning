
import React,{useEffect, useState} from "react";

function Putapi() {
  const[data,setdata]=useState([])

    const[first_name,setFirstname]=useState("");
    const[last_name,setLastname]=useState("");
    const[city,setCity]=useState("");
    const[phone_no,setPhone]=useState("");
    const[email_id,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const[user_id,setUserid]=useState(null);

  useEffect(()=>{
    fetch("/api/user/").then((result)=>{
    result.json().then((resp)=>{
      setdata(resp)
    })
  })
  },[])
  
  function selectUser(user_id){
    let item=data[user_id-5]

    setFirstname(item.first_name)
    setLastname(item.last_name)
    setCity(item.city)
    setPhone(item.phone_no)
    setEmail(item.email_id)
    setPassword(item.password)
    setUserid(item.user_id)
  }

  function updateUser(){
    console.log(first_name,last_name,city,phone_no,email_id,password,user_id)
    let data={first_name,last_name,city,phone_no,email_id,password,user_id}
        fetch(`/api/user/${user_id}`,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            console.warn(result)
        })
  }
  
  return (
    <div>
    <h1>PUT Method in API</h1>
    <table border="1">
        <tr>
          <td>ID</td>
          <td>First_name</td>
          <td>Last_name</td>
          <td>City</td>
          <td>Phone-no</td>
          <td>Email-id</td>
          <td>Password</td>
          <td>Operation</td>
        </tr>
         {
          data.map((item)=>
          <tr>
          <td>{item.user_id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td>{item.city}</td>
          <td>{item.phone_no}</td>
          <td>{item.email_id}</td>
          <td>{item.password}</td>
          <td><button onClick={()=>selectUser(item.user_id)}>Update</button></td>
         </tr>
          )
        }
        
    </table>
    <div>
                 <br/><input type="text" placeholder="FirstName" value={first_name} onChange={(e)=>setFirstname(e.target.value)} /><br/><br/>
                 <input type="text" placeholder="LastName"  value={last_name} onChange={(e)=>setLastname(e.target.value)} /><br/><br/>
                 <input type="text" placeholder="city" value={city} onChange={(e)=>setCity(e.target.value)} /><br/><br/>
                 <input type="text" placeholder="phone-no" value={phone_no} onChange={(e)=>setPhone(e.target.value)} /><br/><br/>
                 <input type="text" placeholder="email-id" value={email_id} onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
                 <input type="text" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} /><br/><br/>
            
                 <button type="submit" onClick={updateUser}>UpadateUser</button>
                 
    </div>
    </div>

  );
}

export default Putapi;

