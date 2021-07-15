/** @format */

import { Schema, model } from "mongoose"

const MemberSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: [true, "User is required."],
    },

    firstName: {
      type: String,
      required: [true, "Please add first name."],
      trim: true,
      maxlength: ["50", "First name cannot exceed 50 characters."],
      default: "",
    },

    lastName: {
      type: String,
      required: [true, "Please add last name."],
      trim: true,
      maxlength: ["50", "Last name cannot exceed 50 characters."],
      default: "",
    },

    type: {
      type: String,
      trim: true,
      enum: {
        values: ["e", "c"],
        message:
          "Valid values for 'type' are 'employee(e)', and 'contractor(c)'",
      },
    },

    tags: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Tag",
        },
      ],
    },

    // Duration of contract
    dOfC: {
      type: Number,
      required: [true, "Duration of contract is required."],
      default: 0,
    },

    // "Role" in the instructions
    title: {
      type: Schema.Types.ObjectId,
      ref: "Title",
    },

    isDeleted: {
      type: Boolean,
      default: false,
      select: false,
    },

    deletedAt: { type: Date, select: false },
  },
  {
    timestamps: true,
    collation: { locale: "en", strength: 2, numericOrdering: true },
  }
)

MemberSchema.index(
  {
    firstName: "text",
    lastName: "text",
  },
  {
    weights: {
      firstName: 3,
      lastName: 2,
    },
  }
)

MemberSchema.index({
  type: 1,
  tags: 1,
  dOfC: 1,
  title: 1,
  createdAt: -1,
  isDeleted: -1,
})

export default model("Member", MemberSchema)
