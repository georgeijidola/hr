import mongoose from "mongoose"
import request from "supertest"
import User from "../../../source/models/user/User"
import signToken from "../../../source/helpers/SignToken"
import config from "../../../config/Index"
import expressLoader from "../../../source/loaders/Express"
import CreateTitleService from "../../../source/services/title/CreateTitleService"
import mongooseLoader from "../../../source/loaders/Mongoose"
import Logger from "../../../source/loaders/Logger"

const apiPrefix = config.api.prefix

let adminToken: string, titleId: string

const postTitlePath = apiPrefix + "title"
const allTitlesPath = apiPrefix + "title/all"
let oneTitlePath = apiPrefix + "title/"

const expressApp = expressLoader()
const apiKey = "?pswd=" + config.api.key

const app = expressApp.listen(config.port + 2, async () => {
  Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port + 2} 🛡️
      ################################################
    `)
})

const titleTest = () => {
  beforeAll(async () => {
    try {
      const user = await User.findOne({ role: "a", isDeleted: false })
        .select("_id")
        .lean()

      adminToken = "Bearer " + signToken(user._id)

      const title = await CreateTitleService({
        body: {
          name: "Test title 0",
        },
        loggedInUser: user._id,
      })

      oneTitlePath += title._id
    } catch (error) {
      throw error
    }
  })

  it(`Post one title - POST ${postTitlePath}`, (done) => {
    request(app)
      .post(postTitlePath + apiKey)
      .set("Authorization", adminToken)
      .send({
        name: "Test title a",
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .end(done)
  })

  it(`Post multiple titles - POST ${postTitlePath}`, (done) => {
    request(app)
      .post(postTitlePath + apiKey)
      .set("Authorization", adminToken)
      .send([
        {
          name: "Test title b",
        },
        {
          name: "Test title c",
        },
      ])
      .expect("Content-Type", /json/)
      .expect(201)
      .end(done)
  })

  it(`Get all titles - GET ${allTitlesPath}`, (done) => {
    request(app)
      .get(allTitlesPath + apiKey)
      .set("Authorization", adminToken)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done)
  })

  it(`Get one title - GET ${oneTitlePath}`, (done) => {
    request(app)
      .get(oneTitlePath + apiKey)
      .set("Authorization", adminToken)
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done)
  })

  it(`Delete one title - DELETE ${oneTitlePath}`, (done) => {
    request(app)
      .delete(oneTitlePath + apiKey)
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

export default titleTest
