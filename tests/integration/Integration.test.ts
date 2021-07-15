import mongoose from "mongoose"
import mongooseLoader from "../../source/loaders/Mongoose"
import authTest from "./routes/AuthTest"
import healthCheckTest from "./routes/HealthCheckTest"
import tagTest from "./routes/TagTest"
import titleTest from "./routes/TitleTest"
import userManagementTest from "./routes/UserManagementTest"

jest.setTimeout(300000)

beforeAll(async () => {
  try {
    await mongooseLoader()
  } catch (error) {
    throw error
  }
})

describe("Server Health Status Check", healthCheckTest)
describe("Tag Integration Test", tagTest)
describe("Title Integration Test", titleTest)
describe("Auth Integration Test", authTest)
describe("User Management Integration Test", userManagementTest)

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
