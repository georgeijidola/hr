import { NextFunction, Request, Response } from "express"
import GetOneHandler from "../../../higherOrderServices/GetOneHandler"
import Title from "../../../models/title/Title"
import asyncHandler from "../../middlewares/Async"

const GetTitleController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await GetOneHandler({
      model: Title,
      customQuery: {
        _id: req.params.id,
        isDeleted: false,
      },
      allowedQueryFields: ["user", "name", "createdAt", "updatedAt"],
      empty: "Title doesn't exist.",
      req,
      res,
      next,
    })
  }
)

export default GetTitleController
