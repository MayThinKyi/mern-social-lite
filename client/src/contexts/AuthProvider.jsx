import React, { createContext, useState } from 'react'
export const AuthContext=createContext();
const AuthProvider = ({children}) => {
    const [auth,setAuth]=useState(JSON.parse(localStorage.getItem('mern-social-user'))|| null)
    const [userLikedPostIds,setUserLikedPostIds]=useState(null);

    return (
    <AuthContext.Provider value={{auth,setAuth,userLikedPostIds,setUserLikedPostIds}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
