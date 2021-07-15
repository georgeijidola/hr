import { Request, Response } from "express"
import SuccessResponse from "../../../helpers/SuccessResponse"
import DeleteMemberService from "../../../services/userManagement/DeleteMemberService"
import asyncHandler from "../../middlewares/Async"

const DeleteMemberController = asyncHandler(
  async (req: Request, res: Response): Promise<Response> => {
    await DeleteMemberService(req.params.id)

    return res
      .status(200)
      .json(new SuccessResponse({ message: "Member deleted." }))
  }
)

export default DeleteMemberController
