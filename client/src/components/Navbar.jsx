import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const {auth,setAuth}=useContext(AuthContext);
    const logoutHandler=()=>{
        localStorage.removeItem('mern-social-user')
        toast.success('Logout successfully!')
        setAuth(null)
    }
  return (
    <div className='flex flex-wrap items-center justify-between px-5 py-5 border-b sm:flex-nowrap sm:px-10'>
      <Link to={'/'} className='text-lg font-semibold sm:text-2xl '>MERN SOCIAL</Link>
      <div className='flex items-center gap-x-4 sm:gap-x-10'>
        <Link to={`/users/${auth?.id}`} className='mt-3 text-md sm:text-lg font-[500]'>{auth?.name}</Link>
        {auth? <>
        <Link className='mt-5 ' to={'/create-post'}>Create Post</Link>
          <button onClick={logoutHandler} className='px-8 py-2 mt-5 text-white bg-blue-600 hover:bg-blue-800 rounded-3xl text-md '>Logout</button>
          </> :<>
        <Link to={'/register'} className='px-4 py-1 mt-5 text-sm text-white bg-blue-600 sm:px-8 sm:py-2 hover:bg-blue-800 rounded-3xl sm:text-md '>Register</Link>
        <Link to={'/login'}  className='px-4 py-1 mt-5 text-sm text-white bg-blue-600 sm:px-8 sm:py-2 hover:bg-blue-800 rounded-3xl text-md '>Login</Link>
        </>}
      </div>
    </div>
  )
}

export default Navbar

