import { Request, Response } from "express"
import SuccessResponse from "../../../helpers/SuccessResponse"
import CreateTitleService from "../../../services/title/CreateTitleService"
import asyncHandler from "../../middlewares/Async"

const CreateTitleController = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    await CreateTitleService({
      body: req.body,
      loggedInUser: req.user.id,
    })

    return res
      .status(201)
      .json(new SuccessResponse({ message: "Title(s) added." }))
  }
)

export default CreateTitleController
