import mongoose from "mongoose"
import mongooseLoader from "../../source/loaders/Mongoose"
import authTest from "./services/AuthTest"
import SendMailTest from "./managers/SendMailTest"
import titleTest from "./services/TitleTest"
import tagTest from "./services/TagTest"
import userManagementTest from "./services/UserManagementTest"

jest.setTimeout(300000)

beforeAll(async () => {
  try {
    await mongooseLoader()
  } catch (error) {
    throw error
  }
})

describe("Unit tests", () => {
  describe("Email Service", () => SendMailTest())
  describe("Tag service", () => tagTest())
  describe("Title service", () => titleTest())
  describe("Auth Service", () => authTest())
  describe("User Management Service", () => userManagementTest())
})

afterAll(async () => {
  try {
    const collections = Object.keys(mongoose.connection.collections)

    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName]

      await collection.deleteMany({})
    }

    await mongoose.disconnect()
  } catch (error) {
    throw error
  }
})
