import ErrorResponse from "../../managers/error/ErrorResponse"
import Title from "../../models/title/Title"

const DeleteTitleService = async (_id: string) => {
  const title = await Title.findOneAndUpdate(
    { _id, isDeleted: false },
    {
      isDeleted: true,
      deletedAt: new Date(),
    }
  )
    .select("_id")
    .lean()

  // Check if title doesn't exists
  if (!title) {
    throw new ErrorResponse({
      message: "Title doesn't exist or has been deleted.",
      statusCode: 404,
    })
  }

  return title
}

export default DeleteTitleService
