/** @format */

import { Schema, model } from "mongoose"

const TagSchema = new Schema(
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
      maxlength: ["50", "Name cannot exceed 50 characters."],
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

TagSchema.index({
  user: 1,
  name: 1,
  createdAt: 1,
  isDeleted: -1,
})

export default model("Tag", TagSchema)
