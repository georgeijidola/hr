import { Request, Response } from "express"
import SuccessResponse from "../../../helpers/SuccessResponse"
import DeleteTitleService from "../../../services/title/DeleteTitleService"
import asyncHandler from "../../middlewares/Async"

const DeleteTitleController = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    await DeleteTitleService(req.params.id)

    return res
      .status(200)
      .json(new SuccessResponse({ message: "Title deleted." }))
  }
)

export default DeleteTitleController
