import dotenv from "dotenv";
dotenv.config();

import { DB } from "./database/database";
import express from "express";
import { responseInterceptor } from "./errorHandlers/responseInterceptor";
import cookieParser from "cookie-parser";
import AuthRouter from "./routes/auth";
import ProfileRouter from "./routes/profile";
import GroupRouter from "./routes/group";
import QuestionRouter from "./routes/questions";
import AnswerRouter from "./routes/answers";
import GameRouter from "./routes/game";
import AdminRouter from "./routes/admin";
import UploadRouter from "./routes/upload";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://admin.jalsuvidha.com", "*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.options("*", cors());
app.use(express.json());
app.use(responseInterceptor);
app.use(cookieParser());

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/auth", AuthRouter);
app.use("/api/profile", ProfileRouter);
app.use("/api/group", GroupRouter);
app.use("/api/que", QuestionRouter);
app.use("/api/ans", AnswerRouter);
app.use("/api/game", GameRouter);
app.use("/api/admin", AdminRouter);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/upload", UploadRouter);

const connectDB = async () => {
  try {
    await DB.connect();
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} in ${
          process.env.NODE_ENV || "development"
        } mode`
      );
    });
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};
connectDB();
