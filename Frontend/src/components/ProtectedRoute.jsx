import React, { useContext } from 'react'
import { AuthContext } from './auth/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return (
            <div className="h-screen bg-[#212121] text-white flex items-center justify-center">
                Checking Authentication
            </div>
        )
    }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute
