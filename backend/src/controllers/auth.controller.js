import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import tokenBlacklistModel from "../models/blacklist.model.js";
import jwt from "jsonwebtoken";
async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "username,email,password is required to register "
            })
        }
        const isUserExist = await userModel.findOne({
            $or: [{ username }, { email }]
        })
        if (isUserExist) {
            return res.status(400).json({
                message: "user already exist",
            })
        }
        const hash = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hash,
        })
        const token = await jwt.sign(
            { id: user._id, username: user.username, createdAt: Date.now() }, process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.cookie("token", token);
        return res.status(201).json({
            message: "User created sucessfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Invalid credentials"
        })
    }

}
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "email,password is required to Login "
            })
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        const token = await jwt.sign(
            { id: user._id, username: user.username }, process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.cookie("token", token);
        return res.status(201).json({
            message: "User LoggedIn sucessfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Invalid credentials"
        })
    }


}
async function logoutUser(req, res) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({
                message: "Token is required to logout"
            })
        }
        await tokenBlacklistModel.create({ token });
        res.clearCookie("token");
        return res.status(200).json({
            message: "User logged out sucessfully"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Invalid credentials"
        })
    }

}
async function getMe(req, res) {
    try {
        const user = await userModel.findById(req.user.id);
        return res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Invalid credentials"
        })
    }


}
export default { registerUser, loginUser, logoutUser, getMe } 