import User from "../models/user.js";
import { generateOTP, getOTPExpiry } from "../utils/otp.js";
import { sendOTPEmail } from "../services/mailService.js";
export const handleusersignup = async (req, res) => {
  const { name, email, password } = req.body;
  const otp = generateOTP();
  try {
    // Use 'await' so the code waits for MongoDB to finish
    const newUser = await User.create({
      name,
      email,
      password,
      otp,
      otpExpires: getOTPExpiry(),
    });
    await sendOTPEmail(email, otp);

    // Send a success response back to the user
    return res.status(201).json({
      // message: "User registered successfully!",
      // userId: newUser._id
      message: "OTP sent to email",
    });
  } catch (error) {
    // Handle the duplicate email error specifically
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    // Handle other validation errors (like password too short)
    return res.status(500).json({ error: error.message });
  }
};

export const handleuserlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify email first",
      });
    }

    res.json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const verifySignupOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({
      message: "Invalid or expired OTP",
    });
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;

  await user.save();

  res.json({ message: "Account verified!" });
};
