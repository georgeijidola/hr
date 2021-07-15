import { startSession } from "mongoose"
import ErrorResponse from "../../managers/error/ErrorResponse"
import validateTitleAndTags from "../../helpers/member/ValidateTitleAndTags"
import pruneUpdateFields from "../../helpers/PruneUpdateFields"
import { memberDocumentDto } from "../../models/user/dto/MemberDocumentDto"
import Member from "../../models/user/Member"
import User from "../../models/user/User"

const UpdateMemberService = async (body: {
  [index: string]: string | undefined
  email?: string
  id: string
}) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "type",
    "dOfC",
    "title",
    "tags",
    "title",
  ]

  const updateFields = pruneUpdateFields(
    allowedFields,
    body
  ) as memberDocumentDto

  if (Object.keys(body).length < 1) {
    throw new ErrorResponse({
      message: "Empty object, please parse valid fields to the body.",
      statusCode: 400,
    })
  }

  if (!body.id) {
    throw new ErrorResponse({
      message: "User id is required.",
      statusCode: 400,
    })
  }

  if (updateFields.tags || updateFields.title) {
    await validateTitleAndTags(updateFields.tags, updateFields.title)
  }

  const userExist = await User.exists({ _id: body.id, isDeleted: false })

  if (!userExist) {
    throw new ErrorResponse({
      message: "User not found or has been deleted.",
      statusCode: 404,
    })
  }

  const session = await startSession()

  let promises: unknown[] = []

  await session.withTransaction(async () => {
    if (body.email) {
      promises.push(
        User.findByIdAndUpdate(
          body.id,
          { email: body.email },
          { runValidators: true, session }
        )
          .select("_id")
          .lean()
      )
    }

    if (Object.keys(updateFields).length >= 1) {
      promises.push(
        Member.findOneAndUpdate({ user: body.id }, updateFields, {
          runValidators: true,
          session,
        })
          .select("_id")
          .lean()
      )
    }

    await Promise.all(promises)
  })

  session.endSession()

  return body.id
}

export default UpdateMemberService
