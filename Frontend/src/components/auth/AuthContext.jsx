import { createContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
        try {
            const response = await axiosInstance.get("/user/current-user")

            setUser(response.data.data)
        } catch (error) {
            console.log("Auth error:", error.response?.data || error.message);
            setUser(null)
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    const register = async(formData) => {
        try {
            setLoading(true)
            const response = await axiosInstance.post("/user/register", formData)
            
            return response.data

        } catch (error) {
            throw error
        } finally{
            setLoading(false)
        }
    }

    const login = async (formData) => {
        try {
            setLoading(true)

            const response = await axiosInstance.post("/user/login", formData)

            setUser(response.data.data.user)

            return response.data
        } catch (error) {
            throw error
        } finally{
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            await axiosInstance.post("/user/logout")

            setUser(null)
        } catch (error) {
            throw error
        }
    };

    return (
        <AuthContext.Provider value={{user, setUser, loading, register, login, logout, checkAuth}}>{children}</AuthContext.Provider>
    )
}
