import { tokenGenerator } from "../../config/token.js";
import { user } from "../../model/userSchema.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const userExist = await user.findOne({
            email: email
        })
        if (userExist) {
            return res.status(400).json({
                message: "User already exists",
                // userExist
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const savedUser = await user.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        const token = await tokenGenerator(savedUser._id)
        console.log("token", token)
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.node_env === "production",
            sameSite: "strict",
            maxAge: 4 * 24 * 60 * 60 * 1000 // 4 days
        })

        return res.status(200).json({
            message: "User registered sucessfully",
            // savedUser
        })

    } catch (error) {
        console.log("SignUp failed:", error)
        return res.status(500).json({
            message: "SignUp failed",
            error: error.message
        })
    }
}



// loginiN
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const newUser = await user.findOne({
            email: email
        })
        if (!newUser) {
            return res.status(400).json({
                message: "User does not exist "
            })
        }
        const isMatch = await bcrypt.compare(password, newUser.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        const token = await tokenGenerator(newUser._id)
        console.log("tokem", token)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.node_env === "production",
            sameSite: "strict",
            maxAge: 4 * 24 * 60 * 60 * 1000 // 4 days
        })
        return res.status(200).json({
            message: "Login sucessfull",
            newUser
        })
    } catch (error) {
        console.log("SignUp failed:", error)
        return res.status(500).json({
            message: "SignUp failed",
            error: error.message
        })
    }

}


///logout

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.node_env === "production",
            sameSite: "strict",
            maxAge: 4 * 24 * 60 * 60 * 1000 // 4 days
        })

        return res.status(200).json({
            message: "Logout seccessful",
        })
    } catch (error) {
        return res.status(500).json({
            message: "SignUp failed",
            error: error.message
        })
    }
}