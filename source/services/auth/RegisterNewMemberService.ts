import { startSession } from "mongoose"
import GenerateOtp from "../../helpers/auth/GenerateOtp"
import ErrorResponse from "../../managers/error/ErrorResponse"
import validateTitleAndTags from "../../helpers/member/ValidateTitleAndTags"
import { createMemberDto } from "../../models/user/dto/CreateMemberDto"
import Member from "../../models/user/Member"
import User from "../../models/user/User"

const RegisterNewMemberService = async ({
  email,
  firstName,
  lastName,
  type,
  tags,
  dOfC,
  title,
}: createMemberDto): Promise<any> => {
  if (!["e", "c"].includes(type!))
    throw new ErrorResponse({
      error: {
        devMessage: `${type} is an invalid value for type.`,
        possibleSolution:
          "Valid values for 'type' are 'employee(e)', and 'contractor(c)'",

        errorCode: 400,
      },
      statusCode: 400,
      message: "Something went wrong, please contact support.",
    })

  await validateTitleAndTags(tags, title)

  const otp = GenerateOtp()

  const otpExpire = new Date(Date.now() + 10 * 60 * 1000)

  const session = await startSession()

  await session.withTransaction(async () => {
    let user = new User({
      email,
      otp,
      otpExpire,
      role: "u",
    })

    const [a, b] = await Promise.all([
      user.save({ session }),
      Member.create(
        [
          {
            user: user._id,
            firstName,
            lastName,
            type,
            tags,
            dOfC,
            title,
          },
        ],
        { session }
      ),
    ])
  })

  session.endSession()

  return otp
}

export default RegisterNewMemberService
