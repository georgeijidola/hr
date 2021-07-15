import { NextFunction, Request, Response } from "express"
import signToken from "../../../helpers/SignToken"
import GetOneHandler from "../../../higherOrderServices/GetOneHandler"
import { SendMail } from "../../../managers/email/SendMail"
import Member from "../../../models/user/Member"
import VerifyAccountService from "../../../services/auth/VerifyAccountService"
import asyncHandler from "../../middlewares/Async"

const VerifyEmailController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp, password, confirmPassword } = req.body

    const userId = await VerifyAccountService({
      email,
      otp,
      password,
      confirmPassword,
    })

    const token = signToken(userId)

    SendMail({
      to: email,
      subject: "Email verified",
      message: "Congratulations! Your email has been verified.",
    })

    await GetOneHandler({
      model: Member,
      customQuery: {
        user: userId,
        isDeleted: false,
      },
      populateFields: [
        {
          path: "user",
          select: "role email isEmailVerified isSetupComplete",
        },
        {
          path: "tags",
          select: "-_id name",
        },
      ],
      allowedQueryFields: [
        "user",
        "tags",
        "firstName",
        "lastName",
        "type",
        "dOfC",
        "title",
        "createdAt",
        "updatedAt",
      ],
      empty: "User not found.",
      token,
      req,
      res,
      next,
    })
  }
)

export default VerifyEmailController
