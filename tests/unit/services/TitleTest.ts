import GetAllHandler from "../../../source/higherOrderServices/GetAllHandler"
import GetOneHandler from "../../../source/higherOrderServices/GetOneHandler"
import Title from "../../../source/models/title/Title"
import User from "../../../source/models/user/User"
import CreateTitleService from "../../../source/services/title/CreateTitleService"
import DeleteTitleService from "../../../source/services/title/DeleteTitleService"

const titleTest = () => {
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

  let titleId: string

  it("Title creation", async () => {
    expect(
      await CreateTitleService({
        body: {
          name: "Test title 1",
        },
        loggedInUser: adminId,
      })
    ).toHaveProperty("name")
  })

  it("Titles creation", async () => {
    expect(
      await CreateTitleService({
        body: [
          {
            name: "Test title 2",
          },
          {
            name: "Test title 3",
          },
        ],
        loggedInUser: adminId,
      })
    ).toBeTruthy()
  })

  it("Get Title", async () => {
    const title = await GetOneHandler({
      model: Title,
      customQuery: {
        isDeleted: false,
      },
      allowedQueryFields: ["_id"],
      empty: "Title doesn't exist.",
    })

    titleId = title?.data._id

    expect(title).toBeTruthy()
  })

  it("Get Titles", async () => {
    const titles = await GetAllHandler({
      model: Title,
      customQuery: {
        isDeleted: false,
      },
      allowedQueryFields: ["user"],
      empty: "Title doesn't exist.",
    })

    expect(titles).toBeTruthy()
  })

  it("Title deletion", async () => {
    expect(await DeleteTitleService(titleId)).toHaveProperty("_id")
  })
}

export default titleTest
