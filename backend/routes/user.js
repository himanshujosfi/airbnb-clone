import express from "express"
import getCurentUser from "../controllers/getUser.js";
import authUser from "../middleware/authUser.js"

const userRouter = express.Router()

userRouter.get("/getUser", authUser, getCurentUser);


export default userRouter;