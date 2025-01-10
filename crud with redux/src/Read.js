import { useParams } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Read() {

  const {id} = useParams();

  const users =useSelector((state) => state.users);
  const existingUser =users.filter(f => f.id == id);
  const {name, email, phone} = existingUser[0];

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadow px-5 pt-3 pb-5 rounded'>
        <h3>Detail of User</h3>
        <div className='mb-2'>
          <strong>Name: {name}</strong>
        </div>
        <div className='mb-2'>
          <strong>Email: {email}</strong>
        </div>
        <div className='mb-2'>
          <strong>Phone: {phone}</strong>
        </div>
        <Link to={`/update/${id}`} className='btn btn-success'>Edit</Link>
        <Link to='/' className='btn btn-primary ms-3'>Back</Link>
      </div>
    </div>
  )
}

export default Read;
