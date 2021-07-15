import { Request, Response } from "express"
import SuccessResponse from "../../../helpers/SuccessResponse"
import DeleteTagService from "../../../services/tag/DeleteTagService"
import asyncHandler from "../../middlewares/Async"

const DeleteTagController = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    await DeleteTagService(req.params.id)

    return res
      .status(200)
      .json(new SuccessResponse({ message: "Tag deleted." }))
  }
)

export default DeleteTagController
