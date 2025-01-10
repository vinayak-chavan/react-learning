import { useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './UserReducer';

function Update() {

  const {id} = useParams();

  const users =useSelector((state) => state.users);
  const existingUser =users.filter(f => f.id == id);
  const {name, email, phone} = existingUser[0];
  const [uname, setName] = useState(name);
  const [uemail, setEmail] = useState(email);
  const [uphone, setPhone] = useState(phone);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateUser({
      id: id,
      name: uname,
      email: uemail,
      phone: uphone
    }))
    navigate('/');
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
      <div className='w-50 border bg-white shadon px-5 pt-3 pb-5 rounded'>
        <h1>Update User</h1>
        <form onSubmit={handleUpdate}>
          <div className='mb-2'>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" className='form-control' placeholder='Enter Name' value={uname} onChange={e=> setName(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className='form-control' placeholder='Enter Email' value={uemail} onChange={e=> setEmail(e.target.value)} />
          </div>
          <div className='mb-2'>
            <label htmlFor="phone">Phone:</label>
            <input type="text" name="phone" className='form-control' placeholder='Enter Phone' value={uphone} onChange={e=> setPhone(e.target.value)}/>
          </div>
          <button className='btn btn-success'>Update</button>
          <Link to='/' className='btn btn-primary ms-3'>Back</Link>
        </form>
      </div>
    </div>
  )
}

export default Update;
