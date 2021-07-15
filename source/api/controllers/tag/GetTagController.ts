import { NextFunction, Request, Response } from "express"
import GetOneHandler from "../../../higherOrderServices/GetOneHandler"
import Tag from "../../../models/tag/Tag"
import asyncHandler from "../../middlewares/Async"

const GetTagController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await GetOneHandler({
      model: Tag,
      customQuery: {
        _id: req.params.id,
        isDeleted: false,
      },
      allowedQueryFields: ["user", "name", "createdAt", "updatedAt"],
      empty: "Tag doesn't exist.",
      req,
      res,
      next,
    })
  }
)

export default GetTagController
