import ErrorResponse from "../../managers/error/ErrorResponse"
import { titleDocumentDto } from "../../models/title/dto/TitleDocumentDto"
import Title from "../../models/title/Title"

const CreateTitleService = async ({
  body,
  loggedInUser,
}: {
  body: { name: string } | { name: string }[]
  loggedInUser: string
}) => {
  const exists = await Title.exists({
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

    return await Title.insertMany(fields as object[])
  } else {
    const { name } = body

    return await Title.create({
      user: loggedInUser,
      name,
    })
  }
}

export default CreateTitleService
