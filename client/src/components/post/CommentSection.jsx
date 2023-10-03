import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { AuthContext } from '../../contexts/AuthProvider';
import { MdDelete } from 'react-icons/md';
const CommentSection = ({postId}) => {
  const [comments,setComments]=useState(null);
  const {auth}=useContext(AuthContext)
    const schema = yup.object().shape({
        comment: yup.string().required(),
      });
      const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmitHandler = (data) => {
       axios.post('http://localhost:8000/comments/',{
            ...data,userId:auth?.id,postId
        },{
          headers:{
            token:JSON.parse(localStorage.getItem('mern-social-user'))?.token
          }
        })
        .then(res=>{
            console.log(res)
            reset()
           toast.success(res?.data?.message)
           let commentToAdd=res?.data?.comment;
           commentToAdd.User={name:auth?.name}
           setComments([...comments,commentToAdd])
        })
        .catch(err=>{
            console.log(err)
            toast.error(err.response.data.error)
    })}
    const deleteBtnHandler=(commentId)=>{
      axios.delete(`http://localhost:8000/comments/${commentId}`,{
        headers:{
          token:JSON.parse(localStorage.getItem('mern-social-user'))?.token
        }
      })
      .then(res=>{
          console.log(res)
          toast.success(res.data.message)
          setComments(comments?.filter(c=>c.id!==commentId))

      })
      .catch(err=>{
          console.log(err)
          toast.error(err.response.data.error)
    })}
    useEffect(()=>{
      axios.get(`http://localhost:8000/comments/${postId}`)
        .then(res=>{
           setComments(res.data.comments)
           
        })
        .catch(err=>{
            console.log(err)
    })
    },[postId])
  return (
    <div className=' mx-auto lg:mx-0'>
      <form onSubmit={handleSubmit(onSubmitHandler)} className='flex flex-col items-end'>
        <div  className='mb-3'>
      <textarea  rows={3} cols={40} placeholder='Comment' type='text' className='bg-[#F1F5F9] py-[10px]  px-5 rounded-lg  outline-[#2563EB]' {...register("comment")} /> 
      <small className='block text-red-500'>{errors.comment?.message}</small>
    </div>
    <button type='submit' className='py-2 px-8  bg-blue-600 hover:bg-blue-800 rounded-3xl text-white  text-sm font-[500]'>Comment</button>
      </form>
      <div>
        {comments?.map((comment)=>{
          return <div className='my-5 bg-[#F1F5F9] py-3 px-4 rounded-xl cursor-pointer' key={comment?.id}>
            <p>{comment?.comment}</p>
            <div className='flex items-center justify-between'>
            <p className='text-[14px] font-semibold'>{comment?.User?.name}</p>
            {auth?.id==comment?.UserId &&

            <button  onClick={()=>deleteBtnHandler(comment?.id)} className='flex items-center px-2 py-1 text-white bg-red-600 hover:bg-red-800 rounded-2xl'>
            <MdDelete size={12} />
            <small >Delete</small>
            </button>}
            </div>
          </div>
        })}
      </div>


    </div>
  )
}

export default CommentSection
