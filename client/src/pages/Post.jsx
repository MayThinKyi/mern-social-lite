import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/home/Post'
import CommentSection from '../components/post/CommentSection';
const PostPage = () => {
    const {postId}=useParams();
    const [post,setPost]=useState(null);

    useEffect(()=>{
        axios.get(`http://localhost:8000/posts/${postId}`)
        .then((res)=>{
        console.log(res.data)
        setPost(res.data)})
        .catch(err=>console.log(err))
       
    },[])
  return (
    <div className='flex flex-wrap py-10 p-5 sm:px-10 lg:px-[100px] lg:flex-nowrap gap-x-10 lg:gap-x-28 '>
        <Post post={post}  />
        <CommentSection postId={post?.id} />
    </div>
  )
}

export default PostPage
