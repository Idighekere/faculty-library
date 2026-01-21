import React from 'react'
import NavBar from './navbar'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

const HomeSharedLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      {children ? children : <Outlet />}
      <Footer />
    </>
  )
}

export default HomeSharedLayout
