
import jwt from "jsonwebtoken"

export const tokenGenerator = async (userId) => {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "4d"
        })
        return token
    } catch (error) {
        console.log("Token generation error:", error)
    }
}