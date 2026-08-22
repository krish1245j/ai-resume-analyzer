import { Router } from "express";
import interviewController from "../controllers/interview.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const interviewRouter = Router();

interviewRouter.post(
  "/generate",
  authMiddleware.authUser,
  interviewController.createInterviewReport
);

interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllReports)
interviewRouter.get("/:id",authMiddleware.authUser,interviewController.getReport)
export default interviewRouter;  