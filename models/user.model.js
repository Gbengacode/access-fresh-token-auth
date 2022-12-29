import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      default: null,
      required: true,
    },
    lastName: {
      type: String,
      default: null,
      required: true,
    },
    email: {
      type: String,
      default: null,
      required: true,
    },
    profileImg: {
      type: [String],
      default: [],
    },
    password: {
      type: String,
      default: null,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },

  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
