import {asyncHandller} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from 'mongoose'
import { User } from "../models/user.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}

const registerUser = asyncHandller(async(req, res) => {
    const {fullName, username, email, password} = req.body
    
    if([fullName, username, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(400, "User with the given username or email already exists")
    }

    const user = await User.create({
        fullName, 
        username: username.toLowerCase(),
        password,
        email: email.toLowerCase()
    })
    
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register successfully")
    )
})

const loginUser = asyncHandller(async(req, res) => {
    const {username, email, password} = req.body

    if(!username || !email){
        return new ApiError(400, "Username or email is required")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(400, "User does not exist")
    }

    const isPasswordValid = await user.isPasswordCorret(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, refreshToken, accessToken
            },
            "User logged in Successfully"
        )
    )
})

const logoutUser = asyncHandller(async(req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out")
    )
})

const refreshAccessToken = asyncHandller(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request")
    }

    try {
        const decodedRefreshToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_SECRET_TOKEN
        )

        const user = await User.findById(decodedRefreshToken?._id)

        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }

        if(incomingRefreshToken !== user.refreshToken){
            throw new ApiError(401, "Refresh token is expired or user")
        }

        const {accessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(200, {accessToken, refreshToken: newRefreshToken}, "Access token refreshed successfully")
        )
    } catch (error) {
        throw new ApiError(400, error?.message || "Invalid refresh token")
    }
})

const changeCurrentPassword = asyncHandller(async (req, res) => {
    const {oldPassword, newPassword, confPassword} = req.body

    if(!(newPassword === confPassword)){
        throw new ApiError(400, "New password does not match with confirm password")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(newPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Password is invalid")
    }

    const user = await User.findById(req.user?._id)

    if(user){
        throw new ApiError(400, "Invalid details")
    }

    user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const updateAccountDetails = asyncHandller(async (req, res) => {
    const {fullName, email } = req.body

    if(!fullName || !email){
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName: fullName,
                email: email
            }
        },
        {
            new: true
        }
    ).select("-password -refreshToken")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details changed successfully"))
})

export{
    registerUser,
    loginUser,
    logoutUser,
    changeCurrentPassword,
    updateAccountDetails
}