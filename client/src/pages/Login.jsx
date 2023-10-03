import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../contexts/AuthProvider';
const Login = () => {
  const {setAuth}=useContext(AuthContext);
    const navigate=useNavigate();
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(32).required(),
      });
      const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmitHandler = (data) => {
        axios.post('http://localhost:8000/auth/login',data)
        .then(res=>{
            localStorage.setItem('mern-social-user',JSON.stringify({
              name:res?.data?.user?.name,
              id:res?.data?.user?.id,
              token:res?.data?.token
            }))
            setAuth({
              name:res?.data?.user?.name,
              id:res?.data?.user?.id,
              token:res?.data?.token
            })
            toast.success(res.data.message)
            navigate('/')

        })
        .catch(err=>{
            console.log(err)
            toast.error(err.response.data.error)
    })
      };
  return (
    <div className='flex flex-col items-center py-20'>
    <h1 className='mb-10 text-3xl font-semibold'>Login</h1>
    <form onSubmit={handleSubmit(onSubmitHandler)}>

        <div  className='mb-3'>
        <input placeholder='Email' type='email' {...register('email')} className='bg-[#F1F5F9] py-[10px] px-5 rounded-lg  outline-[#2563EB]' />
        <small className='block text-red-500'>{errors.email?.message}</small>
        </div>
        <div  className='mb-3'>
        <input placeholder='Password' type='password'  {...register('password')} className='bg-[#F1F5F9] py-[10px] px-5 rounded-lg  outline-[#2563EB]' />
        <small className='block text-red-500'>{errors.password?.message}</small>

        </div>
        <button className='py-2 px-8 mt-5 bg-blue-600 hover:bg-blue-800 rounded-3xl text-white text-md font-[500]'>Login</button>
    </form>
  </div>
  )
}

export default Login
