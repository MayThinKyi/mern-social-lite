import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Post from '../components/home/Post';

const UserPosts = () => {
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
        <h1 className='my-5 text-center text-2xl font-semibold'>Name: {postsByUser &&postsByUser[0]?.User?.name}</h1>
      {postsByUser?.map(post=>{
        return <Post key={post?.id} post={post} />
      })}
    </div>
  )
}

export default UserPosts
