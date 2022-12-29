import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      default: null,
      required: true,
    },
    courseDescription: {
      type: String,
      default: null,
      required: true,
    },
    level: {
      type: String,
      default: null,
      required: true,
    },
  },

  { timestamps: true }
);
const User = mongoose.model("Course", courseSchema);
export default User;
