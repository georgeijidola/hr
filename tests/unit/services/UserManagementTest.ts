import { Document } from "mongoose"
import GetAllHandler from "../../../source/higherOrderServices/GetAllHandler"
import GetOneHandler from "../../../source/higherOrderServices/GetOneHandler"
import Member from "../../../source/models/user/Member"
import User from "../../../source/models/user/User"
import DeleteMemberService from "../../../source/services/userManagement/DeleteMemberService"
import UpdateMemberService from "../../../source/services/userManagement/UpdateMemberService"
import UpdatePasswordService from "../../../source/services/userManagement/UpdatePasswordService"

const userManagementTest = () => {
  let userId: string

  beforeAll(async () => {
    try {
      const user = await User.findOne({
        email: "testy@mailinator.com",
        isDeleted: false,
      })
        .select("_id")
        .lean()

      userId = user._id
    } catch (error) {
      throw error
    }
  })

  it("Update Password", async () => {
    expect(
      await UpdatePasswordService({
        currentPassword: "123i4567",
        newPassword: "7654321",
        confirmNewPassword: "7654321",
        loggedInUser: userId,
      })
    ).toHaveProperty("_id")
  })

  it("Update Member's first name", async () => {
    expect(
      await UpdateMemberService({
        firstName: "George",
        id: userId,
      })
    ).toBeTruthy()
  })

  it("Delete Member", async () => {
    expect(await DeleteMemberService(userId)).toBeTruthy()
  })

  it("Get all members", async () => {
    const members = await GetAllHandler({
      model: Member,
      customQuery: {
        isDeleted: false,
      },
      populateFields: [
        {
          path: "user",
          select: "role email isEmailVerified isSetupComplete",
        },
        {
          path: "tags",
          select: "-_id name",
        },
      ],
      allowedQueryFields: [
        "user",
        "tags",
        "firstName",
        "lastName",
        "type",
        "dOfC",
        "title",
        "isDeleted",
        "deletedAt",
        "createdAt",
        "updatedAt",
      ],
      empty: "No members found at this time, please create one.",
    })

    expect(members).toBeTruthy()
  })

  it("Get one member", async () => {
    const member = await GetOneHandler({
      model: Member,
      customQuery: {
        isDeleted: false,
      },
      populateFields: [
        {
          path: "user",
          select: "role email isEmailVerified isSetupComplete",
        },
        {
          path: "tags",
          select: "-_id name",
        },
      ],
      allowedQueryFields: [
        "user",
        "tags",
        "firstName",
        "lastName",
        "type",
        "dOfC",
        "title",
        "createdAt",
        "updatedAt",
      ],
      empty: "Member doesn't exist.",
    })

    expect(member).toBeTruthy()
  })
}

export default userManagementTest
