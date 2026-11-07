import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Home from "./components/pages/Home"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
