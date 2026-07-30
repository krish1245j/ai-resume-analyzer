import { Router } from "express";
const authRouter=Router()
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

authRouter.post("/register",authController.registerUser);
authRouter.post("/login",authController.loginUser);

authRouter.get("/logout",authController.logoutUser); 
authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)
export default authRouter;