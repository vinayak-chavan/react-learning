
import React,{useEffect, useState} from "react";

function Getapi() {
  const[data,setdata]=useState([])
  
  useEffect(()=>{
    fetch("api/user",{
      method:'GET',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
  }).then((result)=>{
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
        <thead>
          <tr>
          <td>ID</td>
          <td>FirstNAME</td>
          <td>Last_Name</td>
          </tr>
        </thead>
        <tbody>
         {
          data.map((item)=>
          <tr>
          <td>{item.user_id}</td>
          <td>{item.first_name}</td>
          <td>{item.last_name}</td>  
        </tr>
          )
        }
      </tbody>  
    </table>
    </div>
  );
}

export default Getapi;





