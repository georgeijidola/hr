import ErrorResponse from "../../managers/error/ErrorResponse"
import Tag from "../../models/tag/Tag"

const DeleteTagService = async (_id: string) => {
  const tag = await Tag.findOneAndUpdate(
    { _id, isDeleted: false },
    {
      isDeleted: true,
      deletedAt: new Date(),
    }
  )
    .select("_id")
    .lean()

  // Check if tag doesn't exists
  if (!tag) {
    throw new ErrorResponse({
      message: "Tag doesn't exist or has been deleted.",
      statusCode: 404,
    })
  }

  return tag
}

export default DeleteTagService
