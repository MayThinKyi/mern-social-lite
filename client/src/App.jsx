import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostPage from './pages/Post'
import EditPost from './pages/EditPost'
import UserPosts from './pages/UserPosts'
const App = () => {
  return (
    <div>
      <Router>
      <div><Toaster/></div>
      <Navbar/>
        <Routes>
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/' element={<Home/>} />
          <Route path='/create-post' element={<CreatePost/>} />
          <Route path='/posts/:postId' element={<PostPage/>} />
          <Route path='/edit-post/:postId' element={<EditPost/>} />
          <Route path='/users/:userId' element={<UserPosts/>} />


        </Routes>
      </Router>
    </div>
  )
}

export default App
