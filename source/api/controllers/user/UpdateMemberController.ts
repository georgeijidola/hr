import { NextFunction, Request, Response } from "express"
import SuccessResponse from "../../../helpers/SuccessResponse"
import UpdateMemberService from "../../../services/userManagement/UpdateMemberService"
import asyncHandler from "../../middlewares/Async"

const UpdateMemberController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    await UpdateMemberService(req.body)

    res.status(200).json(new SuccessResponse({ message: "Member updated." }))
  }
)

export default UpdateMemberController
