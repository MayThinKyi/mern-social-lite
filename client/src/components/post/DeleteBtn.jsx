import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const DeleteBtn = ({post}) => {
    const navigate=useNavigate();
    const {auth}=useContext(AuthContext)
    const deleteBtnHandler=()=>{
        axios.delete(`http://localhost:8000/posts/${post?.id}`,{
          headers:{
            token:JSON.parse(localStorage.getItem('mern-social-user'))?.token
          }
        })
        .then(res=>{
            console.log(res)
            toast.success(res.data.message)
            console.log(window.location.href)
            if(window.location.pathname=='/') window.location.reload()
            else navigate('/')

        })
        .catch(err=>{
            console.log(err)
            toast.error(err.response.data.error)
    })
    }
  return (
    <div>
      {auth?.id==post?.UserId  && auth  &&
            <button  onClick={deleteBtnHandler} className='flex items-center px-4 py-2 text-white bg-red-600 hover:bg-red-800 rounded-2xl'>
            <MdDelete size={16} />
            </button>
        }
    </div>
  )
}

export default DeleteBtn
