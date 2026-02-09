import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import PendingUser from "../models/pendingUser.js";
import { generateOTP, getOTPExpiry } from "../utils/otp.js";
import { sendOTPEmail } from "../services/mailService.js";

/* ---------------- SIGNUP ---------------- */
export const handleusersignup = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  // remove old pending signup
  await PendingUser.findOneAndDelete({ email });

  await PendingUser.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpires: getOTPExpiry(),
  });

   sendOTPEmail(email, otp);

  res.json({ message: "OTP sent" });
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

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
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

  const pendingUser = await PendingUser.findOne({ email });

  if (
    !pendingUser ||
    pendingUser.otp !== otp ||
    pendingUser.otpExpires < Date.now()
  ) {
    return res.status(400).json({
      message: "Invalid or expired OTP",
    });
  }

  // create actual user now
  await User.create({
    name: pendingUser.name,
    email: pendingUser.email,
    password: pendingUser.password,
    isVerified: true,
  });

  // remove temporary user
  await PendingUser.deleteOne({ email });

  res.json({ message: "Account created successfully!" });
};

/* ---------------- RESEND SIGNUP OTP ---------------- */
export const resendSignupOTP = async (req, res) => {
  const { email } = req.body;

  const pendingUser = await PendingUser.findOne({ email });

  if (!pendingUser) {
    return res.status(404).json({
      message: "Signup session not found",
    });
  }

  const otp = generateOTP();

  pendingUser.otp = otp;
  pendingUser.otpExpires = getOTPExpiry();

  await pendingUser.save();

  await sendOTPEmail(email, otp);

  res.json({ message: "OTP resent" });
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

  await sendOTPEmail(email, otp);

  res.json({ message: "Reset OTP sent" });
};

/* ---------------- RESET PASSWORD ---------------- */
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });

  if (
    !user ||
    user.otp !== otp ||
    user.otpExpires < Date.now()
  ) {
    return res.status(400).json({
      message: "Invalid or expired OTP",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.otp = null;
  user.otpExpires = null;

  await user.save();

  res.json({ message: "Password updated successfully" });
};
