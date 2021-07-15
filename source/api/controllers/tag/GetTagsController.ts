import { NextFunction, Request, Response } from "express"
import GetAllHandler from "../../../higherOrderServices/GetAllHandler"
import Tag from "../../../models/tag/Tag"
import asyncHandler from "../../middlewares/Async"

const GetTagsController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await GetAllHandler({
      model: Tag,
      customQuery: {
        isDeleted: false,
      },
      allowedQueryFields: ["user", "name", "createdAt", "updatedAt"],
      empty: "You have not added tags or they've been deleted.",
      req,
      res,
      next,
    })
  }
)

export default GetTagsController
