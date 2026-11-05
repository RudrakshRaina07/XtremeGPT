import {Router} from "express"
import {jwtVerify} from "../middlewares/auth.middleware"
import { changeCurrentPassword, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails } from "../controllers/user.controllers";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(jwtVerify, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(jwtVerify, changeCurrentPassword)
router.route("/update-account").patch(jwtVerify, updateAccountDetails)