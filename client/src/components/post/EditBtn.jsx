import React, { useContext } from 'react'
import {BiEditAlt} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider'
const EditBtn = ({post}) => {
    const {auth}=useContext(AuthContext)
  return (
    <>
    {auth?.id==post?.UserId  && auth  &&
    <Link to={`/edit-post/${post?.id}`} className='flex items-center px-4 py-2 text-white bg-blue-600 hover:bg-blue-800 rounded-2xl'>
      <BiEditAlt/>
      </Link>
    }
        </>

  )
}

export default EditBtn
