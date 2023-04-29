import React from 'react'
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar'


function Layout (){
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default Layout
