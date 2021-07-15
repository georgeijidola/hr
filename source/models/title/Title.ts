/** @format */

import { Schema, model } from "mongoose"

const TitleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },

    name: {
      type: String,
      required: [true, "Please add name."],
      trim: true,
      maxlength: ["100", "Name cannot exceed 100 characters."],
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
    collation: { locale: "en" },
  }
)

TitleSchema.index({
  user: 1,
  name: 1,
  createdAt: 1,
  isDeleted: -1,
})

export default model("Title", TitleSchema)
