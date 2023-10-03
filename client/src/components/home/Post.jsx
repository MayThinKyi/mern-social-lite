import React, { useContext, useEffect, useState } from 'react'
import moment from "moment";
import {MdDelete} from 'react-icons/md'
import {AiFillInfoCircle} from 'react-icons/ai'
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import DeleteBtn from '../post/DeleteBtn';
import EditBtn from '../post/EditBtn';
import ToggleLikeBtn from '../post/ToggleLikeBtn';
const Post = ({post}) => {
    const {auth,userLikedPostIds,setUserLikedPostIds}=useContext(AuthContext);
    const [likesLengthByPostId,setLikeLengthByPostId]=useState(null);
    useEffect(()=>{
      setLikeLengthByPostId(post?.Likes?.length)
    },[post])
  return (
    <div className='bg-[#F1F5F9] mx-auto rounded-2xl mb-5 p-6 cursor-pointer w-[400px]'>
        <div className='flex items-center justify-between'>
        <h1>      {post?.title} </h1>
        <div className='flex items-center gap-1'>
       {!window.location.pathname.includes('/posts/')  &&  <Link to={`/posts/${post?.id}`} className='font-[500] py-[7px] px-4 rounded-2xl bg-blue-600 hover:bg-blue-800 text-white'>
          <AiFillInfoCircle size={17}/>
          </Link>}
        <EditBtn post={post} />
        </div>
        </div>
        <h1>      {post?.text} </h1>
        <Link to={`/users/${post?.UserId}`} className='font-semibold text-zinc-800 hover:underline'>      {post?.User?.name} </Link>
        <div className='flex items-center '>
        <p className='text-[15px]'>Likes : {likesLengthByPostId}</p>
        {!window.location.pathname.includes('/users/')  && 
        <ToggleLikeBtn postId={post?.id} likesLengthByPostId={likesLengthByPostId} setLikeLengthByPostId={setLikeLengthByPostId}  />
  }</div>
       <div className='flex items-center justify-between'>
       <h1 className='text-[14px]'>    { moment(post?.createdAt).format('LLL') } </h1>
        <DeleteBtn post={post} />
       </div>
    </div>
  )
}

export default Post
