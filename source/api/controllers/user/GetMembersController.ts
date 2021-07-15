import { NextFunction, Request, Response } from "express"
import GetAllHandler from "../../../higherOrderServices/GetAllHandler"
import Member from "../../../models/user/Member"
import asyncHandler from "../../middlewares/Async"

const GetMembersController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await GetAllHandler({
      model: Member,
      customQuery: {
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
        "isDeleted",
        "deletedAt",
        "createdAt",
        "updatedAt",
      ],
      empty: "No members found at this time, please create one.",
      blockTextSearch: false,
      req,
      res,
      next,
    })
  }
)

export default GetMembersController
