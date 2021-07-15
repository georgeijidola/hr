import mongoose from "mongoose"
import request from "supertest"
import User from "../../../source/models/user/User"
import signToken from "../../../source/helpers/SignToken"
import config from "../../../config/Index"
import expressLoader from "../../../source/loaders/Express"
import CreateTagService from "../../../source/services/tag/CreateTagService"
import mongooseLoader from "../../../source/loaders/Mongoose"
import Logger from "../../../source/loaders/Logger"

const apiPrefix = config.api.prefix

let adminToken: string, tagId: string

const postTagPath = apiPrefix + "tag"
const allTagsPath = apiPrefix + "tag/all"
let oneTagPath = apiPrefix + "tag/"

const expressApp = expressLoader()
const apiKey = "?pswd=" + config.api.key

const app = expressApp.listen(config.port + 1, async () => {
  Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port + 1} 🛡️
      ################################################
    `)
})

const tagTest = () => {
  beforeAll(async () => {
    try {
      const user = await User.findOne({ role: "a", isDeleted: false })
        .select("_id")
        .lean()

      adminToken = "Bearer " + signToken(user._id)

      const tag = await CreateTagService({
        body: {
          name: "Test tag 0",
        },
        loggedInUser: user._id,
      })

      oneTagPath += tag._id
    } catch (error) {
      throw error
    }
  })

  it(`Post one tag - POST ${postTagPath}`, (done) => {
    request(app)
      .post(postTagPath + apiKey)
      .set("Authorization", adminToken)
      .send({
        name: "Test tag a",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .end(done)
  })

  it(`Post multiple tags - POST ${postTagPath}`, (done) => {
    request(app)
      .post(postTagPath + apiKey)
      .set("Authorization", adminToken)
      .send([
        {
          name: "Test tag b",
        },
        {
          name: "Test tag c",
        },
      ])
      .expect("Content-Type", /json/)
      .expect(201)
      .end(done)
  })

  it(`Get all tags - GET ${allTagsPath}`, (done) => {
    request(app)
      .get(allTagsPath + apiKey)
      .set("Authorization", adminToken)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done)
  })

  it(`Get one tag - GET ${oneTagPath}`, (done) => {
    request(app)
      .get(oneTagPath + apiKey)
      .set("Authorization", adminToken)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done)
  })

  it(`Delete one tag - DELETE ${oneTagPath}`, (done) => {
    request(app)
      .delete(oneTagPath + apiKey)
      .set("Authorization", adminToken)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done)
  })

  afterAll(async () => {
    try {
      app.close()
    } catch (error) {
      throw error
    }
  })
}

export default tagTest
