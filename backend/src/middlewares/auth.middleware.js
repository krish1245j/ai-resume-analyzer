import jwt from "jsonwebtoken"
import tokenBlacklistModel from "../models/blacklist.model.js";
async function authUser(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Token is required"
        })
    }
    const isBlacklisted = await tokenBlacklistModel.findOne({ token });

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Token is blacklisted"
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token is not correct"
        })
    }

}

export default { authUser }