
import mongoose from "mongoose";

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim:true,
      lowercase:true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  { timestamps: true },
);

const User =  mongoose.model("User",userschema)
export default User;