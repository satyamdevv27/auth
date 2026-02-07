import express from "express";

import {
  handleusersignup,
  handleuserlogin,
  verifySignupOTP,
} from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/signup", handleusersignup);
router.post("/login", handleuserlogin);
router.post("/verify-otp", verifySignupOTP);

export default router;
