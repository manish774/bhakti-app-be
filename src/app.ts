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
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({ credentials: true, origin: CORS_ORIGIN }));
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
