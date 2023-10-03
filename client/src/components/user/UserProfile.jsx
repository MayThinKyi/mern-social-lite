import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const navigate=useNavigate();
    const {auth}=useContext(AuthContext);
    const [user,setUser]=useState(null);
    const [isEdit,setIsEdit]=useState(false);
    const userFormHandler=(e)=>{
        setUser({...user,[e.target.id]:e.target.value})
    }
    const updateProfileHandler=()=>{
        setIsEdit(!isEdit);
        axios.post(`http://localhost:8000/users/profile/${auth?.id}`,user,{
          headers:{
            token:JSON.parse(localStorage.getItem('mern-social-user'))?.token
          }
        })
        .then((res)=>{
            console.log(res.data)
            toast.success(res.data.message)
            navigate('/')

        })
        .catch(err=>console.log(err))
    }
    useEffect(()=>{
        axios.get(`http://localhost:8000/users/profile/${auth?.id}`,{
          headers:{
            token:JSON.parse(localStorage.getItem('mern-social-user'))?.token
          }
        })
        .then((res)=>{
            setUser(res.data.user)
        })
        .catch(err=>console.log(err))
    },[auth?.id])
  return (
    <div className='flex flex-col items-center mb-20'>
      <h1 className='mb-8 text-2xl font-semibold'>User Profile</h1>
      < >
      <div className='mb-3'>
        <input placeholder='Name' id='name' disabled={!isEdit} value={user?.name} onChange={userFormHandler} className='bg-[#F1F5F9] py-[10px] px-5 rounded-lg  outline-[#2563EB]'  />

      </div>
      <div  className='mb-3'>
        <input placeholder='Email' id='email' disabled={!isEdit}  type='email' value={user?.email} onChange={userFormHandler}   className='bg-[#F1F5F9] py-[10px] px-5 rounded-lg  outline-[#2563EB]'  />
      </div>
      {isEdit ?  <button  onClick={updateProfileHandler} type='submit' className='py-2 px-8 mt-5 bg-blue-600 hover:bg-blue-800 rounded-3xl text-white text-md font-[500]'>Update Profile</button>
      :  <button  onClick={()=>setIsEdit(!isEdit)} type='submit' className='py-2 px-8 mt-5 bg-blue-600 hover:bg-blue-800 rounded-3xl text-white text-md font-[500]'>Edit Profile</button>
      }
      <Link to={'/change-password'} className='mt-4 text-blue-600 hover:underline'>Change Password</Link>

      </>
    </div>
  )
}

export default UserProfile
