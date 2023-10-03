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
    <div className='flex items-center justify-between px-10 py-5 border-b'>
      <Link to={'/'} className='text-2xl font-semibold '>MERN SOCIAL</Link>
      <div className='flex items-center gap-x-10'>
        <h1 className='mt-3 text-lg font-[500]'>{auth?.name}</h1>
        {auth? <>
        <Link className='mt-5' to={'/create-post'}>Create Post</Link>
          <button onClick={logoutHandler} className='px-8 py-2 mt-5 text-white bg-blue-600 hover:bg-blue-800 rounded-3xl text-md '>Logout</button>
          </> :<>
        <Link to={'/register'} className='px-8 py-2 mt-5 text-white bg-blue-600 hover:bg-blue-800 rounded-3xl text-md '>Register</Link>
        <Link to={'/login'}  className='px-8 py-2 mt-5 text-white bg-blue-600 hover:bg-blue-800 rounded-3xl text-md '>Login</Link>
        </>}
      </div>
    </div>
  )
}

export default Navbar

