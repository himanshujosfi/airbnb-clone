import { user } from "../model/userSchema.js"

const getCurentUser = async (req, res) => {
    try {
        const getUser = await user.findById(req.userId).select(-password)
        if (!getUser) {
            return res.status(400).json({
                message: "User not found",
                // savedUser
            })
        }
        return res.status(200).json({
            message: "User found sucessfully",
            // savedUser
        })

    } catch (error) {
        // console.log("SignUp failed:", error)
        return res.status(500).json({
            message: "Invalid user",
            error: error.message
        })
    }
}

export default getCurentUser