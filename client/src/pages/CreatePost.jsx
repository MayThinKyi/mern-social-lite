import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { AuthContext } from '../contexts/AuthProvider';

const CreatePost = () => {
    const {auth}=useContext(AuthContext)
    const navigate=useNavigate();
    const schema = yup.object().shape({
        title: yup.string().required(),
        text: yup.string().required(),
      });
      const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmitHandler = (data) => {
        axios.post('http://localhost:8000/posts',{
            ...data,UserId:auth?.id
        },{
          headers:{
            token:JSON.parse(localStorage.getItem('mern-social-user'))?.token
          }
        })
        .then(res=>{
            console.log(res)
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
    <h1 className='mb-10 text-3xl font-semibold'>Create Post</h1>
    <form onSubmit={handleSubmit(onSubmitHandler)}>
    <div className='mb-3'>
      <input placeholder='Title' {...register("title")} className='bg-[#F1F5F9] py-[10px] px-5 rounded-lg  outline-[#2563EB]' />
      <small className='block text-red-500'>{errors.title?.message}</small>

    </div>
    <div  className='mb-3'>
      <textarea rows={5} cols={23} placeholder='Text' type='text' className='bg-[#F1F5F9] py-[10px]  px-5 rounded-lg  outline-[#2563EB]' {...register("text")} /> 
      <small className='block text-red-500'>{errors.text?.message}</small>
    </div>
    
   
    <button type='submit' className='py-2 px-8 mt-5 bg-blue-600 hover:bg-blue-800 rounded-3xl text-white text-md font-[500]'>Create Post</button>
    </form>

  </div>
  )
}

export default CreatePost
