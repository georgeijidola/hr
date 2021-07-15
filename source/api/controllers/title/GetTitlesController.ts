import { NextFunction, Request, Response } from "express"
import GetAllHandler from "../../../higherOrderServices/GetAllHandler"
import Title from "../../../models/title/Title"
import asyncHandler from "../../middlewares/Async"

const GetTitlesController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await GetAllHandler({
      model: Title,
      customQuery: {
        isDeleted: false,
      },
      allowedQueryFields: ["user", "name", "createdAt", "updatedAt"],
      empty: "You have not added titles or they've been deleted.",
      req,
      res,
      next,
    })
  }
)

export default GetTitlesController
