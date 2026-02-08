import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { generateOTP, getOTPExpiry } from "../utils/otp.js";
import { sendOTPEmail } from "../services/mailService.js";

/* ---------------- SIGNUP ---------------- */
export const handleusersignup = async (req, res) => {
  const { name, email, password } = req.body;
  const otp = generateOTP();

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: getOTPExpiry(),
    });

     sendOTPEmail(email, otp);

    return res.status(201).json({
      message: "OTP sent to email",
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email already exists!" });
    }

    return res.status(500).json({ error: error.message });
  }
};

/* ---------------- LOGIN ---------------- */
export const handleuserlogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // ✅ bcrypt compare
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Please verify email first",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* ---------------- VERIFY OTP ---------------- */
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

/* ---------------- SEND RESET OTP ---------------- */
export const sendResetOTP = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const otp = generateOTP();

  user.otp = otp;
  user.otpExpires = getOTPExpiry();

  await user.save();
   sendOTPEmail(email, otp);

  res.json({ message: "Reset OTP sent" });
};

/* ---------------- RESET PASSWORD ---------------- */
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({
      message: "Invalid or expired OTP",
    });
  }

  // ✅ hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.otp = null;
  user.otpExpires = null;

  await user.save();

  res.json({ message: "Password updated successfully" });
};
