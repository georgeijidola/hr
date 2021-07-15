import { startSession } from "mongoose"
import ErrorResponse from "../../managers/error/ErrorResponse"
import Member from "../../models/user/Member"
import User from "../../models/user/User"

const DeleteMemberService = async (user: string) => {
  const session = await startSession()

  await session.withTransaction(async () => {
    const [member] = await Promise.all([
      Member.findOneAndUpdate(
        { user, isDeleted: false },
        {
          isDeleted: true,
          deletedAt: new Date(),
        }
      ),
      User.findOneAndUpdate(
        { _id: user, isDeleted: false },
        { isDeleted: true, deletedAt: new Date() },
        { runValidators: true }
      ),
    ])

    // Check if member exists
    if (!member) {
      throw new ErrorResponse({
        message: "Member doesn't exist or has been deleted.",
        statusCode: 404,
      })
    }
  })

  session.endSession()

  return user
}

export default DeleteMemberService
