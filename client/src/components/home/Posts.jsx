import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Post from './Post';
import { AuthContext } from '../../contexts/AuthProvider';
const Posts = () => {
  const {auth,setUserLikedPostIds}=useContext(AuthContext)
    const [posts,setPosts]=useState(null);
    useEffect(()=>{
       const fetchPosts=()=>{
        axios.get('http://localhost:8000/posts/')
        .then((res)=>{
            console.log(res.data)
            setPosts(res.data)
        })
        .catch(err=>console.log(err))
       }
       const fetchUserLikedPostIds=()=>{
        axios.get(`http://localhost:8000/likes/${auth?.id}`)
        .then((res)=>{
            console.log('User liked PostIds',res.data)
            let likedPostIdsArray=[];
            res.data?.map(l=>likedPostIdsArray.push(l?.PostId))
            setUserLikedPostIds(likedPostIdsArray)
        })
        .catch(err=>console.log(err))
       }
       fetchPosts()
       fetchUserLikedPostIds()
    },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-20'>
      {posts?.map((post)=>{
        return <Post key={post?.id} post={post} />
      })}
    </div>
  )
}

export default Posts
