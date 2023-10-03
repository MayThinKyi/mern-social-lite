import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from '../components/home/Post';
import { AuthContext } from '../contexts/AuthProvider';
import UserProfile from '../components/user/UserProfile';

const UserPosts = () => {
  const {auth}=useContext(AuthContext)
    const {userId}=useParams();
    const [postsByUser,setPostsByUser]=useState(null);
    useEffect(()=>{
        axios.get(`http://localhost:8000/users/${userId}`)
        .then((res)=>{
            console.log(res.data)
            setPostsByUser(res.data)
        })
        .catch(err=>console.log(err))
    },[])
  return (
    <div className='py-10'>
      {auth?.id==userId && <UserProfile/> }
      {postsByUser?.length>0  ? <h1 className='my-5 text-2xl font-semibold text-center'>Name: {postsByUser && postsByUser[0]?.User?.name}</h1>
      : <h1 className='text-2xl font-semibold text-center'>No Posts...</h1> }{postsByUser?.map(post=>{
        return <Post key={post?.id} post={post} />
      })}
    </div>
  )
}

export default UserPosts
