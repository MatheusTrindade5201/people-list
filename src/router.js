import React from 'react'
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Login from './Pages/Login'
import Register from './Pages/Register'

const RouterApp = () => {
    return (
        <BrowserRouter>
            <Routes>
               <Route element={<Login/>} path='/' exact/>
               <Route element={<Register />} path='/Register' />
            </Routes>
        </BrowserRouter>
    )
}

export default RouterApp