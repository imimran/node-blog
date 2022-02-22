
import mongoose, { Schema } from "mongoose";

//user model
const UserSchema = new Schema(
  {
    username : {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", UserSchema);

export default User;