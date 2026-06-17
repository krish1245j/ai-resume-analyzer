import express from "express";
import authRouter from "./routers/auth.routes.js";
import interviewRouter from "./routers/interview.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;