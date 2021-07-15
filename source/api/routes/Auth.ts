import { Router } from "express"
import ForgotPasswordController from "../controllers/auth/ForgotPasswordController"
import RegisterNewMemberController from "../controllers/auth/RegisterNewMemberController"
import ResendOtpController from "../controllers/auth/ResendOtpController"
import ResetPasswordController from "../controllers/auth/ResetPasswordController"
import SignInController from "../controllers/auth/SignInController"
import VerifyEmailController from "../controllers/auth/VerifyEmailController"
import protect from "../middlewares/auth/Protect"
import role from "../middlewares/auth/Role"

const router = Router()

router.post("/register", protect, role(["a"]), RegisterNewMemberController)
router.post("/signin", SignInController)
router.post("/forgot-password", ForgotPasswordController)
router.post("/resend-otp", ResendOtpController)
router.put("/reset-password", ResetPasswordController)
router.post("/verify", VerifyEmailController)

export default router
