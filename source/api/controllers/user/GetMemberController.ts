import { NextFunction, Request, Response } from "express"
import GetOneHandler from "../../../higherOrderServices/GetOneHandler"
import Member from "../../../models/user/Member"
import asyncHandler from "../../middlewares/Async"

const GetMemberController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await GetOneHandler({
      model: Member,
      customQuery: {
        user: req.params.id ?? req.user.id,
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
      empty: "Member doesn't exist.",
      req,
      res,
      next,
    })
  }
)

export default GetMemberController
