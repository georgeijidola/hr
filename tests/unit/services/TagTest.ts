import GetAllHandler from "../../../source/higherOrderServices/GetAllHandler"
import GetOneHandler from "../../../source/higherOrderServices/GetOneHandler"
import Tag from "../../../source/models/tag/Tag"
import DeleteTagService from "../../../source/services/tag/DeleteTagService"
import CreateTagService from "../../../source/services/tag/CreateTagService"
import User from "../../../source/models/user/User"

const tagTest = () => {
  let adminId: string

  beforeAll(async () => {
    try {
      const user = await User.findOne({ role: "a", isDeleted: false })
        .select("_id")
        .lean()

      adminId = user._id
    } catch (error) {
      throw error
    }
  })

  let tagId: string

  it("Tag creation", async () => {
    expect(
      await CreateTagService({
        body: {
          name: "Test tag 1",
        },
        loggedInUser: adminId,
      })
    ).toHaveProperty("name")
  })

  it("Tags creation", async () => {
    expect(
      await CreateTagService({
        body: [
          {
            name: "Test tag 2",
          },
          {
            name: "Test tag 3",
          },
        ],
        loggedInUser: adminId,
      })
    ).toBeTruthy()
  })

  it("Get Tag", async () => {
    const tag = await GetOneHandler({
      model: Tag,
      customQuery: {
        isDeleted: false,
      },
      allowedQueryFields: ["_id"],
      empty: "Tag doesn't exist.",
    })

    tagId = tag?.data._id

    expect(tag).toBeTruthy()
  })

  it("Get Tags", async () => {
    const tags = await GetAllHandler({
      model: Tag,
      customQuery: {
        isDeleted: false,
      },
      allowedQueryFields: ["user"],
      empty: "Tag doesn't exist.",
    })

    expect(tags).toBeTruthy()
  })

  it("Tag deletion", async () => {
    expect(await DeleteTagService(tagId)).toHaveProperty("_id")
  })
}

export default tagTest
