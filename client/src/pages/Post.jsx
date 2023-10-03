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
    <div className='flex flex-wrap justify-between py-10 lg:flex-nowrap'>
        <Post post={post}  />
        <CommentSection postId={post?.id} />
    </div>
  )
}

export default PostPage
