import React, { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { AuthContext } from './../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
const ChangePassword = () => {
  const navigate=useNavigate();
  const {auth}=useContext(AuthContext);
  const [oldPassword,setOldPassword]=useState('');
  const [newPassword,setNewPassword]=useState('');
  const updatePasswordHandler=()=>{
    if(oldPassword && newPassword){
      axios.post('http://localhost:8000/users/updatePassword',{
      oldPassword,newPassword,userId:auth?.id
    },{
      headers:{
        token:JSON.parse(localStorage.getItem('mern-social-user'))?.token
      }
    })
    .then(res=>{
      toast.success(res.data.message)
      console.log(res.data)
      navigate('/')
    })
    .catch(err=>{
      console.log(err)
      toast.error(err.response.data.error)
    })
    }else toast.error('You must fill in all fields!')
    if(oldPassword.length<8 || newPassword.length<8){
      toast.error('Password must be at least 8 characters!')
    }
  }
  return (
    <div className='flex flex-col items-center py-10'>
       <h1 className='mb-10 text-3xl font-semibold'>Change Password</h1>

      <div  className='mb-3'>
      <input placeholder='Old Password' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} type='password' className='bg-[#F1F5F9] py-[10px] px-5 rounded-lg  outline-[#2563EB]' />
      </div>
      
      <div  className='mb-3'>
        <input placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}  type='password' className='bg-[#F1F5F9] py-[10px] px-5 rounded-lg  outline-[#2563EB]' />

      </div>
      <button onClick={updatePasswordHandler} className='py-2 px-8 mt-5 bg-blue-600 hover:bg-blue-800 rounded-3xl text-white text-md font-[500]'>Update Password</button>
    </div>
  )
}

export default ChangePassword
