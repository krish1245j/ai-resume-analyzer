import { Router } from "express";
import interviewController from "../controllers/interview.controller.js";

const interviewRouter = Router();

interviewRouter.post(
  "/generate",
  interviewController.createInterviewReport
);

export default interviewRouter;