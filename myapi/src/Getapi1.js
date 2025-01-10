
import React,{useEffect, useState} from "react";

function Getapi1() {
  const[data,setdata]=useState([])
  useEffect(()=>{
    fetch("https://gorest.co.in/public/v2/users").then((result)=>{
    result.json().then((resp)=>{
      setdata(resp)
    })
  })
  },[])
  console.warn(data)
  return (
    <div>
    <h1>Get API Call </h1>
    <table border="1">
        <tr>
          <td>ID</td>
          <td>NAME</td>
          <td>EMAIL</td>
          <td>GENDER</td>
          <td>STATUS</td>
        </tr>
         {
          data.map((item)=>
          <tr>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.email}</td>
          <td>{item.gender}</td>
          <td>{item.status}</td>
          
        </tr>
          )
        }
        
    </table>
    </div>

  );
}

export default Getapi1;





