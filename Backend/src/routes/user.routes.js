import {Router} from "express"
import { changeCurrentPassword, getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails } from "../controllers/user.controllers.js";
import jwtVerify from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

// secured routes
router.route("/current-user").get(jwtVerify, getCurrentUser)
router.route("/logout").post(jwtVerify, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(jwtVerify, changeCurrentPassword)
router.route("/update-account").patch(jwtVerify, updateAccountDetails)

export default router