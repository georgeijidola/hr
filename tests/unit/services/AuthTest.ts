import Tag from "../../../source/models/tag/Tag"
import Title from "../../../source/models/title/Title"
import User from "../../../source/models/user/User"
import ForgotPasswordService from "../../../source/services/auth/ForgotPasswordService"
import RegisterNewMemberService from "../../../source/services/auth/RegisterNewMemberService"
import ResendOtpService from "../../../source/services/auth/ResendOtpService"
import ResetPasswordService from "../../../source/services/auth/ResetPasswordService"
import SignInService from "../../../source/services/auth/SignInService"
import VerifyAccountService from "../../../source/services/auth/VerifyAccountService"

const authTest = () => {
  const email = "testy@mailinator.com"
  const password = "7654321"
  const confirmPassword = "123i4567"
  let resetPasswordToken: string

  it("Register new member", async () => {
    const [title, tag] = await Promise.all([
      // Get title
      Title.findOne({ isDeleted: false }).select("_id").lean(),
      // Get tag
      Tag.findOne({ isDeleted: false }).select("_id").lean(),
    ])

    expect(
      await RegisterNewMemberService({
        email,
        firstName: "Jest",
        lastName: "Tester",
        type: "e",
        tags: [tag._id],
        dOfC: 12,
        title: title._id,
      })
    ).toEqual(expect.stringMatching(/[0-9]{6}/))
  })

  it("Resend OTP", async () => {
    expect(await ResendOtpService(email)).toEqual(
      expect.stringMatching(/[0-9]{6}/)
    )
  })

  it("Verify email", async () => {
    const { otp } = await User.findOne({ email }).select("-_id otp").lean()

    expect(
      await VerifyAccountService({
        otp,
        email,
        password,
        confirmPassword: password,
      })
    ).toBeTruthy()
  })

  it("Sign in", async () => {
    expect(
      await SignInService({
        email,
        password,
      })
    ).toHaveProperty("_id")
  })

  it("Forgot password", async () => {
    const forgotPassword = await ForgotPasswordService(email)

    resetPasswordToken = forgotPassword

    expect(forgotPassword).toBeTruthy()
  })

  it("Reset password", async () => {
    expect(
      await ResetPasswordService({
        resetPasswordToken,
        password: confirmPassword,
        confirmPassword,
      })
    ).toHaveProperty("_id")
  })

  it("Login after reset password", async () => {
    expect(
      await SignInService({
        email,
        password: confirmPassword,
      })
    ).toHaveProperty("_id")
  })
}

export default authTest
