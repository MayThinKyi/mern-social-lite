import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'

const ToggleLikeBtn = ({likesLengthByPostId,setLikeLengthByPostId,postId}) => {
  const {auth,userLikedPostIds,setUserLikedPostIds}=useContext(AuthContext)

 const toggleLikeBtnHandler=()=>{
    axios.post('http://localhost:8000/likes/',{
      postId,userId:auth?.id
    },{
      headers:{
        token:JSON.parse(localStorage.getItem('mern-social-user'))?.token
      }
    })
    .then((res)=>{
        console.log(res.data)
        if(res.data.status==='like') {
          setUserLikedPostIds([...userLikedPostIds,postId])
         setLikeLengthByPostId(likesLengthByPostId+1)
        }
        else  {
          setUserLikedPostIds(userLikedPostIds?.filter(id=>id!=postId))
          setLikeLengthByPostId(likesLengthByPostId-1)
        }
    })
    .catch(err=>console.log(err))
 }
 useEffect(()=>{
  console.log('userLikedPostIds',userLikedPostIds)
 },[])
  return (<>{auth &&
    <div onClick={toggleLikeBtnHandler} className='ml-10 text-[14px] font-semibold text-white bg-blue-600 hover:bg-blue-800 py-[5px] px-5 rounded-2xl'>
     {userLikedPostIds?.includes(postId) ? 'Unlike' :'Like'}
    </div>}
    </>
  )
}

export default ToggleLikeBtn
