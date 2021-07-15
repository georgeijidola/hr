import Tag from "../../models/tag/Tag"
import Title from "../../models/title/Title"
import ErrorResponse from "../../managers/error/ErrorResponse"

const validateTitleAndTags = async (tags?: string[], title?: string) => {
  let promises = []

  if (tags) {
    if (tags.length < 1) {
      throw new ErrorResponse({
        error: {
          devMessage: "You can't send an empty array",
          possibleSolution: "",
          errorCode: 400,
        },
        message: "Something went wrong, please contact support.",
        statusCode: 403,
      })
    } else if (tags.length > 20) {
      throw new ErrorResponse({
        message: "Tags can't exceed 20.",
        statusCode: 403,
      })
    }

    promises.push(
      Tag.countDocuments({
        _id: { $in: tags },
        isDeleted: false,
      })
    )
  }

  if (title) {
    if (title === "")
      throw new ErrorResponse({
        error: {
          devMessage: "You can't send an empty string",
          possibleSolution: "",
          errorCode: 400,
        },
        message: "Something went wrong, please contact support.",
        statusCode: 403,
      })

    promises.push(Title.exists({ _id: title, isDeleted: false }))
  }

  // Get results from promises
  promises = await Promise.all(promises)

  if (tags || title) {
    let tagsFound, titleExists

    if (tags && title) {
      tagsFound = promises[0]
      titleExists = promises[1]
    } else if (tags) {
      tagsFound = promises[0]
    } else if (titleExists) {
      titleExists = promises[1]
    }

    if (tags && tagsFound !== tags.length) {
      throw new ErrorResponse({
        message: "Some tags do not exist.",
        statusCode: 404,
      })
    }

    if (title && !titleExists) {
      throw new ErrorResponse({
        message: "Title does not exist.",
        statusCode: 404,
      })
    }
  }
}

export default validateTitleAndTags
