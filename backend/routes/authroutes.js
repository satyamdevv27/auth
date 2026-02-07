import express from 'express'
import {handleusersignup} from "../controllers/authcontroller"
const router = express.Router()


router.post("/" , handleusersignup)
router.post("login")

export default router;