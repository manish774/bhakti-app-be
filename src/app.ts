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
import PackageRouter from "./routes/packages";
import EventRouter from "./routes/event";
import PanditRouter from "./routes/pandit";
import CoreEventRouter from "./routes/coreevent";

import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

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

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server health status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                 environment:
 *                   type: string
 *                   example: development
 */
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
app.use("/api/package", PackageRouter);
app.use("/api/pandit", PanditRouter);
app.use("/api/event", EventRouter);
app.use("/api/coreevent", CoreEventRouter);

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
