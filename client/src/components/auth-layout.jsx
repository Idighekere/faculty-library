import React from 'react'
import NavBar from './navbar'
import Footer from './footer'
import LoadingSpinner from './loading-spinner'
import { Outlet } from 'react-router-dom'

const AuthLayout = ({ children }) => {
  return (
    <>
      <LoadingSpinner>
        <NavBar />
        {children ? children : <Outlet />}
        {/* <Footer /> */}
      </LoadingSpinner>
    </>
  )
}

export default AuthLayout
