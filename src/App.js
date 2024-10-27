import React from 'react'
import AppRoutes from '../src/routes/AppRoutes'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>
  )
}

export default App