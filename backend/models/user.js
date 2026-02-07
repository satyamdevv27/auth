
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
    otp:String,
    otpExpires: Date,
    isVerified: {
  type: Boolean,
  default: false,
},
    
  },
  { timestamps: true },
);

const User =  mongoose.model("User",userschema)
export default User;