import { NextFunction, Request, Response } from "express"
import signToken from "../../../helpers/SignToken"
import GetOneHandler from "../../../higherOrderServices/GetOneHandler"
import Member from "../../../models/user/Member"
import User from "../../../models/user/User"
import SignInService from "../../../services/auth/SignInService"
import asyncHandler from "../../../api/middlewares/Async"

const SignInController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email, password } = req.body

    const user = await SignInService({ email, password })

    const token: string = signToken(user._id)

    if (user.role === "u") {
      await GetOneHandler({
        model: Member,
        customQuery: {
          user: user._id,
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
    } else if (user.role === "a") {
      await GetOneHandler({
        model: User,
        customQuery: {
          _id: user._id,
          isDeleted: false,
        },
        allowedQueryFields: ["role", "email", "isEmailVerified"],
        empty: "User doesn't exist.",
        token,
        req,
        res,
        next,
      })
    }
  }
)

export default SignInController
