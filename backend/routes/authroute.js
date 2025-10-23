import express from "express"
import { login, logout, signup } from "../controllers/auth/authController.js"

const authRouter = express.Router()

authRouter.post("/signin", signup);
authRouter.post("/login", login);
authRouter.post("/logout", logout)


export default authRouter;
