import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from './UserReducer';
import { useDispatch, useSelector } from 'react-redux';

function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addUser({id: users[users.length-1].id + 1, name, email, phone}));
    navigate('/');
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadon px-5 pt-3 pb-5 rounded'>
        <h1>Add a User</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" className='form-control' placeholder='Enter Name' onChange={e=> setName(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className='form-control' placeholder='Enter Email' onChange={e=> setEmail(e.target.value)}/>
          </div>
          <div className='mb-2'>
            <label htmlFor="phone">Phone:</label>
            <input type="text" name="phone" className='form-control' placeholder='Enter Phone' onChange={e=> setPhone(e.target.value)}/>
          </div>
          <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Create;
