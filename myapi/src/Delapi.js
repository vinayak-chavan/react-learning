
import React,{useEffect, useState} from "react";

function Delapi() {
  const[data,setdata]=useState([])
  useEffect(()=>{
    fetch("/api/user/").then((result)=>{
    result.json().then((resp)=>{
      setdata(resp)
    })
  })
  },[])
  // console.warn(data)
  function deluser(user_id){
    fetch(`/api/user/${user_id}`,{
      method:'DELETE'
    }).then((result)=>{
      result.json().then((resp)=>{
        console.warn(resp)
      })

    })
  }

  return (
    <div>
    <h1>DELETE Method in API</h1>
    <table border="1">
        <tr>
          <td>ID</td>
          <td>First_name</td>
          <td>Last_name</td>
          <td>Operation</td>
        </tr>
         {
          data.map((item)=>
          <tr>
          <td>{item.user_id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>
          <td><button onClick={()=>deluser(item.user_id)}>DELETE</button></td>
        </tr>
          )
        }
        
    </table>
    </div>

  );
}

export default Delapi;

