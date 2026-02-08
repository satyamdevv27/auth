import express from "express";

import {
  handleusersignup,
  handleuserlogin,
  verifySignupOTP,
  sendResetOTP,
  resetPassword
} from "../controllers/authcontroller.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", handleusersignup);
router.post("/login", handleuserlogin);
router.post("/verify-otp", verifySignupOTP);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
router.post("/send-reset-otp", sendResetOTP);
router.post("/reset-password", resetPassword);


export default router;
