
import jwt from "jsonwebtoken"

export const authUser = async (req, res, next) => {
    try {
        const { token } = req.cookies
        if (!token) {
            res.status(400).json({
                message: "User does not have  token"
            })
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            res.status(400).json({
                message: "User token is valid token "
            })
        }
        req.userId = verifyToken.userId
        next()
    } catch (error) {

    }
}