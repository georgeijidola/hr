import { Request, Response } from "express"
import SuccessResponse from "../../../helpers/SuccessResponse"
import CreateTagService from "../../../services/tag/CreateTagService"
import asyncHandler from "../../middlewares/Async"

const CreateTagController = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    await CreateTagService({
      body: req.body,
      loggedInUser: req.user.id,
    })

    return res
      .status(201)
      .json(new SuccessResponse({ message: "Tag(s) added." }))
  }
)

export default CreateTagController
