import { NextFunction, Request, Response } from "express"
import SuccessResponse from "../../../helpers/SuccessResponse"
import { SendMail } from "../../../managers/email/SendMail"
import RegisterNewMemberService from "../../../services/auth/RegisterNewMemberService"
import asyncHandler from "../../../api/middlewares/Async"

const RegisterNewMemberController = asyncHandler(
  async (req: Request, res: Response) => {
    const otp = await RegisterNewMemberService(req.body)

    SendMail({
      to: req.body.email,
      subject: "Email Verification",
      message: `Your secret code is ${otp}`,
    })

    res.status(201).json(
      new SuccessResponse({
        message: "User registered, please check your email to get otp.",
      })
    )
  }
)

export default RegisterNewMemberController
