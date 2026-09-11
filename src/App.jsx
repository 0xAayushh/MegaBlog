// // import { useEffect, useState } from 'react'
// // import heroImg from './assets/hero.png'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from './assets/vite.svg'
// // import './App.css'
// // import { useDispatch } from 'react-redux'
// // import authService from "../src/appwrite/auth"
// // import { login, logout } from "../src/store/authSlice"

// // function App() {
// //   // console.log(import.meta.env.VITE_APPWRITE_URL)
// //   // loading state
// //   const [loading,setLoading] =useState(true)
// //   const dispatch = useDispatch()

// //   useEffect(()=>{
// //     authService.getCurrentUser()
// //     .then((userData)=>{
// //       if(userData) dispatch(login({userData}))
// //       else dispatch(logout())
// //     })
// //     .finally(()=>setLoading(false))
// //   },[])

// // return !loading ? (
// //   <div className='min-h-screen'>Test</div>
// // ) : <div>Loading...</div>; 

// // }

// // export default App

// import { useEffect, useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'
// import { useDispatch } from 'react-redux'
// import authService from "../src/appwrite/auth"
// import { login, logout } from "../src/store/authSlice"

// function App() {
//   // console.log(import.meta.env.VITE_APPWRITE_URL)
//   // loading state
//   const [loading,setLoading] =useState(true)
//   const dispatch = useDispatch()

//   useEffect(()=>{
//     authService.getCurrentUser()
//     .then((userData)=>{
//       if(userData) dispatch(login(userData))
//       else dispatch(logout())
//     })
//     .finally(()=>setLoading(false))
//   },[dispatch])


//  return loading ? null : (
//   <div className='min-h-screen'>Test</div>
//  );
// }

// export default App

import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

 useEffect(() => {
  authService.getCurrentUser()
  .then((userData) => {
    if (userData) dispatch(login(userData))
    else dispatch(logout())
  })
  .catch((error) => console.error("Auth error:", error))
  .finally(() => setLoading(false))
}, [dispatch])


  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App