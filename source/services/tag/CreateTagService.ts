import ErrorResponse from "../../managers/error/ErrorResponse"
import { tagDocumentDto } from "../../models/tag/dto/TagDocumentDto"
import Tag from "../../models/tag/Tag"

const CreateTagService = async ({
  body,
  loggedInUser,
}: {
  body: { name: string } | { name: string }[]
  loggedInUser: string
}) => {
  const exists = await Tag.exists({
    name: Array.isArray(body)
      ? { $in: body.map((field) => field.name) }
      : body.name,
  })

  if (exists)
    throw new ErrorResponse({
      message: Array.isArray(body)
        ? "One or more names already exist"
        : "Name already exist.",
      statusCode: 403,
    })

  if (Array.isArray(body)) {
    const fields = body.map((field) => {
      const { name } = field

      return {
        user: loggedInUser,
        name,
      }
    })

    return await Tag.insertMany(fields as object[])
  } else {
    const { name } = body

    return await Tag.create({
      user: loggedInUser,
      name,
    })
  }
}

export default CreateTagService
